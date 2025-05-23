import { DataTypes } from 'sequelize';

const QuestionModel = (sequelize) => {
  return sequelize.define('Question', {
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'choice',
      validate: {
        isIn: [['choice', 'text', 'code']]
      }
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    LessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Lessons',
        key: 'id'
      }
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    explanation: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true
  });
};

export default QuestionModel; 