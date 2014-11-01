##Error loading HTML template from other server

I'm trying to load html partial templates from another server I own.  I've configured the ASP.NET application "OtherSite" to allow cross-site access.

IE works because it skips the pre-flight, or at least that is my guess.  Chrome seems to successfully GET the HTML page but fails to apply it to the internal implementation of the templateUrl.  I think this is because of the pre-flight but if you're looking at this don't be limited by my guess.

###Goal
My ultimate goal is creating a structure for a massively large angular application actually made up of many applications.  To accommodate this I need to be able to host portions of the application on other servers.  CORS is a constant challenge but I've worked through them all but this one. 


###Code
You will find all the code to replicate this at:
https://github.com/MashupJS/MashupJS/tree/master/tempTPLOADError

You'll notice lots of unnecessary stuff in the project for demonstrating this problem.  The reason I left the services and other things in the sample was just in case they were contributing to the problem.

###Setup
The **angularSite** should be your startup project.  The **otherSite** is holding *page2* of the example.

###Start
When you spin up the *angularSite* project you'll have a screen with a button on it.  The start page is at **core/index.html**.

Page 1 is the first page you'll see.  All of it's assets are in the same origin domain.

Open the debugger and the Console window.

Press the Page 2 button once.

In the console you'll notice the following error.

[image of the error]
![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/tempTPLOADError/img.PNG)

With IE I get this
![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/tempTPLOADError/page2withIE.PNG)

Sometimes I get a CORS error, IE: missing header because the possibly the "Application_BeginRequest" function of the *otherSite* doesn't run and then I get the error in the image above.  Maybe the results, even with the CORS error, is cached and that is why the error message change to a tpload error.

I dont' know.  That's why I'm asking for help.

Thanks