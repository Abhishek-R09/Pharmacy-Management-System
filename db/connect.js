const mysql = require('mysql');
const dbconfig = require('../config/database');
const connectionPool = mysql.createPool(dbconfig.connection);

module.exports = connectionPool;
