Tools
=====

Development tools for the workflow used on the MashupJS.

Utilities
---------

####LPE.exe  (Long Path Eraser)
Removes long file/dir names
node_modules creates a lot of directories and exceeds windows ability to deal with them.

I cannot find the original source or author on this.  I'd like to find another utility that works as well but with a more well known source.

http://long-path-eraser-free.en.softonic.com/
http://www.softpedia.com/get/System/System-Miscellaneous/Long-Path-Eraser-Free.shtml

Source Control
--------------

####TortoiseSVN

Is the subversion client.  I'm using subversion to access GitHub.
http://tortoisesvn.net/
http://tortoisesvn.net/downloads.html

####VisualSVN
Visual Studio integration with SVN
https://www.visualsvn.com/
https://www.visualsvn.com/visualsvn/download/


IDE(s) & Productivity Tools
---------------------------

####Visual Studio 2013
Free
http://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx

####Web Essentials
http://vswebessentials.com
http://vswebessentials.com/download

####ReSharper
Must have productivity tool for Visual Studio
https://www.jetbrains.com/resharper/

####Productivity Power Tools 2013
Productivity tools for Visual Studio
https://visualstudiogallery.msdn.microsoft.com/dbcb8670-889e-4a54-a226-a48a15e4cace

Databases
---------

####SQLExpress2014
Enable the use of the SQL Server file within a WebApi
http://www.microsoft.com/en-us/download/details.aspx?id=42299

####SQLManagementStudio
Visual management tools for SQL Server
http://www.microsoft.com/en-us/download/details.aspx?id=35579

####IndexedDb
No installation required
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

DevOps
------

####Team City
This isn't integrated yet but I'm looking for a build system to adopt.
https://www.jetbrains.com/teamcity/

####Chef
https://www.chef.io/solutions/devops/

Open Source Tools
-----------------

###NodeJS
http://nodejs.org/
http://nodejs.org/download/
Updating NodeJS

 - http://davidwalsh.name/upgrade-nodejs
 - http://theholmesoffice.com/node-js-fundamentals-how-to-upgrade-the-node-js-version/

    npm cache clean -f 
    npm install -g n 
    n stable

###NPM
https://www.npmjs.com/
Cheat sheets
- https://gentlenode.com/journal/node-1-npm-complete-cheatsheet/19
- https://gist.github.com/AvnerCohen/4051934
- http://browsenpm.org/help

#####Publish Commands
First increment patch version number

    npm version patch

Then publish

    npm publish

#####Installing the MashupJS Core

    npm install mashupjs

#####Installing MashupJS tools

    npm install mashupjstools

###Grunt
Task manager
http://gruntjs.com/getting-started
http://gruntjs.com/installing-grunt

Install Grunt

    npm install -g grunt-cli


Upgrade Grunt
- Before switching to the latest version of Grunt, be sure to uninstall the old one if you installed it globally.  Then reinstall grunt with the command above.

    npm uninstall -g grunt


###Gulp
Task manager
https://www.npmjs.com/package/gulp

Install
https://www.npmjs.com/package/gulp-install

    npm install --save gulp-install











