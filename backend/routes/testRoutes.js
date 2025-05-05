import express from 'express';
import { Lecture } from '../models/index.js'; // ← исправили

const router = express.Router();

router.get('/latest-docs', async (req, res) => {
  try {
    const docs = await Lecture.findAll({
      order: [['createdAt', 'DESC']],
      limit: 3,
    });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка загрузки лекций' });
  }
});

export default router;
