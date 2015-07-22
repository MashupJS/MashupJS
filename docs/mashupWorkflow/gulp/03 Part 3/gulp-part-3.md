---
title: Gulp Tutorial - Part 3 Adding Plugins
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

---

###http://robertdunaway.github.io
###http://mashupjs.github.io


The **Mashup** is a learning tool that serves as a seed project for line-of-business applications.  It's goal is a shortened *learning curve* for building modern business applications and the reduction of *technical debt*.


 <img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/bookcoverimage.PNG" alt="Smiley face" height="100" width="100"> 

This tutorial and more can be found in
####[Gulp - Quick guide to getting up and running today](http://www.amazon.com/Gulp-Quick-guide-getting-running-ebook/dp/B010NXMFF6/)

#Gulp Tutorial - Part 3
##Adding Plugins

Plugins provide function to the task runner.
<br>

> Tip: When searching for plugins, consider the number of downloads the module has on NPM and activity on Github.  These are indicators of how active the community is and how much support you can expect.  You might find a dozen JavaScript minifiers.  Choose the one with the most downloads and most recent activity on Github.

<br>

You can search for plugins here
http://gulpjs.com/plugins

<br>

Once you’ve found a plugin, navigate to the plugins page.  Here you’ll find general information on how to use the plugin and usually a couple examples to get you started.


<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/03%20Part%203/1.png)

<br>

Install a few useful plugins from the commandline of the root of your project.  Notice “`--save-dev`”.  This option includes the plugin in the package.json file.

<br>

You’ve already installed Gulp.

```
npm install gulp --save-dev
```

<br>
 
Go ahead and install a couple more.  (Just for fun)
```
npm install gulp-uglify --save-dev
npm install gulp-rename --save-dev
npm install gulp-sourcemaps --save-dev
```

<br>

Viewing the package.json with VSC, you’ll notice the new plugin configurations are saved.

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/03%20Part%203/2.png)

<br>


To add these plugins to your gulp implementation, add the new plugins to your gulpfile.js.

```javascript
var gulp = require('gulp')
    , uglify                = require('gulp-uglify')
    , rename                = require('gulp-rename')
    , sourcemaps            = require('gulp-sourcemaps')
;
gulp.task('default', function() {
  // place code for your default task here
});
```

####Syntax for creating a task

```javascript
Gulp.task([task-name], function() {
	Return gulp.src([glob-array]
		.pipe([your-plugin])
		.pipe([another-plugin])
		.pipe(gulp.dest(dist));
});
```

> Notice the “function” keyword.  One of the more significant differences between Gulp and Grunt is configuration versus code.  Gulp subscribes to a “code” approach while Grunt subscribes to “configuration”. 


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