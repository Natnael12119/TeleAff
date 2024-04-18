const Sequelize = require('sequelize');
const sequelize = require('../db'); // Import Sequelize instance

const Product = sequelize.define('Product', {
    product_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    affiliate_link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product_image: {
        type: Sequelize.STRING // Store the uploaded filename (if applicable)
    }
});

module.exports = Product;
