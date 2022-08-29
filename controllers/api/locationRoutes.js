const router = require('express').Router();
const { Location, User, Stall, Events, Booking } = require('../../models');

router.get('/', async (req, res) => {
    try {

        const locationData = await Location.findAll({
            include: [
                { model: User },
                { model: Stall }, 
                {model: Events},
                {model: Booking},
            ],
            exclude:["stallholder_id"]
        })
        if (!locationData) {
            res
                .status(400)
                .json({ message: 'No data found' });
            return;
        }

        res.status(200).json(locationData);//{message:"Test working!"})
    } catch (err) {
        res.status(400).json(err);
    }


})


module.exports = router;