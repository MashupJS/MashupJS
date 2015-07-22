---
title: Gulp Tutorial - Part 6 Optimizing Javascript/Typescript
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

#Gulp Tutorial - Part 6
##Optimizing JavaScript/TypeScript


In this part of the tutorial, we are setting up our first Gulp task.

##Annotation
Before we concatenate and minify, let’s make sure our Angular code is in good shape.  To make a long story short…  Angular is based, largely, on the ability to directly inject dependencies.  This ability is made possible because the name of the injected dependency is interpreted.  As soon as a file is minified, function names are changed to ‘a’ or ‘b’ or whatever is the next available small variable name.  This breaks dependency injection.

<br>

Passing the dependency name as a string corrects this problem.  Static string names are not minified.  You can do this yourself or let Gulp run a task to do this for you.  Even if you decided to handle this while writing code, it’s a good idea to run an annotation task as a precaution.

<br>

####From the command-line install

    npm install gulp-ng-annotate --save-dev

<br>

####Add the module to the gulp file

    , ngAnnotate            = require('gulp-ng-annotate')

<br>
 
####Add task to Gulp file
```
gulp.task('annotate', function () {
    return gulp.src(['src/index.controller.js', 'src/core/**/*.js', 'src/apps/**/*.js', '!src/core/lib/**/*', '!src/**/*.min.js'], { base: 'src/./' })
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(ngAnnotate())
      .pipe(gulp.dest('src/./'));
});
```

<br>


The challenge presented by this task is updating the original files.  In most cases, the original files are left alone.  In this case, we can do the same, but since annotation is actually a correction to code, we will update the original code files.  To make this work, we are using the { base: ‘src/./’ } option. 

>TIP: To keep your tasks running fast, eliminate unnecessary processing by telling the task to ignore your JavaScript libraries, i.e., '!src/core/lib/**/*'

####Add the new task to the default task
gulp.task('default', function () {
    runSequence('annotate');
});

<br>
 
###Run the default task

    gulp

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