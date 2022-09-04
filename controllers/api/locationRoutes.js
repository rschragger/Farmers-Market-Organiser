const router = require('express').Router();
const express = require('express');
const path = require('path');
const multer  = require('multer');
/* storage image
  some guide resources from https://stackoverflow.com/questions/56735734/how-to-save-file-with-its-original-name-in-public-folder
  and  https://www.tabnine.com/code/javascript/functions/multer/File/fieldname */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/Logos')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //get the extesion of the file for renaming the stored image so it has a unique name
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix+ext)
  }
})
const upload = multer({storage: storage});
const sequelize = require('../../config/connection');
const { Location, Events, Stall } = require('../../models');

// Retrieve all the Locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.findAll({
      include: [{ model: Events },{model:Stall}],
    })
    .catch(err => {
      console.log(err);
    });
    
    res.status(200).json({
      data: locations
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Retrieve one location
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id,{
      include: [{ model: Events },{model:Stall}],
    });

    res.status(200).json({
      data: location
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// Create a new location
router.post('/', async (req, res) => {
  try {
    if (!req.file) {
      console.log("No file received333");
    } else {
      console.log('File received333');
    }
  //   //printing a console message checking if the file was loaded
  //   if (!req.file) {
  //     console.log("No file received");
  //   } else {
  //     console.log('File received');
  //   }
   ////
    const newLocation = await Location.create(req.body);
    const updateUser = sequelize.query(`Update user
        set location_id =`+newLocation.id +`
        WHERE
          user.id = `+req.session.userId);
    res.status(200).json({
      data: newLocation
    });
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Update the Location data
router.put('/:id', async (req, res) => {
  try {
    const updatedLocation = await Location.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true,
    });

    if (!updatedLocation[0]) {
      // No Location exists with this id
      res.status(404).json({
        message: "No Location with this id exists!"
      });

      return;
    }

    // the Location exists and has been updated
    res.status(200).json({
      data: updatedLocation,
      message: "Location is updated!"
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

//Do not add a DELETE as this would be a bit catastrophic and not required. You would want to retain historical info
router.post('/upload', upload.single("image"), async (req, res) => {
  //printing a console message checking if the file was loaded
  if (!req.file) {
    console.log("No file received");
  } else {
      console.log('File received'+req.file.filename);
      const chekLocation = await sequelize.query(`SELECT
            count(*) as total,
            user.location_id
        FROM
            USER,
            location
        WHERE
            location.id = USER.location_id AND
            USER.id =`+req.session.userId,{
              model: Location,
              mapToModel: true
            }
      );
      const total = chekLocation.map((location) =>
        location.get({ plain: true })
      );
    //console.log(total[0].total); process.exit();
    if(total[0].total > 0){
      //update logo
      const updateLocation = sequelize.query(`Update location
          set logo_filename ="`+req.file.filename+`"
          WHERE
          location.id = `+total[0].location_id);
          res.redirect('/stalls');
      }
   }
});

module.exports = router;