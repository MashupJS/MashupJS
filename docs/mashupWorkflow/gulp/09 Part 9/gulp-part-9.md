---
title: Gulp Tutorial - Part 9 Image Optimization
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

#Gulp Tutorial - Part 9
##Image Optimization


Install the `gulp-imagemin` and `imagemin-pngquant` plugins.  The gulp-imagemin comes with several optimizers for different image types, but does very little for PNG files.  The `imagemin-pngquant` will focus on optimizing PNG files.
<br>
I’ve decided to leave the third party libraries alone, but you might choose to optimize them as well.  This demo is focused on optimizing our own images.

<br>
####From the command-line install
```javascript
npm install gulp-imagemin --save-dev
npm install imagemin-pngquant --save-dev
```
<br>

####Add the modules to the Gulp file
```javascript
, imagemin              = require('gulp-imagemin')
, pngquant              = require('imagemin-pngquant')
```
<br>
####Add the task to the Gulp file
```javascript
gulp.task('minifyimage', function () {
    return gulp.src(['dist/**/*.{png,jpg,gif,ico}', '!dist/core/lib/**/*.*', '!dist/core/css/**/*.*'])
      .pipe(plumber({
          errorHandler: onError
      }))
    .pipe(imagemin({ progressive: true, optimizationLevel: 7, use: [pngquant()] }))
    .pipe(gulp.dest('dist/./'));
});
```
<br>
####Add the new task to the default task
```
gulp.task('default', function () {
    runSequence('annotate', 'clean-dist', 'copy',
                ['coreservices', 'routeconfig', 'libs', 'minifyhtml', 'minifyimage'],
                ['uglifyalljs', 'minifycss']);
});
```
####Run the default task
```gulp```

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/09%20Part%209/1.png)

<br>

####For more information
https://www.npmjs.com/package/gulp-imagemin
https://www.npmjs.com/package/imagemin-pngquant



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