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