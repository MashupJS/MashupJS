---
title: Gulp Tutorial - Part 10 JSON & Calling Grunt From Gulp
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

#Gulp Tutorial - Part 10
##JSON & Calling Grunt From Gulp


On occasion you might need to combine JSON files.  The MashupJS allows each app in the apps folder to define its own menu items.  At build time we need these JSON files to be combined and saved with a specific file name so the menu.html template has access to all the menu items.
<br>
####Edge case: Calling Grunt tasks from Gulp
<br>
So as it turns out, some of our favorite plugins used in Grunt are not available in Gulp.  Before using Gulp I used Grunt and a plugin named “grunt-merge-json” to combine separate JSON files.  Not only did it combine the JSON but merged them and eliminated duplication.  I tried several Gulp plugins but nothing worked as expected.  In time, a developer will build this plugin for Gulp but until then we can execute Grunt commands from our Gulp implementation.
<br>
####From the command-line install
```javascript
npm install -g grunt-cli
npm install grunt-merge-json --save-dev
```
<br>
####Create a Gruntfile
Create a basic Gruntfile.js with the following content, in the root of your project.
```
module.exports = function (grunt) {

    grunt.initConfig({
        distFolder: 'dist',

        pkg: grunt.file.readJSON('package.json'),
        "merge-json": {

            menu: {
                src: ['src/apps/**/menu.json.txt'],
                dest: '<%= distFolder %>/menu.json.txt',
            },
        },
    });

    // Load modules, register tasks
    grunt.loadNpmTasks('grunt-merge-json');
};
```
<br>
####Install Gulp-Grunt from the command-line
```npm install gulp-grunt --save-dev```
<br>
####For more information
https://www.npmjs.com/package/gulp-grunt
<br>
####Add Grunt configuration to Gulp
Place this Grunt configuration code in the gulpfile.js just as you would with any other task.
```javascript
// -------------------------------------------------
// Grunt configuration
require('gulp-grunt')(gulp, {
    // These are the default options but included here for readability.
    base: null,
    prefix: 'grunt-',
    verbose: false
});
// -------------------------------------------------
```
<br>
These are default configurations.  The base represents the path to the Gruntfile.js.  Because the Gruntfile.js is in the root folder base: can be null.
<br>
We can now call the Grunt task the same way we would a Gulp task but with the prefix “grunt=”.
<br>
####Test Grunt Plugin
```Gulp grunt-merge-json:menu```
<br>
####Add the new Grunt task to the default task.
```javascript
gulp.task('default', function () {
    runSequence('annotate', 'clean-dist', 'copy',
                ['coreservices', 'routeconfig', 'libs', 'minifyhtml', 'minifyimage'
                    , 'grunt-merge-json:menu'],
                ['uglifyalljs', 'minifycss']);
});
```
<br>
####Run the default task
```gulp```

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/10%20Part%2010/1.png)


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