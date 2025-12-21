
import mongoose from 'mongoose'; // Import mongoose for MongoDB interactions
import dotenv from 'dotenv'; // Import dotenv to manage environment variables

dotenv.config(); // Load environment variables from .env file

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the URI from environment variables or a default local one
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mawareth', {
            serverApi: {
                version: '1',
                strict: true, // Use strict mode for better reliability
                deprecationErrors: true, // Log deprecation warnings
            }
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`); // Log successful connection
    } catch (error: any) {
        console.error(`Error: ${error.message}`); // Log connection error
        process.exit(1); // Exit process with failure code
    }
};

export default connectDB; // Export the connection function
