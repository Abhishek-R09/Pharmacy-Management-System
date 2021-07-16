// config/database.js
module.exports = {
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3307,
    database: process.env.DB_NAME,
  },
};
