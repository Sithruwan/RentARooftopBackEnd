import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_DB_URI = process.env.MONGO_DB_URI;

if (!MONGO_DB_URI) {
    console.error('MongoDB URI is required');
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI);
        console.log('MongoDB connected 🚀');
    } catch (err) {
        console.error('DB Connection Error:', err);
        process.exit(1);
    }
};

export default connectDB;