const router = require('express').Router();
const { User, Stallholder, Product, Booking, EventsBooking } = require('../models');//, Location, Stall, Events
const { Op } = require("sequelize");
const modelUtility = require('../utils/modelUtility.js');
// const helpers = require('../utils/helpers');

//router.get('/:id', async (req, res) => {
router.get('/', async (req, res) => {

  try {
    const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);

    // Do not allow logged out users from accessing this data
    if (!loggedInUser) {
      res.status(400).json({ message: "Unauthorised Access" });
      document.location.replace('/');
    } else {

      // FUTURE FEATURE - search location_id to truncate data to this location

      // Get all the stallholder data
      const dbStallholderData = await Stallholder.findAll({
        include: [{ model: User }, { model: Product }, { model: Booking }]
      })
      const stallholderList = dbStallholderData.map((stallholder) =>
        stallholder.get({ plain: true })
      );
      res.render('stallholders', {
        loggedInUser,
        loggedIn: req.session.loggedIn,
        stallholderList
      });
    }
  }
  catch (err) {
    console.log(err);
  }
});

//Get one stallholder's card
router.get('/:id', async (req, res) => {

  try {
    // const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);

    // Get thisstallholder's data
    const dbStallholderData = await Stallholder.findAll({
      where: { id: req.params.id },
      include: [{ model: User }, { model: Product }, { model: Booking }],
    })
    const stallholderCard = dbStallholderData.map((stallholder) =>
      stallholder.get({ plain: true })
    );
    res.render('stallholders', {
      loggedInUser,
      loggedIn: req.session.loggedIn,
      stallholderCard
    });
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = router;


