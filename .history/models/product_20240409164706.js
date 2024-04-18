const Sequelize = require('sequelize');
const sequelize = require('../db'); // Import Sequelize instance

const Product = Sequelize.define('Product', {
    productName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    affiliateLink: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productImage: {
        type: Sequelize.STRING // Store the uploaded filename (if applicable)
    }
});

module.exports = Product;
