var gulp = require('gulp')
    , clean = require('gulp-clean')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglifyjs')
    , rename = require('gulp-rename')
    , sourcemaps = require('gulp-sourcemaps')
    , ngAnnotate = require('gulp-ng-annotate')
;


var distFolder = 'dist';
var srcFolder = 'src';


gulp.task('annotate', function () {
    return gulp.src([srcFolder + '/index.controller.js', srcFolder + '/core/**/*.js', srcFolder + '/apps/**/*.js'])
        .pipe(ngAnnotate())
        .pipe(gulp.dest(srcFolder));
});

gulp.task('clean', function () {
    return gulp.src(distFolder, { read: false })
        .pipe(clean());
});

gulp.task('copy', ['clean'], function () {
    return gulp.src(srcFolder + '/**/*')
    .pipe(gulp.dest(distFolder))
});

// The benefit of gulp-uglifyjs over gulp-uglify is the ability to concat and gen maps.
// This task will concat all files in GLOB and render minified with maps.
gulp.task('coreservices', ['copy'], function () {
    return gulp.src(srcFolder + '/core/common/**/*')
      .pipe(uglify('core.services.js', {
          mangle: false,
          output: {
              beautify: true
          }
      }))
      .pipe(gulp.dest(distFolder))
      .pipe(uglify('core.services.min.js', {
          outSourceMap: true
      }))
      .pipe(gulp.dest(distFolder))
});


gulp.task('routeconfig', ['copy'], function () {
    return gulp.src([srcFolder + '/core/config/route.config.js', srcFolder + '/apps/**/route.config.js'])
      .pipe(uglify('route.config.js', {
          mangle: false,
          output: {
              beautify: true
          }
      }))
      .pipe(gulp.dest(distFolder))
      .pipe(uglify('route.config.min.js', {
          outSourceMap: true
      }))
      .pipe(gulp.dest(distFolder))
});

gulp.task('libs', function () {
    gulp.src(['bower_components/**/*.js'])
      .pipe(uglify('libs.js', {
          mangle: false,
          output: {
              beautify: true
          }
      }))
      .pipe(gulp.dest(distFolder + '/libs/'))
});


gulp.task('uglify:apps', function () {

    //gulp.src(['core/apps/**/*.js', '!/**/*.min.js'])
    //    .pipe(rename({ extname: ".min.js" }))
    //    .pipe(sourcemaps.init())
    //    .pipe(uglify())
    //    //.pipe(sourcemaps.write("."))
    //    .pipe(sourcemaps.write('./'))
    //    .pipe(gulp.dest('core/apps/'))
    //;

});

gulp.task('default', ['annotate','clean', 'copy', 'coreservices', 'routeconfig', 'libs']);
gulp.task('annimate', ['annotate']);

