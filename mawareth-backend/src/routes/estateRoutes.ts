
import express from 'express';
import { getEstates, getEstateById, createEstate, updateVote, updateConsensus, deleteEstate } from '../controllers/estateController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getEstates);
router.post('/', protect, createEstate);
router.get('/:id', protect, getEstateById);
router.delete('/:id', protect, deleteEstate);
router.get('/status/:status', protect, getEstates); // Logic handled in getEstates via query or separate if needed, strictly speaking RESTful usually query param
router.patch('/:estateId/vote', protect, updateVote);
router.patch('/:estateId/consensus', protect, updateConsensus);

export default router;
