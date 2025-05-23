import User from '../models/User.js';
import TestResult from '../models/TestResult.js';

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'createdAt'],
    });

    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    const results = await TestResult.findAll({
      where: { userId },
      attributes: ['block', 'score', 'percentage'],
    });

    return res.json({
      user,
      results,
    });
  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
