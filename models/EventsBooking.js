
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { Stall , Events, Booking } = require('./Stall');

class EventsBooking extends Model { }

EventsBooking.init(
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
    description:{
        type: DataTypes.VIRTUAL,
        get() {
              return `event_id: ${this.event_id} stall_id:${this.stall_id} booking_id: ${this.booking_id}`;
        }
     },
     cost:{
      type:DataTypes.DECIMAL,
      get(){
       return Stall.findByPk(this.stall_id).price
      }
     }
    
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'eventsbooking',
  }
);

module.exports = EventsBooking;