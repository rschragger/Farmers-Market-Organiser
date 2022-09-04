const { Location, Events, Product, Stallholder, Stall, User, EventsBooking, Booking } = require('../models');
const { Op } = require("sequelize");
const moment = require('moment');

// Moved all these functions here to allow modularity and reusability

const getLoggedInUser = async (loggedIn, userId) => {
	// Retrieve the logged in user, if there is one
	if (loggedIn) {
		const userData = await User.findOne({
			include: [{ model: Stallholder }, { model: Location }],
			where: {
				id: userId
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

const getAllMarkets = async () => {
	// Returns all the markets
	try {
		const marketsData = await Location.findAll({
			include: [{ model: Stall }, { model: Events }, { model: User }]
		});

		const markets = marketsData.map(market => market.get({ plain: true }));

		return markets;
	}
	catch (err) {
		console.log(err);
		return null;
	};
};

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
	catch (err) {
		console.log(err);
		return null;
	}
}

const getAllProducts = async () => {
	// Returns all the products and who the stallholder is
	const productsData = await Product.findAll({
		include: [{ model: Stallholder }],
	})
		.catch(err => {
			console.log(err);
			return null;
		});

	const products = productsData.map(product => product.get({ plain: true }));

	return products;
}

const searchAll = async (searchTerm, filters) => {
	// Called search all but currently only supports searching products, stallholders and markets
	let searchResults = [];

	try {
		if (Object.keys(filters).length !== 0) {
			if ("markets" in filters) {
				let marketsData = await getSimilarMarketsSearch(searchTerm);

				searchResults = searchResults.concat(marketsData.map(market => ["market", market]));
			}

			if ("products" in filters) {
				let productsData = await getSimilarProductsSearch(searchTerm);

				searchResults = searchResults.concat(productsData.map(product => ["product", product]));
			}

			if ("stallholders" in filters) {
				let stallholdersData = await getSimilarStallholdersSearch(searchTerm);

				searchResults = searchResults.concat(stallholdersData.map(stallholder => ["stallholder", stallholder]));
			}
		}
		else {
			// No filters, so search for all
			let marketsData = await getSimilarMarketsSearch(searchTerm);
			let productsData = await getSimilarProductsSearch(searchTerm);
			let stallholdersData = await getSimilarStallholdersSearch(searchTerm);

			searchResults = searchResults.concat(marketsData.map(market => ["market", market]));
			searchResults = searchResults.concat(productsData.map(product => ["product", product]));
			searchResults = searchResults.concat(stallholdersData.map(stallholder => ["stallholder", stallholder]));
		}
	}
	catch (err) {
		console.log(err);
	}

	return searchResults;
};

const getSimilarMarketsSearch = async (searchTerm) => {
	// Find all products that include the word 'product'
	if (searchTerm === "all") searchTerm = "";
	
	const marketData = await Location.findAll({
		include: [{ model: Events }, { model: Stall }],
		where: {
			market_name: {
				[Op.substring]: searchTerm
			}
		}
	})
		.catch(err => {
			console.log(err);
			return null;
		});

	const markets = marketData.map(market => market.get({ plain: true }));

	return markets;
}

const getSimilarStallholdersSearch = async (searchTerm) => {
	// Find all products that include the word 'product'
	if (searchTerm === "all") searchTerm = "";
	
	const stallholderData = await Stallholder.findAll({
		include: [{ model: Product }, { model: User }],
		where: {
			company_name: {
				[Op.substring]: searchTerm
			}
		}
	})
		.catch(err => {
			console.log(err);
			return null;
		});

	const stallholders = stallholderData.map(stallholder => stallholder.get({ plain: true }));

	return stallholders;
}

const getSimilarProductsSearch = async (searchTerm) => {
	// Find all products that include the word 'product'
	if (searchTerm === "all") searchTerm = "";
	
	const productsData = await Product.findAll({
		include: [{ model: Stallholder }],
		where: {
			name: {
				[Op.substring]: searchTerm
			}
		}
	})
		.catch(err => {
			console.log(err);
			return null;
		});

	const products = productsData.map(product => product.get({ plain: true }));

	return products;
}

const getMarketById = async (id) => {
	// Returns a market (Location) by the id
	const marketData = await Location.findByPk(id, {
		include: [{ model: Events }, { model: Stall }, { model: User }],
	})
		.catch(err => {
			console.log(err);
			return null;
		});

	return marketData.get({ plain: true });
}

const getStallsWithBookingsAtMarket = async (marketId, eventDate) => {
	// Retrieve all stalls with all the booking and market information
	const bookedStallsData = await Stall.findAll({
		include: [
		{
			model: EventsBooking,
			include:
			{
				model: Booking,
				include:
				{
					model: Stallholder,
					include:
					{
						model: Product
					}
				}
			}
		},
		{
			model: Location,
			include:
			{
				model: Events,
			},
		}],
		where: {
			location_id: marketId
		}
	})
	.catch(err => {
		console.log(err);
		return null;
	});
	
	let bookedStalls = bookedStallsData?.map(bookedStall => bookedStall.get({ plain: true })) ?? null;
	
	// Filter out stalls that don't have a booking
	bookedStalls = bookedStalls.filter(bookedStall => {
		const eventBookings = bookedStall.eventsbookings;
		let isBooked = false;
		
		// go through all the event bookings to compare dates. If it matches the eventDate then it is booked on that day
		for (let i = 0; i < eventBookings.length; i++) {
			const d1 = moment(eventBookings[i].lease_start);
			const d2 = moment(eventDate);
			
			if (d1.isSame(d2, "day") && d1.isSame(d2, "month") && d1.isSame(d2, "year")) {
				isBooked = true;
				
				// Can break out of loop since it is booked on the day
				break;
			}
		}
		
		return isBooked;
	});
	
	return bookedStalls;
};

module.exports = {
	getLoggedInUser,
	getAllUpcomingMarkets,
	getAllProducts,
	getSimilarMarketsSearch,
	getSimilarStallholdersSearch,
	getSimilarProductsSearch,
	getMarketById,
	getAllMarkets,
	searchAll,
	getStallsWithBookingsAtMarket
}