const router = require('express').Router();
const { User, Stallholder, Location, Stall, Events } = require('../models');
const { withAuth, isOrganiser, isStallholder } = require('../utils/auth');
const modelUtility = require('../utils/modelUtility.js');

router.get('/', async (req, res) => {
  try {
    const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);
    // Get all the upcoming markets
    const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
    
    res.render('homepage', {
      loggedInUser,
      loggedIn: req.session.loggedIn,
      upcomingMarkets,
      roleType: req.session.role_type
    });
  }
  catch (err) {
    console.log(err);
  }
});

router.get('/search/:product', async (req, res) => {
  const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);
  // Retrieve all products that are similar to this product
	const similarProducts = await modelUtility.getSimilarProducts(req.params.product);
  // Get all the upcoming markets
  const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
	
	res.render('homepage', {
    loggedInUser,
    loggedIn: req.session.loggedIn,
    upcomingMarkets,
    products: similarProducts,
    isSearching: true,
    searchedProduct: req.params.product
	});
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

//stalls
// Retrieve all the Stalls
router.get('/stalls',async(req, res) => {
  try {
    const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);
    // Get all the upcoming markets
    const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
    //stalls info
    const dbStallsData = await Stall.findAll({
        include:[
            {
                model: Location,
                attributes: ['market_name', 'address'],
            },
        ],
    });
    const stalls = dbStallsData.map((stall) =>
      stall.get({ plain: true })
    );

    res.render('stalls', {
        stalls,
        stallsList: true,
        loggedInUser,
        loggedIn: req.session.loggedIn,
        upcomingMarkets
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Retrieve a stall
router.get('/stalls/:id', async (req, res) => {
  try {
    const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);
    // Get all the upcoming markets
    const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
    const dbStallsData = await Stall.findByPk(req.params.id,{
        include:[
            {
                model: Location,
                attributes: ['id','market_name', 'address'],
            },
        ],
    });

    // res.status(200).json({
    //   data: stall
    // });
    const stall = dbStallsData.get({ plain: true });
    res.render('stalls', {
      stall,
      stallView: true,
      loggedInUser,
      loggedIn: req.session.loggedIn,
      upcomingMarkets
  });

  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Get the data of the stall to be edited
router.get('/stalls/edit/:id', async (req, res) => {
  try {
      const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);
      // Get all the upcoming markets
      const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
      const dbStallsData = await Stall.findByPk(req.params.id,{
          include:[
              {
                  model: Location,
                  attributes: ['id','market_name', 'address'],
              },
          ],
      });

      // res.status(200).json({
      //   data: stall
      // });
      const stall = dbStallsData.get({ plain: true });
      res.render('stalls', {
        stall,
        stallEdit: true,
        loggedInUser,
        loggedIn: req.session.loggedIn,
        upcomingMarkets
      });
  }
  catch (err) {
      res.status(500).json({
      message: err
      });
  }
});

// Update the Stall
router.put('/stalls/edit/:id', async (req, res) => {
  try {
    const updatedStall = await Stall.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true,
    });

    if (!updatedStall[0]) {
      // No Stall found
      res.status(404).json({
        message: "No Stall with this id found!"
      });
      return;
    }
    // Succesful update
    res.status(200).json({
      data: updatedStall,
      message: "Stall is updated!"
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});
//delete stall
router.post('/delete/:id', async (req, res) => {
  try {
    const stallData = await Stall.destroy({
      where: {
        id: req.params.id,
        //user_id: req.session.user_id,
      },
    });
    if (!stallData) {
      res.status(404).json({ message: 'No stall found with this id!' });
      return;
    }
    res.status(200).json(stallData);
  } catch (err) {
    res.status(500).json(err);
  }
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


