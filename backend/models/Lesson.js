import { DataTypes } from 'sequelize';

const LessonModel = (sequelize) => {
  return sequelize.define('Lesson', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
};

export default LessonModel; 