---
title: sessionService
tags:
- angular
- angularjs
- session
- service
- services
- environment
- browser type
- 

---

#sessionService

###http://robertdunaway.github.io

The **Mashup** is a learning tool that also serves as a bootstrap project for line-of-business applications.

The **sessionService** shares session information between modules.


##Purpose
A great way to share information between modules, in Angular, is via services.

The **sessionService** provides, to modules, any information they need about the user, environment, and any other session specific data modules might need.

##userSession
Exposed by the **sessionService**, the *userSession* holds whatever information is returned by the AuthN/AuthR system chosen. The expected properties are not defined but rather inherited by whatever system is providing AuthN/AuthR services.
```
var userSession = {};
```
When this user information is retrieved by the application, the *setUserSession* function is called. 

The *sessionService* is not tasked with retrieving this information but only holding it for modules to consume.


##envSession
Environment information is exposed by the **sessionService** via *envSession*.

Retrieving environment information doesn’t require external access to databases or WebApi(s) so the separation of responsibilities is not too badly abused when the **sessionService** retrieves environmental information on its own.

**envSession** is a good candidate for being modularized by a *utlity_* module.

Some user/environment session properties include:

- browser: "Chrome 38.0.2125.101"
- deviceType: "desktop"
- osName: "Windows"
- battery level
- battery status
- userId: "user name"
- ADDomain
- AuthenticationType
- IsAnonymous
- IsAuthenticated
- Groups[]
- Roles[]
- Privileges[]
- ActiveStatus
- FirstName
- LastName
- FullName
- Email
- CreatedDateTime
- CreatedBy
- UpdatedDateTime
- UpdatedBy

More properties can be added as needed.