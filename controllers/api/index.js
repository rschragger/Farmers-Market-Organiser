const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const locationRoutes = require('./locationRoutes.js');
const stallholderRoutes = require('./stallholderRoutes.js');
const stallRoutes = require('./stallRoutes.js');
const productRoutes = require('./productRoutes');
const eventsRoutes = require('./eventsRoutes');


router.use('/users', userRoutes);
router.use('/locations', locationRoutes);
router.use('/stallholder', stallholderRoutes);
router.use('/stalls', stallRoutes);
router.use('/product', productRoutes);
router.use('/events', eventsRoutes);


module.exports = router;
