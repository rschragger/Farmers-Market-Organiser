const {Location, Events, Product, Stallholder } = require('../models');
const { Op } = require("sequelize");

// Moved all these functions here in case we want to use them somewhere else

const getLoggedInUser = async (loggedIn) => {
	// Retrieve the logged in user, if there is one
    if (loggedIn) {
		const userData = await User.findOne({
			include: [{ model: Stallholder }, { model: Location }],
			where: {
			id: req.session.userId
			}
		})
		.catch(err => {
			console.log(err);
			return null;
		});
		
		return userData?.get({ plain: true }) ?? null;
	}
	
	return null;
}

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

const getAllProducts = async () => {
	const productsData = await Product.findAll({
		include: [{ model: Stallholder }],
	});
	
	const products = productsData.map(product => product.get({ plain: true }));
	
	return products;
}

const getSimilarProducts = async (product) => {
	// Find all products that include the word product
	const productsData = await Product.findAll({
		include: [{ model: Stallholder }],
		where: {
			name: {
				[Op.substring]: product
			}
		}
	});
	
	const products = productsData.map(product => product.get({ plain: true }));
	
	return products;
}

module.exports = {
	getLoggedInUser,
	getAllUpcomingMarkets,
	getAllProducts,
	getSimilarProducts
}