import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Resume from "../models/resume.js"


const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
    return token;
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        // create new user
        const hasedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hasedPassword
        })
        await newUser.save();

        const token = generateToken(newUser._id)
        newUser.password = undefined
        return res.status(201).json({ message: "User created successfully", token, user: newUser })
    } catch (error) {
        return res.status(400).json({ message: "Internal server error register mai", error })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        if (!user.comarePassword(password)) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const token = generateToken(user._id)
        user.password = undefined
        return res.status(200).json({ message: "Login successful", token, user })
    } catch (error) {
        return res.status(400).json({ message: "Internal server error", error })
    }
}

export const getUserById = async (req, res) => {
    try {
        const userId = req.userId
        const user = User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        user.password = undefined
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(400).json({ message: "Internal server error", error })
    }
}

export const getUserResume = async (req, res) => {
    try {
        const userId = req.userId
        const resumes = await Resume.find({ userId })
        return res.status(200).json({ resumes })
    } catch (error) {
        return res.status(400).json({ message: "Internal server error getresume mai", error})
        console.log(error, "error getresume mai");
    }
}