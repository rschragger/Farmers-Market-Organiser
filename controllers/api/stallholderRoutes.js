const router = require('express').Router();
const { Stallholder, User, Product  } = require('../../models'); //, Booking

router.get('/', async (req, res) => {
  try {
    const stallholderData = await Stallholder.findAll({
      include: [{ model: User },{model:Product}],
    })
    if (!stallholderData) {
      res
        .status(400)
        .json({ message: 'No data found for stallholders' });
      return;
    }
    res.status(200).json(stallholderData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get by stallholder id
router.get('/:id', async (req, res) => {
  try {
    const stallholderData = await Stallholder.findAll({
      include: [{ model: User },{model:Product}],
      where:{ 
        id: req.params.id}
    })
    if (!stallholderData) {
      res
        .status(400)
        .json({ message: `No data found for id ${req.params.id}` });
      return;
    }
    res.status(200).json(stallholderData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new stallholder (company)
router.post('/', async (req, res) => {
  try {
    // Check if the stallholder already exists
    const stallholderData = await Stallholder.findOne({
      where: {
        company_name: req.body.company_name
      },
      individualHooks: true,
    });

    if (!stallholderData) {
      // The company doesn't exist so create a new stallholder
      const newStallholder = await Stallholder.create(req.body);

      res.status(200).json({
        data: newStallholder
      });
    }
    else {
      // The company exists, prevent creating another company with the same name
      res.status(400).json({
        message: "The company name has already been used!"
      });
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Update the stallholder data
router.put('/:id', async (req, res) => {
  try {
    const updatedStallholder = await Stallholder.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true,
    });

    if (!updatedStallholder[0]) {
      // No stallholder exists with this id
      res.status(404).json({
        message: "No stallholder with this id exists!"
      });
      return;
    }
    // the stallholder exists and has been updated
    res.status(200).json({
      data: updatedStallholder,
      message: "Stallholder is updated!"
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});


// Delete stallholder by id
// This has an issue because it is a parent record
router.delete('/:id', async (req, res) => {
  try {
    const stallholderData = await Stallholder.destroy({
      where:{ 
        id: req.params.id}
    })
    if (!stallholderData) {
      res
        .status(400)
        .json({ message: `No data found for id ${req.params.id}, nothing deleted` });
      return;
    }
    res.status(200).json({message: `Stallholder with id ${req.params.id} has been deleted`});
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;