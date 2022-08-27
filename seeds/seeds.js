const sequelize = require('../config/connection');
const { User, Stallholder } = require('../models');

const userSeedData = require('./userSeedData.json');
const stallholderSeedData = require('./stallholderSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userSeedData,
    {
      individualHooks: true,
      returning: true,
    })
    .catch(err => console.log(err));

  const stallholder = await Stallholder.bulkCreate(stallholderSeedData, {
    individualHooks: true,
    returning: true,
  })
  .catch(err => console.log(err));

  process.exit(0);
};

seedDatabase();