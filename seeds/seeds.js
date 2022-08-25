const sequelize = require('../config/connection');
const { User } = require('../models');

const userSeedData = require('./userSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData);


  process.exit(0);
};

seedDatabase();
