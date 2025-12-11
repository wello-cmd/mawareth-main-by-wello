
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import estateRoutes from './routes/estateRoutes';
import marketplaceRoutes from './routes/marketplaceRoutes';
import buyoutRoutes from './routes/buyoutRoutes';
import chatRoutes from './routes/chatRoutes';


// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/estates', estateRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/buyouts', buyoutRoutes);
app.use('/api/chat', chatRoutes);


app.get('/', (req, res) => {
    res.send('Mawareth API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
