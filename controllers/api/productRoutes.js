const router = require('express').Router();
const { Product, Stallholder   } = require('../../models'); //, Booking

router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{model:Stallholder}],
    })
    if (!productData) {
      res
        .status(400)
        .json({ message: 'No data found for products' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get by product id
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{model:Stallholder}],
      where:{ 
        id: req.params.id}
    })
    if (!productData) {
      res
        .status(400)
        .json({ message: `No data found for id ${req.params.id}` });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new product (for a product)
router.post('/', async (req, res) => {
  try {
    // Check if the product already exists
    const productData = await Product.findOne({
      where: {
        name: req.body.name,
        stallholder_id: req.body.stallholder_id,
      },
      individualHooks: true,
    });

    if (!productData) {
      // The product doesn't exist so create a new product
      const newProduct = await Product.create(req.body);

      res.status(200).json({
        data: newProduct
      });
    }
    else {
      // The product exists for this stallholder, prevent creating another company with the same name
      res.status(400).json({
        message: "This product name has already been used!"
      });
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// Update the product data
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true,
    });

    if (!updatedProduct[0]) {
      // No product exists with this id
      res.status(404).json({
        message: "No product with this id exists!"
      });
      return;
    }
    // the product exists and has been updated
    res.status(200).json({
      data: updatedProduct,
      message: "Product is updated!"
    });
  }
  catch (err) {
    res.status(500).json({
      message: err
    });
  }
});


// Delete product by id
// This has an issue because it is a parent record
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where:{ 
        id: req.params.id}
    })
    if (!productData) {
      res
        .status(400)
        .json({ message: `No data found for id ${req.params.id}, nothing deleted` });
      return;
    }
    res.status(200).json({message: `Product with id ${req.params.id} has been deleted`});
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;