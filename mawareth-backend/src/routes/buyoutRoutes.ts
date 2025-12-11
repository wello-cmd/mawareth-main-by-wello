
import express from 'express';
import { createApplication, getMyApplications, getApplicationById, updateStatus } from '../controllers/buyoutController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, createApplication);
router.get('/my', protect, getMyApplications);
router.get('/:id', protect, getApplicationById);
router.patch('/:id/status', protect, updateStatus);

export default router;
