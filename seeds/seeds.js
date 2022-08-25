const sequelize = require('../config/connection');
const { User, Stallholder } = require('../models');

const userSeedData = require('./userSeedData.json');
const stallholderSeedData = require('./stallholderSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const user = await User.bulkCreate(userSeedData);

  const stallholder = await Stallholder.bulkCreate(stallholderSeedData);

  process.exit(0);
};

seedDatabase();
