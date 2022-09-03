const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Location, Events, Stall } = require('../../models');

// Retrieve all the Locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.findAll({
      include: [{ model: Events },{model:Stall}],
    })
    .catch(err => {
      console.log(err);
    });
    
    res.status(200).json({
      data: locations
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Retrieve one location
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id,{
      include: [{ model: Events },{model:Stall}],
    });

    res.status(200).json({
      data: location
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Create a new location
router.post('/', async (req, res) => {
  try {
    const newLocation = await Location.create(req.body);
    const updateUser = sequelize.query(`Update user
        set location_id =`+newLocation.id +`
        WHERE
          user.id = `+req.session.userId);
    res.status(200).json({
      data: newLocation
    });
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Update the Location data
router.put('/:id', async (req, res) => {
  try {
    const updatedLocation = await Location.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true,
    });

    if (!updatedLocation[0]) {
      // No Location exists with this id
      res.status(404).json({
        message: "No Location with this id exists!"
      });

      return;
    }

    // the Location exists and has been updated
    res.status(200).json({
      data: updatedLocation,
      message: "Location is updated!"
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

//Do not add a DELETE as this would be a bit catastrophic and not required. You would want to retain historical info

module.exports = router;