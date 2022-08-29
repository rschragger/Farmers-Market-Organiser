const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Events extends Model { }

const openingString = async (date1) => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return `${dayNames[new Date(date1).getDay()]} Market`
}

/* const openingString = (date1,date2)=>{
   const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   return `${dayNames[date1.getDay()]} ${date1.getHours()}:${date1.getMinutes().toString().padStart(2,'0')} - ${dayNames[date2.getDay()]} ${date2.getHours()}:${date2.getMinutes().toString().padStart(2,'0')}}`
   }*/

Events.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'location',
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
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
      //defaultValue:  openingString(this.timestamp_start), //,this.timestamp_end),
    },


  },
  {
    hooks: {
      beforeCreate: async (newEventsData) => {
        newEventsData.event_name = !newEventsData.event_name ? await openingString(newEventsData.timestamp_start) : newEventsData.event_name;
        return newEventsData;
      },
      beforeUpdate: async (updatedEventsData) => {
        updatedEventsData.event_name = !updatedEventsData.event_name ? await openingString(updatedEventsData.timestamp_start) : updatedEventsData.event_name;
        return updatedEventsData;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'events',
  }
);

module.exports = Events;
