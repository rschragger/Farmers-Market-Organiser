const router = require('express').Router();
const { Stall , Location , EventsBooking} = require('../../models');

// Retrieve all the Stalls
router.get('/', async (req, res) => {
  try {
    const stalls = await Stall.findAll({
      include:[{model:Location} ,{model: EventsBooking}]
    });
    res.status(200).json({
      data: stalls
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});


// Retrieve a stall
router.get('/:id', async (req, res) => {
  try {
    const stall = await Stall.findByPk(req.params.id,{
      include:[{model:Location} ,{model: EventsBooking}]
    });

    res.status(200).json({
      data: stall
    });
 }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Create a new stall
router.post('/', async (req, res) => {
  try {
    // Check if the stall already exists
    const stallData = await Stall.findOne({
      where: {
        stall_name: req.body.stall_name
      },
      individualHooks: true,
    });

    if (!stallData) {
      // The company doesn't exist so create a new stall
      const newStall = await Stall.create(req.body);

      res.status(200).json({
        data: newStall
      });
    }
    else {
      // The company exists, prevent creating another company with the same name
      res.status(400).json({
        message: "The stall's name has already been used!"
      });
    }
  }
    catch (err) {
      res.status(400).json(err);
    }
  });



// Update the Stall
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
module.exports = router;