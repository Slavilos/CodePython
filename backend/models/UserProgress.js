import { DataTypes } from 'sequelize';

const UserProgressModel = (sequelize) => {
  return sequelize.define('UserProgress', {
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    totalQuestions: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    correctAnswers: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: true
  });
};

export default UserProgressModel;
