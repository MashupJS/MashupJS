---
title: Gulp Tutorial - Part 7 Optimizing CSS
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
- CSS

---

###http://robertdunaway.github.io
###http://mashupjs.github.io


The **Mashup** is a learning tool that serves as a seed project for line-of-business applications.  It's goal is a shortened *learning curve* for building modern business applications and the reduction of *technical debt*.
<br>

 <img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/bookcoverimage.PNG" alt="Smiley face" height="100" width="100"> 

This tutorial and more can be found in
####[Gulp - Quick guide to getting up and running today](http://www.amazon.com/Gulp-Quick-guide-getting-running-ebook/dp/B010NXMFF6/)

#Gulp Tutorial - Part 7
##Optimizing CSS

CSS gives us another opportunity for optimization.  SASS is a higher-level language for CSS that can be transpiled down to CSS similar to how TypeScript is transpiled down to JavaScript.  Later in this tutorial, we will add a task for transpiling SASS to CSS.
<br>
In this task, we will optimize all existing CSS files.
<br>
####From the command-line install
```npm install gulp-minify-css --save-dev```
<br>
####Add the module to the Gulp file
```, minifycss             = require('gulp-minify-css')```
<br>
####Add the task to the Gulp file
```
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
```
<br> 
####Add the new task to the default task
```
gulp.task('default', function () {
    runSequence('annotate', 'clean-dist', 'copy',
                ['coreservices', 'routeconfig', 'libs'],
                ['uglifyalljs', 'minifycss']);
});
```
<br>
####Run the default task
```gulp```

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/07%20Part%207/1.png)

<br>


Rather than concatenating CSS files, we are simply minifying them in place and creating maps.  
<br>
Later, when transpiling from SASS, we won’t need concatenation because the “@import” statement will pull multiple source files together for us.
<br>
####For more information
https://www.npmjs.com/package/gulp-minify-css

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