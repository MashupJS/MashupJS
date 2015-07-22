---
title: Gulp Tutorial - Part 1 Reasons for build tools like Gulp
tags: 
- AngularJS
- Bootstrap
- Router
- Gulp

---

###http://robertdunaway.github.io
###http://mashupjs.github.io


The **Mashup** is a learning tool that serves as a seed project for line-of-business applications.  It's goal is a shortened *learning curve* for building modern business applications and the reduction of *technical debt*.


 <img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupWorkflow/gulp/bookcoverimage.PNG" alt="Smiley face" height="100" width="100"> 

This tutorial and more can be found in
####[Gulp - Quick guide to getting up and running today](http://www.amazon.com/Gulp-Quick-guide-getting-running-ebook/dp/B010NXMFF6/)

#Gulp Tutorial - Part 1
##Reasons for build tools like Gulp

###PRODUCTIVITY
The reason for a build system is always productivity.  Otherwise we wouldn’t invest time in it.  
Build systems perform housecleaning work, allowing you to focus on code.  Before build systems, if you were lucky, you could right click and select “minify” in your IDE.  As lucky as this might have been, minification might not have been worth the additional development effort required.  Build systems address this problem.
<br>
Build systems perform tasks with a level of precision humans are incapable of.  For Continuous Integration and Continuous Delivery to work, a build system must be used to keep the human element out.  Continuous Delivery requires automation at all levels, including testing, to mitigate common deployment defects.
<br>
There are thousands of plugins to perform just about any task imaginable.  Here are a few.

<br>

####Performance/Optimization
•	Minification of JavaScript files
•	Minification of CSS files
•	Slimming down CSS classes that are not used
•	Concatenating many JavaScript files to reduce get requests
•	Creation of MAP files for debugging at run-time

<br>

####Deployment
•	Files can be optimized then copied to a folder to isolate deployment from development
•	A zip file can be generated for deployment
•	Automated tests can be executed
•	Deployments can be created with a particular purpose; e.g., an app can be built for mobile.

<br>

####Static analysis
•	Linters can be executed against your code producing advice
•	Cyclomatic complexity and other measures can be generated.

<br>

####Documentation
•	Documentation can be generated from code into readable formats.
•	HTML documents can be generated from Markdown, a popular text format.

<br>

####Additional resources
https://www.youtube.com/watch?v=XJ5F-Auhato

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