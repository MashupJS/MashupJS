
---
title: Mashup/Apps

tags: 
- AngularJS
- Bootstrap
- Router
- Menu
- AuthN
- Auth
- Authentication
- AuthR
- Authorization
- HTML Template
- Resolve
- sessionService
- cacheService

---

#Mashup/Apps
The apps directory is for your apps.  After installing the Mashup you’ll have a couple starter apps as a map for how to create your own.

Placing your application in the Apps folder and using a few conventions makes integrating apps into the Mashup seamless.


##Routing 

> route.config.js

Route configurations placed in this file are combined by Grunt/Gulp and loaded at run-time.

This approach makes it possible to drop in or remove applications without having to fiddle with routing.  Each app is 100% self-contained and can be moved easily between MashupJS implementations.

##Menu
> menu.config.js

Describes the intended menu structure in JSON.  The menu structure can be static or you can create a process that dynamically generates it based on user roles/rights.

This file is concatenated with other menu.config.js files and load at run-time.

##AuthN/AuthR
An example of a basic authentication method is implemented in the [root]/apps/mashup.

Each application is responsible for its own security but each application can subscribe to the user session of another application.  It’s likely, in companies using AD, only one session is created from which app applications derive authentication and authorization properties.

Authentication and authorization are performed in the route configuration using “resolve”.

Example:
``` JavaScript
mashupApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/mashup' });
    $routeProvider
    .when('/mashup/about', {
        templateUrl: 'apps/mashup/about.html',
        controller: 'mashup.AboutController',
        controllerAs: 'vm',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
// you can lazy load files for an existing module
return $ocLazyLoad.load({
    name: 'mashupApp',
    files: ['apps/mashup/about.controller.min.js']
});
            }],
            resolveRoute: ['$route', 'mashupRouterAuth', function ($route, mashupRouterAuth) {
return mashupRouterAuth.resolveRoute(['Administrator']);
            }],
        }
    })
```

The “resolveRoute:” function is executed before the route can be resolved.  If the user is not authenticated then they can be re-routed to a login page.  If the user is not authorized then they can be routed to a page that says they are not authorized.  

The resolveRoute function is injected with the mashupRouterAuth which gives access to the “resolveRoute” function.  The **mashup** in “mashupRouteAuth” is referring to the name of the app plush “RouterAuth”.  You application, if named “accounting”, could be “accountingRouteAuth”.

You can deviate and improve upon this basic design.  

