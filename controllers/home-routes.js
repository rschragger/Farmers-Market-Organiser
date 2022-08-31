const router = require('express').Router();
const { User, Stallholder, Location, Stall } = require('../models');
const { withAuth, isOrganiser, isStallholder } = require('../utils/auth')


router.get('/', async (req, res) => {
  try {
    // Retrieve the logged in user, if there is one
    const userData = await User.findOne({
      include: [{ model: Stallholder }, { model: Location }],
      where: {
        id: req.session.userId
      }
    })
    .catch(err => {
      console.log(err);
      return null;
    });
    
    // Just need to be careful when setting this to null and using it in the view
    const loggedInUser = userData?.get({ plain: true }) ?? null;
    
    // Test to check if connection from models to controllers to views all work
    const usersData = await User.findAll({
      include: [{ model: Stallholder }, { model: Location }]
    })
    .catch(err => console.log(err));

    const users = usersData.map((user) => user.get({ plain: true }));
    
    res.render('homepage', {
      users,
      loggedInUser,
      loggedIn: req.session.loggedIn,
      
    })
  }
  catch (err) {
    console.log(err);
  }
});

router.get('/login', (req, res) => {
  // Display the login page
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('login');
});

router.get('/signup', (req, res) => {
  // Display the signup page
  res.render('signup');
})

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


