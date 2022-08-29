
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Booking extends Model { }

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
        model: 'events',
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
    timestamp_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    timestamp_end: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: this.timestamp_start,
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'booking',
  }
);

module.exports = Booking;