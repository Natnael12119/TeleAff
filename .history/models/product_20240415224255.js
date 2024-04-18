// models/product.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Corrected path

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
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
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
