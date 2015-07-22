---
title: Gulp Tutorial - Part 2 Setup
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

#Gulp Tutorial - Part 2
##Setup

Here we need to install NodeJS, pull our tutorial project from GitHub, create our NPM package configuration file, and install Gulp both globally and locally.

<br>

####Installing NodeJS
Download and install NodeJS.  
https://nodejs.org/ 

<br>

####Get tutorial project from GitHub
Code for this tutorial can be found at
https://github.com/MashupJS/gulp-tutorial

<br>

On the GitHub repo page you’ll see an option to “Download ZIP”.
<br>
Download the ZIP file and extract it where you can work with it.
<br>
To see the end result, go to this repository.
https://github.com/MashupJS/gulp-tutorial-end-result
<br>

####Setup the NPM Project Configuration File
NPM packages are defined in the package.json file.
<br>
To create a package.json file, open a command prompt in the root of your client folder.
<br>
For this tutorial, open a command line to the Mashup.UI.Core folder.
<br>
![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/02%20Part%202/1.png)
<br>
####At the command-line type
    npm init
<br>
An empty package.json is created.  Now we can begin installing NPM packages for use by Gulp.
<br>
You will be prompted for several configuration options.  For the purposes of this tutorial I’ve skipped these and just pressed Enter for each prompt until complete.

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/02%20Part%202/2.png)
<br>
And now your package.json is born.
<br>
![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/02%20Part%202/3.png)
<br>
For more information about NPM packages
https://docs.npmjs.com/files/package.json

####Installing NPM packages
First, let’s install the bower NPM module.  We’ll need this to pull client side scripts of which we have many.
 
####From the command-line

    Npm install bower –g

####Retrieve all bower scripts from the command-line

    Bower install

####Installing Gulp
At this point, Gulp can be installed with the following command.  Notice the “-g” command.  This causes the NPM package to be installed globally.
<br>
Installing Gulp (add “-g” to install globally)
<br>

    npm install -g gulp
<br>
Gulp must also be installed locally for your project.  The global install allows you to execute Gulp commands from the command-line by providing a Command-Line Interface or CLI.  The local Gulp install is a plug-in to NodeJS and gets access to Gulp plugins via NPM.
<br>
   

     Npm install gulp --save-dev

<br>
If you’re new to NPM, then just know that a screen that looks like this is completely normal.
<br>
![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/02%20Part%202/4.png)
<br>

####TIP: Visual Studio Code
Often I want to view a file without having to open an entire Integrated Development Environment like Visual Studio .NET.  It’s just way more than I need to quickly view a file and in fact, often you can’t quickly view a file because VS .NET is so big.
<br>
Download and install Visual Studio Code.  You can use programs like Notepad++ or Sublime as well.
<br>
In this case we just installed Gulp globally and locally.  This tutorial is a learning tool so in the spirit of learning, each time I perform an action I’m going to poke around and see what changed.  After installing Gulp I want to see what has changed.
<br>
Right click the package.json file and open it with your favorite code editor and see the change.


<br>
![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/02%20Part%202/5.png)
<br>

Package.json stores its information as JSON.  Notice the first several attributes.  These are the values we opted to provide, or, in my case, not provide. 
<br>
When we applied the “--save-dev” options to the NPM install statement, the config was added to the “devDependencies” section.
<br>
The package.json file is a part of your code base and should be included/checked-in to source control.  The “node_modules” folder created by NPM should not be checked in to source control.  
<br>
When setting up the development environment on a new machine, simply open a command-line to the folder where package.json resides and type:
<br>

    npm install

Or

    npm update
<br>
NPM will then go download and install all the packages specified in the package.json.
<br>
For more information on installing NPM packages
https://docs.npmjs.com/getting-started/installing-npm-packages-locally
<br>
####Creating the gulpfile.json
Create a text file named gulpfile.js with the following content, in the root of your project. Add the following scaffolding to the new gulpfile.js file.
<br>

```javascript
var gulp = require('gulp');
	gulp.task('default', function() {
	// place code for your default task here
});
```

<br>

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/02%20Part%202/6.png)
<br>
At this point you can execute Gulp from the command-line.  There are no tasks in the “default” task, but Gulp will run.
<br>
At the command-line type “gulp” and press enter.

    gulp
<br>
![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/02%20Part%202/7.png)


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