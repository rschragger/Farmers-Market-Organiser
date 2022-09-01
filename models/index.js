const User = require('./User');
const Stallholder = require('./Stallholder');
const Location = require('./Location');
const Stall = require('./Stall');
const Product = require('./Product');
const Booking = require('./Booking');
const Events = require('./Events');
const EventsBooking = require('./EventsBooking');



// Belongs to and has many etc. initialisations
Stall.belongsTo(Location, {
  foreignKey: 'location_id',
});
Location.hasMany(Stall, {
  foreignKey: 'location_id',
});


User.belongsTo(Stallholder, {
  foreignKey: 'stallholder_id',
});
Stallholder.hasMany(User, {
  foreignKey: 'stallholder_id',
});

Booking.belongsTo(Stallholder, {
  foreignKey: 'stallholder_id',
});
Stallholder.hasMany(Booking, {
  foreignKey: 'stallholder_id',
});


User.belongsTo(Location, {
  foreignKey: 'location_id',
});
Location.hasMany(User, {
  foreignKey: 'location_id',
});


Events.belongsTo(Location, {
  foreignKey: 'location_id',
});
Location.hasMany(Events, {
  foreignKey: 'location_id',
});


Product.belongsTo(Stallholder, {
  foreignKey: 'stallholder_id',
});
Stallholder.hasMany(Product, {
  foreignKey: 'stallholder_id',
});

EventsBooking.belongsTo(Booking, {
  foreignKey: 'booking_id',
});
Booking.hasMany(EventsBooking, {
  foreignKey: 'booking_id',
});

/*
// Bookings, Events and Stalls are in a many to many relationship
Events.belongsToMany(Booking, { through: EventsBooking, })
Booking.belongsToMany(Events, { through: EventsBooking, })

//
Stall.belongsToMany(Booking, { through: EventsBooking, })
Booking.belongsToMany(Stall, { through: EventsBooking, })

Stall.belongsToMany(Events, { through: EventsBooking, })
Events.belongsToMany(Stall, { through: EventsBooking, })
*/
// --- END Bookings, Events and Stalls are in a many to many relationship -----


module.exports = { User, Stallholder, Location, Stall, Product, Events, Booking, EventsBooking };

// Note below config doesn't work as it can only module.exports once
// module.exports = { User };
// module.exports = { Stallholder };
// module.exports = { Location };
