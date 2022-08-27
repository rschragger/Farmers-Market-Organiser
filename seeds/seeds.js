const sequelize = require('../config/connection');
const { User, Stallholder, Location } = require('../models');

const userSeedData = require('./userSeedData.json');
const stallholderSeedData = require('./stallholderSeedData.json');
const locationSeedData = require('./locationSeedData.json');


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
    const newUser = await User.create(
      {
        ...user,
        stallholder_id: stallholder[Math.floor(Math.random() * stallholder.length)].id,
        location_id: location[Math.floor(Math.random() * location.length)].id,
        individualHooks: true,
        returning: true,
      })
      .catch(err => console.log(err))
  };



  process.exit(0);
};

seedDatabase();