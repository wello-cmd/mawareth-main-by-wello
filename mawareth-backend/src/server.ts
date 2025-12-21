import express from 'express'; // Import Express framework for building the API
import path from 'path'; // Import path module for handling file and directory paths
import cors from 'cors'; // Import CORS middleware to enable Cross-Origin Resource Sharing
import helmet from 'helmet'; // Import helmet for securing HTTP headers
import morgan from 'morgan'; // Import morgan for HTTP request logging
import dotenv from 'dotenv'; // Import dotenv to load environment variables from .env file
import connectDB from './config/db'; // Import database connection function

import authRoutes from './routes/authRoutes'; // Import routes for authentication
import userRoutes from './routes/userRoutes'; // Import routes for user management
import estateRoutes from './routes/estateRoutes'; // Import routes for estate management
import marketplaceRoutes from './routes/marketplaceRoutes'; // Import routes for marketplace operations
import buyoutRoutes from './routes/buyoutRoutes'; // Import routes for buyout applications
import chatRoutes from './routes/chatRoutes'; // Import routes for chat functionality


// Load env vars
dotenv.config(); // Initialize environment variables

// Connect to database
connectDB(); // Establish connection to the MongoDB database

const app = express(); // Create an Express application instance

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Set security HTTP headers
app.use(morgan('dev')); // Log HTTP requests in 'dev' format
app.use(express.json()); // Parse incoming JSON request bodies
app.use('/public', express.static(path.join(__dirname, '../public'))); // Serve static files from the 'public' directory

// Routes
app.use('/api/auth', authRoutes); // Mount auth routes at /api/auth
app.use('/api/users', userRoutes); // Mount user routes at /api/users
app.use('/api/estates', estateRoutes); // Mount estate routes at /api/estates
app.use('/api/marketplace', marketplaceRoutes); // Mount marketplace routes at /api/marketplace
app.use('/api/buyouts', buyoutRoutes); // Mount buyout routes at /api/buyouts
app.use('/api/chat', chatRoutes); // Mount chat routes at /api/chat


app.get('/', (req, res) => { // Define a simple route for the root path
    res.send('Mawareth API is running'); // Send a response confirming the API is running
});

const PORT = process.env.PORT || 5000; // Set the port from environment variables or default to 5000

app.listen(PORT, () => { // Start the server and listen on the specified port
    console.log(`Server running on port ${PORT}`); // Log a message when the server starts successfully
});
