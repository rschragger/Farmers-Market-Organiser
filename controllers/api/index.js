const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const locationRoutes = require('./locationRoutes.js');
const stallholderRoutes = require('./stallholderRoutes.js');
const productRoutes = require('./productRoutes');

router.use('/users', userRoutes);
router.use('/locations', locationRoutes);
router.use('/stallholder', stallholderRoutes);
router.use('/product', productRoutes);

module.exports = router;
