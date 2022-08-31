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


