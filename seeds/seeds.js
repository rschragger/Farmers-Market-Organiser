const sequelize = require('../config/connection');
const { User, Stallholder, Location, Stall, Product, Events, Booking, EventsBooking } = require('../models');

const userSeedData = require('./userSeedData.json');
const stallholderSeedData = require('./stallholderSeedData.json');
const locationSeedData = require('./locationSeedData.json');
const stallSeedData = require('./stallSeedData.json');
const productSeedData = require('./productSeedData.json');
const bookingSeedData = require('./bookingSeedData.json');
const eventsSeedData = require('./eventsSeedData.json');
const eventsbookingSeedData = require('./eventsbookingSeedData.json');

const randomId = (obj) => {
  return !obj.id ? obj[Math.floor(Math.random() * obj.length)].id : obj.id;
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

  const events = await Events.bulkCreate(eventsSeedData, {
    individualHooks: true,
    returning: true,
  })
    .catch(err => console.log(err));

  const booking = await Booking.bulkCreate(bookingSeedData, {
    individualHooks: true,
    returning: true,
  })
    .catch(err => console.log(err));

  // One by one seeding with functions
  for (const user of userSeedData) {
    let shId
    let orgId
    if (user.stallholder_id || user.location_id) {
      shId = user.stallholder_id;
      orgId = user.location_id;
    } else {

      let stallOrOrg = Math.floor(Math.random() * 6); //can be either a stallholder or an organiser seeding
      shId = (stallOrOrg >= 1) ? randomId(stallholder) : null; // We want 5 times as many stallholders as organisers
      orgId = (stallOrOrg === 0) ? randomId(location) : null;
    }
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
        stallholder_id: !product.stallholder_id? randomId(stallholder):product.stallholder_id,
        individualHooks: true,
        returning: true,
      })
      .catch(err => console.log(err))
  };

  // -- Many to Many
  // const eventsbooking = await EventsBooking.bulkCreate(eventsbookingSeedData, {
  //   individualHooks: true,
  //   returning: true,
  // })
  //   .catch(err => console.log(err));

  for (const eventsbooking of eventsbookingSeedData) {
    let stallData = await Stall.findByPk(eventsbooking.stall_id);
    let eventData = await Events.findByPk(eventsbooking.events_id);
    let bookingData = await Booking.findByPk(eventsbooking.booking_id);
    let stallholderData = await Stallholder.findByPk(bookingData.stallholder_id)
    let locationData = await Location.findByPk(eventData.location_id)
    const newEventsBooking = await EventsBooking.create(
      {
        ...eventsbooking,
        cost: stallData.price,
        description: `${stallData.stall_name} at ${eventData.event_name}, ${locationData.market_name} booked by ${stallholderData.company_name} for ${bookingData.lease_start}`,
        individualHooks: true,
        returning: true,
      })
      .catch(err => console.log(err))
  };

  process.exit(0);
};


seedDatabase();