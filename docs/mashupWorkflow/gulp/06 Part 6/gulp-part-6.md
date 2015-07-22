---
title: Gulp Tutorial - Part 6 Optimizing Javascript/Typescript
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

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/06%20Part%206/1.png)

<br>

####For more information
http://christian.fei.ninja/DRY-dependency-injection-in-Angular-with-gulp-ng-annotate/


##Clean out 'DIST'

Now, let’s clean out our ‘dist’ folder so we’re starting afresh.  Execute the following from PowerShell.

<br>
####From the command-line install

```npm install gulp-clean --save-dev```

<br>
####Add the module to the Gulp file
```
, clean = require('gulp-clean')
Add the task to the Gulp file
gulp.task('clean-dist', function () {
    return gulp.src('dist', { read: false })
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(clean());
});
```

<br>
####Add the new task to the default task
This task will run in sequence after the annotate task completes.

```
gulp.task('default', function () {
    runSequence('annotate', 'clean-dist');
});
```

<br>
####Run the default task
```gulp```

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/06%20Part%206/2.png)

<br>

####For more information
https://www.npmjs.com/package/gulp-clean

<br>

##COPY ALL SRC FILES TO ‘DIST’
<br>
We will keep our source (‘scr’) code separate from our distribution code so we don’t pollute our development environment.  When executing the application we’ll set the index.html file of the ‘dist’ folder as the startup.  This approach might seem to introduce challenges because when debugging you’ll need the ability to read the compressed and minified versions of JavaScript and CSS.  Gulp will give us that ability.
<br>
Now that we’ve cleaned out the ‘dist’ folder, in preparation for new files, let’s go ahead and copy all our source code to ‘dist’.  Once we’ve copied the source code we can begin running tasks to optimize our code.
<br>
The newer module can be used by any task to ensure only the changed file is streamed to the task.  This increases performance especially during development when only a single files is changed.
<br>
####From the command-line install
Npm install gulp-newer --save-dev
<br>
####Add the module to the Gulp file
, newer = require('gulp-newer')
<br>
 
####Add the task to the Gulp file

```
gulp.task('copy', function () {
    return gulp.src('src/**/*')
      .pipe(plumber({
          errorHandler: onError
      }))
    .pipe(newer('dist')) 
    .pipe(gulp.dest('dist'));
});
```
<br>
####Add the new task to the default task

```
gulp.task('default', function () {
    runSequence('annotate', 'clean-dist', 'copy');
});
```
<br>
####Run the default task
The Gulp command and the dist folder will be deleted and rebuilt.

```Gulp```

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/06%20Part%206/3.png)

<br>

####For more information 
https://www.npmjs.com/package/gulp-newer

<br>

##CONCATENATION
Before we minify our JavaScript files, let’s see if there are any files we wish to combine.  We could simply minify all JavaScript files, then concatenate them together, but then we would lose the ability to map minified code to source code for debugging purposes.  We will concatenate any code we desire and then execute a general minification task.
<br>
####From the command-line install
```npm install gulp-concat --save-dev```
<br>
####Add the module to the Gulp file
```, concat = require('gulp-concat')```

<br>
####Add the task to the Gulp file
Create a task that combines all the core/common files into one.
<br>
```
gulp.task('coreservices', function () {
    return gulp.src('src/core/common/**/*')
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(concat('core.services.js'))
      .pipe(gulp.dest('./dist/'));
});
```

<br> 
Create a task that combines all the route.config.js files together.
<br>
```
gulp.task('routeconfig', function () {
    return gulp.src(['src/core/config/route.config.js', 'src/apps/**/route.config.js'])
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(concat('route.config.js'))
      .pipe(gulp.dest('./dist/'));
});
```
<br>
>NOTE: This capability to combine the route config is what makes the drop-in application style of MashupJS work.

<br>
Now copy all your bower libraries together.  Typically, you’d combine as many of these files as possible.  For now, we will work with third party libraries as separate files.

<br>
```
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
                    , 'bower_components/**//lodash/lodash.min.js'])
      .pipe(plumber({
          errorHandler: onError
      }))
      //.pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/core/lib/bower/./'));
});
Add the new tasks to the default task

gulp.task('default', function () {
    runSequence('annotate', 'clean-dist', 'copy',
                ['coreservices', 'routeconfig', 'libs']);
});
```
<br>
####For additional documentation on gulp-concat: 

https://github.com/wearefractal/gulp-concat

<br>
####Run the default task
The Gulp command and the dist folder will be deleted and rebuilt.

```Gulp```

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/06%20Part%206/4.png)

<br>

####For more information
https://www.npmjs.com/package/gulp-concat

<br>


##COMPRESS AND MINIFY JAVASCRIPT

It’s finally time to minify and compress JavaScript files.  A normal solution would be to concatenate all *.js files into a single file name,”app.js” or “all.app.js” or something similar.  The MashupJS is built to scale so large that a single concatenated *.js file might become too large and lazy loading will be desired.
<br>
Here we will minify and compress individual JavaScript files.  Source maps will be created for troubleshooting and debugging.  Source maps link between the original source code and the optimized code.
<br>

####From the command-line install
```
npm install gulp-rename --save-dev
npm install gulp-uglify --save-dev
npm install gulp-sourcemaps --save-dev
```
<br>
####Add the new modules to the Gulp file
```
, rename                = require('gulp-rename')
, uglify                = require('gulp-uglify')
, sourcemaps            = require('gulp-sourcemaps')
```
<br>
####Add the task to the Gulp file
```
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
```
<br>
####Add the new task to the default task
```
gulp.task('default', function () {
    runSequence('annotate', 'clean-dist', 'copy',
                ['coreservices', 'routeconfig', 'libs'],
                ['uglifyalljs']);
});
```
<br>
Notice the “uglifyalljs” task is placed in sequence to execute only after the previous array of tasks executes.  This is to allow the “coreservices” and “routeconfig” JavaScripts to be created.  Then they can be optimized by “uglifyalljs”.
<br>

###Run the default task
<br>
```gulp```

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/06%20Part%206/5.png)

<br>


####For more information
https://www.npmjs.com/package/gulp-rename
https://www.npmjs.com/package/gulp-uglify
https://www.npmjs.com/package/gulp-sourcemaps


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