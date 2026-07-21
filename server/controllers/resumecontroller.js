import imageKit from "../config/imagekit.js"
import Resume from "../models/resume.js"
import fs from "fs"


export const createResume = async () => {
    try {
        const userTd = req.userId
        const { title } = req.body

        const newResume = await Resume.create({
            userId, title
        })
        return res.status(201).json({ message: "Resume created successfully", resume: newResume })
    } catch (error) {
        return res.status(400).json({ message: "Internal server error", error })
    }
}
export const deleteResume = async () => {
    try {
        const userTd = req.userId
        const { resumeId } = req.params

        await Resume.findOneAndDelete({ userId, _id: resumeId })
        return res.status(200).json({ message: "Resume deleted successfully" })
    } catch (error) {
        return res.status(400).json({ message: "Internal server error", error })
    }
}
export const getResumeById = async () => {
    try {
        const userTd = req.userId
        const { resumeId } = req.params

        const resume = await Resume.findOne({ userId, _id: resumeId })
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }
        resume.__v = undefined
        resume.createdAt = undefined
        resume.updatedAt = undefined
        return res.status(200).json({ resume })
    } catch (error) {
        return res.status(400).json({ message: "Internal server error", error })
    }
}

export const getPublicResumeById = async () => {
    try {
        const { resumeId } = req.params
        const resume = await Resume.findOne({ public: true, _id: resumeId })

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }
    } catch (error) {
        return res.status(400).json({ message: "Internal server error", error })
    }
}

export const updateResume = async () => {
    try {
        const userId = req.userId
        const { resumeId, resumeData, removeBackground } = req.body
        const image = req.file

        if (image) {

            const imageBufferData = fs.createReadStream(image.path)

            const response = await imageKit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transpormations: {
                    pre: 'w-300, h-300, fo-face, z-0.75' + (removeBackground ? ', e-bgremove' : '')
                }
            });
            resumeDataCopy.personal_info.image = response.url
        }

        let resumeDataCopy = JSON.parse(resumeData)

        const resume = await Resume.findOneAndUpdate({ userId, _id: resumeId },
            resumeDataCopy, { new: true }
        )
        return res.status(200).json({ message: "Saved successfully", resume })

    } catch (error) {
        return res.status(400).json({ message: "Internal server error", error })
    }
}