const sequelize = require('../config/connection');
const { User, Stallholder, Location } = require('../models');

const userSeedData = require('./userSeedData.json');
const stallholderSeedData = require('./stallholderSeedData.json');
const locationSeedData = require('./locationSeedData.json');

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



  process.exit(0);
};

seedDatabase();