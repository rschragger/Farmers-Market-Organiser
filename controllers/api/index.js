const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
//const marketRoutes = require('./marketRoutes.js');
const stallholderRoutes = require('./stallholderRoutes.js');

router.use('/users', userRoutes);
//router.use('/markets', marketRoutes);
router.use('/stallholder', stallholderRoutes);

module.exports = router;
