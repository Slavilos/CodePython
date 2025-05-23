import express from 'express';
import { createEvent, getUserEvents, getUserStats } from '../controllers/eventController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createEvent);
router.get('/user', authMiddleware, getUserEvents);
router.get('/stats', authMiddleware, getUserStats);

export default router; 