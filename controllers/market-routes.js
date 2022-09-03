const router = require('express').Router();
const {Location, Events } = require('../models');
const { Op } = require("sequelize");
const modelUtility = require('../utils/modelUtility.js');

router.get('/:id', async (req, res) => {
  try {
	const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);
    // Get all the upcoming markets
    const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
	// Get the market data
	const market = await modelUtility.getMarketById(req.params.id);
	
    res.render('market', {
		loggedInUser,
      	loggedIn: req.session.loggedIn,
      	upcomingMarkets,
		market
	});
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = router;


