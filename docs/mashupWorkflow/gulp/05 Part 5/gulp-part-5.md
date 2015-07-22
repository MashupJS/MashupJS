---
title: Gulp Tutorial - Part 5 Handling Errors with Plumber
tags: 
- AngularJS
- Bootstrap
- Router
- Gulp
- Bower
- npm
- nodejs
- github
- VSC
- Visual Studio Code
- Sequence
- Parallel
- Plumber

---

###http://robertdunaway.github.io
###http://mashupjs.github.io


The **Mashup** is a learning tool that serves as a seed project for line-of-business applications.  It's goal is a shortened *learning curve* for building modern business applications and the reduction of *technical debt*.
<br>

 <img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/bookcoverimage.PNG" alt="Smiley face" height="100" width="100"> 

This tutorial and more can be found in
####[Gulp - Quick guide to getting up and running today](http://www.amazon.com/Gulp-Quick-guide-getting-running-ebook/dp/B010NXMFF6/)

#Gulp Tutorial - Part 5
##Handling Errors with Plumber

<br>

####From the command-line install
npm install gulp-plumber `--save-dev`

<br>

####Add the module to the Gulp file

    , plumber = require('gulp-plumber');

<br>

Add this to the top of your script file.  Our **plumber** will use this function for logging errors to the console.

<br>

```javascript
var onError = function(err) {
    console.log(err);
};
```

<br>

Here is what a task might look like with the **plumber()** function. 
*(Don’t add this code)*

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

The following tutorials will implement this plumber function with each task we create.

<br>

Currently, your `gulpfile.js` should look like this:

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/05%20Part%205/1.png)

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