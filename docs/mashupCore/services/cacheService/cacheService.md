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

