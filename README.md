---
title: MashupJS
tags:
- Getting Started 
- AngularJS
- Bootstrap
- Style Guide
- Modern Stack
- 
---

MashupJS
========
The Mashup is an attempt to leverage modern web stack technologies and techniques to address technical debt, establish an enterprise ready bootstrap, and to learn and teach AngularJS.

- One code base for all platforms including web, tablet, and mobile applications.

- Bootstrap for large enterprise applications leveraging lazy loading, built in cache options, advanced routing.

- Build your personal and team code library. Use for learning and teaching.


###Getting Started

 1. Install NodeJS
 2. Create a working directory and open a CLI to it
 3.  `npm install mashupjs`
 4. Navigate to `node_modules\mashupjs`
 5. `npm install`
 6. `grunt` or `gulp` *(note: not yet gulp)*
 7. Fire up Visual Studio and load the .sln file or use your favorite IDE.

**Developer Tools Used**

https://github.com/MashupJS/MashupJS/blob/master/docs/mashupWorkflow/tools.md

###Philosophy behind the Mashup
*TODO: [Link to markdown]*

notes - don't read this :)
- reduce friction to starting SPA programming
- reduce technical debt
- code library
- learning/teaching tool
- team workflow flexibility
- single code base /w hybrid option


##The MashupJS Style Guide
**[The MashupJS Style Guide](https://github.com/MashupJS/MashupJS/blob/master/docs/mashupStyleGuides/Mashup-StyleGuide.md)**

The MashupJS Style Guide describes how to use the Mashup and opinionated best practices.

Additionally this Guide links to other popular style guides.

*TODO: add style guides for WebApi, C#, Grunt/Gulp, etc.*

###Tips in Guide
**[Controller As Syntax](https://github.com/MashupJS/MashupJS/blob/master/docs/mashupCore/ControllerAs.md)**

##Workflow
*TODO: [Link to markdown]*

notes - don't read this :)
- Create a new project
- Add new application to the Mashup
- Add new page/route
- Add services/directives
- Updating the Mashup core
- Managing your custom code
- Integrating with API
- Data service tier
- Using task runners
- Using source control
- Publish your Mashup
- Deploy as Hybrid mobile app
- DevOps
- My personal workflow
	- walk through of changes, commit, test, publish
	- change log


##MashupJS Architecture & Components
*TODO: [Link to markdown]*

notes - don't read this :)
- Much of this is in the style guide. Reference that where possible.
- Create graphs and other artifacts that make using the Mashup easily understandable and supportable.
- Add enough design that a company using the Mashup can consider the system well documented.

####Core Angular Services
**[Utility Service *(Facade)*](https://github.com/MashupJS/MashupJS/blob/master/docs/mashupCore/services/utilityService/utilityService.md)**



##Using the Mashup for the enterprise
*TODO: [Link to markdown]*

notes - don't read this :)
- Single app
- Multiple apps
- Mobile apps
- Team structures /w Mashup
- Update strategy



##Grunt/Gulp/NPM managers
*TODO: [Link to markdown]*

notes - don't read this :)
- Rehabilitate current grunt.  It's to slow. 
- Grunt basics
- Grunt /w the Mashup
- Gulp basics
- Gulp /w the Mashup
- Build strategy for the Mashup core
- Build strategy for apps in the Mashup
- NPM Basics
- NPM /w the Mashup

##WebApi
[How To Create a WebApi for the MashupJS](https://github.com/MashupJS/MashupJS/blob/master/docs/mashupApi/WebApi-HowToCreateForMashup.md)

[WebApi CORS Problem](https://github.com/MashupJS/MashupJS/blob/master/docs/mashupApi/WebApi-Cors-Chrome.md)
 - This issue may have been addressed by now.  Verify CORS doesn't work before following these instructions.

##MashupJS Implementations
- Link to core
	- [The MashupJS Core](https://github.com/MashupJS/MashupJS/tree/master/src)
	- `npm install mashupjs`
- Link to WebApiAuth example app
	- [Mashup.Api.AuthADSP](https://github.com/MashupJS/MashupJS/blob/master/docs/mashupApi/Mashup.Api.AuthADSP/Mashup.Api.AuthADSP.md)
- Link to Multi-Session example app
- Link to Ionic hybrid example app
- Link to advanced routing example app
- Link to various teaching example apps
- Link to 3D UI example apps


##Features available to all Mashup applications
All applications added to the Mashup will receive many features for free.  This goes a long way to reducing technical debt.  The basic/standard plumbing all applications need in your environment can be built once, maintained in one place, and a benefit to all your applications.

**Here is a running list of features:**

 - Bootstrap for Large Enterprise Applications
 - One Code Base for all Platforms
 - Authentication
 - Integration with Active Director (easily customized for integration such as Federated Auth)
 - Logging:  (Intercepts and logs $log statements for remote troubleshooting of production systems)
 - Exception Management
 - Caching Services
 - Rest Service Detection and Heartbeat Monitors
 -  Micro-library Management (update libraries in one place will update the library for all apps)
 - Hybrid-App: All applications can be converted into hybrid-mobile apps and deployed via app stores
 - Shared UI look and feel
 - User Session Management
 - Shared Build System
 - Shared Services, Filters, Directives, and any other custom JS code
 - Lazy loading of HTML templates and JavaScript modules
 - Shared User Alert System
 - Retrieval of Client Information for troubleshooting
 - Instrumentation (easily track the pages and features users use)

 

##Roadmap
**[Ease Transition to Angular 2.0](https://github.com/robertdunaway/blogs/blob/master/2014-12-06%20Preparing%20for%20Angular%202.0/Preparing%20for%20Angular%202.0.md)**


 - Application Level User Management
 - Exception Management (Dashboard, granular config)
 - Instrumentation (Dashboard, granular config)
 - Ionic integration for hybrid-apps
 - Multi-Auth Session support
 - Shared Menu System
 - Shared at a glance monitoring of the system.  Can filter by user, group, application, etc.
 - Background lazy-loading of js files