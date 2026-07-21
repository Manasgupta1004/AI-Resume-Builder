import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', async () => {
            console.log('database connected successfully');
        })
        let mongoDBURI = process.env.MONGODB_URI;
        const projectName = 'resume-builder';
        console.log('MongoDB URI:', mongoDBURI);

        if (!mongoDBURI) {
            throw new Error('mongodb URI is not defined in environment variables');
        }
        if (mongoDBURI.endsWith('/')) {
            mongoDBURI = mongoDBURI.slice(0, -1);
        }

        await mongoose.connect(`${mongoDBURI}/${projectName}`)

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

