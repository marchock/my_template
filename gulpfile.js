/************************
Gulp - Installation Instructions

To install Gulp globally:
$ npm install gulp -g

To install dependencies automatically (Requires up to data package.json):
$ npm install gulp --save-dev

To install dependencies manually (Ensure this list matches the plugins list below):
$ npm install gulp-compass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-uglify gulp-imagemin gulp-concat gulp-notify gulp-cache gulp-livereload gulp-util tiny-lr gulp-combine-media-queries gulp-requirejs --save-dev
***********************/

var src = "src/",
    dist = "static/";


// Load plugins
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    del = require('del'),

    // css specific
    minifyCSS = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    cmq = require('gulp-combine-media-queries'),

    // javascript specific
    require_js = require('requirejs');

    // jshint = require('gulp-jshint'),
    // uglify = require('gulp-uglify'),
    // imagemin = require('gulp-imagemin'),
    // concat = require('gulp-concat'),
    // gutil = require('gulp-util'),
    // 
    
    // 
    // livereload = require('gulp-livereload'),
    // run = require('gulp-run');


// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'copy-files');
});


gulp.task('watch', function () {
    gulp.watch(src + 'scss/**/*.scss', ['styles']),
    gulp.watch(src + 'js/**/*.js', ['scripts']),
    gulp.watch(src + '*', ['copy-files']);
});




/****************************************************************************
 *  
 * CSS
 *
 ****************************************************************************/

// Styles
gulp.task('styles', function () {

    return gulp.src(src + 'scss/*.scss')

        .pipe(compass({
            css: dist + 'css',
            sass: src + 'scss'
        }))

        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12', 'ios 6', 'android 4'],
            cascade: false
        }))

        .pipe(cmq({ log: true })) // Combine the media queries

        //.pipe(minifyCSS({keepBreaks:false}))

        .pipe(gulp.dest(dist + 'css'));
});



/****************************************************************************
 *  
 * JAVASCRIPT
 *
 ****************************************************************************/

gulp.task('scripts', function () {
    gulp.start('requirejs');
});

gulp.task('requirejs', function(cb) {

    var config = {
        baseUrl: src + 'js/',
        mainConfigFile: src + 'js/main.js',
        preserveLicenseComments: false,
        out: dist + 'js/main.min.js',
        name: 'main',
        optimize: 'uglify2'
    };

    require_js.optimize(config, function (buildResponse) {
        cb();
    }, cb);
});



/****************************************************************************
 *  
 * COPY FILES
 *
 ****************************************************************************/
gulp.task('copy-files', function () {
    gulp.start('copy-index', 'copy-vendors');
});

// Copy file to static 
gulp.task('copy-index', function () {
    return gulp.src(src + 'index.html')
        .pipe(gulp.dest(dist));
});

// Copy file to static 
gulp.task('copy-vendors', function () {
    return gulp.src(src + 'js/vendor/*')
        .pipe(gulp.dest(dist + "js/vendor/"));
});

// Clean - Deletes all the files before recompiling to ensure no unused files remain
gulp.task('clean', function(cb) {
    del(["../static/**"],{force: true}, cb);
});

