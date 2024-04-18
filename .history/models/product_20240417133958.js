const Sequelize = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define(
	'Product',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		productName: {
			type: Sequelize.TEXT, // Use TEXT for product_name
			allowNull: false,
			field: 'product_name',
		},
		description: {
			type: Sequelize.TEXT,
			field: 'description',
		},
		affiliateLink: {
			type: Sequelize.TEXT, // Use TEXT for affiliate_link
			allowNull: false,
			field: 'affiliate_link',
		},
		published: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			field: 'published',
		},
		image: {
			type: Sequelize.BLOB, // Use BLOB for BYTEA
			allowNull: true,
			field: 'image',
		},
		status: {
			type: Sequelize.STRING,
			field: 'status',
		},
	},
	{
		tableName: 'products',
		timestamps: false,
	}
);

module.exports = Product;
