
import express from 'express'; // Import Express framework
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController'; // Import user controller functions
import { protect } from '../middleware/authMiddleware'; // Import authentication middleware

const router = express.Router(); // Create a new router instance

router.get('/', protect, getAllUsers); // Route to get all users (protected)
router.get('/:id', protect, getUserById); // Route to get a specific user by ID (protected)
router.patch('/:id', protect, updateUser); // Route to update a user by ID (protected)
router.delete('/:id', protect, deleteUser); // Route to delete a user by ID (protected)

export default router; // Export the router
