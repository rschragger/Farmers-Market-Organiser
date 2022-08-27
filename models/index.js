const User = require('./User');
const Stallholder = require('./Stallholder');
const Location = require('./Location');

// Belongs to and has many etc. initialisations
// User belongsTo Stallholder
User.belongsTo(Stallholder, {
    foreignKey: 'stallholder_id',
  });
  // Stallholders have many Users
  Stallholder.hasMany(User,{
    foreignKey:'stallholder_id',
  });

module.exports = { User , Stallholder , Location };

// Note below config doesn't work as it can only module.exports once
// module.exports = { User };
// module.exports = { Stallholder };
// module.exports = { Location };
