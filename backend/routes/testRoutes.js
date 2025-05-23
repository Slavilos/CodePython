import express from 'express';
import { Lesson, Question } from '../models/index.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Получение тестов для урока
router.get('/lesson/:lessonId', authMiddleware, async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.lessonId, {
      include: [Question]
    });
    
    if (!lesson) {
      return res.status(404).json({ error: 'Урок не найден' });
    }

    res.json(lesson.Questions);
  } catch (error) {
    console.error('Ошибка при получении тестов:', error);
    res.status(500).json({ error: 'Ошибка при получении тестов' });
  }
});

// Проверка ответов на тесты
router.post('/check', authMiddleware, async (req, res) => {
  try {
    const { lessonId, answers } = req.body;
    
    const questions = await Question.findAll({
      where: { LessonId: lessonId },
      order: [['order', 'ASC']]
    });

    let correctAnswers = 0;
    const results = questions.map(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correctAnswers++;
      
      return {
        questionId: question.id,
        isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      };
    });

    // Вычисляем процент правильных ответов
    const percentage = (correctAnswers / questions.length) * 100;
    
    // Определяем оценку
    let grade = 2;
    if (percentage >= 85) grade = 5;
    else if (percentage >= 75) grade = 4;
    else if (percentage >= 60) grade = 3;

    res.json({
      score: correctAnswers,
      totalQuestions: questions.length,
      percentage,
      grade,
      results
    });
  } catch (error) {
    console.error('Ошибка при проверке тестов:', error);
    res.status(500).json({ error: 'Ошибка при проверке тестов' });
  }
});

export default router;
