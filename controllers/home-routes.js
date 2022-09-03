const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Stallholder, Location, Stall, Events } = require('../models');
const { withAuth, isOrganiser, isStallholder } = require('../utils/auth');
const modelUtility = require('../utils/modelUtility.js');

router.get('/', async (req, res) => {
  try {
    const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId, req.session.role_type);
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

router.get('/search/:searchTerm', async (req, res) => {
  const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);
  // Get all the upcoming markets
  const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
  // Get all the search results
  const searchResults = await modelUtility.searchAll(req.params.searchTerm, req.query);
  
	res.render('homepage', {
    loggedInUser,
    loggedIn: req.session.loggedIn,
    upcomingMarkets,
    searchResults,
    isSearching: true,
    searchedTerm: req.params.searchTerm
	});
});

router.get('/login', async (req, res) => {
  // Display the login page
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  // Get all the upcoming markets
  const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
  
  res.render('login', {
    upcomingMarkets
  });
});

router.get('/signup', async (req, res) => {
  // Get all the upcoming markets
  const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
  
  // Display the signup page
  res.render('signup', {
    upcomingMarkets
  });
})

//stalls
// Retrieve all the Stalls
router.get('/stalls',async(req, res) => {
  try {
    const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);
    // Get all the upcoming markets
    const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
    //stalls info
    const results = await sequelize.query(`SELECT
          *
      FROM
          stall,
          USER,
          location
      WHERE
          location.id = USER.location_id AND
          USER.id =`+req.session.userId +`
      ORDER BY
          stall.stall_name ASC`,{
      model: Stall,
      mapToModel: true
    });
     const stalls = results.map((stall) =>
       stall.get({ plain: true })
     );
   res.render('organiser', {
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
    res.render('organiser', {
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
      const stall = dbStallsData.get({ plain: true });
      res.render('organiser', {
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

router.get('/new', async (req, res) => {
  const loggedInUser = await modelUtility.getLoggedInUser(req.session.loggedIn, req.session.userId);
  // Get all the upcoming markets
  const upcomingMarkets = await modelUtility.getAllUpcomingMarkets();
  const listLocations = await sequelize.query(`SELECT
        location.market_name,
        location.id
        FROM
        location,
        USER
        WHERE
        location.id = USER.location_id AND USER.id =`+req.session.userId,{
        model: Location,
        mapToModel: true});
  //const listLocations = await Location.findAll();
  const locations = listLocations.map((location) =>
       location.get({ plain: true })
     );
  res.render('organiser',{
    locations,
    stallNew: true,
    loggedInUser,
    loggedIn: req.session.loggedIn,
    upcomingMarkets
  });
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


