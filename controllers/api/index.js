const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const locationRoutes = require('./locationRoutes.js');
const stallholderRoutes = require('./stallholderRoutes.js');
const stallRoutes = require('./stallRoutes.js');
const eventRoutes = require('./eventRoutes.js');

router.use('/users', userRoutes);
router.use('/locations', locationRoutes);
router.use('/stallholder', stallholderRoutes);
router.use('/stalls', stallRoutes);
router.use('/events', eventRoutes);

module.exports = router;
