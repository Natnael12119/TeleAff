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
			// Update column name
			type: DataTypes.STRING,
			allowNull: false,
			field: 'product_name', // Add field mapping
		},
		affiliateLink: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'affiliate_link', // Add field mapping
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
			field: 'telegram_message_id', // Add field mapping
		},
	},
	{
		tableName: 'Products', // Set the correct table name
	}
);

module.exports = Product;
