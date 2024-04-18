const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
	product_name: {
		// Update column name
		type: DataTypes.STRING,
		allowNull: false,
	},
	affiliate_link: {
		// Update column name
		type: DataTypes.STRING,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});

module.exports = Product;
