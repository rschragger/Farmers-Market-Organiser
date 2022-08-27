const sequelize = require('../config/connection');
const { User, Stallholder, Location , Stall, Product} = require('../models');

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
    let stallOrOrg = Math.floor(Math.random() * 2); //can be either a stallholder or an organiser seeding
    let shId = (stallOrOrg === 0) ? null : randomId(stallholder);
    let orgId = (stallOrOrg === 1) ? null : randomId(location);
    const newUser = await User.create(
      {
        ...user,
        stallholder_id: shId,
        location_id: orgId,
        individualHooks: true,
        returning: true,
      })
      .catch(err => console.log(err))
  };

  for (const stall of stallSeedData) {
    const newStall = await Stall.create(
      {
        ...stall,
        location_id: randomId(location),
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