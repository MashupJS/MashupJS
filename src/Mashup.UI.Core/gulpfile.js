var onError = function (err) {
    console.log(err);
};

var gulp = require('gulp')
    , uglify = require('gulp-uglify')
    , rename = require('gulp-rename')
    , sourcemaps = require('gulp-sourcemaps')
    , runSequence = require('run-sequence')
    , plumber = require('gulp-plumber')
    , ngAnnotate = require('gulp-ng-annotate')
    , clean = require('gulp-clean')
    , newer = require('gulp-newer')
    , concat = require('gulp-concat')
    , rename = require('gulp-rename')
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
    , watch = require('gulp-watch')
    , replace = require('gulp-replace-task')
    , args = require('yargs').argv
    , fs = require('fs')


;

gulp.task('annotate', function () {
    return gulp.src(['src/index.controller.js', 'src/core/**/*.js', 'src/apps/**/*.js', '!src/core/lib/**/*', '!src/**/*.min.js'], { base: 'src/./' })
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(ngAnnotate())
      .pipe(gulp.dest('src/./'));
});

gulp.task('clean-dist', function () {
    return gulp.src('wwwroot', { read: false })
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(clean());
});

gulp.task('copyFromApps', function () {
    return gulp.src(['../../Mashup.UI.App1/src/apps/**/*',
                    '../../Mashup.UI.App2/src/apps/**/*'])
      .pipe(plumber({
          errorHandler: onError
      }))
    .pipe(gulp.dest('./wwwroot/apps/'));
});


gulp.task('copy', function () {
    return gulp.src('src/**/*')
      .pipe(plumber({
          errorHandler: onError
      }))
    .pipe(newer('wwwroot'))
    .pipe(gulp.dest('wwwroot'));
});

gulp.task('coreservices', function () {
    return gulp.src('src/core/common/**/*')
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(concat('core.services.js'))
      .pipe(gulp.dest('./wwwroot/'));
});

gulp.task('routeconfig', function () {
    return gulp.src(['src/core/config/route.config.js', 'src/apps/**/route.config.js'])
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(concat('route.config.js'))
      .pipe(gulp.dest('./wwwroot/'));
});

gulp.task('libs', function () {
    return gulp.src(['bower_components/**//bootstrap/dist/js/bootstrap.min.js'
                    , 'bower_components/**//normalize.css/normalize.css'
                    , 'bower_components/**//fontawesome/css/font-awesome.min.css'
                    , 'bower_components/**/fontawesome/fonts/*.*'
                    , 'bower_components/**//jquery/dist/jquery.min.js'
                    , 'bower_components/**//angular/*.min.js'
                    , 'bower_components/**//angular-route/angular-route.min.js'
                    , 'bower_components/**//angular-sanitize/angular-sanitize.min.js'
                    , 'bower_components/**//angular-bootstrap/ui-bootstrap-tpls.min.js'
                    , 'bower_components/**//lodash/lodash.min.js'
                    , 'bower_components/**//ngwigets/**/'])
      .pipe(plumber({
          errorHandler: onError
      }))
      //.pipe(concat('libs.js'))
      .pipe(gulp.dest('wwwroot/core/lib/bower/./'));
});

