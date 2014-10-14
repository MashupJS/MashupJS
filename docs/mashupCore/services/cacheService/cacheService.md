#cacheService
---
##Mashup's (cacheService)
---
I'm still learning Angular and JavaScript so by all means please comment below or go to GitHub and log bugs or just make the code better. Thanks!
[https://github.com/MashupJS/cacheService](https://github.com/MashupJS/cacheService)

<img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupCore/services/cacheService/cacheImage.jpg" width="200px" height="150px" />

## Introduction
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

1 . Download the production version of YDN-DB.

>http://dev.yathit.com/ydn-db/downloads.html

2 . Add the **cachedService.js** to your project.

This code can be found in the Mashup.  It has a couple dependencies you can choose to include or re-factor out including the utilityService, detectService, and sessionService.

* **utilityService** - provides various general functions such as UTC conversions and a logging herper function.
* **detectService** - provides detection services so the cacheService doesn't make unnecessary trips to the WebApi.  If the WebApi is unavailable then it takes 3 or 4 seconds to fail.  If 3 or 4 of these calls are required for a page then a disconnected status could lead to a 10 or 12 second delay.  The detectService prevents this.
*  **sessionService** - provides common session data shared among all modules and pages.

These dependencies can be removed and code modified to create a drop in cacheService module.

Most of what you need to know is well documented in the comments.

The public function is getData. The caller of this function doesn't know if that application is online or offline. All the client knows is it will receive data.

The isCacheStale determines if a call to retrieve data is required or not. The client passes in "staleMinutes " then used by isCacheStale to make this determination. If you are in a position where you only want the fresh data you can pass in a staleMinutes value of "0" (zero) which will always return as stale and fetch fresh data. You can also take the opposite approach if you know the cache exists from another part of the application and you do not wish for the freshest data. In this case pass "9999" or some other unreasonable number of stale minutes.

This is a very simple api that will likely become more complex and rich as more developers use and improve it.

NOTE: on clearing out old cache on a global scale. When cacheService first runs it not only defines a set of functions but executes code to check how old the cache is in general. If the cache is too old, as defined by "staleMinutes" then everything is removed. The default is 1 week which is 10080 minutes but this can be changed to any amount of time you desire. The first call of each subject after the cache is removed is a stale response and fresh data is fetched.

3 . Now that we have the cacheService installed we can inject it directly into any component we wish.
```
mashupApp.service('cacheService', function ($http, $q, $log, utility, detectService, sessionService) {
```

4 . Client code for calling the getData method

```
mashupApp.service('mashupExamplesItemDataService', function ($http, $q, $log, cacheService) {

    return {
        // Directly calling the web api. Not using the mashup cache but can leverage 
        // the caching of angular-cached-resource

        getItems1: function () {
            return $http.get("http://localhost:50000/api/MashupExamples/Items/", { withCredentials: true });
        },

        getExample2items: function (staleMinutes) {

            var cacheName = 'MashupExamples_example2items';
            var schema = { name: cacheName, keyPath: 'id' };
            var webApiUrl = 'http://localhost:50000/api/MashupExamples/Items/';

            return cacheService.getData(cacheName, schema, webApiUrl, staleMinutes);
        },
```

You'll notice all calls are asynchronous allowing the client to continue working.
Here you see the $q injected service that provides the deferred, promise, and resolve methods. On the receiving end of this is the "then" function that promises to execute as soon as the deferred promise is resolved.

```
$scope.example2items_click = function() {
    mashupExamplesDataService.getExample2items($scope.example2items_cache).then(function(data) {
        $scope.example2items = data;
    });
};
```


####Notes

On MahsupJS benefits:

MashupJS provides the pluming so that all application built using the Mashup can take advantage of. The cacheService is available to all but if another approach is better for your application or for all your applications, that approach can be used instead.

The benefit of MashupJS is not only the shared plumbing the ability for the plumbing to evolve and improve. When a new version of jQuery or YDN-DB is released it is updated in the MashupJS and all applications benefit. Before this approach it would be easy for applications to start diverging and before you know it you're supporting 3 or 4 versions of the same micro-libraries.

This caching model is new and with many other caching models available and coming out this will either be improved or replaced. The goal of the Mashup is to show and host best of bread practices and technology. Maybe not on day one but eventually it will mature.

**On async alerts**

You'll notice commented alert code. For example:

```setTimeout(function () { alert('cache data'); }, 1);```

This is an async approach to raising alerts allowing your page to finish loading while you test the cache function. Otherwise, the alert() method is synchronous and would halt all execution.

**Tip: Working with YDN-DB async**
When testing or debugging calls to YDN-DB remember to place log statements inside the "then" function because YDN-DB is async.

In this example you'll notice the log message "SELECT statement start" is nowhere near the select statement. The $log function runs immediately, then you'll notice several other $log results and even the "SELECT statement end" long before you see the results of the YDN-DB results.

Example: Here is sample code.

<img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupCore/services/cacheService/4.png"/>

Here is the console. Notice that the logs do not come in the order you might expect.

<img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupCore/services/cacheService/5.png"/>

**Tip: YDN-DB Database Name**
Be careful, when creating YDN-DB objects. You will not receive an error if you use a name for your object that was already created but you will be confused to find the data you expected to be there doesn't exist.

**Tip: The IndexedDB database must be loaded**

It's very easy to pop in a bit of code to grab data from the local cache. I added a function to retrieve cache metadata. Because this was not my normal process for retrieving cached data I wrote code to go directly against IndexedDB. As a result I got inconsistent results. When refreshing the screen I noticed that everything worked about half the time.

The caching code is well tested and accounts for waiting for the database to become ready.

So, this tip is to always make sure your local cache database is ready before you access it. We listen for the "onReady" event and set a variable to true. This variable is global and can be used by any module that needs access to cached data.

```
var dbCache = new ydn.db.Storage('mashCache');
// This value "dbCacheReady" allows the rest of the application to know when the database is ready
// to use. Specifically, cacheService needs this.
var dbCacheReady = false;

dbCache.onReady(function (e) {
if (e) {

if (e.target.error) {
  console.log('Error due to: ' + e.target.error.name + ' ' + e.target.error.message);
}
throw e;

}
dbCacheReady = true;
});
```

**Tip: Looking at the cached data**

You can look at the cached data through the Chrome browser.
Press F12 – The Chrome developer tools will load.

Select the "Resources" tab and you'll see a list of all the available storage mechanisms.

YDN-DB will use IndexedDB first, if available, before it uses lesser local database options.

<img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupCore/services/cacheService/6.png"/>

Expand IndexedDB and you'll see a list of database you have created for the web site you are currently in.

<img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupCore/services/cacheService/7.png"/>

Expand this further and you'll see a list of data sources/tables you have created via the schema or dynamic schema.

<img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupCore/services/cacheService/8.png"/>

If you select a table then the data is retrieved and displayed in the right hand panel.

<img src="https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupCore/services/cacheService/9.png"/>

###Manipulating Cached Data
Once data is retrieved and cached you might still want to manipulate and filter down the results further for your specific needs. IE: We have a list of customers in cache but you need customer number 1234's data only.

Any number of micro-libraries or plain ole JavaScript can be used to work with JSON data stored in the cash. On the ydn-db.html page are several examples of filtering and manipulating returned data using both YDN-DB and Lodash.

YDN-DB is a simple API used to wrap the complexity of the IndexedDB API. YDN-DB also provides a number of methods to manipulate and filter JSON data including the familiar SQL interface.

Lodash, a replacement for Underscore, is a powerful API for extending JavaScript and dealing with JSON data.

Examples on the ynd-db.html page include displaying data on page load, retrieving cached data, using the YDN-DB SQL interface, filter on multiple columns, Begins with search, lodash's _.map, _.max, _.min, summaries, totals, and "Like" searches.

All for these examples use the cacheService injected into the module. When the application goes off-line the cacheService continues to provide data as it still on-line supporting the Off-line first model. 