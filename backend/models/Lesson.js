import { DataTypes } from 'sequelize';

const LessonModel = (sequelize) => {
  const Lesson = sequelize.define('Lesson', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    BlockId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Blocks',
        key: 'id'
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'lecture'
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true
  });

  Lesson.associate = (models) => {
    Lesson.hasMany(models.PracticalAssignment, {
      foreignKey: 'LessonId',
      as: 'PracticalAssignments',
      onDelete: 'CASCADE'
    });

    models.PracticalAssignment.belongsTo(Lesson, {
      foreignKey: 'LessonId',
      as: 'Lesson'
    });
  };

  return Lesson;
};

export default LessonModel;