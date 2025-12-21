import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

async function checkConnection() {
    console.log('Testing MongoDB Connection...');
    console.log('URI:', MONGODB_URI?.replace(/:([^:@]+)@/, ':****@')); // Hide password in logs

    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI is undefined in .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connection Successful!');
        console.log('Database Name:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);
        await mongoose.disconnect();
        console.log('Connection closed.');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error);
        process.exit(1);
    }
}

checkConnection();
