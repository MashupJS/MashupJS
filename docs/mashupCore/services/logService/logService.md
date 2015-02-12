---
title: logService
tags: 
- angular
- javascript
- logging
- instrumentation
- intercept
- console
- $log
- error
- debug
- warning
- info
- mobile
- utility
---

#logService

###http://robertdunaway.github.io

####Credit
I first learned about the $log service and reasons to use it in Adam Freeman's, "Pro AngularJS".

I stumbled across an easy to understand example and explanation in Vinny Linck's "AngularJS: How to override $log implementation": http://vinnylinck.tumblr.com/post/58833687265/angularjs-how-to-override-log-implementation

The **logService** is significantly different than the work that kick-started it's creation but it's good go give credit whenever possible and these guys did a great job helping me along my way.

##Introduction
The **Mashup** is a learning tool that also serves as a bootstrap project for line-of-business applications.  https://github.com/MashupJS/MashupJS 

The Mashup is home to a service called **logService**.

The **logService** overrides the $log service to extend its functionality.

Overriding $log gives us

 - Console.[*log, info, warn, error*]
 - Instrumentation
 - Error logging
 - Debugging clients
 - Custom logging actions
 - Mobile friendly resource economy

###Console.[*log, info, warn, error*]
Vinny Linck's article, referenced above, probably explains this better.  When overriding the $log service a delegate to the $log service is provided via $delegate.  This is used to restore the *Console* implementation of $log.

```
$delegate.log(argument);
```

###Instrumentation
This implementation of logService decorates a logObject with several user session and environmental variables. Within the logObject itself are ***subject, app, mod (module), func, and status***. Using these properties and calling $log, the task of instrumenting applications is easy.

The routeConfig uses the resolve function of each route to call the *logRouteInstrumentation*. Each route the user takes is logged to the indexedDB database and can be retrieved to see what parts of the application are used.


```
    var logRouteInstrumentation = function () {
        // -------------------------------------------------------------------
        // Instrumenting the application so we can track what pages get used.
        // -------------------------------------------------------------------
        var logObject = utility.getLogObject("Instr", "MashupCoreUI", "sessionLoad", "loadComplete", "UI-Routing", sessionService);
        // Additional or custom properties for logging.
        logObject.absUrl = $location.absUrl();
        logObject.url = $location.url();
        $log.log("UI-Routing to [ " + $location.url() + " ]", logObject);
        // -------------------------------------------------------------------
        // -------------------------------------------------------------------
    };

```

###Custom logging actions
Error and Debug are custom implementations.  The *CodeBlueMonitor*, shown in the code below, is an implementation of custom logging.

**Error logging**
There is, currently, no special implementation for *Error logging* but this is easily remedied once you've decided how you want your errors logged.  You can "roll your own" solution or use a Log4net type implementation.

Using $log to log errors is as simple as getting a logObject as shown above and setting the *subject* to "Error".

Below is the portion of the **logService** where you determine the action taken by *subject*.
```
var subject = logServiceObj.subject;

switch (subject) {

    case "Perf":
        {

            break;
        }
    case "HeartBeatFail":
    case "CodeBlueMonitor":
        {
            logDb.put({ name: 'heartbeat' }, logServiceObj);
            break;
        }
    case "Debug":
        {
            // This is a space for doing anything you need to do with debug data.
            // This can be saved to a separate IndexedDB database or table.
            // This can be sent to a WebApi or file.
            // Using the "subject" property you can add any custom behavior you need.
            break;
        }
    case "Error":
        {
            // Do something.
            break;
        }
}
```

**Debugging clients**
Using the same approach as above with the *subject* set to "Debug".

###Mobile friendly

**Environment**

The sessionService collects environmental information including the machine type (mobile/desktop), the kind of browser, version of browser, operating system, and where possible, the battery level.

**Battery level**

The battery level is not supported by all browsers but where supported it is collected, displayed, and used for throttling.

**Throttling**

Using the information collected about the environment, certain tasks are throttled. 

When the environment is a **mobile device**, the size of the log is reduced. 

When the client machine is using a battery, the battery’s level of charge determines some functionality. When the battery is 30% or lower, log management significantly decreases and the tolerance for stale data is increased. Reducing the amount of work the client must perform will help preserve battery power until the device can be recharged.



##How to use

To get the same behavior of $log do nothing different.  $log will operate as before with the addition of the log entry being saved to the indexedDB database *logServiceDB* in the *log* table.

To leverage the **logService**, call the *utility.getLogObject* function passing in information you would like to see in a log. The object you get back will have the information you passed along with environmental and session information.

Additionally, any property you add to the returned *logObject* will be included in logging.

Example, the *logRouteInstrumentation* function uses all the standard *logObject* properties and adds two of its own.


```
    var logRouteInstrumentation = function () {
        // -------------------------------------------------------------------
        // Instrumenting the application so we can track what pages get used.
        // -------------------------------------------------------------------
        var logObject = utility.getLogObject("Instr", "MashupCoreUI", "sessionLoad", "loadComplete", "UI-Routing", sessionService);
        // Additional or custom properties for logging.
        logObject.absUrl = $location.absUrl();
        logObject.url = $location.url();
        $log.log("UI-Routing to [ " + $location.url() + " ]", logObject);
        // -------------------------------------------------------------------
        // -------------------------------------------------------------------
    };
```

Looking at the code above you can see a simple pattern.

1 . Call the *utility.getLogObject* function passing in the following:
- subject
- app (application name, you might have many applications)
- mod (module name)
- func (function name)
- status (this can be any status value that makes sense.  Often set to true/false but not limited.)
```
var logObject = utility.getLogObject("Instr", "MashupCoreUI", "sessionLoad", "loadComplete", "UI-Routing", sessionService);
```
Here is the interface for *getLogObject*
```
mashupApp.service('utility_LogHelper', function () {

    var getLogObject = function (subject, app, mod, func, status, sessionService) {
```
You might have noticed that this function is implemented in *utility_LogHelper*.  To reduce dependency injection into your module a number of utilities, like this, will be exposed by the *utility* module.

This implementation is straight forward and described here: https://github.com/MashupJS/MashupJS/blob/master/docs/mashupCore/services/utilityService/utilityService.md

2 . If you have any properties you'd like to add, do this next.
```
logObject.absUrl = $location.absUrl();
logObject.url = $location.url();
```
3 . Call the **$log([message], [log object]);**
```
$log.log("UI-Routing to [ " + $location.url() + " ]", logObject);
```

##Loosely coupled
The goal of the **logService** is to be loosely coupled. Errors that occur in the logService should not negatively impact the user. Also, adding the logService to an application should be as simple as adding the script to the application. The problem is dependencies, so when adding logService, be sure to include the dependency modules.

Removing the **logService** should have zero impact on an application so in that regard it is loosely coupled.