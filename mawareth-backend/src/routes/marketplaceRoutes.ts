
import express from 'express';
import { getListings, getListingById, unlockListing, placeBid } from '../controllers/marketplaceController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getListings);
router.get('/:id', protect, getListingById);
router.post('/:listingId/unlock', protect, unlockListing);
router.post('/:listingId/bid', protect, placeBid);

export default router;
