const mysql = require('mysql');
const dbconfig = require('./config');
const connectionPool = mysql.createPool(dbconfig.connection);

module.exports = connectionPool;
