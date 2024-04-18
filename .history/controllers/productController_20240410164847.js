const Product = require('../models/product');
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const submitProduct = async (req, res) => {
  try {
    const { productName, affiliateLink } = req.body;
    const productImage = req.file ? req.file.filename : null;

    const newProduct = await Product.create({
      productName,
      affiliateLink,
      image: productImage
    });

    // Log the created product
    console.log('Product created:', newProduct);

    res.status(201).json({ message: 'Product created successfully!' });
  } catch (error) {
    // Send a JSON response to the user
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
};  

module.exports = { submitProduct, upload };
