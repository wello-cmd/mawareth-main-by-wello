import { Request, Response } from 'express';
import Chat from '../models/Chat';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
// Note: In a production environment, ensure GEMINI_API_KEY is validated
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// @desc    Get all chats for a user
// @route   GET /api/chat
// @access  Private
export const getUserChats = async (req: any, res: Response) => {
    try {
        const chats = await Chat.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, data: chats });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create a new chat or get active one
// @route   POST /api/chat
// @access  Private
export const createOrGetChat = async (req: any, res: Response) => {
    try {
        // Check for active chat
        let chat = await Chat.findOne({ userId: req.user._id, status: 'active' });

        if (!chat) {
            chat = await Chat.create({
                userId: req.user._id,
                messages: []
            });
        }

        res.json({ success: true, data: chat });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Send a message and get AI response
// @route   POST /api/chat/:id/message
// @access  Private
export const sendMessage = async (req: any, res: Response) => {
    try {
        const { text } = req.body;
        const chat = await Chat.findOne({ _id: req.params.id, userId: req.user._id });

        if (!chat) {
            return res.status(404).json({ success: false, error: 'Chat not found' });
        }

        // Add user message to DB
        chat.messages.push({
            sender: 'user',
            text,
            timestamp: new Date()
        });

        // Call Gemini AI
        try {
            // Define the model with specific system instructions
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                systemInstruction: `
                    You are 'Merath AI', a specialized legal assistant for an Egyptian inheritance platform.
                    Your traits:
                    1. Professional, empathetic, and strictly focused on Egyptian Sharia Law.
                    2. If a user asks to calculate inheritance, tell them: "Please use the 'Calculator' tool on your dashboard for an accurate Sharia-compliant breakdown."
                    3. If asked about selling shares, refer them to the 'Solh Marketplace'.
                    4. If asked about loans, explain the 'Merath Murabaha' (Islamic Finance) option.
                    5. Keep answers concise (under 3 sentences) and supportive.
                    6. Answer in the same language the user speaks (Arabic or English).
                `
            });

            // Pass the user message directly
            const result = await model.generateContent(text);
            const response = await result.response;
            const botReply = response.text();

            // Add bot message to DB
            chat.messages.push({
                sender: 'bot',
                text: botReply,
                timestamp: new Date()
            });

        } catch (aiError) {
            console.error("Gemini AI Error:", aiError);
            // Fallback gracefully if AI fails
            chat.messages.push({
                sender: 'bot',
                text: "I apologize, but I am having trouble connecting to my knowledge base right now. Please try again later.",
                timestamp: new Date()
            });
        }

        await chat.save();
        res.json({ success: true, data: chat });
    } catch (error) {
        console.error("Chat Controller Error:", error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
