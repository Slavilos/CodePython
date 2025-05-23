import { User } from '../models/index.js';

const fixAdminRole = async () => {
  try {
    const admin = await User.findOne({ where: { username: 'admin' } });
    if (admin) {
      console.log('Текущий admin:', admin.toJSON());
      if (admin.role !== 'admin') {
        admin.role = 'admin';
        await admin.save();
        console.log('Роль admin обновлена на "admin".');
      } else {
        console.log('Роль admin уже "admin".');
      }
    } else {
      console.log('Пользователь admin не найден.');
    }
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при обновлении роли admin:', error);
    process.exit(1);
  }
};

fixAdminRole(); 