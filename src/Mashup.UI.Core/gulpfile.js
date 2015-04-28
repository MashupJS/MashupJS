var gulp = require('gulp')
    , debug = require('gulp-debug')
    , clean = require('gulp-clean')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglifyjs')
    , uglify2 = require('gulp-uglify')
    , rename = require('gulp-rename')
    , sourcemaps = require('gulp-sourcemaps')
    , ngAnnotate = require('gulp-ng-annotate')
    , plumber = require('gulp-plumber')
;


var distFolder = 'dist'; // removing this because I noticed while building GLOG strings it caused me to miss a lot so became more harmful than helpful.
var srcFolder = 'src';   // removing this because I noticed while building GLOG strings it caused me to miss a lot so became more harmful than helpful.


gulp.task('annotate', function () {
    // Do an in-place replace on file.txt
    return gulp.src(['src/index.controller.js', 'src/core/**/*.js', 'src/apps/**/*.js', '!src/core/lib/**/*', '!/**/*.min.js'], { base: 'src/./' })
   // return gulp.src('file.txt', { base: './' })
      .pipe(ngAnnotate())
      .pipe(gulp.dest('src/./'));
});


gulp.task('clean', ['annotate'], function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('copy', ['clean'], function () {
    return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'))
});

// The benefit of gulp-uglifyjs over gulp-uglify is the ability to concat and gen maps.
// This task will concat all files in GLOB and render minified with maps.
gulp.task('coreservices', ['copy'], function () {
    return gulp.src('src/core/common/**/*')
      .pipe(uglify('core.services.js', {
          mangle: false,
          output: {
              beautify: true
          }
      }))
      .pipe(gulp.dest('dist'))
      .pipe(uglify('core.services.min.js', {
          outSourceMap: true
      }))
      .pipe(gulp.dest('dist'))
});


gulp.task('routeconfig', ['copy'], function () {
    return gulp.src(['src/core/config/route.config.js', 'src/apps/**/route.config.js'])
      .pipe(uglify('route.config.js', {
          mangle: false,
          output: {
              beautify: true
          }
      }))
      .pipe(gulp.dest('dist'))
      .pipe(uglify('route.config.min.js', {
          outSourceMap: true
      }))
      .pipe(gulp.dest('dist'))
});




gulp.task('libs', function () {
    return gulp.src(['bower_components/**/*.js'])
      .pipe(uglify('libs.js', {
          mangle: false,
          output: {
              beautify: true
          }
      }))
      .pipe(gulp.dest('dist/core/libs/'))
});

gulp.task('uglifyalljs', ['copy'], function () {
    return gulp.src(['dist/**/*.js', '!/**/*.min.js', '!dist/core/lib/**/*', '!dist/core/common/**/*'], { base: 'dist/./' })
     //.pipe(plumber())
     .pipe(sourcemaps.init())
     .pipe(uglify2())
     .pipe(rename({
         extname: '.min.js'
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('dist/./'));
});


gulp.task('default', ['annotate', 'clean', 'copy', 'coreservices', 'routeconfig', 'libs', 'uglifyalljs']);
gulp.task('annotatetask', ['annotate']);
gulp.task('uglifyjstask', ['uglifyalljs']);


function onError(err) {
    beeper();
    console.log(err);
}