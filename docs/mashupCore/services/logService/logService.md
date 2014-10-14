#logService

####Some Credit
I first learned about the $log service and reasons to use it in Adam Freeman's, "Pro AngularJS".

I stumbled across an easy to understand example and explanation in Vinny Linck's "AngularJS: How to override $log implementation": http://vinnylinck.tumblr.com/post/58833687265/angularjs-how-to-override-log-implementation

The **logService** is significantly different than the work that kick-started it's creation but it's good go give credit whenever possible and these guys did a great job helping me along my way.

##Introduction
The **Mashup** is a learning tool that also starts as a bootstrap project for line-of-business applications.

The **logService** overrides the **$log** service to extend it's functionality.

Overriding $log gives us

 - Console.[*log, info, warn, error*]
 - Instrumentation
 - Error logging
 - Debugging clients
 - Custom logging actions
 - Mobile friendly resource economy

###Console.[*log, info, warn, error*]
Vinny Linck's article, referenced above probably explains this better.  When overriding the $log service a delegate to the $log service is provided via $delegate.  This is used to restore the *Console* implementation of $log.

```
$delegate.log(argument);
```

###Instrumentation
This implementation of logService decorates a logObject with several user session and environmental variables.  Within the logObject itself are subject, app, mod (module), func, and status.  Using these properties and calling $log the task of instrumenting applications is easy.

The routeConfig uses the *resolve* function of each route to call the *logRouteInstrumentation*.  Each route the user takes is logged to the indexedDB database and can be retrieved to see what parts of the application is used.

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
There is, currently, no special implementation for *Error logging* but this is easily remedied once you've decided how you want your errors logged.  You can roll your own solution or use a Log4net type implementation.

Using $log to log errors is as simple as getting a logObject as shown above and setting the *subject* to "Error".

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
The sessionService collect environmental information including the machine type (mobile/desktop), what kind of browser, version of browser, operating system, and where possible battery level.

**Battery level**
The battery level is not supported by all browsers but where supported it is collected and displayed.

**Throttling**
Using the information collected about the environment certain tasks are throttled.  

When the environment is a mobile device the size the log is allowed to be is reduced in size.  

When the client machine is using a battery the battery's level of charge determines some functionality.  When the battery is 30% or lower then log management significantly decreases and the tolerance for stale data is increased.  Reducing the amount of work the client must perform will help preserve battery power until the device can be recharged.



