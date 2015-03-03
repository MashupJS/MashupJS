---
title: MashupJS Philosophies
tags: 
- Continuous Integration
- Continuous Delivery
- Technical Debt
- Mobile First
- Offline First 
- RWD
- Responsive Web Design
- Resharper
- TortoiseSVN
- Visual SVN
- NodeJS
- Grunt
- Gulp
- npm
- npm_modules
- NuGet
- DevOps
- TeamCity
- Chef
---

http://robertdunaway.github.io

http://mashupjs.github.io 

The Mashup is a learning tool that also serves as a bootstrap project for line-of-business applications.

#MashupJS Philosophies


##Reduce technical debt

All effort must be made to reduce technical debt.  We’re building business applications so we must consider cost before all else.  The complete cost of ownership including initial development, support, and opportunity costs must be taken into account.  Technical debt can be significantly reduced by making sound decisions based on past experiences.

Below are a few items for reducing technical debt but the list could go on forever.

- Reduce the number of technologies in the ecosystem.
- Utilize strong technical leadership that gives direction.
- Develop a strong DevOps component to the development process.
- Adopt Continuous Integration and Continuous Deployment.
- Resist version divergence 

##Mobile First
Whether or not you are designing specifically for mobile, the mobile first approach offers many benefits.  When considering the real-estate available for mobile devices, you fall into the lap of success with better imagined UI design and faster running applications.  When considering mobile, every aspect of performance from render time to the bits on the network is considered.

Ultimately, it’s far easier to scale the UI up from mobile to desktop than to scale an applications UI down from the desktop.

http://designshack.net/articles/css/mobilefirst/

http://code.tutsplus.com/tutorials/mobile-first-with-bootstrap-3--net-34808

##(RWD) Responsive Web Design

Responsive design is critical to delivering applications with a single code base because it takes in all form factors.

http://responsivedesign.is/

https://msdn.microsoft.com/en-us/magazine/hh653584.aspx

http://www.smashingmagazine.com/2011/01/12/guidelines-for-responsive-web-design/

http://en.wikipedia.org/wiki/Responsive_web_design

##Offline First

Designing your application to be offline first makes the application more resilient in the face of network instability.  Both desktop and web applications benefit from offline first design.

https://developer.chrome.com/apps/offline_apps

https://github.com/pazguille/offline-first

http://jakearchibald.com/2014/offline-cookbook/

##Continuous Integration

Continuous Integration is similar to build first.  In a corporate environment, all your shared code is built often.  The end result is you no longer have to fear breaking interfaces.  Other applications that rely on your shared code will break during the nightly build.  Fear of breaking interfaces leads to technical debt and eventually a complete re-write.  Internet Explorer is a good case study for what happens when you fear breaking interfaces.

https://www.youtube.com/watch?v=4sANX9AhM8c

http://www.thoughtworks.com/continuous-integration

##Continuous Delivery

DevOps is an emerging approach designed to reduce friction between the developer and operations processes.  Continuous delivery to production also reduces risk because many smaller changes are less risky than fewer but larger changes.  This approach leads to automation, removing the human element, resulting in further reduced risk.

https://www.youtube.com/watch?v=McTZtyb9M38

https://yow.eventer.com/events/1004/talks/1062

http://www.thoughtworks.com/insights/blog/enabling-continuous-delivery-enterprises-testing

https://www.youtube.com/watch?v=ZLBhVEo1OG4

http://www.jamesshore.com/Blog/Continuous-Integration-on-a-Dollar-a-Day.html

##Interesting list of Philosophies

The Mashup doesn’t subscribe to all of these but they all have something interesting to learn.

http://en.wikipedia.org/wiki/List_of_software_development_philosophies



















