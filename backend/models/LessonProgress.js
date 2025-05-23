import { DataTypes } from 'sequelize';

const LessonProgressModel = (sequelize) => {
  return sequelize.define('LessonProgress', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // обязательно, так как onDelete: SET NULL
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    blockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    answers: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    totalQuestions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    correctAnswers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastAccessedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true,
    indexes: [{ fields: ['userId', 'lessonId'], unique: true }]
  });
};

export default LessonProgressModel;
