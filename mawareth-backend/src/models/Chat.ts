import mongoose, { Document, Schema } from 'mongoose'; // Import Mongoose types

// Interface for a single chat message
export interface IMessage {
    sender: string;
    text: string;
    timestamp: Date;
}

// Interface for Chat document
export interface IChat extends Document {
    participants: mongoose.Types.ObjectId[];
    type: 'AI' | 'Support';
    messages: IMessage[];
}

// Define Chat Schema
const ChatSchema: Schema = new Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users involved in chat
    type: { type: String, enum: ['AI', 'Support'] }, // Type of chat: AI bot or Human Support
    messages: [{ // Array of messages
        sender: String, // Sender identifier ('user', 'bot', or user ID)
        text: String, // Message content
        timestamp: { type: Date, default: Date.now } // Time of message
    }]
});

export default mongoose.model<IChat>('Chat', ChatSchema); // Export Chat model
