var mysql = require('mysql');
var config = require('./db');

var pool = mysql.createPool(config.dev);

module.exports = pool;