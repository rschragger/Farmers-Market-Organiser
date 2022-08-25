const router = require('express').Router();
const { Stallholder } = require('../../models');

router.get('/', async(req,res)=>{
try {
   
    const stallholderData = await Stallholder.findAll()
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