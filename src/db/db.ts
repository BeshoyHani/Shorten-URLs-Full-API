import mongoose from "mongoose";
import "dotenv/config";

const DB_URL = process.env.DB_URL as string;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
    } catch (err) {
        console.error((err as Error).message);
        process.exit(1);
    }
}

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
    } catch (err) {
        console.error((err as Error).message);
        process.exit(1);
    }
}

export {
    connectDB,
    disconnectDB
}