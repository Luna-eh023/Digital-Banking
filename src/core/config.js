require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,

  api: {
    prefix: '/api',
  },

  database: {
    connection: process.env.DB_CONNECTION,
    name: process.env.DB_NAME,
  },
};
