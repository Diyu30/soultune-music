import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Register event listeners before connecting
        mongoose.connection.on("connected", () => {
            console.log("Database Connected...");
        });

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDB;
