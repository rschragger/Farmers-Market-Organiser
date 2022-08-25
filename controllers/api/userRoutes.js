const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async(req,res)=>{
try {
   /*
    const userData = await User.findAll()
    if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      */
res.status(200).json({message:"Test working!"})
} catch (err) {
    res.status(400).json(err);
}


})


module.exports = router;