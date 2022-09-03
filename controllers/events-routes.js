const router = require('express').Router();
const { User, Stallholder, Product, Booking, EventsBooking, Location, Stall, Events } = require('../models');//
const { Op } = require("sequelize");
const modelUtility = require('../utils/modelUtility.js');
const helpers = require('../utils/helpers');




router.get('/', async (req, res) => {

  try {
    const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);
    const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();

    const dbEventsData = await Events.findAll({
      include: [{ model: Location }, { model: EventsBooking }],
      order: [["timestamp_start", "ASC"]]
    })
    const eventsData = dbEventsData.map((obj) =>
      obj.get({ plain: true })
    );
    res.render('events', {
      eventsData,
      loggedInUser,
      loggedIn: req.session.loggedIn,
      upcomingMarkets,
      eventsList: true
    });
  }

  catch (err) {
    console.log(err);
  }
});



//Get one stallholder's card
router.get('/:id', async (req, res) => {
  try {

    const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();

    // Get this Event's data
    const dbEventsData = await Events.findByPk(req.params.id, {
      include: [{ model: Location }, { model: EventsBooking }],
    })
    const eventsData = dbEventsData.get({ plain: true })

    const dbStallData = await Stall.findAll(
      {
        where: { location_id: eventsData.location_id, },
        include: [{ model: Location }, { model: EventsBooking }],
      });

    const stallData = dbStallData.map((obj) =>
      obj.get({ plain: true }),
     // obj.isAvailable: eventsbooking ? "Booked":"Available",

    );


    const dbEventBookingData = await EventsBooking.findAll({
      where: {
        //events_id: eventsData.id,
       // stall_id: stallData.id
      }
    });
    const eventBookingData = dbEventBookingData.map((pd) =>
      pd.get({ plain: true })
    );


    res.render('events', {
      eventsData,
      stallData,
      eventBookingData,
      eventsCard: true,
      upcomingMarkets,
      //loggedInUser,
      loggedIn: req.session.loggedIn,
    });
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = router;


