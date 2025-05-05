import { DataTypes } from 'sequelize';

const LessonProgressModel = (sequelize) => {
  return sequelize.define('LessonProgress', {
    scorePercent: {
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

export default LessonProgressModel;
