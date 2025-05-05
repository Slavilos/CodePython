import { DataTypes } from 'sequelize';

const CourseModel = (sequelize) => {
  return sequelize.define('Course', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });
};

export default CourseModel;
