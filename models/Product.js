
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0,64],
        },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len:[0,256],
      },
    },
    image: {
		type: DataTypes.STRING,
		allowNull: true,
		// validate: {
		// 	len:[0,32],
		// },
    },
	stallholder_id: {
        type: DataTypes.INTEGER,
		allowNull: false,
        references: {
			model: 'stallholder',
			key: 'id',
		},
    },
  },
  {
    hooks: {
      beforeCreate: function(product) {
        product.name = product.name.toLowerCase();
      }
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;