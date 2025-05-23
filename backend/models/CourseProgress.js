import { DataTypes } from 'sequelize';

const CourseProgressModel = (sequelize) => {
  return sequelize.define('CourseProgress', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    completedLessons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    totalLessons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastAccessedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true
  });
};

export default CourseProgressModel;
