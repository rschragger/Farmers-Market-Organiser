
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stallholder extends Model {}

Stallholder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,32],
        },
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [0,200],
        },
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          isNumeric:true,
          len: [0,15],
      },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        len: [0,200],
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'stallholder',
  }
);

module.exports = Stallholder;



/** */