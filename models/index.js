const User = require('./User');
const Stallholder = require('./Stallholder');
const Location = require('./Location');
const Stall = require('./Stall');
const Product = require('./Product');
//const Booking = require('./Booking');
//const Event = require('./Event');


// Belongs to and has many etc. initialisations
Stall.belongsTo(Location, {
  foreignKey: 'location_id',
});
Location.hasMany(Stall,{
  foreignKey:'location_id',
});


// User belongsTo Stallholder
User.belongsTo(Stallholder, {
    foreignKey: 'stallholder_id',
  });
  // Stallholders have many Users
  Stallholder.hasMany(User,{
    foreignKey:'stallholder_id',
  });

  User.belongsTo(Location, {
    foreignKey: 'location_id',
  });
  Location.hasMany(User,{
    foreignKey:'location_id',
  });

  Product.belongsTo(Stallholder, {
    foreignKey: 'stallholder_id',
  });
  Stallholder.hasMany(Product,{
    foreignKey:'stallholder_id',
  });





module.exports = { User , Stallholder , Location ,Stall, Product};//, Event, Booking };

// Note below config doesn't work as it can only module.exports once
// module.exports = { User };
// module.exports = { Stallholder };
// module.exports = { Location };
