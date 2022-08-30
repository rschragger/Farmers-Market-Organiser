const router = require('express').Router();
const { Stall, Location } = require('../../models');

// Retrieve all the Stalls
router.get('/', async (req, res) => {
  try {
    const dbStallsData = await Stall.findAll({
        include:[
            {
                model: Location,
                attributes: ['market_name', 'address'],
            },
        ],
    });
    // res.status(200).json({
    //   data: stalls
    // });
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
router.get('/:id', async (req, res) => {
  try {
    const dbStallsData = await Stall.findByPk(req.params.id);

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

// Create a new stall
router.post('/', async (req, res) => {
  try {
	const newStall = await Stall.create(req.body);

	res.status(200).json({
	data: newStall
	});
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
      //individualHooks: true,
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

module.exports = router;