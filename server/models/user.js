import mongoose from 'mongoose'
import bcrypt, { compareSync } from 'bcrypt'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.methods.comarePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const user = mongoose.model('user', userSchema)

export default user;   //5:57