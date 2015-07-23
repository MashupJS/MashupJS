---
title: Gulp Tutorial - Part 14 Watch
tags: 
- AngularJS
- Bootstrap
- Gulp
- Bower
- npm
- nodejs
- github
- Visual Studio Code
- Optimize
- JavaScript
- TypeScript

---

###http://robertdunaway.github.io
###http://mashupjs.github.io


The **Mashup** is a learning tool that serves as a seed project for line-of-business applications.  It's goal is a shortened *learning curve* for building modern business applications and the reduction of *technical debt*.
<br>

 <img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/bookcoverimage.PNG" alt="Smiley face" height="100" width="100"> 

This tutorial and more can be found in
####[Gulp - Quick guide to getting up and running today](http://www.amazon.com/Gulp-Quick-guide-getting-running-ebook/dp/B010NXMFF6/)

#Gulp Tutorial - Part 14
##Watch

Running the default task for Gulp, with all our tasks included, will consume more CPU and time than is required during development where files are changed one at a time.  For dealing with individual files as they change, we can use the Watch plugin.
<br>
When the Watch is triggered, gulp.watch tasks execute. 
<br>
####From the command-line install
```npm install gulp-watch --save-dev```
<br>
####Add the module to the Gulp file
```, watch = require('gulp-watch')```
<br>
 
####Add the task to the Gulp file
The “watch” task is large and uses many other tasks, so I place it at the bottom of the file so it is separate.
<br>
```javascript
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
    gulp.watch(['dist/**/*.js', '!dist/**/*.min.js', '!dist/core/lib/**/*', '!dist/core/common/**/*'], function () { runSequence('uglifyalljs'); });


    // ---------------------------------------------------------------
    // Watching Bower components
    // ---------------------------------------------------------------        
    gulp.watch(['bower_components/**/*.js'], function () { runSequence('libs'); });
    // TODO: Add other bower component types like css, scss and images


    // ---------------------------------------------------------------
    // Watching css and scss files
    // ---------------------------------------------------------------
    gulp.watch(['dist/**/*.css', '!dist/**/*.min.css', '!dist/core/lib/**/*'], function () { runSequence('minifycss'); });
    gulp.watch(['dist/**/*.scss', '!dist/core/lib/**/*'], function () { runSequence('sass'); });

    // ---------------------------------------------------------------
    // Watching TypeScript files
    // ---------------------------------------------------------------
    gulp.watch(['dist/**/*.ts', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'], function () { runSequence('tscompile'); });

    // ---------------------------------------------------------------
    // Watch - Execute linters
    // ---------------------------------------------------------------
    gulp.watch(['dist/**/*.ts', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'], function () { runSequence('tslint'); });
    //gulp.watch(['dist/**/*.js', '!dist/core/lib/**/*.*', '!dist/**/*.min.js', '!dist/core/css/**/*.*'], function() { runSequence('jshint'); });


    gulp.watch(['dist/**/*.js', '!dist/core/lib/**/*.*', '!dist/**/*.min.js', '!dist/core/css/**/*.*'], ['jshint']);

    // ---------------------------------------------------------------
    // Watching image files
    // ---------------------------------------------------------------
    // unable to get this watch to ever notice a file changed.  This will be handled on the initial build.
    //gulp.watch(['dist/**/*.{png,jpg,gif,ico}', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'], function() { runSequence('minifyimage'); });

});
```
<br>
####Add another task to the gulp file
Also add this supporting Watch task.  This helps improve performance with the “newer” plugin.
<br>
```javascript
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
```
<br>
####Add the new task to the default task
Add the new “watch” task to the default task.  The default task will execute all the tasks in the sequence specified by the runSequence function.  The last task run is the Watch task which contains 10 individual Watch tasks.  This time, when you run the Gulp default task, the command line will not return control to you.  To break out of this, press CTRL + C and then answer the prompt with “y”.
<br>
```javascript
gulp.task('default', function () {
    runSequence('annotate', 'clean-dist', 'copy',
                ['coreservices', 'routeconfig', 'libs', 'minifyhtml', 'minifyimage'
                    , 'grunt-merge-json:menu', 'jshint', 'tscompile', 'tslint', 'sass']
                , ['uglifyalljs', 'minifycss']
                ,'watch');
});
```
<br>
####Run the default task
```gulp```

<br>
![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/14%20Part%2014/1.png)
<br>

If you modify any files the Watch is configured to watch, then you’ll see tasks run.
<br>
Here is what happens after changing the index.controller.js file.
<br>
![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/14%20Part%2014/2.png)
<br>

First the annotate task runs against the changed JavaScript code.  Then the file is copied to the `dist` folder and minified by the `uglifyalljs` task.  Finally the JavaScript code is linted with the `jshint` task.

<br>

##Source code for this tutorial


Start the tutorial using this code base:  
####https://github.com/MashupJS/gulp-tutorial

<br>

A completed tutorial can be found here:  
####https://github.com/MashupJS/gulp-tutorial-end-result

<br>

 <img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/bookcoverimage.PNG" alt="Smiley face" height="100" width="100"> 

This tutorial and more can be found in
####[Gulp - Quick guide to getting up and running today](http://www.amazon.com/Gulp-Quick-guide-getting-running-ebook/dp/B010NXMFF6/)