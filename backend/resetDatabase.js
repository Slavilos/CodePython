import { Sequelize } from 'sequelize';
import { dbConfig } from './config/database.js';

const resetDatabase = async () => {
  try {
    // Создаем временное подключение
    const tempSequelize = new Sequelize('mysql', 'root', '', {
      host: 'localhost',
      dialect: 'mysql'
    });

    // Удаляем базу данных если она существует
    await tempSequelize.query(`DROP DATABASE IF EXISTS ${dbConfig.database};`);
    console.log('✅ Старая база данных удалена');

    // Создаем новую базу данных
    await tempSequelize.query(`CREATE DATABASE ${dbConfig.database};`);
    console.log('✅ Новая база данных создана');

    await tempSequelize.close();
    
    console.log('✅ База данных успешно пересоздана');
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка при пересоздании базы данных:', error);
    process.exit(1);
  }
};

resetDatabase(); 