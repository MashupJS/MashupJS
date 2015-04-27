var gulp = require('gulp')
    , uglify = require('gulp-uglify')
    , rename = require('gulp-rename')
    , sourcemaps = require('gulp-sourcemaps')
    , concat = require('gulp-concat');



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


gulp.task('default', ['uglify:apps']);

