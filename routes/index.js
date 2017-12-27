var express = require('express');
var router = express.Router();
var indexController = require('../controller/indexController');
var log = require('log4js').getLogger("app");
/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: '灯塔会员' });
    // indexController.index().then(function(results) {
    //         var result = results[0];
    //         // log.info(result);
    //         res.render('index', result);
    //     })
    //     .catch(function(err) {
    //         log.error(err);
    //     })
});

module.exports = router;