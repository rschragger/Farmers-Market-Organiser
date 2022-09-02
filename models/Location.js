
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    market_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,32],
        },
    },
    address: {
      type: DataTypes.STRING,
      //allowNull: false,
      validate: {
        len:[0,30],
      },
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isUrl:true,
      },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        len: [0,32],
    },
    logo_filename: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'location',
  }
);

module.exports = Location;