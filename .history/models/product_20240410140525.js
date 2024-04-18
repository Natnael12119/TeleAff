const Sequelize = require('sequelize');
const sequelize = require('../db'); // Import Sequelize instance

const Product = sequelize.define('products', { // Correct table name
    product_name: {
        type: Sequelize.STRING, // Correct column name
        allowNull: false
    },
    affiliateLink: {
        type: Sequelize.STRING, // Correct column name
        allowNull: false
    },
    productImage: {
        type: Sequelize.STRING // Correct column name
    }
});

module.exports = Product;