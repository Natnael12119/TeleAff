const Sequelize = require('sequelize');
const { Pool } = require('pg');

const pool = new Pool({
  dialect: 'postgres',
  host: 'localhost', // Replace with your database host
  username: 'postgres', // Replace with your database username
  password: '*7I$9v8YeQca*F', // Replace with your database password (redacted)
  database: 'teleaff_db',
  port: 5432
});

const sequelize = new Sequelize({
  dialect: 'postgres',
  pool,
  define: {
      timestamps: false // Disable automatic timestamps (optional)
  }
});

(async () => {
  try {
      await sequelize.sync();
      console.log('Database connection established and models synchronized.');
  } catch (error) {
      console.error('Error synchronizing models:', error);
  }
})();

module.exports = sequelize;