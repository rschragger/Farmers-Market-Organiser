const router = require('express').Router();
const { Location } = require('../../models');

// Retrieve all the Locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.findAll();
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
    const location = await Location.findByPk(req.params.id);

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

module.exports = router;