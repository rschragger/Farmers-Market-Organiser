const router = require('express').Router();
const { User, Stallholder, Product, Booking, EventsBooking, Location, Stall, Events } = require('../models');//
const { Op } = require("sequelize");
const modelUtility = require('../utils/modelUtility.js');
const helpers = require('../utils/helpers');



router.get('/:event_id/:stall_id', async (req, res) => {

	try {
		const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);
		const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
		const eventsData = await modelUtility.getEventById(req.params.event_id)

		const stallData = await modelUtility.getStallById(req.params.stall_id)
		
		const eventBookingData = await modelUtility.getEventBookingByEventStall(req.params.event_id,req.params.stall_id)

		

		// const stallsWithBooking = modelUtility.getStallsWithBookingsAtMarket()

		res.render('eventbooking', {
			 eventBookingData,
			stallData,
			eventsData,
			loggedInUser,
			loggedIn: req.session.loggedIn,
			upcomingMarkets,
			eventBooking: true
		});
	}

	catch (err) {
		console.log(err);
	}
});




module.exports = router;


