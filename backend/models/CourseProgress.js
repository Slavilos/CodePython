// models/CourseProgress.js
import { DataTypes } from 'sequelize';

const CourseProgressModel = (sequelize) => {
  return sequelize.define('CourseProgress', {
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: true
  });
};

export default CourseProgressModel;
