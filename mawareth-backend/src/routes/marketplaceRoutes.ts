
import express from 'express'; // Import Express framework
import { getListings, getListingById, unlockListing, placeBid, createListing, updateListing } from '../controllers/marketplaceController'; // Import marketplace controller functions
import { protect } from '../middleware/authMiddleware'; // Import authentication middleware

const router = express.Router(); // Create a new router instance

router.post('/', protect, createListing); // Route to create a new marketplace listing (protected)

router.get('/', protect, getListings); // Route to get all listings (protected)
router.get('/:id', protect, getListingById); // Route to get a specific listing by ID (protected)
router.patch('/:id', protect, updateListing); // Route to update listing status
router.post('/:listingId/unlock', protect, unlockListing); // Route to unlock a listing (protected)
router.post('/:listingId/bid', protect, placeBid); // Route to place a bid on a listing (protected)

export default router; // Export the router
