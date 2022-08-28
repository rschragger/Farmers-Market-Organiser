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
        .json({ message: 'No data found' });
      return;
    }

    res.status(200).json(stallholderData);//{message:"Test working!"})
  } catch (err) {
    res.status(400).json(err);
  }


})


module.exports = router;