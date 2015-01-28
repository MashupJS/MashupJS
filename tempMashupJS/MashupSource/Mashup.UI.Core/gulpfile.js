var gulp = require('gulp')
    , uglify = require('gulp-uglify')
    , rename = require('gulp-rename')
    , sourcemaps = require('gulp-sourcemaps');

// default means this task will run whenever you type “gulp” at the command line without any parameters.
gulp.task('uglify:apps', function () {

    gulp.src(['core/apps/**/*.js', '!/**/*.min.js'])
        .pipe(rename({ extname: ".min.js" }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        //.pipe(sourcemaps.write("."))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('core/apps/'))
    ;

});


gulp.task('default', ['uglify:apps']);

// I couldn't get the unglify to work with maps.  The maps are created don't work
// correctly in the browsers.  Chrome loads the min.js file and the associated min.js.map
// file but doesn't associate them in the Source tab in the Debugger.  Firefox doesn't
// seem to be loading the min.js file or the min.js.map.  I have no idea if FF isn't
// loading them at all or if there is something I need to do so I can see them in the
// sources tab.  I've posted one post for Chrome and one for FF since they are different
// symptoms, they might be different problems.  

// Here is an answer I got on stackoverflow.com concerning gulp-uglify and sourcemaps
// http://stackoverflow.com/questions/27951517/gulp-sourcemaps-arent-loading-source-in-chrome
// I didn't change anything but I did install this npm
// npm install gulp-uglify@https://github.com/floridoo/gulp-uglify/tarball/sourcemap_fix --save-dev
// This solution did not fix the problem.  Just going to stick with Grunt for now.
