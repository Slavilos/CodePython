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
    }
  }, {
    timestamps: true
  });
};

export default EventModel; 