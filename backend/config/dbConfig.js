import { Sequelize } from 'sequelize';
import { dbConfig } from './database.js';

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: '+03:00'
    },
    timezone: '+03:00',
    define: {
      timestamps: true,
      createdAt: true,
      updatedAt: true
    }
  }
);

export default sequelize;
