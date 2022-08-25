const User = require('./User');
const Stallholder = require('./Stallholder');
const Location = require('./Location');

// Belongs to and has many etc. initialisations

module.exports = { User , Stallholder , Location };

// Note below config doesn't work as it can only module.exports once
// module.exports = { User };
// module.exports = { Stallholder };
// module.exports = { Location };
