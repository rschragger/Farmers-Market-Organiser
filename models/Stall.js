
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stall extends Model {}

Stall.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    stall_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,32],
        },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len:[0,64],
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          isNumeric:true,
      },
    },
    location_id: {
        type: DataTypes.INTEGER,
        references: {
			model: 'location',
			key: 'id',
		},
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'location',
  }
);

module.exports = Location;