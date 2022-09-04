const router = require('express').Router();
const { Events, Location   } = require('../../models'); //, Booking

router.get('/', async (req, res) => {
  try {
    const eventsData = await Events.findAll({
      include: [{model:Location}],
    })
    if (!eventsData) {
      res
        .status(400)
        .json({ message: 'No data found for events' });
      return;
    }
    res.status(200).json(eventsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get by events id
router.get('/:id', async (req, res) => {
  try {
    const eventsData = await Events.findAll({
      include: [{model:Location}],
      where:{ 
        id: req.params.id}
    })
    if (!eventsData) {
      res
        .status(400)
        .json({ message: `No data found for id ${req.params.id}` });
      return;
    }
    res.status(200).json(eventsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new events 
router.post('/', async (req, res) => {
  try {
    // Check if the event already exists
    const eventsData = await Events.findOne({
      where: {
        timestamp_start: req.body.timestamp_start,
        location_id: req.body.location_id,
      },
     individualHooks: true,
    });

    if (!eventsData) {
      // The events doesn't exist so create a new events
      const newEvents = await Events.create(req.body);

      res.status(200).json({
        data: newEvents
      });
    }
    else {
      // The events exists for this stallholder, prevent creating another company with the same name
      res.status(400).json({
        message: "This event has already been created!"
      });
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Update the events data
router.put('/:id', async (req, res) => {
  try {
    const updatedEvents = await Events.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true,
    });

    if (!updatedEvents[0]) {
      // No events exists with this id
      res.status(404).json({
        message: "No event with this id exists!"
      });
      return;
    }
    // the events exists and has been updated
    res.status(200).json({
      data: updatedEvents,
      message: "Event is updated!"
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Delete events by id
router.delete('/:id', async (req, res) => {
  try {
    const eventsData = await Events.destroy({
      where:{ 
        id: req.params.id}
    })
    if (!eventsData) {
      res
        .status(400)
        .json({ message: `No data found for id ${req.params.id}, nothing deleted` });
      return;
    }
    res.status(200).json({message: `Events with id ${req.params.id} has been deleted`});
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;