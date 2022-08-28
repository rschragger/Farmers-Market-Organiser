const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const locationRoutes = require('./locationRoutes.js');
const stallholderRoutes = require('./stallholderRoutes.js');

router.use('/users', userRoutes);
router.use('/locations', locationRoutes);
router.use('/stallholder', stallholderRoutes);

module.exports = router;
