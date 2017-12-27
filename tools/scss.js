var file = require('./file');
var sass = require('gulp-sass');
var path = require('path');
var through = require('through2');
var gulp = require('gulp');

function processRequestHandler(req, res, next) {

  var fileInfo = file.getFileInfo(req.path);
  var fileType = fileInfo.fileType;
  var param = path.join(__dirname, '../public', req.originalUrl);
  switch (fileType) {
    case 'scss':
      gulp.src(param)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(through.obj(
          function (chunk, enc, callback) {
            res.type('text/css');
            res.send(chunk.contents.toString());
          }
        ));
      break;
    default:
      next()
      break;
  }
}
module.exports = processRequestHandler;