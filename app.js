var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var log4js = require('log4js');
var sassMiddleware = require('./tools/scss');
var app = express();


app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV == 'production') {
    app.set('views', path.join(__dirname, 'templates'));
}

app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') {
    console.log(1111);
    app.use('/stylesheets', sassMiddleware);
}

app.use(express.static(path.join(__dirname, 'public')));


app.use(log4js.connectLogger(log4js.getLogger('access'), {
    level: log4js.levels.INFO
}));
app.use('/', index);

app.use('/products', products)
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    console.log(err);
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;