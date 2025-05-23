import { DataTypes } from 'sequelize';

const PracticalAssignmentModel = (sequelize) => {
  return sequelize.define('PracticalAssignment', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    initialCode: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    testCases: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },
    requirements: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
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
    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'medium',
      validate: {
        isIn: [['easy', 'medium', 'hard']]
      }
    }
  }, {
    timestamps: true
  });
};

export default PracticalAssignmentModel; 