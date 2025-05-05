import { DataTypes } from 'sequelize';

const BlockModel = (sequelize) => {
  return sequelize.define('Block', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
};

export default BlockModel; 