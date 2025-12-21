
import express from 'express'; // Import Express framework
import { createApplication, getMyApplications, getApplicationById, updateStatus } from '../controllers/buyoutController'; // Import buyout controller functions
import { protect } from '../middleware/authMiddleware'; // Import authentication middleware

const router = express.Router(); // Create a new router instance

router.post('/', protect, createApplication); // Route to create a new buyout application (protected)
router.get('/my', protect, getMyApplications); // Route to get current user's applications (protected)
router.get('/:id', protect, getApplicationById); // Route to get an application by ID (protected)
router.patch('/:id/status', protect, updateStatus); // Route to update application status (protected)

export default router; // Export the router
