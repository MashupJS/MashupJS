#MashupJS style guide

<a href="#MashupJSStyleGuide">Skip down to Mashup's style guide</a>

##Excellent Style Guides
I would use these style guide for code reviews and as general learning tools.  The Mashup's style guide is to be appended to whatever style guide you subscribe to and offers guidance specific to the Mashup.

### Angular style guides
[Google's Angular style guide](https://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html)

[John Papa's Angular style guide](https://github.com/johnpapa/angularjs-styleguide)

### JavaScript style guides
[Google JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml?showone=Method_and_property_definitions#Method_and_property_definitions)

[Airbnb JavaScript style guide](https://github.com/airbnb/javascript)

### Grunt/Gulp
[Grunt - getting started guide](https://scotch.io/tutorials/a-simple-guide-to-getting-started-with-grunt)

[Gulp - getting started guide](https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js)

### NodeJS NPM
[NodeJS Best Practice](https://scotch.io/tutorials/node-and-npm-version-numbering-guide-and-best-practices)

### C# style guide
Read C# style guides as a learning tool but use a tool like Resharper to review your code.  If productivity is your goal then productivity tools are worth their weight in gold.

[Resharper](https://www.jetbrains.com/resharper)

[Microsoft's C# Programming guide](https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx)


### WebApi

[http://www.asp.net/web-api](http://www.asp.net/web-api)

### SignalR
[ASP.NET SignalR Hubs API Guide](http://www.asp.net/signalr/overview/guide-to-the-api)

[Asp.net/SignalR](http://www.asp.net/signalr)

### Source control style guide

[A Visual Guide to Version Control](http://betterexplained.com/articles/a-visual-guide-to-version-control/)

[Source control best practices (PDF)](http://www.perforce.com/sites/default/files/pdf/high-level-perforce-best-practices.pdf)

[Building Real-World Cloud Apps with Azure](http://www.asp.net/aspnet/overview/developing-apps-with-windows-azure/building-real-world-cloud-apps-with-windows-azure/source-control)

### Philosophies
[List of everything - Interesting for personal software craft](http://en.wikipedia.org/wiki/List_of_software_development_philosophies)

*TODO: Add link to philosophies the MashupJS subscribes to.*

### Markdown for documentation

[Github style Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)


<a name="MashupJSStyleGuide"></a>
#MashupJS style guide

*It's true that a style guide is never complete, for now, this one will be more incomplete than most. *

This style guide will help ease the use of the Mashup and save you time when adding new applications or pages.  

###Props
The Internet is a rich resource of information.  Several pieces of code are inspired by the work of others.  Every attempt has been made to give credit.  If we have missed anything or seem to be using a library or piece of code without permission please point it out.

##Introduction
What I like about a style guide over a *standards document* is a style guide gives you the information you need to work in an environment and is less likely to be used against you like a hammer.  
####Why a style guide
Standards documents, while good in theory often serve to beat up other developers and solidify the an opinion, never to be challenged without a great deal of political capital spent.  Standards documents can quickly collect **technical debt** and stagnation.

IE: Once upon a time variable types were not only declared but made a part of the variable name.  **strFirstName**.  This was in ever standards document for many years and the only way to get away from it was to fight bitterly with the dogs of old or go rogue and ignore the standards all together.  That was my approach as it was the only option left to me or find my dead bones among the dinosaurs.  *You know who you are*  :)

So this is a style guide.  You'd be wise to follow it or at least understand it before deviating... but!  If you find a better way to do things please post it and help this document and application mature.

####About the Mashup
The Mashup has many goals in mind.  One is the ability to drop in application components.  Many of these types of features will be available in Angular 2.0 but until then we need something.

Downloading the Mashup and following the style guides should put you in a pretty good place for migrating to Angular 2.0.  In fact you can expect this Mashup implementation to not only migrate from 1.3 to 2.0 but provide an extensive migration path.  When the new Angular 2.0 Router is back ported to 1.3 we will implement it immedialtly.  This early adoption should take some of the sting out of the massive 2.0 migration.

####Ongoing Tasks
With the rapid change in technology it's easy to fall behind.  New versions of libraries are rapidly released and it's to much to keep updated on unless done so deliberately.

The last thing you need is to download a bootstrap applications like the Mashup with outdated components.

The plan is to review all components monthly, looking for changes.  If a new version of a library is available we'll apply it to the Mashup along with any tips or notes of problems or steps taken.

We will also rebuild each Visual Studio .NET project using their latest templates which sometimes pop in a feature that wasn't there before.  A document of tips, notes, and instructions on how to do the same, safely, with your applications will be published.

**Continuous Improvement**: 

The goal is to reduce **technical debt** by keeping all components up to date in a smaller, incremental, way and avoid the build of of technical changes and large deliveries which increase risk.

The Mashup will introduce the smallest risk possible and with the least expensive process possible.  

#MashupJS with AngularJS
##Directory Structure
Mashup.Api.[app-name]

 - api
	 - Controllers
	 - Entities

Mashup.UI.Core

 - apps
	 - ~appConfig         
		 - *(routeConfig for the applications)*
	 - ~appServices      
		 - *(services for the applications)*
	 - ~appTests           
		 - *( Tests for the applications)*
	 - [section1]            
		 - *( Various areas of the application.  Could be individual pages or sections of pages.)*
	 - [section2]
	 - [section3]
 - common   *(all common components shared by all MashupJS applications)*
	 - directives
	 - filters
	 - services
 - config
	 - *(Whatever angular configuration files the mashup needs.  IE: routeConfig.js)*
 - css
 - lib
	 - *(All JavaScript libraries used by the application such as angularJS, lodash, bootstrap, etc.)*


##The naming of things
Sure, it's important to name things well.  Names should describe things in such a way as to reduce the overhead of figuring out what the heck that thing is.  Good naming also aids in refactoring.  

For instance, if your naming strategy is sound and should you choose to move html templates and their associated controllers around then a simple find and replace on routes and links should be easy enough.  If not then a find and replace could be devastating and you'll find yourself reverting out your code more often than you hoped.

##Application names
Applications should have a short or abbreviated name because it will be used to uniquely name Controllers and other objects.
##Project names
The Mashup has only one UI project named **Mashup.UI.Core**.  You're likely to change this to an application name that represents your company.

WebApi project names should be:
```
[Mashup-name].["Api"].[app-name]
```

##Controllers
####Syntax
Use the **Controller As** syntax.
https://github.com/MashupJS/MashupJS/blob/master/docs/mashupCore/ControllerAs.md
####Naming
To support drop in applications and avoid name collisions use the following naming convention.
```
[app-name].[controller-name] + ["Controller"]
```
Example
myApp.page1Controller

> It's also perfectly acceptable to append your controller with **Ctrl** instead of **Controller**.  In fact the Angular style-guide might recommend it.



### What the Angular Style-guide says
###What the Mashup says

##Service names
### What the Angular Style-guide says
###What the Mashup says

##Directive names
This is a tricky one.  We are not simply naming for uniqueness and readability here.  Directives are used all throughout code and markup.  Yes, we want unique names that are easy to manage but they must also be easy to work with in everyday development.
### What the Angular Style-guide says
###What the Mashup says


##cacheService
Learn all about the cacheService here: 
https://github.com/MashupJS/MashupJS/blob/master/docs/mashupCore/services/cacheService/cacheService.md

Learn more about the detectService used by the cacheService.
https://github.com/MashupJS/MashupJS/blob/master/docs/mashupCore/services/detectService/detectService.md

The cacheService is one of many caching options.  Use the cacheService when you need discrete control over how often WebApi resources are called and how long until a cache is considered stale.

Event if a cache is stale, if access to a WebApi is interrupted the cache is used.  

One feature of this cache option is unnecessary calls for the most current data can be avoided.  Also, the cacheService works with the detectService to determine if the WebApi is available and if it is not then no attempt is made to call it.  This eliminates the delay associated with the timeout to an unavailable service.

```javascript
getData: function (cacheName
					, schema
					, webApiUrl
					, staleMinutes
					, useConvention
					, heartBeatUrl
					, heartBeatName)
```

#####**cacheName**
The name of the cache you give to the type of data you are retrieving.  If the name already exists in the cache and is not yet stale then you receive the cache data and no call to the WebApi will be made.
#####**webApiUrl**
The webApiUrl includes the full URL and the URL properties.
Example:
```
http://localhost:50004/api/ExampleData/Items/1
```
#####**staleMinutes**
The number of minutes until the cache is considered stale.  The cache will remain until updated in case the WebApi is unavailable.

#####**useHeartBeatConvention**
WebApi(s) can offer a HeartBeat function that allows the Mashup to know if the WebApi is available.  This might also serve to track system performance.

The HeartBeatUrl is the endpoint to the HeartBeat.
You can specify the URL explicitly or use the built in convention.
The convention is the base URL of the webApiUrl and "**/api/HeartBeat/**".

#####**heartBeatUrl**
The heartBeatUrl that will be used if the **useHeartBeatConvention** is **false**.

#####**heartBeatName**
The name of the heart beat used in logs.
If nothing is provided then the *webApiUrl* is used.


##Defining Routes
```
function config($routeProvider) {
    $routeProvider
        .when('/avengers', {
            templateUrl: 'avengers.html',
            controller: 'Avengers',
            controllerAs: 'vm'
        });
}
```
### Route Configuration
This document explains how to set up Route Configuration in the Mashup and how to implement Lazy Loading.  

Lazy loading will become a feature of the new Angular 2.0 router which will be back ported to Angular 1.3.  It's not here yet but this approach will work nicely until it is.

https://github.com/MashupJS/MashupJS/blob/master/docs/mashupCore/config/routeConfig.md


##Logging
###logService
The logService intercepts messages sent by $log and performs custom actions against them.
https://github.com/MashupJS/MashupJS/blob/master/docs/mashupCore/services/logService/logService.md

##Utilities
###utilityService
The utilityService is a Facade of all the utilities you're Mashup application will require.  Using the utilityService in this way reduces then number of extra module you specify for injection and simplifies your code.
https://github.com/MashupJS/MashupJS/tree/master/docs/mashupCore/services/utilityService/utilityService.md

####utility_UtcDateService
https://github.com/MashupJS/MashupJS/blob/master/docs/mashupCore/services/utilityService/utility_UtcDateService.md

##Index.html
The index.html is swappable for whatever is needed.  
https://github.com/MashupJS/MashupJS/blob/master/docs/mashupCore/index.html.md


#MashupJS WebApi


##Creating a WebApi for the MashupJS
How to create a WebApi for the MashupJS that supports CORS
https://github.com/MashupJS/MashupJS/blob/master/docs/mashupApi/WebApi-HowToCreateForMashup.md

Explaining the problem with CORS
https://github.com/MashupJS/MashupJS/blob/master/docs/mashupApi/WebApi-Cors-Chrome.md

##HeartBeatController

The HeartBeatController provides the endpoint for the HeartBeat mechanism of the cacheService and detectService.

The convention requires the HeartBeatController provide an endpoint at **[webapi]/api/HeartBeat/**.

If all is well the HeartBeat will return **true**.

```

using System.Web.Http;

namespace Mashup.Api.AuthADSP.api
{
    [Authorize]
    public class HeartBeatController : ApiController
    {
        [Route("api/HeartBeat/")]
        [HttpGet]
        public bool HeartBeat()
        {
            // Later, add server performance metrics allowing the client
            // to decide if you want to trouble the server with information.

            // Can also return false if the WebApi server doesn't have enough
            // resources to satisfy the client.  This will cause the client
            // dip into it's cache.

            return true;
        }
    }
}
```

##Mashup.Api.AuthADSP
This is a basic authentication service using Windows Integration and Stored Procedures.  Hence the name AuthADSP.  If we were to publish a Federated authentication service using Entity Framework then the name might be *Mashup.Api.AuthFedEF*.
https://github.com/MashupJS/MashupJS/blob/master/docs/mashupApi/Mashup.Api.AuthADSP/Mashup.Api.AuthADSP.md

