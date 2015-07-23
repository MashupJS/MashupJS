---
title: Gulp Tutorial - Part 15 Transforming Environment Variables
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

#Gulp Tutorial - Part 15
##Transforming Environment Variables

Most applications are expected to function in multiple environments.  When coding you expect the application to function in the local environment.  When you deploy to the test environment you expect it to function there and the same for production.
<br>
We will use Gulp to set an Angular constant used to build the connection URI to each WebApi.
<br>
Create a json file representing each possible environment in the “`src`” folder.
<br>
```env.config.localdev.json```
<br>
####Create this file with the following content.
```javascript
{ 
    "myFirstApi":  "http://localhost:52335",
    "mySecondApi":  "http://localhost:52336"
}
```
<br>
```env.config.dev.json```
####Create this file with the following content.
```javascript
{ 
    "myFirstApi":  "http://devFirstApi",
    "mySecondApi":  "http://devSecondApi"
}
```
<br>
```env.config.stage.json```
####Create this file with the following content.
```javascript
{ 
    "myFirstApi":  "http://stageFirstApi",
    "mySecondApi":  "http://stageSecondApi"
}
```
<br>
```env.config.prod.json```
####Create this file with the following content.
```javascript
{ 
    "myFirstApi":  "http://prodFirstApi",
    "mySecondApi":  "http://prodSecondApi"
}
```
<br>
Each file contains the connection string for each WebApi used.
<br>
####Create an Angular constant in the app.js file
```javascript
// ---------------------------------------------------------------------------------------------
// Application Constants
// ---------------------------------------------------------------------------------------------
mashupApp.constant('apiUrl', { 'myFirstApi': '@@myFirstApi' },
                             { 'mySecondApi': '@@mySecondApi' });
```
<br>
####From the command-line install
```javascript
npm install gulp-replace-task --save-dev
npm install yargs --save-dev
npm install fs --save-dev
```
<br>
 
####Add the module to the Gulp file
```javascript
    , replace               = require('gulp-replace-task')
    , args                  = require('yargs').argv
    , fs                    = require('fs')
```
<br>
####Add the task to the Gulp file
This will be different for your environment.  You might have a different path to your configuration files and WebApi names.
<br>
```javascript
gulp.task(' setEnv', function () {
    // Get the environment from the command line
    var env = args.env || 'localdev';

    // Read the settings from the right file
    var filename = 'env.config.' + env + '.json';
    var settings = JSON.parse(fs.readFileSync('dist/' + filename, 'utf8'));

    // Replace each placeholder with the correct value for the variable.  
    gulp.src('src/app.js')
      .pipe(replace({
          patterns: [
            {
                match: 'myFirstApi',
                replacement: settings. myFirstApi
            },
            {
                match: 'mySecondApi',
                replacement: settings. mySecondApi
            },
          ]
      }))
      .pipe(gulp.dest('dist/./'));
});
```
<br>
####Add the new task to the default task
```javascript
gulp.task('default', function () {
    runSequence('annotate', 'clean-dist', 'copy',
                ['coreservices', 'routeconfig', 'libs', 'minifyhtml', 'minifyimage'
                    , 'grunt-merge-json:menu', 'jshint', 'tscompile', 'tslint', 'sass'
                    , 'setEnv']
                , ['uglifyalljs', 'minifycss']
                , 'watch');
});
```
<br>
You can execute the task individually
The first option uses the prod configuration.  The second uses the default which happens to be the `localdev` configuration.
<br>
To change the environment manually execute the one of the following commands.  The first executes the setEnv task and passes in the --env parameter with the value of prod.  The `env.config.prod.json` file will be used.
<br>
```Gulp setEnv --env prod```
Or 
```Gulp setEnv```
<br>
####Before the app.js is changed by the setEnv task.
```javascript
// ---------------------------------------------------------------------------------------------
// Application Constants
// ---------------------------------------------------------------------------------------------
mashupApp.constant('apiUrl', { 'myFirstApi': '@@myFirstApi' },
                             { 'mySecondApi': '@@mySecondApi' });

 
Before the app.js is changed by the setEnv task.
// ---------------------------------------------------------------------------------------------
// Application Constants
// ---------------------------------------------------------------------------------------------
mashupApp.constant('apiUrl', { 'myFirstApi': 'http://localhost:52335' },
                             { 'mySecondApi': 'http://localhost:52336' });
```
<br>
####Add to the default task
I’ve added the setEnv to the early part of the default configure so it executes before the minification task is run.
<br>
```javascript
gulp.task('default', function () {
    runSequence('annotate', 'clean-dist', 'copy',
                ['coreservices', 'routeconfig', 'libs', 'minifyhtml', 'minifyimage'
                    , 'grunt-merge-json:menu', 'jshint', 'tscompile', 'tslint', 'sass'
                    , 'setEnv']
                , ['uglifyalljs', 'minifycss']
                , 'watch');
});
```
<br>
Now I can simply type Gulp and all my tasks, including the Replace task will run.
<br>
```gulp ```
<br>
If you want to create a fresh distribution folder for production you could type
<br>
```gulp --env prod```
<br>
When no --env parameter is provided the default parameter value is used as described in code.  In this case the default value is “`localdev`”.

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