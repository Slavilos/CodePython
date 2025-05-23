import { User } from '../models/index.js';

const deleteAdmin = async () => {
  try {
    const admin = await User.findOne({ where: { username: 'admin' } });
    if (admin) {
      await admin.destroy();
      console.log('Пользователь admin удалён из базы данных.');
    } else {
      console.log('Пользователь admin не найден.');
    }
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при удалении admin:', error);
    process.exit(1);
  }
};

deleteAdmin(); 