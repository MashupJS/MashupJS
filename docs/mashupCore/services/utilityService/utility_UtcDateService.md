utility_UtcDateService
===================

This utility module provides basic date conversion to/from local and UTC dates based on **Julian Dates**.

[Julian day](http://en.wikipedia.org/wiki/Julian_day)

Everything passed to the utility_UtcDateService is either a Julian day or will be converted to a Julian day internally.

----------

Enhancements
-------------

We are always learning, getting better, and discovering new ways of doing things.  This library will be enhanced and possibly eliminated should a better be discovered.

> **The challenge:**

> - Saving the UTC of a date while displaying what is locally understood at runtime.
> 
> This doesn't sound terribly challenging and isn't.  All the tools are available to make this happen.  This library just wraps up a couple quick n dirty methods and is smaller than a micro-library.

#### <i class="icon-puzzle"></i> Scenario - created a new date var in JavaScript

You create a new variable called newDate.

<code>var newDate = new Date();</code>

By default JavaScript creates a local date/time object in local time with the time zone offset already applied.

To get the UTC version of this date call **localDateToUtcDate** method.

If you are using the **utility_UtcDateService** directly then you could do the following:
<code>var newDate = utility_UtcDateService.localDateToUtcDate(new Date()); </code> 

If injecting the **utility_UtcDateService"** into a more generic utility function then try the following:
<code>var newDate = utility_utility.localDateToUtcDate(new Date()); </code>

How To Use
===
#### <i class="icon-puzzle"></i> Interface of the **utility_UtcDateServcie**

    var utcMilToLocalMil = function (milliseconds) {...
    var localMilToUtcMil = function (milliseconds) {...
    var localDateToUtcDate = function (localDate) {...
    var utcDateToLocalDate = function (utcDate) {...

#### <i class="icon-code"></i> Examples

You'll also find this in the module commented out.

	    var longDateTime = new Date().getTime();
	    var longDateTimeUTC = localMilToUtcMil(longDateTime);

	    var newDateLongDateTime = new Date(longDateTime);
	    var newDateLongDateTimeUTC = new Date(longDateTimeUTC);

	    var longConvertBackToLocal = utcMilToLocalMil(longDateTimeUTC);
	    var newLongConvertBackToLocal = new Date(longConvertBackToLocal);

	    var newUTCDateFromLocal = localDateToUtcDate(newDateLongDateTime);
	    var newLocalDateFromUtc = utcDateToLocalDate(newDateLongDateTimeUTC);

	    console.log("");
	    console.log("Create long date values");
	    console.log("newDateLongDateTime: " + newDateLongDateTime);
	    console.log("longDateTime: " + longDateTime);


	    console.log("");
	    console.log("Create UTC values from long dates created above");
	    console.log("newDateLongDateTimeUTC: " + newDateLongDateTimeUTC);
	    console.log("longDateTimeUTC: " + longDateTimeUTC);

	    console.log("");
	    console.log("Convert UTC back to Local");
	    console.log("longConvertBackToLocal: " + longConvertBackToLocal);
	    console.log("newLongConvertBackToLocal: " + newLongConvertBackToLocal);

	    console.log("");
	    console.log("Convert Local Date to UTC Date");
	    console.log("newUTCDateFromLocal: " + newUTCDateFromLocal);

	    console.log("");
	    console.log("Convert UTC Date to Local Date");
	    console.log("newLocalDateFromUtc: " + newLocalDateFromUtc);



#### <i class="icon-lightbulb"></i> Tips

These might not be tips as much as helpful reminders for us and anyone else using this utility.

> **Tip:** New dates created in JavaScript are local.  Name your variables deliberately to indicate UTC.


> **Tip:** You'll likely have many small utilities like this. Rather than adding them to each Angular module add a reference to them vai a generic "utility" module.
> Example: 
<code>mashupApp.service('utility', function (utility_UtcDateService) {</code>

<i class="icon-help-circled"></i>**Help:** Ideally we would keep all dates as UTC and use Angular directives to display local dates and convert local dates back to UTC when the model is updated by the UI.  If someone discovers such a directive, writes a directive, or if AngularJS 2.0 solves this problem please post it here.  

----------

Table of contents
===

[TOC]



  [1]: http://math.stackexchange.com/
  [2]: http://daringfireball.net/projects/markdown/syntax "Markdown"
  [3]: https://github.com/jmcmanus/pagedown-extra "Pagedown Extra"
  [4]: http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference
  [5]: https://code.google.com/p/google-code-prettify/
  [6]: http://highlightjs.org/
  [7]: http://bramp.github.io/js-sequence-diagrams/
  [8]: http://adrai.github.io/flowchart.js/
  [9]: https://stackedit.io/res/libs/fontello/demo.html
  
