---
title: WebApi CORS problem
tags: 
- CORS
- WebApi
- Modern Web
- C#
---

#WebApi CORS problem
---

##http://robertdunaway.github.io

The **Mashup** is a learning tool that also serves as a bootstrap project for line-of-business applications. 
###http://mashupjs.github.io


Following the basic WebApi CORS setup, you will get good results. When the client server and WebApi server know about each other, i.e., the client server is configured in the WebApi server as Access-Control-Allow-Origin, everything works.


The problem comes into play when the client is not hosted by a server at all as is true with hybrid mobile apps.  In this case there isn't an origin.


Chrome rejects a wild card on Access-Control-Allow-Origin, making the solution nearly impossible unless you hijack the “Preflight” process and respond to the client with the client added to the Access-Control-Allow-Origin.

##Solution
Here is the code to make this work.

```
using System;
using System.Web.Http;

namespace AuthApiADSP
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            if (Context.Request.Path.Contains("api/") && Context.Request.HttpMethod == "OPTIONS")
            {

                Context.Response.AddHeader("Access-Control-Allow-Origin", Context.Request.Headers["Origin"]);
                Context.Response.AddHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                Context.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST PUT, DELETE, OPTIONS");
                Context.Response.AddHeader("Access-Control-Allow-Credentials", "true");
                Context.Response.End();
            }
        } 
    }
}

```

For completeness, my WebApiConfig.cs looks like this.

```
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace AuthApiADSP
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Enabling CORS Globally
            var cors = new EnableCorsAttribute("*", "accept,content-type,origin,x-my-header", "*") { SupportsCredentials = true };
            config.EnableCors(cors);
            //config.EnableCors();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // By default Web Api wants to return XML.  (This is confusing because RestFul is based on JSON)
            // This line changes the default return type to JSON.
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
        
        }
    }
}

```

##Background Info

The challenge is all around CORS and  its requirements for ‘Access-Control-Allow-Origin’. The server must maintain a list of allowed server urls and provide that list in the origin header attribute. Chrome looks at this header and if it doesn’t see itself in the list then it self imposes a restriction. This all happens in the preflight before the actual request for data occurs.

Here is a better description of what is going on: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS

Because hybrid applications don’t have a server based origin, your first attempt to address this problem might be a wildcard setting Access-Control-Allow-Origin = “*”.

This works fine in IE because IE ignores Access-Control-Allow-Origin completely but Chrome and Firefox don’t have it. Also, in Chrome and Firefox GET requests and POST without data all work. It isn’t until a POST has data that a preflight is initiated.

NOTE: Another good reason to develop in Chrome. Had I developed solely in IE, I would never have discovered this problem until we went into production. 

Another good resource for learning about CORS: 
http://www.html5rocks.com/en/tutorials/cors/#toc-making-a-cors-request

Ultimately the only solution that addressed all my requirements was hijacking the preflight, “old school,” and returning the client as "origin," satisfying Chrome and Firefox.

I plan to update this later. Something about the solution I’ve come up with just doesn’t feel right. It feels too much like a hack. I’m always open to suggestions and new ideas so feel free to email me. robertdunaway@usa.net
