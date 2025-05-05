import UserProgress from '../models/UserProgress.js';

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    const all = await UserProgress.count({ where: { userId: user.id } });
    const correct = await UserProgress.count({ where: { userId: user.id, correct: true } });

    const percent = all ? (correct / all) * 100 : 0;
    let grade = 2;
    if (percent >= 85) grade = 5;
    else if (percent >= 75) grade = 4;
    else if (percent >= 50) grade = 3;

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      stats: {
        completed: all,
        correct,
        percent,
        grade,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении профиля' });
  }
};
