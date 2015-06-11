
var onError = function(err) {
    console.log(err);
};

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
    , runSequence = require('run-sequence')
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
      .pipe(plumber({
        errorHandler: onError
      })) 
      .pipe(ngAnnotate())
      .pipe(gulp.dest('src/./'));
});

gulp.task('clean-dist', function () {
    return gulp.src('dist', { read: false })
      .pipe(plumber({
        errorHandler: onError
      }))
      .pipe(clean());
});

gulp.task('copy', function () {
    return gulp.src('src/**/*')
      .pipe(plumber({
        errorHandler: onError
      }))    
    .pipe(newer('dist'))  // This is the only thing that seems to take advantage of newer. The rest failt to initially build if we use newer.
    .pipe(gulp.dest('dist'));
});

gulp.task('coreservices', function () {
    // gulp.task('coreservices', ['copy'], function () {
    return gulp.src('src/core/common/**/*')
      .pipe(plumber({
        errorHandler: onError
      }))    
      .pipe(concat('core.services.js'))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('routeconfig', function () {
    // gulp.task('routeconfig', ['copy'], function () {
    return gulp.src(['src/core/config/route.config.js', 'src/apps/**/route.config.js'])
      .pipe(plumber({
        errorHandler: onError
      }))    
      .pipe(concat('route.config.js'))
      .pipe(gulp.dest('./dist/'));
});

// Note minified by this build process so it can be copied as soon as the dist is cleaned.
gulp.task('libs', function () {
    return gulp.src(['bower_components/**/*.js'])
      .pipe(plumber({
        errorHandler: onError
      }))    
      // .pipe(newer('dist/core/lib/'))
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/core/lib/'));
});

gulp.task('uglifyalljs', function () {
    //gulp.task('uglifyalljs', ['copy', 'coreservices', 'routeconfig', 'tscompile'], function () {
    return gulp.src(['dist/**/*.js', '!/**/*.min.js', '!dist/core/lib/**/*', '!dist/core/common/**/*'], { base: 'dist/./' })
      .pipe(plumber({
        errorHandler: onError
      }))    
     .pipe(sourcemaps.init())
    //  .pipe(newer('dist/./'))
     .pipe(uglify())
     .pipe(rename({
         extname: '.min.js'
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('dist/./'));
});

gulp.task('minifycss', function () {
    //gulp.task('minifycss', ['copy', 'jshint'], function () {
    return gulp.src(['dist/**/*.css', '!/**/*.min.css', '!dist/core/lib/**/*'], { base: 'dist/./' })
      .pipe(plumber({
        errorHandler: onError
      }))    
    //  .pipe(newer('dist/./'))
     .pipe(sourcemaps.init())
     .pipe(minifycss())
     .pipe(rename({
         extname: '.min.css'
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('dist/./'));
});

gulp.task('minifyhtml', function () {
    //gulp.task('minifyhtml', ['copy'], function () {
    return gulp.src(['dist/**/*.html', '!/**/*.min.html', '!dist/core/lib/**/*'], { base: 'dist/./' })
      .pipe(plumber({
        errorHandler: onError
      }))    
    //  .pipe(newer('dist/./'))
     .pipe(sourcemaps.init())
     .pipe(minifyhtml())
     .pipe(rename({
         extname: '.min.html'
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('dist/./'));
});

gulp.task('minifyimage', function () {
    //gulp.task('minifyimage', ['copy'], function () {
    return gulp.src(['dist/**/*.{png,jpg,gif,ico}', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'])
      .pipe(plumber({
        errorHandler: onError
      }))     
    // .pipe(newer('dist/./'))
    .pipe(imagemin({ progressive: true, optimizationLevel: 7, use: [pngquant()] }))
    .pipe(gulp.dest('dist/./'));
});


gulp.task('tscompile', function () {
    //gulp.task('tscompile', ['copy'], function () {
    return gulp.src(['./dist/**/*.ts', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'])
      .pipe(plumber({
        errorHandler: onError
      }))
    // .pipe(newer('dist/./'))  
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


gulp.task('sass', function () {
    //gulp.task('sass', ['copy'], function () {
    gulp.src('./dist/**/*.scss', { base: 'dist/./' })
      .pipe(plumber({
        errorHandler: onError
      }))
       
    //  .pipe(newer('dist/./'))
        .pipe(sass())
        // Catch any SCSS errors and prevent them from crashing gulp
        .on('error', function (error) {
            console.error(error);
            this.emit('end');
        })
        .pipe(gulp.dest('dist/./'));

});


gulp.task('tslint', function () {
    //gulp.task('tslint', ['copy'], function () {
    return gulp.src(['./dist/**/*.ts', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'])
      .pipe(plumber({
        errorHandler: onError
      }))
       
    //  .pipe(newer('dist/./'))
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
gulp.task('jshint', function () {
    //gulp.task('jshint', ['copy', 'tscompile'], function () {
    return gulp.src(['./dist/**/*.js', '!dist/core/lib/**/*.*', '!**/*.min.js', '!dist/core/css/**/*.*'])
      .pipe(plumber({
        errorHandler: onError
      })) 
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('gulp-jshint-html-reporter', { filename: 'jshint-output.html' }))
    ;
});



// TODO: Explain what is happening.
// Why we have Build, Watch, and Default
// I was able to shave a second off by combining many tasks to run in parallel.

gulp.task('default', ['build'], function () {

});

gulp.task('build', function() {
      runSequence('clean-dist',
                'annotate',
                'copy',
                ['coreservices', 'routeconfig', 'sass', 'tscompile', 'libs', 'grunt-merge-json:menu', 
                    'tslint', 'jshint', 'minifyhtml', 'minifyimage'],
                ['uglifyalljs', 'minifycss'],
                'watch'
              );
});

gulp.task('watch', function() {
    
    gulp.watch(['src/**/*'], function() { 
        // console.log('watch is executing...');
        runSequence('copy',
                ['coreservices', 'routeconfig', 'sass', 'tscompile', 'libs', 'grunt-merge-json:menu', 
                    'tslint', 'jshint', 'minifyhtml', 'minifyimage'],
                ['uglifyalljs', 'minifycss']
              );
    });
    
    // // Any change in the 'src' folder is copies over to 'dist'.
    // gulp.watch(['src/**/*', 
    //     '!src/core/common/**/*', '!src/core/config/route.config.js', '!src/apps/**/route.config.js'], 
    //     function() { runSequence('annotate', 'copy' );  });
    // 
    // // concatinate all mashup core common js.
    // gulp.watch(['src/core/common/**/*'], function() { runSequence('coreservices');  });
    // 
    // // concatinate all routeconfig.js files.
    // gulp.watch(['src/core/config/route.config.js', 'src/apps/**/route.config.js'], function() { runSequence('routeconfig');  });
    // 
    
});


// gulp.task('routeconfig', function () {
//     // gulp.task('routeconfig', ['copy'], function () {
//     return gulp.src(['src/core/config/route.config.js', 'src/apps/**/route.config.js'])
//       .pipe(plumber({
//         errorHandler: onError
//       }))    
//       .pipe(concat('route.config.js'))
//       .pipe(gulp.dest('./dist/'));
// });
// 
// // Note minified by this build process so it can be copied as soon as the dist is cleaned.
// gulp.task('libs', function () {
//     return gulp.src(['bower_components/**/*.js'])
//       .pipe(plumber({
//         errorHandler: onError
//       }))    
//       // .pipe(newer('dist/core/lib/'))
//       .pipe(concat('libs.js'))
//       .pipe(gulp.dest('dist/core/lib/'));
// });
// 
// gulp.task('uglifyalljs', function () {
//     //gulp.task('uglifyalljs', ['copy', 'coreservices', 'routeconfig', 'tscompile'], function () {
//     return gulp.src(['dist/**/*.js', '!/**/*.min.js', '!dist/core/lib/**/*', '!dist/core/common/**/*'], { base: 'dist/./' })
//       .pipe(plumber({
//         errorHandler: onError
//       }))    
//      .pipe(sourcemaps.init())
//     //  .pipe(newer('dist/./'))
//      .pipe(uglify())
//      .pipe(rename({
//          extname: '.min.js'
//      }))
//      .pipe(sourcemaps.write('./'))
//      .pipe(gulp.dest('dist/./'));
// });
// 
// gulp.task('minifycss', function () {
//     //gulp.task('minifycss', ['copy', 'jshint'], function () {
//     return gulp.src(['dist/**/*.css', '!/**/*.min.css', '!dist/core/lib/**/*'], { base: 'dist/./' })
//       .pipe(plumber({
//         errorHandler: onError
//       }))    
//     //  .pipe(newer('dist/./'))
//      .pipe(sourcemaps.init())
//      .pipe(minifycss())
//      .pipe(rename({
//          extname: '.min.css'
//      }))
//      .pipe(sourcemaps.write('./'))
//      .pipe(gulp.dest('dist/./'));
// });
// 
// gulp.task('minifyhtml', function () {
//     //gulp.task('minifyhtml', ['copy'], function () {
//     return gulp.src(['dist/**/*.html', '!/**/*.min.html', '!dist/core/lib/**/*'], { base: 'dist/./' })
//       .pipe(plumber({
//         errorHandler: onError
//       }))    
//     //  .pipe(newer('dist/./'))
//      .pipe(sourcemaps.init())
//      .pipe(minifyhtml())
//      .pipe(rename({
//          extname: '.min.html'
//      }))
//      .pipe(sourcemaps.write('./'))
//      .pipe(gulp.dest('dist/./'));
// });
// 
// gulp.task('minifyimage', function () {
//     //gulp.task('minifyimage', ['copy'], function () {
//     return gulp.src(['dist/**/*.{png,jpg,gif,ico}', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'])
//       .pipe(plumber({
//         errorHandler: onError
//       }))     
//     // .pipe(newer('dist/./'))
//     .pipe(imagemin({ progressive: true, optimizationLevel: 7, use: [pngquant()] }))
//     .pipe(gulp.dest('dist/./'));
// });
// 
// 
// gulp.task('tscompile', function () {
//     //gulp.task('tscompile', ['copy'], function () {
//     return gulp.src(['./dist/**/*.ts', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'])
//       .pipe(plumber({
//         errorHandler: onError
//       }))
//     // .pipe(newer('dist/./'))  
//     .pipe(sourcemaps.init())
//     .pipe(ts({
//         target: 'ES5',
//         declarationFiles: false,
//         noExternalResolve: true
//     }))
// 
//     // Exporting the ES5 .js file.  This is never used so you can remove the following two lines.
//     // You might want to keep them so you can evaluate how TypeScript is transpiling your JavaScript.
//     // This also gives JSHint a shot at linting the JavaScript version of your TypeScript code.
//     .pipe(rename({ extname: '.js' }))
//     .pipe(gulp.dest('dist/./'))
// 
//     // Creating the optimized JavaScript file.
//     .pipe(uglify())
//     .pipe(rename({ extname: '.min.js' }))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('dist/./'));
// });
// 
// 
// gulp.task('sass', function () {
//     //gulp.task('sass', ['copy'], function () {
//     gulp.src('./dist/**/*.scss', { base: 'dist/./' })
//       .pipe(plumber({
//         errorHandler: onError
//       }))
//        
//     //  .pipe(newer('dist/./'))
//         .pipe(sass())
//         // Catch any SCSS errors and prevent them from crashing gulp
//         .on('error', function (error) {
//             console.error(error);
//             this.emit('end');
//         })
//         .pipe(gulp.dest('dist/./'));
// 
// });
// 
// 
// gulp.task('tslint', function () {
//     //gulp.task('tslint', ['copy'], function () {
//     return gulp.src(['./dist/**/*.ts', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'])
//       .pipe(plumber({
//         errorHandler: onError
//       }))
//        
//     //  .pipe(newer('dist/./'))
//         .pipe(tslint())
//         .pipe(tslint.report('verbose', {
//             emitError: false,
//             sort: true,
//             bell: true
//         }));
// });
// 
// // Make sure this doesn't run until all JavaScript is ready.  IE: If TypeScript is added then
// // either execute as part of the transpilation from TypeScript to JavaScript or create a dependency
// // ,here, for the Transpilation task to complete before starting jshint.
// // Long term all JavaScript will come from TypeScript and will simplify and speed up this task overall.
// gulp.task('jshint', function () {
//     //gulp.task('jshint', ['copy', 'tscompile'], function () {
//     return gulp.src(['./dist/**/*.js', '!dist/core/lib/**/*.*', '!**/*.min.js', '!dist/core/css/**/*.*'])
//       .pipe(plumber({
//         errorHandler: onError
//       })) 
//       .pipe(jshint('.jshintrc'))
//       .pipe(jshint.reporter(stylish))
//       .pipe(jshint.reporter('gulp-jshint-html-reporter', { filename: 'jshint-output.html' }))
//     ;
// });
// 
