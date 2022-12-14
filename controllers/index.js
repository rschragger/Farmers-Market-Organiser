const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const marketRoutes = require('./market-routes.js');
const stallholderRoutes = require('./stallholder-routes.js');
const eventsRoutes = require('./events-routes.js');
const eventbookingRoutes = require('./eventbooking-routes.js');

const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/market', marketRoutes);
router.use('/stallholder', stallholderRoutes);
router.use('/events', eventsRoutes);
router.use('/eventbooking', eventbookingRoutes);

router.use('/api', apiRoutes);

module.exports = router;
