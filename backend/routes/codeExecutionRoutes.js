import express from 'express';
import { executeCode } from '../controllers/codeExecutionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Маршрут для выполнения кода
router.post('/run', executeCode); // Убираем authMiddleware для тестирования
router.post('/execute', executeCode); // Новый маршрут для фронта

export default router;
