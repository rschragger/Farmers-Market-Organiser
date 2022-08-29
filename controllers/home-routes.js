const router = require('express').Router();
const { User, Stallholder, Location } = require('../models');
const { withAuthOrganiser, withAuthStallholder } = require('../utils/auth')


// router.get('/', async (req, res) => {
//   // Test to check if connection from models to controllers to views all work
//   const userData = await User.findAll({
//     include: [{ model: Stallholder }, { model: Location }]
//   })
//     .catch(err => console.log(err));

//   const users = userData.map((user) => user.get({ plain: true }));

  router.get('/',withAuthStallholder, async (req, res) => {
    // Test to check if connection from models to controllers to views all work
    const userData = await User.findAll({
      include: [{ model: Stallholder }, { model: Location }]
    })
      .catch(err => console.log(err));
  
    const users = userData.map((user) => user.get({ plain: true }));

  res.render('homepage', {
    users
  });
});

module.exports = router;
