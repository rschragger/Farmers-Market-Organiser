const router = require('express').Router();
const { EventsBooking, Events, Booking, Stall } = require('../../models'); //, Booking

router.get('/', async (req, res) => {
  try {
    const eventsbookingData = await EventsBooking.findAll({
      include: [{model:Booking},{model:Stall},{model:Events}]
    })
    if (!eventsbookingData) {
      res
        .status(400)
        .json({ message: 'No data found for eventsbookings' });
      return;
    }
    res.status(200).json(eventsbookingData);
  } catch (err) {
    res.status(401).json(err);
  }
});

// Get by eventsbooking id
router.get('/:id', async (req, res) => {
  try {
    const eventsbookingData = await EventsBooking.findAll({
      include: [{model:Booking},{model:Stall},{model:Events}],
      where: {
        id: req.params.id
      }
    })
    if (!eventsbookingData) {
      res
        .status(400)
        .json({ message: `No data found for id ${req.params.id}` });
      return;
    }
    res.status(200).json(eventsbookingData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new eventsbooking 
router.post('/', async (req, res) => {
  try {
    // Check if the eventbooking already exists
    const eventsbookingData = await EventsBooking.findOne({
      where: {
        events_id: req.body.events_id,
        stall_id: req.body.stall_id,
      },
      //individualHooks: true,
    });

    if (!eventsbookingData) {
      // The eventsbooking doesn't exist so create a new eventsbooking
      const newEventsBooking = await EventsBooking.create(req.body);

      res.status(200).json({
        data: newEventsBooking
      });
    }
    else {
      // The eventsbooking exists for this stallholder, prevent creating another company with the same name
      res.status(401).json({
        message: "This event has already been created!"
      });
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Update the eventsbooking data
router.put('/:id', async (req, res) => {
  try {
    const updatedEventsBooking = await EventsBooking.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true,
    });

    if (!updatedEventsBooking[0]) {
      // No eventsbooking exists with this id
      res.status(404).json({
        message: "No event with this id exists!"
      });
      return;
    }
    // the eventsbooking exists and has been updated
    res.status(200).json({
      data: updatedEventsBooking,
      message: "Event is updated!"
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Delete eventsbooking by id
router.delete('/:id', async (req, res) => {
  try {
    const eventsbookingData = await EventsBooking.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!eventsbookingData) {
      res
        .status(400)
        .json({ message: `No data found for id ${req.params.id}, nothing deleted` });
      return;
    }
    res.status(200).json({ message: `EventsBooking with id ${req.params.id} has been deleted` });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;