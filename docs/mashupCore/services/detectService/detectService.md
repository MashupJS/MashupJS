---
title: detectService
tags: 
- angular
- network
- detect
- detection
- javascript
- modern web
- front-end
- webapi
- api
- 
---

#detectService
###http://robertdunaway.github.io
The **Mashup** is a learning tool that also serves as a bootstrap project for line-of-business applications.

https://github.com/MashupJS/MashupJS

The Mashup is home to a service called **detectService**.

##Introduction
The detectService tracks the connectivity state of the application preventing unnecessary attempts to call for data and instead encouraging the client to retrieve cached data if available.

A failed connection attempt to a WebApi takes 3 or 4 seconds to fail. With 3 or 4 WebApi calls required to load a page, this can be punishing to the user.

The detectService short circuits failed attempts.



##detect()
detect() is a function the cachedService calls before every attempt to retrieve data from a Restful service.

The detect() never attempts to detect a remote service but uses any information collected to determine if a connection is available. If no attempt to connect to a particular service has been attempted then the default response is “true,” i.e., the detectService makes a positive assumption.

When the detect() function is called, the remote service is added to a Heartbeat Monitor where it is periodically checked.


##failed()
failed() is a function the cache calls when a remote service attempt fails. This tells the detectService that a service has failed and updates its status in case another call to the remote service is attempted. The remote service is added to a Code Blue List and a process begins checking the remote service for a heart beat.

##Internals
Here are some of the internals and how they work. You shouldn’t have to deal with them but it might be useful to understand how they are intended to work.

###Heartbeat Monitor
The Heartbeat Monitor tracks connectivity once a resource is accessed. If a connection attempt fails, then the connection is added to the Code Blue Monitor list and if not already started, the Code Blue Monitor starts.

Successful heartbeats are logged to the console but not to IndexedDB.

The log is checked every two hours and any logs more than a week old are removed. 


![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupCore/services/detectService/detectService%20-%20Heartbeat%20Monitor.png)

Every 2 hours the log is checked and any logs over 1 week old are removed. 

###Code Blue Monitor
The Code Blue Monitor checks resources for connectivity much like the Heartbeat Monitor does but more frequently. The results, pass or fail, are recorded to the console window and IndexedDB.

<img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupCore/services/detectService/detectService%20-%20CodeBlue%20Monitor.png" />


###Battery level

If available, the battery level is checked. If the battery level is **less than or equal to 30%**, all monitors slow down.

