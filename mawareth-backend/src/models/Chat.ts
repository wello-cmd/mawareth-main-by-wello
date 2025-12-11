import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
    sender: 'user' | 'bot' | 'support';
    text: string;
    timestamp: Date;
}

export interface IChat extends Document {
    userId?: mongoose.Types.ObjectId;
    status: 'active' | 'closed';
    messages: IMessage[];
    createdAt: Date;
}

const ChatSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'closed'], default: 'active' },
    messages: [{
        sender: { type: String, enum: ['user', 'bot', 'support'] },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IChat>('Chat', ChatSchema);
