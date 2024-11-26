import mongoose from "mongoose";

const databaseUrl = "mongodb://localhost:27017/mern";
let retries = 5; // Number of retries before giving up

const connectToDatabase = async () => {
    while (retries) {
        try {
            const data = await mongoose.connect(databaseUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("Connected to MongoDB:", data.connection.name);
            break;  // If connection is successful, break out of the loop
        } catch (error) {
            retries -= 1;
            console.error(`Database connection failed. Retries left: ${retries}`, error);
            
            if (retries === 0) {
                console.error("Could not connect to the database. Exiting...");
                process.exit(1);  // Exit the application with a failure code
            }

            console.log("Retrying connection in 5 seconds...");
            await new Promise(res => setTimeout(res, 5000));  // Wait 5 seconds before retrying
        }
    }
};

export default connectToDatabase;
