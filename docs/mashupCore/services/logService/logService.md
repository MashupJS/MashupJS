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

###Error logging


###Debugging clients


###Custom logging actions


###Mobile friendly


