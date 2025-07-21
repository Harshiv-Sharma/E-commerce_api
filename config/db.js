import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const {MONGO_URI} = process.env;

        if(!MONGO_URI){
            console.error("❌ Mongo_URI is not defined in environment variables.");
            process.exit(1);
        }
        const conn = await mongoose.connect(MONGO_URI);
        // console.log(`✔ MongoDB connected: ${conn.connection.host}`);
        // console.log(`Connected to DB: ${mongoose.connection.name}`);
    }
    catch(error){
        console.error(`❌ MongoDB connection error: ${error}`);
        process.exit(1);
    }
} 

// export default connectDB;