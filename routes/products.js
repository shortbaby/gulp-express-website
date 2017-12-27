var express = require('express');
var router = express.Router();
var log = require('log4js').getLogger("app");
/* GET home page. */
router.get('/list', function (req, res, next) {
  res.render('products', { title: '灯塔会员' })
});

module.exports = router;