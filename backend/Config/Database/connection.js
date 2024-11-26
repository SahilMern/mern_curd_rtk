import mongoose from "mongoose";

const databaseUrl = "mongodb://localhost:27017/mern";  // Corrected the URL and typo

const connectToDatabase = async () => {
    try {
        const data = await mongoose.connect(databaseUrl);
        console.log("Connected to MongoDB:", data.connection.name);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Error In Connection");
    }
};

export default connectToDatabase;
