using System.Web;
using System.Web.Mvc;

namespace Mashup.Api.AuthADSP
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
