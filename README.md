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


###Philosophy behind the MashupJS
*[Link to markdown]*
notes - don't read this
- reduce friction to starting SPA programming
- reduce technical debt
- code library
- learning/teaching tool
- team workflow flexibility


##The MashupJS Style Guide
https://github.com/MashupJS/MashupJS/blob/master/docs/mashupStyleGuides/Mashup-StyleGuide.md

The MashupJS Style Guide describes how to use the MashupJS and opinionated best practices.

Additionally this Guide links to other popular style guides.


##Features available to all Mashup applications
All applications added to the Mashup in the **apps** folder will receive many features for free.  This goes a long way to reducing technical debt.  The basic/standard plumbing all applications need in your environment can be built once, maintained in one place, and a benefit to all.

Here is a running list of features:

 - Bootstrap for Large Enterprise Applications
 - One Code Base for all Platforms
 - Authentication
 - Application Level User Management
 - Integration with Active Director (easily customized for integration such as Federated Auth)
 - Logging:  (Intercepts and logs $log statements for remote troubleshooting of production systems)
 - Exception Management
 - Caching Services
 - Rest Service Detection and Heartbeat Monitors
 -  Micro-library Management (update libraries in one place will update the library for all apps)
 - Hybrid-App: All applications can be converted into hybrid-mobile apps and deployed via app stores
 - Shared UI look and feel
 - User Session Management
 - Shared Menu System
 - Shared Build System
 - Shared Services, Filters, Directives, and any other custom JS code
 - Lazy loading of HTML templates and JavaScript modules
 - Shared User Alert System
 - Retrieval of Client Information for troubleshooting
 - Instrumentation (easily track the pages and features users use)
 - Shared at a glance monitoring of the system.  Can filter by user, group, application, etc..
 - 

