#cacheService
---
##Mashup's (cacheService)
---
I'm still learning Angular and JavaScript so by all means please comment below or go to GitHub and log bugs or just make the code better. Thanks!
[https://github.com/MashupJS/cacheService](https://github.com/MashupJS/cacheService)

<img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupCore/services/cacheService/cacheImage.jpg" width="200px" height="150px" />

## Introduction

###Brief
One of the benefits of SPA applications is the decoupling of dependence on external resources. Composition of the view and controller are done locally and page processing, in AngularJS, is local where it once occurred on a web server.

Taking this decoupling one step further with data independence gives you an offline capability. When offline the application would continue to function properly while gracefully handling connection drops and re-connects.

###Who is this for?
If adopting an Off-line First or building an application that must be resilient when connectivity is inconsistent, you need a variety of caching solutions to fit a variety of use case scenarios.

###Use case
This article covers the use case where the data used is long lived and stable. This data might be a very large dataset that is expensive to retrieve or it might be a list of data used to populate list controls. Any data element that does not change often or is expensive to retrieve will benefit from this particular caching approach. Also, the application must not notice when it's online or offline.

###Angular-cache-resource (ACR)
One option, at first glance, seems the obvious choice. Angular-cache-resource is a micro-library whose functionality will be adopted in the next release of Angular version 2.0.

In a nutshell this micro-library is a one-to-one replacement for Angular's $resource. What it adds is a valuable caching model that promotes Progressive Enhancement, the practice of managing the perceived performance by displaying information as it becomes available. Some common practices are placing JavaScript files at the end of an HTML page allowing the content to render while the application continues to process.

How ACR works is each request for data is cached and associated with the URL used to retrieve it. When the same data is requested ACR will return the cached data to the client immediately and then fetch the data from the data source and pass this back to the client. The user sees data immediately and that data is likely unchanged but if it has been altered the new changes will appear momentarily.

###cacheService
The cacheService does not address the same use case as ACR and in fact doesn't try too. When working with cacheService only one result is returned. Either the cached data is returned or, if the cache is stale, new data is fetched. The benefit here is a round trip to the server is never performed unless cache becomes stale and this leads to lower network and back-end server utilization.

##Solution Overview
This solution uses the YDN-DB micro-library to wrap up the complexity of IndexedDB and a simple service injected into your Angular module, cacheService. Using IndexedDB as the caching source avoids the 5mb limitation most browsers have on localStorage. IndexedDB is a complex library with limited built in ability to query. YDN-DB has rich capabilities built on top of IndexedDB and offers a commonly understood SQL interface for accessing data.

Here are a list of technologies used and links to learn more about them.

###IndexedDB
http://www.html5rocks.com/en/tutorials/indexeddb/todo/

http://www.w3.org/TR/IndexedDB/

http://msdn.microsoft.com/en-us/library/ie/hh673548%28v=vs.85%29.aspx

###YDN-DB
http://dev.yathit.com/ydn-db/getting-started.html

http://git.yathit.com/ydn-db/wiki/Home

https://github.com/yathit/ydn-db

###Angular Services
https://docs.angularjs.org/guide/services

http://blog.pluralsight.com/angularjs-step-by-step-services

###Pros and Cons
When choosing an approach I looked at the pros and cons of a couple approaches and technologies.

| Approach      | Pros          | Cons  |
| ------------- |:-------------|:-----|
| **IndexedDB**      |  	Very large storage capacity | Difficult/cumbersome to work with |
| **TaffyDB**| Simple/powerful capabilities|    |
| - *Referenced by Angular docs as a good model to follow*| |    |
| - *No built in persistence model*| |    |
| **TaffyDB + IndexedDB**| Would allow the power of TaffyDB data manipulation with the storage capacity of IndexedDB|    Added complexity with IndexedDB|
| - *Little current activity on the library*| |     |
| **LocalStorage**| Simple to use|    Limited query ability|
| - *Limited storage capacity*| |     |
| **YDN-DB**| Current activity on the library|   Nothing  |
| - *Easy to use*| |    |
| - *Allows commonly known SQL syntax*| |    |
| - *Seamless integration with IndexedDB but falls back on Web SQL and LocalStorage when IndexedDB is not supported*| |    |

###Implementation Details/How To
This section walks through the cacheService solution.

1. Download the production version of YDN-DB.

Download the production version at: http://dev.yathit.com/ydn-db/downloads.html



