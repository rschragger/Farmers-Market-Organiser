const sequelize = require('../config/connection');
const { User, Stallholder, Location, Stall, Product } = require('../models'); //Event, Booking

const userSeedData = require('./userSeedData.json');
const stallholderSeedData = require('./stallholderSeedData.json');
const locationSeedData = require('./locationSeedData.json');
const stallSeedData = require('./stallSeedData.json');
const productSeedData = require('./productSeedData.json');
//const bookingSeedData = require('./bookingSeedData.json');
//const eventSeedData = require('./eventSeedData.json');

const randomId = (obj) => {
  return obj[Math.floor(Math.random() * obj.length)].id
}

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const stallholder = await Stallholder.bulkCreate(stallholderSeedData, {
    individualHooks: true,
    returning: true,
  })
    .catch(err => console.log(err));

  const location = await Location.bulkCreate(locationSeedData, {
    individualHooks: true,
    returning: true,
  })
    .catch(err => console.log(err));

  for (const user of userSeedData) {
    let stallOrOrg = Math.floor(Math.random() * 6); //can be either a stallholder or an organiser seeding
    let shId = (stallOrOrg >= 1) ? randomId(stallholder) : null; // We want 5 times as many stallholders as organisers
    let orgId = (stallOrOrg === 0) ? randomId(location) : null;
    const newUser = await User.create(
      {
        ...user,
        stallholder_id: shId,
        location_id: orgId,
        role_type: !orgId ? 'stallholder' : 'organiser',
        individualHooks: true,
        returning: true,
      })
      .catch(err => console.log(err))
  };

  for (const stall of stallSeedData) {
    const newStall = await Stall.create(
      {
        ...stall,
        //location_id: randomId(location), //We are no longer randomising this data and will be fed by seeds
        individualHooks: true,
        returning: true,
      })
      .catch(err => console.log(err))
  };

  for (const product of productSeedData) {
    const newProduct = await Product.create(
      {
        ...product,
        stallholder_id: randomId(stallholder),
        individualHooks: true,
        returning: true,
      })
      .catch(err => console.log(err))
  };

  process.exit(0);
};

seedDatabase();