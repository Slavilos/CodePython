export const saveScore = async (req, res) => {
    const { blockId, score } = req.body;
    try {
      console.log(`Оценка за блок ${blockId}: ${score}`);
      // Тут можно подключить модель, чтобы сохранить оценку в базе
      res.status(200).json({ message: 'Оценка сохранена' });
    } catch (error) {
      console.error('Ошибка при сохранении оценки:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  };
  