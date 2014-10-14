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
 - Debugging production clients
 - Custom logging actions
 - Mobile friendly resource economy

