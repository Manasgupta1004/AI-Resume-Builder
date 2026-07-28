// crotroller for enhance a resume professional summary
// post: /api/ai/enhance-pro-sum
import Resume from "../models/resume.js"
import { model } from "mongoose"
import ai from "../config/ai.js"

export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body
        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    "role": "system",
                    "content": "you are an expert in resume writing. your task is to enhance the professional summary of a resume. the summary should be 1-2 sentences aslo highlighting key skills, exprience, and career objectives. make it compelling and ATS-friendly. and only return text no options or anything else."
                },
                {
                    "role": "user",
                    "content": userContent
                }
            ]
        })
        const enhancedContent = response.choices[0].message.content
        return res.status(200).json({ enhancedContent })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// controller for enhance a resume job description
// post: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body
        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    "role": "system",
                    "content": "you are the expert in resume writing. your task is to enhance the job description of a resume. the job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. use action verbs and quantifiable results where possible. make it ATS-friendly. and only return text no options or anything else."
                },
                {
                    "role": "user",
                    "content": userContent
                }
            ]
        })
        const enhancedContent = response.choices[0].message.content
        return res.status(200).json({ enhancedContent })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
// controller for uploading a resume to the database
// post: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body
        const userId = req.userId
        if (!resumeText) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const systemPrompt = 'you are an expert AI Agent to extract data from resume.'
        const userPrompt = `extract data from this resume: ${resumeText} 
        Provide data in the following JSON format with no additional text or after: {
         Professional_summary: {
        type: String,
        default: ''
    },
    skills: [
        {
            type: String,
        }
    ],
    personal_info: {
        image: {
            type: String,
            default: ''
        },
        full_name: {
            type: String,
            default: ''
        },
        profession: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        location: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        },
        website: {
            type: String,
            default: ''
        }
    },
    express:[
        {
            company: {type: String},
            position: {type: String},
            start_date: {type: String},
            end_date: {type: String},
            description: {type: String},
            is_current: {type: Boolean, default: false}
        }
    ],
    projects: [
        {
            name: {type: String},
            type: {type: String},
            description: {type: String}    
        }
    ],
    education: [
        {
            institution: {type: String},
            degree: {type: String},
            field: {type: String},
            gpa: {type: String},
            graduation_date: {type: String}
        }
    ]
    }`
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    "role": "system",
                    "content": systemPrompt
                },
                {
                    "role": "user",
                    "content": userPrompt,
                }
            ],
            response_format: {
                type: "json_object",
            }
        })
        const extractedData = response.choices[0].message.content
        const parseData = JSON.parse(extractedData)
        const newResume = await Resume.create({
            userId: userId,
            title: title,
            ...parseData
        })
        return res.status(200).json({ resumeId: newResume._id })
    } catch (error) {

        // console.log(error.response?.status);
        // console.log(error.response?.data);
        // console.log(error.message);

        // return res.status(500).json({
        //     message: error.message
        // });
        return res.status(400).json({ message: error.message })
    }
}