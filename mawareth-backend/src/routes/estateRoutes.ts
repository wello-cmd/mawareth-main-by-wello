
import express from 'express'; // Import Express framework
import { getEstates, getEstateById, createEstate, updateVote, updateConsensus, deleteEstate } from '../controllers/estateController'; // Import estate controller functions
import { protect } from '../middleware/authMiddleware'; // Import authentication middleware

const router = express.Router(); // Create a new router instance

router.get('/', protect, getEstates); // Route to get all estates (protected)
router.post('/', protect, createEstate); // Route to create a new estate (protected)
router.get('/:id', protect, getEstateById); // Route to get a specific estate by ID (protected)
router.delete('/:id', protect, deleteEstate); // Route to delete an estate by ID (protected)
router.get('/status/:status', protect, getEstates); // Route to get estates by status (protected) - Logic handled in getEstates
// Public Voting Route (No Auth Required - Protected by National ID & Token)
router.patch('/public/vote/:estateId', updateVote); // Public route for updating a vote on an estate

router.patch('/:estateId/vote', protect, updateVote); // Protected route for updating a vote
router.patch('/:estateId/consensus', protect, updateConsensus); // Protected route for updating consensus

export default router; // Export the router
