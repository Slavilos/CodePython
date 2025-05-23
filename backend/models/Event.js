import { DataTypes } from 'sequelize';

const EventModel = (sequelize) => {
  return sequelize.define('Event', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lessonId: {                   // ⬅️ Добавить вот это
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: true
  });
};

export default EventModel; 