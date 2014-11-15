#Mashup.UI.Core Style Guide

##Excellent Style Guides
I would use these style guide for coding and learning.  Anything extra the Mashup offers is solely for this particular implementation.  When all is said and done there may be less style guide and more explanation of the Mashup.

####Angular
https://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html
####John Papa
https://github.com/johnpapa/angularjs-styleguide
####Google on JavaScript
http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml?showone=Method_and_property_definitions#Method_and_property_definitions

*Incomplete*

*It's true that a style guide is never complete, for now, this one will be more incomplete than most.  I'm dumping notes into this as I go so I don't forget anything.  :)*

This style guide will help ease the use of the Mashup and save you time when adding new applications or pages.  Specifically addressed in this style guide is the Mashup.UI.Core or the UI component of the Mashup.

##Introduction
What I like about a style guide over a *standards document* is a style guide gives you the information you need to work in an environment and is less likely to be used against you like a hammer.  
####Why a style guide
Standards documents, while good in theory often serve to beat up other developers and solidify the an opinion, never to be challenged without a great deal of political capital spent.  Standards documents can quickly collect **technical debt** and stagnation.

IE: Once upon a time variable types were not only declared but made a part of the variable name.  **strFirstName**.  This was in ever standards document for many years and the only way to get away from it was to fight bitterly with the dogs of old or go rogue and ignore the standards all together.  That was my approach as it was the only option left to me or find my dead bones among the dinosaurs.  *You know who you are*  :)

So this is a style guide.  You'd be wise to follow it or at least understand it before deviating... but!  If you find a better way to do things please post it and help this document and application mature.

####About the Mashup
The Mashup has many goals in mind.  One is the ability to drop in application components.  Many of these types of features will be available in Angular 2.0 but until then we need something.

Downloading the Mashup and following the style guides should put you in a pretty good place for migrating to Angular 2.0.  In fact you can expect this Mashup implementation to not only migrate from 1.3 to 2.0 but provide an extensive migration path.  When the new Angular 2.0 Router is back ported to 1.3 we will implement it immedialtly.  This early adoption should take some of the sting out of the massive 2.0 migration.

##Directory Structure




##The naming of things
Sure, it's important to name things well.  Names should describe things in such a way as to reduce the overhead of figuring out what the heck that thing is.  Good naming also aids in refactoring.  

For instance, if your naming strategy is sound and should you choose to move html templates and their associated controllers around then a simple find and replace on routes and links should be easy enough.  If not then a find and replace could be devastating and you'll find yourself reverting out your code more often than you hoped.

##Application names
### What the Angular Style-guide says
###What the Mashup says

##Controller names
### What the Angular Style-guide says
###What the Mashup says

##Defining Routes
```
function config($routeProvider) {
    $routeProvider
        .when('/avengers', {
            templateUrl: 'avengers.html',
            controller: 'Avengers',
            controllerAs: 'vm'
        });
}
```
### What the Angular Style-guide says
###What the Mashup says

##Service names
### What the Angular Style-guide says
###What the Mashup says

##Directive names
This is a tricky one.  We are not simply naming for uniqueness and readability here.  Directives are used all throughout code and markup.  Yes, we want unique names that are easy to manage but they must also be easy to work with in everyday development.
### What the Angular Style-guide says
###What the Mashup says