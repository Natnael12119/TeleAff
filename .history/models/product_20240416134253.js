const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
	productName: {
		type: DataTypes.STRING(500),
		allowNull: false,
	},
	affiliateLink: {
		type: DataTypes.STRING(1000),
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING, // Ensure this is defined as STRING to store the filename
		allowNull: true, // or false, based on your requirement
	},
});

module.exports = Product;
