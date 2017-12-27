var gulp = require('gulp');
var path = require('path');
var md5 = require('gulp-md5-plus');
var clean = require('gulp-clean');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var config = require('./config/index');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
function getName(pathRoot) {
    var obj = path.parse(pathRoot);
    return obj.base;
}
gulp.task("cleanTemplates", function () {
    return gulp.src('templates')
        .pipe(clean());
});

gulp.task("clean", ['cleanTemplates'], function () {
    return gulp.src(config.dest)
        .pipe(clean());
});

gulp.task("js", ['html'], function () {
    return gulp.src(config.jsSrc)
        .pipe(uglify())
        .pipe(md5(10, 'templates/*.ejs'))
        .pipe(gulp.dest(config.jsDest));
    // glob(config.jsSrc, function(err, files) {
    //     if (err) done(err);
    //     var dest = path.resolve(__dirname, config.jsDest);
    //     console.log(dest);
    //     var tasks = files.map(function(entry) {
    //         var name = getName(entry);
    //         return browserify({ entries: [entry] })
    //             .transform("babelify", { presets: ["es2015"] })
    //             .bundle()
    //             .pipe(source(entry))
    //             .pipe(buffer())
    //             .pipe(uglify())
    //             .pipe(rename(name))
    //             .pipe(md5(10, 'templates/*.ejs'))
    //             .pipe(gulp.dest(dest));
    //     });
    //     es.merge(tasks).on('end', function() {
    //         console.log('build js and babel success');
    //     });
    // })
});

gulp.task("img", function () {
    return gulp.src(config.imgSrc)
        .pipe(gulp.dest(config.imgDest));
});
gulp.task("html", function () {
    return gulp.src(config.htmlSrc)
        .pipe(replace(/\.scss/g, '.css'))
        .pipe(gulp.dest(config.htmlDest));
});
gulp.task("sass", ['css'], function () {
    return gulp.src(config.sassSrc)
        .pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(md5(10, 'templates/*.ejs'))
        .pipe(gulp.dest(config.sassDest));
});

gulp.task("css", ['html', 'img'], function () {
    return gulp.src(config.cssSrc)
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cssnano())
        .pipe(md5(10, 'templates/*.ejs'))
        .pipe(gulp.dest(config.cssDest));
});
gulp.task('build', ['js', 'sass'], function () {
    return gulp.src(config.htmlDest + '/*.ejs')
        .pipe(replace(/javascripts\//g, 'dist/js/'))
        .pipe(replace(/stylesheets\/sass\//g, 'stylesheets/'))
        .pipe(replace(/stylesheets\//g, 'dist/css/'))
        .pipe(replace(/images\//g, 'dist/images/'))
        .pipe(gulp.dest(config.htmlDest));
})


gulp.task('default', ['clean'], function () {
    gulp.start('build');
});