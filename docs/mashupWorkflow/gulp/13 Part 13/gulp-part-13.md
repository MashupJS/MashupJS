---
title: Gulp Tutorial - Part 13 SASS
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

#Gulp Tutorial - Part 13
##SASS

For your SASS implementation, we will use the Gulp-SASS plugin.  
<br>
####From the command-line install
```npm install gulp-sass --save-dev```
<br>
####Add the module to the Gulp file
```, sass                  = require('gulp-sass')```
<br>
####Add the task to the Gulp file
```
gulp.task('sass', function () {
    gulp.src('./dist/**/*.scss', { base: 'dist/./' })
      .pipe(plumber({
          errorHandler: onError
      }))
        .pipe(sass())
        .pipe(gulp.dest('dist/./'));
});
```
<br>
####Add the new task to the default task
```
gulp.task('default', function () {
    runSequence('annotate', 'clean-dist', 'copy',
                ['coreservices', 'routeconfig', 'libs', 'minifyhtml', 'minifyimage'
                    , 'grunt-merge-json:menu', 'jshint', 'tscompile', 'tslint', 'sass'],
                ['uglifyalljs', 'minifycss']);
});
```
<br>
####Run the default task
```gulp```

<br>

####Learn more about SASS here
http://sass-lang.com/


<br>
![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/13%20Part%2013/1.png)
<br>



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