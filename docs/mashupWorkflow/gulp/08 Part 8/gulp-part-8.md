---
title: Gulp Tutorial - Part 8 Optimizing HTML
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

#Gulp Tutorial - Part 8
##Optimizing HTML
<br>
HTML presents another opportunity for optimization.  With every “bit” we can squeeze out of the code, the healthier is the application.  HTML optimization is more noticeable as the HTML file becomes larger.
<br>
####From the command-line install
```npm install gulp-minify-html --save-dev```
<br>
####Add the module to the Gulp file
```, minifyhtml            = require('gulp-minify-html')```
<br>
####Add the task to the Gulp file
```
gulp.task('minifyhtml', function () {
    return gulp.src(['dist/**/*.html', '!/**/*.min.html', '!dist/core/lib/**/*'], { base: 'dist/./' })
      .pipe(plumber({
          errorHandler: onError
      }))
     .pipe(sourcemaps.init())
     .pipe(minifyhtml())
     .pipe(rename({
         extname: '.min.html'
     }))
     .pipe(sourcemaps.write('./'))
     .pipe(gulp.dest('dist/./'));
});
```
<br>
Small templates won’t realize much improvement with HTML minification, but every little bit helps.  Larger HTML files will benefit, but while we’re at it, let’s just minify all HTML files.
<br>
####Add new task to the default task
```
gulp.task('default', function () {
    runSequence('annotate', 'clean-dist', 'copy',
                ['coreservices', 'routeconfig', 'libs', 'minifyhtml'],
                ['uglifyalljs', 'minifycss']);
});
```
<br>
####Run the default task
```gulp```

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/08%20Part%208/1.png)

<br>

####For more information on gulp-minify-html.
https://www.npmjs.com/package/gulp-minify-html

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