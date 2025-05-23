import { DataTypes } from 'sequelize';

const UserProgressModel = (sequelize) => {
  return sequelize.define('UserProgress', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    blockId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
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
