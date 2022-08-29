
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Booking extends Model {}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
        type: DataTypes.INTEGER,
		allowNull: false,
        references: {
			model: 'event',
			key: 'id',
		},
    },
    stall_id: {
        type: DataTypes.INTEGER,
		allowNull: false,
        references: {
			model: 'stall',
			key: 'id',
		},
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
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'booking',
  }
);

module.exports = Booking;