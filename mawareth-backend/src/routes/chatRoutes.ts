import express from 'express'; // Import Express framework
import { protect } from '../middleware/authMiddleware'; // Import authentication middleware
import { getUserChats, createOrGetChat, sendMessage } from '../controllers/chatController'; // Import chat controller functions

const router = express.Router(); // Create a new router instance

router.route('/')
    .get(protect, getUserChats) // Route to get all user chats (protected)
    .post(protect, createOrGetChat); // Route to create or retrieve a chat (protected)

router.post('/:id/message', protect, sendMessage); // Route to send a message in a specific chat (protected)

export default router; // Export the router
