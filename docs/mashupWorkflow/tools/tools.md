---
title: MashupJS Dev Tools
tags: 
- Visual Studio
- Web Essentials
- Productivity Power Tools
- Resharper
- TortoiseSVN
- Visual SVN
- NodeJS
- LPE
- Long Path Eraser
- Dropbox
- Grunt
- Gulp
- npm
- npm_modules
- NuGet
- SQL Express
- IndexedDB
- DevOps
- TeamCity
- Chef
---

http://robertdunaway.github.io

http://mashupjs.github.io 

The Mashup is a learning tool that also serves as a bootstrap project for line-of-business applications.

Please commend tools/tips...


#Tools

Tools used in the development workflow of the MahsupJS.

**Update Versions**

Periodically check for the latest version of dev tools and libraries.

#Dev Tools

###Visual Studio .NET 2013
Check for latest update - `update 4`

###Web Essentials
http://vswebessentials.com

`Latest update for VS.NET Update 4`

**[dropbox](https://dl.dropboxusercontent.com/u/11934522/tools/Web%20Essentials/Web%20Essentials%202013%20for%20Update%204.vsix)**

###Productivity Power Tools

[Microsoft's link](https://dl.dropboxusercontent.com/u/11934522/tools/Productivity%20Power%20Tools%202013/ProPowerTools.vsix)


**[dropbox](https://dl.dropboxusercontent.com/u/11934522/tools/Productivity%20Power%20Tools%202013/ProPowerTools.vsix)**


###Resharper
https://www.jetbrains.com/resharper/

**[dropbox](https://dl.dropboxusercontent.com/u/11934522/tools/ReSharper/ReSharperAndToolsPacked01_version9.0_Update1.exe)**

Version `9.0 update 1`

###TortoiseSVN
Is the subversion client. I'm using subversion to access GitHub.

http://tortoisesvn.net/

Version `1.8.10.26129-x64-svn-1.8.11`

**[dropbox](https://dl.dropboxusercontent.com/u/11934522/tools/TortoiseSVN/TortoiseSVN-1.8.10.26129-x64-svn-1.8.11.msi)**



###VisualSVN
Visual Studio integration with TortoiseSVN.

https://www.visualsvn.com/

Version '4.0.11'

**[dropbox](https://dl.dropboxusercontent.com/u/11934522/tools/Visual%20SVN/VisualSVN-4.0.10.msi)**


###NodeJS
http://nodejs.org/

    npm cache clean -f 
    
    npm install -g n 
    
    n stable

###Updating NodeJS

- http://davidwalsh.name/upgrade-nodejs

- http://theholmesoffice.com/node-js-fundamentals-how-to-upgrade-the-node-js-version/
    
###Updating NPM Package
Identify what NPM modules are out of date.
    
    Display colored rows
    npm outdated -–depth=0

Display in json which includes current, wanted, latest version numbers

    npm outdated –-json -–depth=0

To update packages one at a time

	npm install [package-name]@* [save?]
	npm install grunt-contrib-uglify@* --save-dev

###Git
I only use Git because of Bower.  I don't use it for source control.

**[Git 1.9.5](https://dl.dropboxusercontent.com/u/11934522/tools/Git/Git-1.9.5-preview20150319.exe)**

#Utilities
###LPE.exe (Long Path Eraser)


Removes long file/dir names node_modules creates a lot of directories and exceeds windows ability to deal with them.

I cannot find the original source or author on this. I'd like to find another utility that works as well but with a more well known source.

http://long-path-eraser-free.en.softonic.com/ 

http://www.softpedia.com/get/System/System-Miscellaneous/Long-Path-Eraser-Free.shtml

**[dropbox](https://dl.dropboxusercontent.com/u/11934522/tools/LPE%20-%20Long%20Path%20Eraser/LPE.exe)**

###Dropbox

Using Dropbox to bundle development tools for the team.

**[dropbox - Client Install](https://dl.dropboxusercontent.com/u/11934522/tools/DropboxClient/DropboxInstaller.exe)**

#Libraries 

###Grunt

Task manager 

http://gruntjs.com/getting-started 

http://gruntjs.com/installing-grunt

Upgrading Grunt

Before switching to the latest version of Grunt, be sure to uninstall the old one if you installed it globally. Then reinstall grunt with the command above.

    npm uninstall -g grunt


    npm install -g grunt-cli

###Gulp

Task manager 

https://www.npmjs.com/package/gulp

Install 

https://www.npmjs.com/package/gulp-install

    npm install --save gulp-install


###npm_modules
Go through each `npm_modules` and look for updated releases.

**Libraries**

Angular

Angular-UI

Bootstrap

Font-Awesome

jQuery

jQWidgest or Kendo ?

lodash

modernizr 2.6.2 ( doesn’t change much )

ocLazyLoad.js ( not sure how long this will last.  new angular router should replace )

ydn ( this should go away at some point.  needs refactored out )


##NuGet
Keep NuGet updated.

Check all NuGet packages for updates.


#Databases
These might not be tools you need but if you plan to leverage SQL Server files in ASP.NET for development purposes then you'll need these.

###SQLExpress2014

Enable the use of the SQL Server file within a WebApi 

http://www.microsoft.com/en-us/download/details.aspx?id=42299

###SQLManagementStudio

Visual management tools for SQL Server 

http://www.microsoft.com/en-us/download/details.aspx?id=35579

You might need this link if installing on Windows 8.1

https://msdn.microsoft.com/en-us/library/hh506443%28v=vs.110%29.aspx

###IndexedDb

No installation required 

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API


#DevOps

###Team City

This isn't integrated yet but I'm looking for a build system to adopt. 

https://www.jetbrains.com/teamcity/

###Chef

https://www.chef.io/solutions/devops/

