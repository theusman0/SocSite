
import mongoose from "mongoose";
export default async function ConnectToDB() {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}