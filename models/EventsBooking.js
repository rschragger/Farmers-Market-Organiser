
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { Stall, Events, Booking } = require('../models');

const getCost = async (id) => {
  let stallData = await Stall.findByPk(id);
  return stallData.price
};

class EventsBooking extends Model { }

EventsBooking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    events_id: {
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
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'booking',
        key: 'id',
      },
    },
    // lease_start: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: false,
    // },
    // lease_end: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: false,
    //   validate: {
    //     isAfter: this.lease_start,
    //   }
    // },

    // https://stackoverflow.com/questions/61655553/auto-populated-field-in-a-sequelize-model
    description: {
      type: DataTypes.STRING,
      // get() {
      //       return `events_id: ${this.events_id} stall_id:${this.stall_id} booking_id: ${this.booking_id}`;
      // }
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      // get(){
      //  return Stall.findByPk(this.stall_id).price
      // }
    }
  },
  // {
  //   hooks: {
  //     beforeCreate: async (newEventBookingData) => {
  //       newEventBookingData.cost = await getCost(newEventBookingData.stall_id)
  //       return newEventBookingData;
  //     },
  //   },
  // },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'eventsbooking',
  }
);

module.exports = EventsBooking;