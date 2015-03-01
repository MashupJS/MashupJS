
using System.Web.Http;

namespace Mashup.UI.ExampleData.api
{
    [Authorize]
    public class HeartBeatController : ApiController
    {

        [Route("api/HeartBeat/")]
        [HttpGet]
        public bool HeartBeat()
        {
            // Later, add server performance metrics allowing the client
            // to decide if you want to trouble the server with information.

            // Can also return false if the WebApi server doesn't have enough
            // resources to satisfy the client.  This will cause the client
            // dip into it's cache.

            return true;
        }
    }
}
