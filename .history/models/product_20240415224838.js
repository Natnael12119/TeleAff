// models/product.js

const { DataTypes } = require('sequelize');
const Sequelize = require('../db'); // Corrected path

const Product = sequelize.define(
	'Product',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		productName: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'product_name',
		},
		affiliateLink: {
			type: Sequelize.STRING,
			allowNull: false,
			field: 'affiliate_link',
		},
		image: {
			type: Sequelize.STRING,
			field: 'image',
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'pending',
		},
		telegramMessageId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: 'Products',
	}
);

module.exports = Product;
