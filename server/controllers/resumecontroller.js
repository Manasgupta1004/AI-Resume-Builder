import imageKit from "../config/imagekit.js"
import Resume from "../models/resume.js"
import fs from "fs"


export const createResume = async (req, res) => {
    try {
        const userId = req.userId
        const { title } = req.body

        const newResume = await Resume.create({
            userId, title
        })
        return res.status(201).json({ message: "Resume created successfully", resume: newResume })
    } catch (error) {
        return res.status(400).json({ message: "Internal server error haii", error })
        console.log(error)
    }
}
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId
        const { resumeId } = req.params

        await Resume.findOneAndDelete({ userId, _id: resumeId })
        return res.status(200).json({ message: "Resume deleted successfully" })
    } catch (error) {
        console.log(error, "error delete resume mai");
        return res.status(400).json({ message: "Internal server error", error })
        console.log(error, "error delete resume mai");
    }
}
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId
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

export const getPublicResumeById = async (req, res) => {
    // console.log("PUBLIC RESUME API HIT");
    try {
        const { resumeId } = req.params
        const resume = await Resume.findOne({ public: true, _id: resumeId })
        console.log("FOUND RESUME:", resume);


        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }
        return res.status(200).json({ resume });

    } catch (error) {
        //  console.log("PUBLIC RESUME ERROR:", error);

        // return res.status(500).json({
        //     message: "Internal server error",
        //     error: error.message
        // });
        return res.status(400).json({ message: "Internal server error", error })
    }
}

export const updateResume = async (req, res) => {
    try {
        const userId = req.userId
        const { resumeId, removeBackground } = req.body
        let resumeData = JSON.parse(req.body.resumeData);
        const image = req.file
        console.log("removeBackground =", removeBackground);
        let resumeDataCopy
        if (typeof resumeData === 'string') {
            resumeDataCopy = await JSON.parse(resumeData)
        } else {
            resumeDataCopy = structuredClone(resumeData)
        }
        if (image) {

            const imageBufferData = fs.createReadStream(image.path)

            const response = await imageKit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                // transformations: {
                //     pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ', e-bgremove' : '')
                // }
            });
            // console.log(response);
            // resumeDataCopy.personal_info.image = response.url
            const transformedUrl = response.url.replace(
                "/user-resumes/",
                `/tr:w-300,h-300,fo-face,z-0.75${removeBackground ? ",e-bgremove" : ""}/user-resumes/`
            );
            resumeDataCopy.personal_info.image = transformedUrl;
        }

        console.log("resumeDataCopy =", resumeDataCopy);
        console.log("professional_summary =", resumeDataCopy.professional_summary);
        const resume = await Resume.findOneAndUpdate({ userId, _id: resumeId },
            resumeDataCopy, { new: true }
        )
        return res.status(200).json({ message: "Saved successfully", resume })

    } catch (error) {
        //  console.log(error, "error update resume mai", error)
        return res.status(400).json({ message: "Internal server error", error })

    }
}