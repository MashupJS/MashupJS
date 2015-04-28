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


gulp.task('coreservices', ['copy'], function () {
    return gulp.src('src/core/common/**/*')
      .pipe(concat('core.services.js'))
      .pipe(gulp.dest('./dist/'));
});


gulp.task('routeconfig', ['copy'], function () {
    return gulp.src(['src/core/config/route.config.js', 'src/apps/**/route.config.js'])
      .pipe(concat('route.config.js'))
      .pipe(gulp.dest('./dist/'));
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

gulp.task('uglifyalljs', ['copy', 'coreservices','routeconfig'], function () {
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
//gulp.task('annotatetask', ['annotate']);
//gulp.task('uglifyjstask', ['uglifyalljs']);


//.pipe(plumber())
function onError(err) {
    beeper();
    console.log(err);
}