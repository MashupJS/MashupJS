---
title: Gulp Tutorial - Part 4 Sequence and Parallel Task Processing
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

---

###http://robertdunaway.github.io
###http://mashupjs.github.io


The **Mashup** is a learning tool that serves as a seed project for line-of-business applications.  It's goal is a shortened *learning curve* for building modern business applications and the reduction of *technical debt*.
<br>

 <img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/bookcoverimage.PNG" alt="Smiley face" height="100" width="100"> 

This tutorial and more can be found in
####[Gulp - Quick guide to getting up and running today](http://www.amazon.com/Gulp-Quick-guide-getting-running-ebook/dp/B010NXMFF6/)

#Gulp Tutorial - Part 4
##Sequence and Parallel Task Processing

The ability to execute Gulp tasks in sequence and parallel is still a moving target.  By default, Gulp leans toward executing all tasks in parallel because that is the more performant approach. 
 
<br>

The option I chose was “run-sequence”.  I chose this after battling with the other options.  The Gulp 4 release should resolve many of the issues I struggled with.

<br>

We have not yet created tasks but in preparation, install this plug-in.

<br>

####From the command-line install
```
npm install run-sequence --save-dev
```

####Add the module to the gulp file
```
, runSequence = require('run-sequence')
```
<br>
All tasks created in this tutorial will have no other dependencies except the tasks we execute via the Gulp default task.  The runSequence function will manage our dependencies.  Creating dependencies is a simple option provided by Gulp but this causes tight coupling between tasks.  

<br>

For instance, before optimizing files, we will clean out the distribution folder and then copy optimized files back to it.  During development, however, cleaning the distribution folder breaks when all files are not copied and optimized back to it.  An attempt to copy and optimize every file would cause a delay during development.

<br>

To resolve this, we will not tightly couple tasks, allowing all tasks to be executed when Gulp is run, but only the changes files are executed against when watching files during development.

<br>

Another example where sequence matters is how JavaScript is optimized.  Some JavaScript is found in *.js files while other JavaScript is found after the compilation of TypeScript down to JavaScript.  To minify and optimize JavaScript effectively, it’s better to perform the JavaScript Uglify after the *.ts, TypeScript, files have been transpiled.  So a dependency exists between TypeScript and JavaScript.

<br>

We can accomplish this with **runSequence()**.

<br>

Here is what a default task might look like when using the runSequence function to manage tasks.
*(Don’t add this code)*

<br>
```javascript
gulp.task('default', function() { runSequence('clean-dist',
                                  'annotate',
                                  'copy',
                                  ['coreservices', 'routeconfig', 'sass', 'tscompile', 'libs', 'grunt-merge-json:menu', 
                                      'tslint', 'jshint', 'minifyhtml', 'minifyimage'],
                                  ['uglifyalljs', 'minifycss'],
                                  'watch'
                                          );
});
```

####Here is the sequence of execution
1 clean-dist
<br>
2 annotate
<br>
3 copy
<br>
4 (run in parallel) coreservices, routeconfig, sass, tscompile, libs, grunt-merge-json:menu, tslint, jshint, minifyhtml, minifyimage
<br>
5 uglifyalljs, minifycss
<br>
6 watch
<br>
These are all tasks you will have created by the end of this multi-part tutorial.

####Optimizing task performance

Notice the number of tasks executed in step 4.  The more tasks you can run in parallel, the faster your process will be.  It’s important to optimize your process as much as possible so you can change a piece of code and immediately execute the optimized version without delay.

####Other options
Gulp 4.0 will have new methods series() and parallel(). This will be the preferred approach once released.

<br>

Orchestrator – is an NPM module that supports series and parallel processing.


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