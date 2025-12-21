
import express from 'express'; // Import Express framework
import { registerUser, loginUser, getMe } from '../controllers/authController'; // Import auth controller functions
import { protect } from '../middleware/authMiddleware'; // Import authentication middleware

const router = express.Router(); // Create a new router instance

router.post('/register', registerUser); // Route for user registration
router.post('/login', loginUser); // Route for user login
router.get('/me', protect, getMe); // Route to get current user details (protected)

export default router; // Export the router
