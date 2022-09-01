const router = require('express').Router();
const {Location, Events } = require('../models');
const { Op } = require("sequelize");


router.get('/:id', async (req, res) => {
  try {
	// Get the market data
	const marketData = await Location.findByPk(req.params.id, {
		include: [{ model: Events }]
	});
	
	const market = marketData.get({ plain: true });
	
    res.render('market', {
		market
	});
  }
  catch (err) {
    console.log(err);
  }
});

module.exports = router;


