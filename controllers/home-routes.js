const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
  // Test to check if connection from models to controllers to views all work
  const userData = await User.findAll()
  .catch(err => console.log(err));
  
  const users = userData.map((user) => user.get({plain: true}));
  
  res.render('homepage', {
    users
  });
});

module.exports = router;
