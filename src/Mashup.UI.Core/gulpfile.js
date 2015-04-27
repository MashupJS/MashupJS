var gulp = require('gulp')
    , clean = require('gulp-clean')
    , uglify = require('gulp-uglify')
    , rename = require('gulp-rename')
    , sourcemaps = require('gulp-sourcemaps')
    , concat = require('gulp-concat');

var distFolder = 'dist';
var srcFolder = 'src';

gulp.task('clean', function () {
    return gulp.src(distFolder, { read: false })
        .pipe(clean());
});

gulp.task('copy', ['clean'], function () {
    return gulp.src(srcFolder + '/**/*')
    .pipe(gulp.dest(distFolder))
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

gulp.task('default', ['clean', 'copy']);
//gulp.task('default', ['uglify:apps']);

