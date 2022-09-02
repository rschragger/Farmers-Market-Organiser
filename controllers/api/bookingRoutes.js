const router = require('express').Router();
const { Booking , EventsBooking, Events,  Stall , Stallholder   } = require('../../models'); //, Booking

router.get('/', async (req, res) => {
  try {
    const bookingData = await Booking.findAll({
      include: [{model:Stallholder},{model:EventsBooking}]
    })
    if (!bookingData) {
      res
        .status(400)
        .json({ message: 'No data found for bookings' });
      return;
    }
    res.status(200).json(bookingData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get by booking id
router.get('/:id', async (req, res) => {
  try {
    const bookingData = await Booking.findAll({
      include:  [{model:Stallholder},{model:EventsBooking}],
      where:{ 
        id: req.params.id}
    })
    if (!bookingData) {
      res
        .status(400)
        .json({ message: `No data found for id ${req.params.id}` });
      return;
    }
    res.status(200).json(bookingData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new booking 
router.post('/', async (req, res) => {
  try {
    // Check if the event already exists
    const bookingData = await Booking.findOne({
      where: {
        timestamp_start: req.body.timestamp_start,
        //location_id: req.body.location_id,
        stall_id:req.body.stall_id,
      },
     individualHooks: true,
    });

    if (!bookingData) {
      // The booking doesn't exist so create a new booking
      const newBooking = await Booking.create(req.body);

      res.status(200).json({
        data: newBooking
      });
    }
    else {
      // The booking exists for this stallholder, prevent creating another company with the same name
      res.status(400).json({
        message: "This event has already been created!"
      });
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Update the booking data
router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true,
    });

    if (!updatedBooking[0]) {
      // No booking exists with this id
      res.status(404).json({
        message: "No event with this id exists!"
      });
      return;
    }
    // the booking exists and has been updated
    res.status(200).json({
      data: updatedBooking,
      message: "Event is updated!"
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Delete booking by id
router.delete('/:id', async (req, res) => {
  try {
    const bookingData = await Booking.destroy({
      where:{ 
        id: req.params.id}
    })
    if (!bookingData) {
      res
        .status(400)
        .json({ message: `No data found for id ${req.params.id}, nothing deleted` });
      return;
    }
    res.status(200).json({message: `Booking with id ${req.params.id} has been deleted`});
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;