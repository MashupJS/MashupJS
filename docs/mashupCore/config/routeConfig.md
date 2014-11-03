#routeConfig.js
---
The **Mashup** is a learning tool that also serves as a bootstrap project for line-of-business applications.
https://github.com/MashupJS/MashupJS

The **routeConfig.js** file holds routing information for the Mashup.

---
###Multiple files
There is one routeConifgjs file per application.  This offers a little independence to the developer and application in case it is deployed as a mobile application.  

Additionally, for large applications, separating route configurations makes it easy to exclude routes the user doesn't need reducing the number of routes the system must interrogate between state changes.

> Applications are defined by each directory in the **core/apps** directory.
> Examples:
> **App1** - root/core/apps/app1
> **App2** - root/core/apps/app2
>**Mashup** - root/core/apps/mashup

 
###root/config/rooteConfig.js
This is the initial route configuration file that is always loaded.  It contains the default route "/" but more importantly the code for starting up the session.

The loadCompleted() function is run by every route requiring an authenticated user.  It gets user information and puts it into the *sessionService* then logs the route for instrumentation and analysis.

The "getUserInfo()" function may vary from application to application but the pattern is in place and works for anyone who wishes to verify authentication before executing a route.

The "60" in **getUserInfo(*60*)** means the users information is cached and that cache doesn't become stale for 60 minutes.  If the user information cache is not stale then the cache is used rather than making a call to the authentication server, *AuthApiADSP*.

>NOTE: ***AuthApiADSP*** is the authentication server used by the Mashup but any custom implementation will work.
>
>The ADSP means the AuthApi uses Active Directory for authentication and Stored Procedures for data access as opposed to oData or EF.

###Lazy Loading
Typically a SPA application written with Angular would have many files referenced in the Index.html and loaded when the application starts.  To improve this condition many files can be concatenated into one and then minified.

Lazy Loading takes this one step further.  Files are still minified and an application may choose to concatenate its own files but the files are never loaded until the first time they are needed and then they are cached for subsequent loads.

This release of Angular (1.3) does not support lazy loading but I expect it will be available with the work Angular 2.0 is doing and much of that will be done in the router and ported back to Angular 1.3.  

How we are implementing lazy loading, until Angular does, is ocLazyLoad.

```
mashupApp.config(function ($routeProvider) {

    $routeProvider

        .when('/mashupExamples/angularExamplesMain', {
            templateUrl: 'apps/mashupExamples/angularExamplesMain/angularExamplesMain.html',
            controller: 'angularExamplesMainController'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/mashupExamples/angularExamplesMain/angularExamplesMainController.js']
                    });
                }]
             , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
```

> NOTE: Notice the **file** property is an array.  Here you can link to any and all **js** files your module needs and if it has already been requested then that will be uses and the load never occurs.

Here is the **Network** tab in Chrome during the first load of a module and the next image is during the second call for the same module.

####First load
![](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupCore/config/BeforeocLazyLoadCache.PNG)

####Second load
![](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupCore/config/AfterocLazyLoadCache.PNG)

>NOTE:  There is a bug in ocLazyLoad where you must tell it what modules you've already loaded.  ocLazyLoad 0.3.9 fixes this for everything except Angular Bootstrap which the mashup uses.
>https://github.com/ocombe/ocLazyLoad/issues/71#issuecomment-61446335

Added to address the ocLazyLoad issue.
```
// ----------------------------------------------------------------------------------------------
// This configures ocLazyLoadProvider and let's it know that some modules have already been
// loaded.  Without this the Menu dialog would not work because some directive was loaded twice.
// https://github.com/ocombe/ocLazyLoad/issues/71
// ----------------------------------------------------------------------------------------------
angular.module('mashupApp').config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        loadedModules: ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'oc.lazyLoad']
    });

}]);

``` 