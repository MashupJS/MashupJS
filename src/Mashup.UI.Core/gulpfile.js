var gulp = require('gulp')
    , debug = require('gulp-debug')
    , clean = require('gulp-clean')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify')
    , rename = require('gulp-rename')
    , sourcemaps = require('gulp-sourcemaps')
    , ngAnnotate = require('gulp-ng-annotate')
    , plumber = require('gulp-plumber')
    , minifycss = require('gulp-minify-css')
    , minifyhtml = require('gulp-minify-html')
    , imagemin = require('gulp-imagemin')
    , pngquant = require('imagemin-pngquant')
    , jshint = require('gulp-jshint')
    , stylish = require('jshint-stylish')
    , jshinthtmlreporter = require('gulp-jshint-html-reporter')
    , ts = require('gulp-typescript')
    , tslint = require('gulp-tslint')
    , tsstylish = require('gulp-tslint-stylish')
    , sass = require('gulp-sass')
;

// -------------------------------------------------
// Grunt configuration
require('gulp-grunt')(gulp, {
    // These are the default options but included here for readability.
    base: null,
    prefix: 'grunt-',
    verbose: false
});
// -------------------------------------------------

gulp.task('annotate', function () {
    return gulp.src(['src/index.controller.js', 'src/core/**/*.js', 'src/apps/**/*.js', '!src/core/lib/**/*', '!/**/*.min.js'], { base: 'src/./' })
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

// Note minified by this build process so it can be copied as soon as the dist is cleaned.
gulp.task('libs', ['clean'], function () {
    return gulp.src(['bower_components/**/*.js'])
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/core/lib/'));
});

gulp.task('uglifyalljs', ['copy', 'coreservices', 'routeconfig', 'tscompile'], function () {
    return gulp.src(['dist/**/*.js', '!/**/*.min.js', '!dist/core/lib/**/*', '!dist/core/common/**/*'], { base: 'dist/./' })
     .pipe(sourcemaps.init())
     .pipe(uglify())
     .pipe(rename({
         extname: '.min.js'
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('dist/./'));
});

gulp.task('minifycss', ['copy'], function () {
    return gulp.src(['dist/**/*.css', '!/**/*.min.css', '!dist/core/lib/**/*'], { base: 'dist/./' })
     .pipe(sourcemaps.init())
     .pipe(minifycss())
     .pipe(rename({
         extname: '.min.css'
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('dist/./'));
});

gulp.task('minifyhtml', ['copy'], function () {
    return gulp.src(['dist/**/*.html', '!/**/*.min.html', '!dist/core/lib/**/*'], { base: 'dist/./' })
     .pipe(sourcemaps.init())
     .pipe(minifyhtml())
     .pipe(rename({
         extname: '.min.html'
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('dist/./'));
});

gulp.task('minifyimage', ['copy'], function () {
    return gulp.src(['dist/**/*.{png,jpg,gif,ico}', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'])
    .pipe(imagemin({ progressive: true, optimizationLevel: 7, use: [pngquant()] }))
    .pipe(gulp.dest('dist/./'));
});


gulp.task('tscompile', ['copy'], function () {
    return gulp.src(['./dist/**/*.ts', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'])
    .pipe(sourcemaps.init())
    .pipe(ts({
        target: 'ES5',
        declarationFiles: false,
        noExternalResolve: true
    }))

    // Exporting the ES5 .js file.  This is never used so you can remove the following two lines.
    // You might want to keep them so you can evaluate how TypeScript is transpiling your JavaScript.
    // This also gives JSHint a shot at linting the JavaScript version of your TypeScript code.
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist/./'))

    // Creating the optimized JavaScript file.
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/./'));
});


// Precompiling and optimizing our Bootswatch
// https://github.com/thomaspark/bootswatch
// Customize settings with _variables.scss
// http://getbootstrap.com/customize/#less-variables

gulp.task('sassPaper', function () {
    gulp.src('dist/core/css/bootstrap/paper/_bootswatch.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass({
            //sourcemap: true
        }))
        // Catch any SCSS errors and prevent them from crashing gulp
        .on('error', function (error) {
            console.error(error);
            this.emit('end');
        })
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/core/css/bootstrap/paper/bootswatch.css'));
});





gulp.task('tslint', ['copy'], function () {
    return gulp.src(['./dist/**/*.ts', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'])
        .pipe(tslint())
        .pipe(tslint.report('verbose', {
            emitError: false,
            sort: true,
            bell: true
        }))
});

// Make sure this doesn't run until all JavaScript is ready.  IE: If TypeScript is added then
// either execute as part of the transpilation from TypeScript to JavaScript or create a dependency
// ,here, for the Transpilation task to complete before starting jshint.
// Long term all JavaScript will come from TypeScript and will simplify and speed up this task overall.
gulp.task('jshint', ['copy', 'tscompile'], function () {
    return gulp.src(['./dist/**/*.js', '!dist/core/lib/**/*.*', '!**/*.min.js', '!dist/core/css/**/*.*'])
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('gulp-jshint-html-reporter', { filename: 'jshint-output.html' }))
    ;
});




gulp.task('default', ['annotate', 'clean', 'copy', 'coreservices', 'routeconfig', 'libs'
                   , 'uglifyalljs', 'minifycss', 'minifyhtml', 'grunt-merge-json:menu', 'minifyimage'
                   , 'tscompile', 'tslint', 'jshint']);


//.pipe(plumber())
function onError(err) {
    beeper();
    console.log(err);
}