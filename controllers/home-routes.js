const router = require('express').Router();
const { User, Stallholder, Location, Stall, Events } = require('../models');
const { withAuth, isOrganiser, isStallholder } = require('../utils/auth');
const { Op } = require("sequelize");


router.get('/', async (req, res) => {
  try {
    let userData = null;
    
    // Retrieve the logged in user, if there is one
    if (req.session.loggedIn) {
      userData = await User.findOne({
        include: [{ model: Stallholder }, { model: Location }],
        where: {
          id: req.session.userId
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
    
    // Just need to be careful when setting this to null and using it in the view
    const loggedInUser = userData?.get({ plain: true }) ?? null;
    
    // Get all the upcoming markets
    // Using this https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
    // Search for operators
    const upcomingMarketsData = await Events.findAll({
      include: [{ model: Location }],
      where: {
        timestamp_start: {
          [Op.gte]: new Date()
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
    
    let upcomingMarkets = upcomingMarketsData?.map(upcomingMarket => upcomingMarket.get({ plain: true })) ?? null;
    
    // Sort the upcoming markets by their date and only retrieve the first 5
    upcomingMarkets = upcomingMarkets.sort((a, b) => {
      return new Date(a.timestamp_start) - new Date(b.timestamp_start);
    }).slice(0, 5);
    
    res.render('homepage', {
      loggedInUser,
      loggedIn: req.session.loggedIn,
      upcomingMarkets
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

//stalls
// Retrieve all the Stalls
router.get('/stalls',async(req, res) => {
  try {
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
      title: 'Stalls Page',
      layout: 'sidebar'
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
    res.render('stall-view', {
      stall,
      title: 'Edit stall Page',
      layout: 'sidebar',
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
      res.render('stall-edit', {
      stall,
      title: 'Edit Stall Page',
      layout: 'sidebar',
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


