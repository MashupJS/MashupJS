#Create WebApi for the Mashup
This is a step-by-step tutorial for creating a WebApi for the Mashup.

The WebApi provides the back-end support for your Angular application.  A typical SPA application with Angular will consist of a WebApi and index.html page on the same web site.  This is an easy configuration to spin up and start coding against.

The challenge comes when your application glows and your enterprise expects to share programming resources.  The client may no longer be coming from the same domain and your enter into cross domain sharing of resources.  CORS comes into play.

Here is a step-by-step tutorial for creating a WebApi for the Mashup that addresses the CORS issues.

###Creating the WebApi
Using Visual Studio add a new project to your existing Angular solution.

Right click the solution and select **Add -> New Project**.

Select **ASP.NET Web Application** and give your project a **name** then press **OK**.

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupApi/1.PNG)


The template page loads.

Select **Empty** in the "Select a template" section.

Then select **MVC** and **Web API** in the "Add folder and core references for:" section.

Select "Change Authentication" and select **No Authentication** and press **OK**.
>NOTE: These options might change for your implementation based on your needs.

Verify **Host in the cloud** is unchecked.

Press **OK**.

![enter image description here](https://raw.githubusercontent.com/MashupJS/MashupJS/master/docs/mashupApi/2.PNG)

Using the selected template and settings Visual Studio creates the new Web API.


