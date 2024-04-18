const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', // Replace with your database host
  username: 'postgres', // Replace with your database username
  password: '*7I$9v8YeQca*F', // Replace with your database password (redacted)
  database: 'teleaff_db',
  port: 5432
});

module.exports = sequelize;
