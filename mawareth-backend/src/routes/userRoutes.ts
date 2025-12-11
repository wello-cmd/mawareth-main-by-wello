
import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getAllUsers);
router.get('/:id', protect, getUserById);
router.patch('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

export default router;
