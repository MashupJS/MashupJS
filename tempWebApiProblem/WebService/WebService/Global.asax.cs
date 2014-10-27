using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace WebService
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }


        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            // This will work... except it doesn't.  For some reason the Path does not contain "api/".  I dont' 
            // know why.  My project does recognize this on two web apis so it works but for some reason in this
            // sample it does not.  I don't know how to make it recognize the path.

            if (Context.Request.Path.Contains("api/") && Context.Request.HttpMethod == "GET")
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
