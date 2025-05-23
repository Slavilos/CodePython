import express from 'express';
import { getUserProfile } from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Защищённый маршрут для получения профиля
router.get('/', authMiddleware, getUserProfile);

export default router;
