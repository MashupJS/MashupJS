---
title: Gulp Tutorial - Part 16 Useful Gulp Commands & Tips
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

#Gulp Tutorial - Part 16
##Useful Gulp Commands & Tips

####Installing Gulp
Execute both of these.  The first adds Gulp locally so it can be used by NPM.  The second installs Gulp globally so it can be accessed from the command line.
<br>
```javascript
npm install gulp --save-dev
npm install gulp -g
```
<br>
####Retrieve Gulp version
```Grunt -version```

####Installing plugins
The syntax for Grunt plugins is
```install [plugin-name] --save-dev```
<br>
For example, if you want to minify and concatenate your JavaScript for performance, you would install two plugins.
<br>
Perform a quick Google search and you’ll find this site
https://github.com/gruntjs/grunt-contrib-uglify
```npm install grunt-contrib-uglify --save-dev```
<br>
Perform a quick google search and you’ll find this site
https://github.com/gruntjs/grunt-contrib-concat
```npm install grunt-contrib-concat --save-dev```
<br>
####Retrieve Gulp version
```Gulp --v```
<br>
####Every Gulp file needs a default task.  To execute Gulp’s default task
```grunt```
<br>
####It’s useful to run specific tasks that you have configured
```grunt [task-name]```
<br>
####Get a list of Grunt commands
```Grunt –help```
<br>
####To verify a plugin is not blacklisted
```Gulp --verify```
<br>
Testing tasks while building your gulpfile.js
You can type gulp [task-name] and your task will run.  If it has any dependencies then those dependencies will run first.

```gulp [task-name]```



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