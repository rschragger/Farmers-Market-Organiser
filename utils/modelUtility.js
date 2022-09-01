const {Location, Events } = require('../models');
const { Op } = require("sequelize");

const getAllUpcomingMarkets = async () => {
	// Get all the upcoming markets
    // Using this https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
    // Search for operators
    try {
		const upcomingMarketsData = await Events.findAll({
			include: [{ model: Location }],
			where: {
			  timestamp_start: {
				[Op.gte]: new Date()
			  }
			}
		  })
		  .catch(err => {
			console.log(err);
		  });
		  
		  let upcomingMarkets = upcomingMarketsData?.map(upcomingMarket => upcomingMarket.get({ plain: true })) ?? null;
		  
		  // Sort the upcoming markets by their date and only retrieve the first 5
		  upcomingMarkets = upcomingMarkets.sort((a, b) => {
			return new Date(a.timestamp_start) - new Date(b.timestamp_start);
		  }).slice(0, 5);
		  
		  return upcomingMarkets;
	}
	catch(err) {
		console.log(err);
		return null;
	}
}

module.exports = {
	getAllUpcomingMarkets
}