const Product = require('../models/product'); // Import Product model

const submitProduct = async (req, res) => {
  try {
    const { productName, affiliateLink, productImage, createdAt, updatedAt } = req.body;

    const product = await Product.create({
        product_name: productName,  // Updated key name
        affiliate_link: affiliateLink,  // Updated key name
        productImage: productImage,  // Assuming you store the image path/name here
        createdAt: createdAt,
        updatedAt: updatedAt
    });

    res.json({ success: true, product: product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.json({ success: false, error: error.message });
  }
  };  

module.exports = { submitProduct }; // Export the function as a controller action