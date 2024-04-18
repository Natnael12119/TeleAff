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
			type: Sequelize.TEXT,
			allowNull: false,
			field: 'product_name',
		},
		description: {
			type: Sequelize.TEXT,
			field: 'description',
		},
		affiliateLink: {
			type: Sequelize.TEXT,
			allowNull: false,
			field: 'affiliate_link',
		},
		published: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			field: 'published',
		},
		image: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'image',
		},
		imageName: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'image_name',
		},
		imagePath: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'image_path',
		},
		imageMimetype: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'image_mimetype',
		},
		imageSize: {
			type: Sequelize.BIGINT,
			allowNull: true,
			field: 'image_size',
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
