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
    , newer = require('gulp-newer')
    , watch = require('gulp-watch')
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
      .pipe(newer('src/./'))
      .pipe(ngAnnotate())
      .pipe(gulp.dest('src/./'));
});

gulp.task('clean', ['annotate'], function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('copy', ['clean'], function () {
    return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'));
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
      //.pipe(newer('dist/core/lib/'))
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/core/lib/'));
});

gulp.task('uglifyalljs', ['copy', 'coreservices', 'routeconfig', 'tscompile'], function () {
    return gulp.src(['dist/**/*.js', '!/**/*.min.js', '!dist/core/lib/**/*', '!dist/core/common/**/*'], { base: 'dist/./' })
     .pipe(sourcemaps.init())
     .pipe(newer('dist/./'))
     .pipe(uglify())
     .pipe(rename({
         extname: '.min.js'
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('dist/./'));
});

gulp.task('minifycss', ['copy', 'jshint'], function () {
    return gulp.src(['dist/**/*.css', '!/**/*.min.css', '!dist/core/lib/**/*'], { base: 'dist/./' })
     //.pipe(newer('dist/./'))
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
     //.pipe(newer('dist/./'))
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
    //.pipe(newer('dist/./'))
    .pipe(imagemin({ progressive: true, optimizationLevel: 7, use: [pngquant()] }))
    .pipe(gulp.dest('dist/./'));
});


gulp.task('tscompile', ['copy'], function () {
    return gulp.src(['./dist/**/*.ts', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'])
    //.pipe(newer('dist/./'))
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


gulp.task('sass', ['copy'], function () {
    gulp.src('./dist/**/*.scss', { base: 'dist/./' })
        //.pipe(newer('dist/./'))
        .pipe(sass())
        // Catch any SCSS errors and prevent them from crashing gulp
        .on('error', function (error) {
            console.error(error);
            this.emit('end');
        })
        .pipe(gulp.dest('dist/./'));

});


gulp.task('tslint', ['copy'], function () {
    return gulp.src(['./dist/**/*.ts', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'])
        //.pipe(newer('dist/./'))
        .pipe(tslint())
        .pipe(tslint.report('verbose', {
            emitError: false,
            sort: true,
            bell: true
        }));
});

// Make sure this doesn't run until all JavaScript is ready.  IE: If TypeScript is added then
// either execute as part of the transpilation from TypeScript to JavaScript or create a dependency
// ,here, for the Transpilation task to complete before starting jshint.
// Long term all JavaScript will come from TypeScript and will simplify and speed up this task overall.
gulp.task('jshint', ['copy', 'tscompile'], function () {
    return gulp.src(['./dist/**/*.js', '!dist/core/lib/**/*.*', '!**/*.min.js', '!dist/core/css/**/*.*'])
      //.pipe(newer('dist/./'))
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('gulp-jshint-html-reporter', { filename: 'jshint-output.html' }))
    ;
});



// gulp default task
gulp.task('default', ['annotate', 'clean', 'copy', 'coreservices', 'routeconfig', 'libs'
                   , 'uglifyalljs', 'sass', 'minifycss', 'minifyhtml', 'grunt-merge-json:menu', 'minifyimage'
                   , 'tscompile', 'tslint', 'jshint']);






// gulp -watch- task

// gulp.task('stream', function () {
//     return gulp.src('css/**/*.css')
//         .pipe(watch('css/**/*.css'))
//         .pipe(gulp.dest('build'));
// });

// gulp.task('watch3', function () {
//     gulp.watch({}, 'stream');
//     
// })


gulp.task('watch2', function() {
    gulp.watch(['src/index.controller.js', 'src/core/**/*.js', 'src/apps/**/*.js', '!src/core/lib/**/*', '!src/**/*.min.js'], ['annotate','watch:copy']);
});

// I've added copy without the 'clean' task dependency for the watch.
// If I can manage dependencies in the default task then I an remove them from tasks.
gulp.task('watch:copy', function () {
    return gulp.src('src/**/*')
    .pipe(newer('dist'))
    .pipe(gulp.dest('dist'));
});


//.pipe(plumber())
function onError(err) {
    beeper();
    console.log(err);
}

