// models/Lecture.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Lecture = sequelize.define('Lecture', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Lecture;
};
