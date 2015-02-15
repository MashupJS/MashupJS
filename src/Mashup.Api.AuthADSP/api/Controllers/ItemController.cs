using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Mashup.Api.AuthADSP.api.Controllers
{
    [Authorize] // Even though this says "Authorize" it should require the user to be at least Authenticated.
    public class ItemController : ApiController
    {
        List<Item> _items = new List<Item> {
            new Item { id = 1, action = "Buy Gloves", done = false, completed = Convert.ToDateTime("5/28/2014"), myDecimal = 1.1m, myDouble = 1.00, myLong = 64, contact = "name1@domain.com"},
            new Item { id = 2, action = "Get Hair cut", done = false, completed = Convert.ToDateTime("5/28/2014"), myDecimal = 1.2m, myDouble = 1.00, myLong = 64, contact = "name1@domain.com"},
            new Item { id = 3, action = "Collect Tickets", done = true, completed = Convert.ToDateTime("5/28/2014"), myDecimal = 1.3m, myDouble = 1.00, myLong = 64, contact = "name1@domain.com"},
            new Item { id = 4, action = "Call Joe", done = false, completed = Convert.ToDateTime("5/28/2014"), myDecimal = 1.4m, myDouble = 1.00, myLong = 64, contact = "name1@domain.com"},
            new Item { id = 5, action = "Check TODO List", done = false, completed = Convert.ToDateTime("6/28/2014"), myDecimal = 2.1m, myDouble = 1.00, myLong = 64, contact = "name1@domain.com"},
            new Item { id = 6, action = "Call the tax dude", done = false, completed = Convert.ToDateTime("6/28/2014"), myDecimal = 2.1m, myDouble = 1.00, myLong = 64, contact = "name1@domain.com"},
            new Item { id = 7, action = "Feed the dogs", done = true, completed = Convert.ToDateTime("6/28/2014"), myDecimal = 2.1m, myDouble = 1.00, myLong = 64, contact = "name2@domain.com"},
            new Item { id = 8, action = "Start spring cleaning", done = false, completed = Convert.ToDateTime("6/28/2014"), myDecimal = 3.1m, myDouble = 1.00, myLong = 64, contact = "name2@domain.com"},
            new Item { id = 9, action = "Schedule checkup", done = false, completed = Convert.ToDateTime("7/28/2014"), myDecimal = 3.1m, myDouble = 1.00, myLong = 64, contact = "name2@domain.com"},
            new Item { id = 10, action = "Sweep porch", done = false, completed = Convert.ToDateTime("7/28/2014"), myDecimal = 1.1m, myDouble = 1.00, myLong = 64, contact = "name2@domain.com"},
            new Item { id = 11, action = "Do dishes", done = true, completed = Convert.ToDateTime("7/28/2014"), myDecimal = 1.1m, myDouble = 2.00, myLong = 64, contact = "name2@domain.com"},
            new Item { id = 12, action = "Take out trash", done = false, completed = Convert.ToDateTime("7/28/2014"), myDecimal = 1.1m, myDouble = 2.00, myLong = 64, contact = "name2@domain.com"},
            new Item { id = 13, action = "Do your homework!", done = true, completed = Convert.ToDateTime("1/28/2014"), myDecimal = 1.1m, myDouble = 3.00, myLong = 64, contact = "name2@domain.com"}
        };


        [Route("api/Items")]
        [HttpGet]
        public List<Item> GetAllItems()
        {
            return _items;
        }

        [Route("api/Items/{id:int:min(2)}")]
        [HttpGet]
        public List<Item> GetItem(int id)
        {
            var items = new List<Item>();

            var item = _items.FirstOrDefault((p) => p.id == id);

            items.Add(item);
            return items;
        }


    }
}