const Sequelize = require('sequelize');
const sequelize = require('../db'); // Import Sequelize instance

const Product = sequelize.define('Product', {
    productName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'product_name' // Ensure the field name matches the actual column name in the database
    },
    affiliateLink: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'affiliate_link' // Ensure the field name matches the actual column name in the database
    },
    productImage: {
        type: Sequelize.STRING,
        field: 'image' // Ensure the field name matches the actual column name in the database
    }
}, {
    tableName: 'products', // Ensure the table name matches the actual table name in the database
    timestamps: false // If your table has createdAt and updatedAt fields
});

module.exports = Product;