gulp.task('uglifyalljs', function () {
    return gulp.src(['wwwroot/**/*.js', '!/**/*.min.js', '!wwwroot/core/lib/**/*', '!wwwroot/core/common/**/*'], { base: 'wwwroot/./' })
      .pipe(plumber({
          errorHandler: onError
      }))
     .pipe(sourcemaps.init())
     .pipe(uglify())
     .pipe(rename({
         extname: '.min.js'
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('wwwroot/./'));
});

gulp.task('minifycss', function () {
    return gulp.src(['wwwroot/**/*.css', '!wwwroot/**/*.min.css', '!wwwroot/core/lib/**/*'], { base: 'wwwroot/./' })
      .pipe(plumber({
          errorHandler: onError
      }))
     .pipe(sourcemaps.init())
     .pipe(minifycss())
     .pipe(rename({
         extname: '.min.css'
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('wwwroot/./'));
});

gulp.task('minifyhtml', function () {
    return gulp.src(['wwwroot/**/*.html', '!/**/*.min.html', '!wwwroot/core/lib/**/*'], { base: 'wwwroot/./' })
      .pipe(plumber({
          errorHandler: onError
      }))
     .pipe(sourcemaps.init())
     .pipe(minifyhtml())
     .pipe(rename({
         extname: '.min.html'
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('wwwroot/./'));
});

gulp.task('minifyimage', function () {
    return gulp.src(['wwwroot/**/*.{png,jpg,gif,ico}', '!wwwroot/core/lib/**/*.*', '!wwwroot/core/css/**/*.*'])
      .pipe(plumber({
          errorHandler: onError
      }))
    .pipe(imagemin({ progressive: true, optimizationLevel: 7, use: [pngquant()] }))
    .pipe(gulp.dest('wwwroot/./'));
});

// -------------------------------------------------
// Grunt configuration
require('gulp-grunt')(gulp, {
    // These are the default options but included here for readability.
    base: null,
    prefix: 'grunt-',
    verbose: false
});
// -------------------------------------------------

gulp.task('jshint', function () {
    return gulp.src(['./wwwroot/**/*.js', '!wwwroot/core/lib/**/*.*', '!**/*.min.js', '!wwwroot/core/css/**/*.*'])
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('gulp-jshint-html-reporter', { filename: 'jshint-output.html' }))
    ;
});


gulp.task('tscompile', function () {
    return gulp.src(['./wwwroot/**/*.ts', '!wwwroot/core/lib/**/*.*', '!wwwroot/core/css/**/*.*'])
      .pipe(plumber({
          errorHandler: onError
      }))
    .pipe(sourcemaps.init())
    .pipe(ts({
        target: 'ES5',
        declarationFiles: false,
        noExternalResolve: true
    }))
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('wwwroot/./'));
});


gulp.task('tslint', function () {
    return gulp.src(['./wwwroot/**/*.ts', '!wwwroot/core/lib/**/*.*', '!wwwroot/core/css/**/*.*'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(tslint())
        .pipe(tslint.report('verbose', {
            emitError: false,
            sort: true,
            bell: true
        }));
});

gulp.task('sass', function () {
    gulp.src('./wwwroot/**/*.scss', { base: 'wwwroot/./' })
      .pipe(plumber({
          errorHandler: onError
      }))
        .pipe(sass())
        .pipe(gulp.dest('wwwroot/./'));
});

// ---------------------------------------------------------------
// Watch specific tasks.  This is to support the use of newer.
// ---------------------------------------------------------------
gulp.task('watch:annotate', function () {
    return gulp.src(['src/index.controller.js', 'src/core/**/*.js', 'src/apps/**/*.js', '!src/core/lib/**/*', '!/**/*.min.js'], { base: 'src/./' })
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(newer('src/./'))
      .pipe(ngAnnotate())
      .pipe(gulp.dest('src/./'));
});


gulp.task('replaceEnvironment', function () {
    // Get the environment from the command line
    var env = args.env || 'localdev';

    // Read the settings from the right file
    var filename = 'env.config.' + env + '.json';
    var settings = JSON.parse(fs.readFileSync('wwwroot/' + filename, 'utf8'));

    // Replace each placeholder with the correct value for the variable.  
    gulp.src('wwwroot/app.js')
      .pipe(replace({
          patterns: [
            {
                match: 'qualityApi',
                replacement: settings.qualityApi
            }
          ]
      }))
      .pipe(gulp.dest('wwwroot/./'));
});





// ----------------------------------------------------------------
// Default Task
// ----------------------------------------------------------------
gulp.task('default', function () {
    runSequence('annotate', 'clean-dist', 'copy', 'copyFromApps', 'replaceEnvironment',
                ['coreservices', 'routeconfig', 'libs', 'minifyhtml', 'minifyimage'
                    , 'grunt-merge-json:menu', 'jshint', 'tscompile', 'tslint', 'sass']
                , ['uglifyalljs', 'minifycss']
                , 'watch');
});



gulp.task('watch', function () {

    // ---------------------------------------------------------------
    // Watching JS files
    // ---------------------------------------------------------------
    // Copy all files except *.js files.
    gulp.watch(['src/**/*', '!src/**/*.js', '!bower_components/**.*'], function () { runSequence('copy'); });

    // Annotates and copies *.js files
    gulp.watch(['src/**/*.js',
        '!src/core/config/route.config.js', '!src/apps/**/route.config.js',
        '!bower_components/**/*.js'], function () { runSequence('watch:annotate', 'copy'); });

    // routeConfig file changes.
    gulp.watch(['src/core/config/route.config.js', 'src/apps/**/route.config.js'], function () { runSequence('routeconfig'); });

    // Uglify JS files
    gulp.watch(['wwwroot/**/*.js', '!wwwroot/**/*.min.js', '!wwwroot/core/lib/**/*', '!wwwroot/core/common/**/*'], function () { runSequence('uglifyalljs'); });


    // ---------------------------------------------------------------
    // Watching Bower components
    // ---------------------------------------------------------------        
    gulp.watch(['bower_components/**/*.js'], function () { runSequence('libs'); });
    // TODO: Add other bower component types like css, scss and images


    // ---------------------------------------------------------------
    // Watching css and scss files
    // ---------------------------------------------------------------
    gulp.watch(['wwwroot/**/*.css', '!wwwroot/**/*.min.css', '!wwwroot/core/lib/**/*'], function () { runSequence('minifycss'); });
    gulp.watch(['wwwroot/**/*.scss', '!wwwroot/core/lib/**/*'], function () { runSequence('sass'); });

    // ---------------------------------------------------------------
    // Watching TypeScript files
    // ---------------------------------------------------------------
    gulp.watch(['wwwroot/**/*.ts', '!wwwroot/core/lib/**/*.*', '!wwwroot/core/css/**/*.*'], function () { runSequence('tscompile'); });

    // ---------------------------------------------------------------
    // Watch - Execute linters
    // ---------------------------------------------------------------
    gulp.watch(['wwwroot/**/*.ts', '!wwwroot/core/lib/**/*.*', '!wwwroot/core/css/**/*.*'], function () { runSequence('tslint'); });
    //gulp.watch(['wwwroot/**/*.js', '!wwwroot/core/lib/**/*.*', '!wwwroot/**/*.min.js', '!wwwroot/core/css/**/*.*'], function() { runSequence('jshint'); });


    gulp.watch(['wwwroot/**/*.js', '!wwwroot/core/lib/**/*.*', '!wwwroot/**/*.min.js', '!wwwroot/core/css/**/*.*'], ['jshint']);

    gulp.watch(['wwwroot/**/*.html', '!wwwroot/**/*.min.html', '!wwwroot/core/lib/**/*'], ['minifyhtml']);

});

