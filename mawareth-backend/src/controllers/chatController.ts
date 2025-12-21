import { Request, Response } from 'express'; // Import Express types
import Chat from '../models/Chat'; // Import Chat model
import OpenAI from "openai"; // Import OpenAI client

// Initialize OpenAI with OpenRouter configuration
const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY, // Get API key from env vars
    baseURL: "https://openrouter.ai/api/v1", // Set base URL for OpenRouter
});

// @desc    Get all chats for a user
// @route   GET /api/chat
// @access  Private
export const getUserChats = async (req: any, res: Response) => {
    try {
        const chats = await Chat.find({ userId: req.user._id }).sort({ createdAt: -1 }); // Find chats for user, sorted by date
        res.json({ success: true, data: chats }); // Return chats
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' }); // Return server error
    }
};

// @desc    Create a new chat or get active one
// @route   POST /api/chat
// @access  Private
export const createOrGetChat = async (req: any, res: Response) => {
    try {
        // Check for active chat
        let chat = await Chat.findOne({ userId: req.user._id, status: 'active' }); // Find active chat for user

        if (!chat) {
            chat = await Chat.create({ // Create new chat if none exists
                userId: req.user._id,
                messages: []
            });
        }

        res.json({ success: true, data: chat }); // Return chat
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' }); // Return server error
    }
};

// @desc    Send a message and get AI response
// @route   POST /api/chat/:id/message
// @access  Private
export const sendMessage = async (req: any, res: Response) => {
    try {
        const { text } = req.body; // Get message text from body
        const chat = await Chat.findOne({ _id: req.params.id, userId: req.user._id }); // Find chat by ID and user

        if (!chat) {
            return res.status(404).json({ success: false, error: 'Chat not found' }); // Return 404 if not found
        }

        // Add user message to DB
        chat.messages.push({ // Push user message to history
            sender: 'user',
            text,
            timestamp: new Date()
        });

        // Call OpenRouter AI
        try {
            const completion = await openai.chat.completions.create({ // Create chat completion
                model: "openai/gpt-4o-mini", // Specify model
                messages: [
                    {
                        role: "system", // System prompt definition
                        content: `You are 'Merath AI' (مساعد ميراث الذكي), a specialized legal and financial assistant for the 'Merath' platform in Egypt.

YOUR IDENTITY:
- You are an expert in Egyptian Inheritance Law (Law No. 77 of 1943) and Islamic Sharia (Sunni/Shafi'i & Hanafi schools as applied in Egypt).
- You are professional, empathetic, and reassuring. Inheritance is stressful; you bring calm clarity.
- You speak both English and Egyptian Arabic (Modern Standard Arabic mixed with professional Egyptian terms).

YOUR CRITICAL RULES (DO NOT BREAK):
1. NO MATH: You must NEVER calculate inheritance shares yourself. If a user asks "How much does my wife get from 2 million?", you must REFUSE to answer with a number.
   - Instead, say: "For precise legal calculations, please use the 'Inheritance Calculator' tool on your dashboard. It is certified by our Sharia Audit Board."
   - (Reason: AI math can be wrong. We want them to use your App Feature.)

2. THE "SOLH" REDIRECT: If a user mentions "selling", "dispute", "family won't sell", or "blocked assets":
   - Advise them to list their share on the 'Solh Marketplace' (سوق الصلح).
   - Explain that Merath allows them to sell *just their share* to investors without needing family consent.

3. THE "FINANCE" REDIRECT: If a user asks about "loans", "borrowing", or "buying out a sibling":
   - Explain 'Merath Murabaha' (مرابحة ميراث).
   - Emphasize it is 100% Sharia-Compliant (Halal) and asset-backed, unlike traditional bank usury (Riba).

4. SAFETY & LIABILITY:
   - Do not give advice on circumventing the law (e.g., "How do I hide assets?"). Refuse these requests firmly.
   - Always add a disclaimer in complex cases: "This is for guidance. Please consult a specialized lawyer for final court proceedings.

5. TONE & STYLE:
   - Keep answers under 3-4 sentences unless asked for a detailed explanation.
   - Use formatting (bullet points) for readability.
   - If the user speaks Arabic, reply in Arabic. If English, reply in English.`
                    },
                    {
                        role: "user", // User message
                        content: text
                    }
                ],
            });

            const botReply = completion.choices[0].message.content || "I apologize, but I couldn't generate a response."; // Get AI response or fallback

            // Add bot message to DB
            chat.messages.push({ // Push bot response to history
                sender: 'bot',
                text: botReply,
                timestamp: new Date()
            });

        } catch (aiError) {
            console.error("OpenRouter AI Error:", aiError); // Log AI error
            // Fallback gracefully if AI fails
            chat.messages.push({ // Push error message to history
                sender: 'bot',
                text: "I apologize, but I am having trouble connecting to my knowledge base right now. Please try again later.",
                timestamp: new Date()
            });
        }

        await chat.save(); // Save chat with new messages
        res.json({ success: true, data: chat }); // Return updated chat
    } catch (error) {
        console.error("Chat Controller Error:", error); // Log controller error
        res.status(500).json({ success: false, error: 'Server Error' }); // Return server error
    }
};
