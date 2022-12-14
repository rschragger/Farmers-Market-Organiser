const router = require('express').Router();
const {Location, Events } = require('../models');
const { Op } = require("sequelize");
const modelUtility = require('../utils/modelUtility.js');

router.get('/:id', async (req, res) => {
  try {
	const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);
    // Get all the upcoming markets
    const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
	  const eventDate = req.query["currDate"];
	// Get the market data
	const market = await modelUtility.getMarketById(req.params.id, eventDate);
	let bookedStalls = await modelUtility.getStallsWithBookingsAtMarket(req.params.id, eventDate);
	
	// Filter any duplicate eventBookings
	bookedStalls.forEach(bookedStall => {
		let eventBookings = [];
		let seenBookingIds = {};
		
		bookedStall.eventsbookings.forEach(eventBooking => {
			const bookingId = eventBooking.booking.id;
			
			if (!(bookingId in seenBookingIds)) {
				seenBookingIds[bookingId] = eventBooking.booking;
				eventBookings.push(eventBooking);
			}
		});
		
		bookedStall.eventsbookings = eventBookings.sort((a, b) => {
			return new Date(a.booking.lease_start) - new Date(b.booking.lease_start);
		});
	});
	
	let hasBookedStalls = bookedStalls.length !== 0;
	
    res.render('market', {
		loggedInUser,
      	loggedIn: req.session.loggedIn,
      	upcomingMarkets,
		market,
		currentDate: eventDate,
		bookedStalls,
		hasBookedStalls
	});
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = router;


