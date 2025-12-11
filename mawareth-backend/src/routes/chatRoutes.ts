import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getUserChats, createOrGetChat, sendMessage } from '../controllers/chatController';

const router = express.Router();

router.route('/')
    .get(protect, getUserChats)
    .post(protect, createOrGetChat);

router.post('/:id/message', protect, sendMessage);

export default router;
