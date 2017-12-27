var pool = require('../config/dbPool');
var async = require('async');
var waterfall = async.waterfall;

module.exports = {
    index: function() {
        return new Promise(function(resolve, reject) {
            var tasks = [
                function(callback) {
                    pool.getConnection(function(err, connection) {
                        callback(err, connection);
                    })
                },
                function(connection, callback) {
                    var str = 'SELECT * FROM `meta`';
                    connection.query(str, function(error, results, fields) {
                        callback(error, connection, results);
                    })
                }
            ];
            waterfall(tasks, function(err, connection, results) {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
                connection.release();
                //res.render('index', { title: '代孕', name: 'Express' });
            })
        })


    }
}