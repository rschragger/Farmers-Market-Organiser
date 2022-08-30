const router = require('express').Router();
const { User, Stallholder, Location } = require('../models');
const { withAuth } = require('../utils/auth')
//const { isOrganiser, isStallholder } = require('../utils/helpers')


router.get('/', async (req, res) => {
  // Test to check if connection from models to controllers to views all work
  const userData = await User.findAll({
    include: [{ model: Stallholder }, { model: Location }]
  })
    .catch(err => console.log(err));


  const users = userData.map((user) => user.get({ plain: true }));
  res.render('homepage', {
    users
  })

});

//Trying to use a withAuth, but need to login from the webPage as insomnia creates a different session
//   router.get('/',withAuthStallholder, async (req, res) => {
//     // Test to check if connection from models to controllers to views all work
//     const userData = await User.findAll({
//       include: [{ model: Stallholder }, { model: Location }]
//     })
//       .catch(err => console.log(err));

//     const users = userData.map((user) => user.get({ plain: true }));

//   res.render('homepage', {
//     users
//   });
// });

module.exports = router;


