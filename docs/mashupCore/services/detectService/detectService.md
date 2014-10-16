
#detectService
The **Mashup** is a learning tool that also serves as a bootstrap project for line-of-business applications. https://github.com/MashupJS/MashupJS

The Mashup is home to a service called **detectService**.

##Introduction
The detectService tracks the connectivity state of the application preventing unnecessary attempts to call for data and instead encouraging the client to retrieve cached data if available.

A failed connection attempt to a WebApi takes 3 or 4 seconds to fail.  With 4 or WebApi calls required to load a page this can be punishing to the user.

The detectService short circuits failed attempts.


##detect()
detect() is a function the cachedService calls before every attempt to retrieve data from a Restful service.

The detect() never attempts to detect a remote service but uses any information collected to determine if a connection is available.  If no attempt to connect to a particular service has been attempted then the default response is "true", IE: the detectService makes a positive assumption.

When the detect() function is called the remote service is added to a Heartbeat Monitor where it is periodically checked.

##failed()
failed() is a function

##Internals
Here are some of the internals and how they work.  You'll shouldn't have to deal with them but it might be useful to understand how they are intended to work.
###Heartbeat Monitor

###Code Blue Monitor

###Battery level


