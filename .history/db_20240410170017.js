require('dotenv').config(); // Import dotenv to read .env file
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: 'postgres', // or any other database dialect
  logging: false // disable logging
});

module.exports = sequelize;