---
title: Gulp Tutorial - Part 11 JSHINT
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

#Gulp Tutorial - Part 11
##JSHINT

JSHint is a static analysis tool used to analyze JavaScript code for quality and standards/style enforcement.  The example below demonstrates how to analyze your code but it can also be piped into transpilation of code from TypeScript to JavaScript.
<br>

####Install the gulp-jshint, jshint-stylish, and gulp-jshint-html-reporter.
```javascript
npm install gulp-jshint --save-dev
npm install jshint-stylish --save-dev
npm install gulp-jshint-html-reporter --save-dev
```
<br>
####Add the new plugins to your Gulp required list
```
, jshint                = require('gulp-jshint')
, stylish               = require('jshint-stylish')
, jshintfileoutput      = require('gulp-jshint-html-reporter')
```
<br>
####Add the new task to your gulpfile.js
```
gulp.task('jshint', function () {
    //gulp.task('jshint', ['copy', 'tscompile'], function () {
    return gulp.src(['./dist/**/*.js', '!dist/core/lib/**/*.*', '!**/*.min.js', '!dist/core/css/**/*.*'])
      .pipe(plumber({
          errorHandler: onError
      }))
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('gulp-jshint-html-reporter', { filename: 'jshint-output.html' }))
    ;
});
```
<br>
####Creating a .jshintrc file
You can customize your own jshint rules in a file called .jshintrc.  I’m starting with options recommended by John Papa. 
https://github.com/johnpapa/angular-styleguide#use-an-options-file

<br>
####.jshintrc TIP
You cannot easily create files beginning with a dot in Windows. 
<br>
Steps to create the .jshintrc file:

•	Create a file named “.jshintrc.” in the root alongside gulpfile.js and Gruntfile.js.  Notice the ending dot.  You must do this from Explorer.
•	Windows will prompt you to confirm the extension.  
•	Finally Windows simply removes the ending dot for you.  Now you have the file “.jshintrc”.
•	If you are using Visual Studio .NET or some other IDE, you can now go and add the existing file to your project.
<br>
####.jshintrc content
We are going to use the options promoted by John Papa.
<br>
Copy and paste this into your new .jshintrc file or visit John Papa’s page with the link above to see if any new updates have become available.
```javascript
{
    "bitwise": true,
    "camelcase": true,
    "curly": true,
    "eqeqeq": true,
    "es3": false,
    "forin": true,
    "freeze": true,
    "immed": true,
    "indent": 4,
    "latedef": "nofunc",
    "newcap": true,
    "noarg": true,
    "noempty": true,
    "nonbsp": true,
    "nonew": true,
    "plusplus": false,
    "quotmark": "single",
    "undef": true,
    "unused": false,
    "strict": false,
    "maxparams": 10,
    "maxdepth": 5,
    "maxstatements": 40,
    "maxcomplexity": 8,
    "maxlen": 120,

    "asi": false,
    "boss": false,
    "debug": false,
    "eqnull": true,
    "esnext": false,
    "evil": false,
    "expr": false,
    "funcscope": false,
    "globalstrict": false,
    "iterator": false,
    "lastsemic": false,
    "laxbreak": false,
    "laxcomma": false,
    "loopfunc": true,
    "maxerr": false,
    "moz": false,
    "multistr": false,
    "notypeof": false,
    "proto": false,
    "scripturl": false,
    "shadow": false,
    "sub": true,
    "supernew": false,
    "validthis": false,
    "noyield": false,

    "browser": true,
    "node": true,

    "globals": {
        "angular": false,
        "$": false
    }
}
```
<br>
####Using JSHint reporters
Reporters receive feedback from JSHint and format it into something human readable.  By default, you’ll get raw text from JSHint and it will be displayed at the command line.  Adding the `jshint-stylish` plugin and passing it to the `jshint.reporter(stylish)` gives you a more readable output to the command line.  

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/11%20Part%2011/1.png)

<br>

Taking this concept a step further, the `gulp-jshint-html-reporter` generates an html document, as the name of the plugin implies.
<br> 
####For more information
https://www.npmjs.com/package/gulp-jshint-html-reporter
https://github.com/ivan-vesely/gulp-jshint-html-reporter
<br>
There isn’t much in the way of documentation but the source code is available and you have access to the author here. 
<br>
![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/11%20Part%2011/2.png)
<br>
####Options list
http://jshint.com/docs/options/
<br>
####For more information
https://www.npmjs.com/package/gulp-jshint
<br>
####Run the default task
```gulp```

<br>
![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/11%20Part%2011/3.png)
<br>

>####Tip
The jshint-output.html file is a good indicator of how your recent changes might have deviated from your standard or best practices.  By checking this file into source control you can see if the file changes.  If it does not, then no new errors are being reported.  If it does change, then either old errors have been corrected or new errors have been detected.

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