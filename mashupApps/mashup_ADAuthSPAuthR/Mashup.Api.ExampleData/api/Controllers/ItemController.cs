using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Mashup.UI.ExampleData.api.Entities;

namespace Mashup.UI.ExampleData.api.Controllers
{
    [Authorize] // Even though this says "Authorize" it should require the user to be at least Authenticated.
    public class ItemController : ApiController
    {
        // NOTE: Notice below "IEnumerable".  This is because it's returning a generic list.
        //       I changed it to a generic list.  I'm not sure of the pro/con of this yet.

        //// GET api/<controller>
        //public IEnumerable<string> Get()nu
        //{
        //    return new string[] { "value1", "value2" };
        //}

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


        [Route("api/ExampleData/Items")]
        [HttpGet]
        public List<Item> GetAllItems()
        {
            // string userName = User.Identity.Name;
            return _items;
        }

        [Route("api/ExampleData/Items/{id:int:min(2)}")]
        [HttpGet]
        public List<Item> GetItem(int id)
        {
            var items = new List<Item>();

            var item = _items.FirstOrDefault((p) => p.id == id);

            items.Add(item);
            return items;
        }

        [Route("api/ExampleData/Items/{done:bool}")]
        [HttpGet]
        public List<Item> GetItem(bool done)
        {
            var items = _items.FindAll((p) => p.done == done);

            return items;
        }


        // 2 interesting things to note on this method.
        //   1. The system believes there is a conflict when defining the search
        //      by decimal.  It's confused between this method and the one above
        //      by the int data type.  To correct this I had to change the path.
        //   2. When passing a decimal you must include a forward slash at the end 
        //      of the decimal value.
        //      IE: This will not work, "api/ExampleData/Items/ByDecimal/1.1"
        //      BUT This will work, "api/ExampleData/Items/ByDecimal/1.1/"
        [Route("api/ExampleData/Items/ByDecimal/{myDecimal:decimal}")]
        [HttpGet]
        public List<Item> GetItem(decimal myDecimal)
        {
            var items = _items.FindAll((p) => p.myDecimal == myDecimal);

            return items;
        }

        [Route("api/ExampleData/Items/{completed:datetime}")]
        [HttpGet]
        public List<Item> GetItem(DateTime completed)
        {
            var items = _items.FindAll((p) => p.completed < completed);

            return items;
        }

        // NOTE: I was using the word "action" as the ADName of my parameter because that is the ADName
        //       of the field I want to search.  It just so happens that "action" is a key word and 
        //       will not work so I changed the parameter ADName to actionParam.

        // NOTE: Also note that this search is not only a like search but a case insensitive search.
        //       TODO: There is probably a more efficient way to perform this search.

        [Route("api/ExampleData/Items/{actionParam}")]
        [HttpGet]
        public List<Item> GetItem(string actionParam)
        {
            var items = _items.FindAll((p) => p.action.ToUpper().Contains(actionParam.ToUpper()));

            return items;
        }

        // NOTE: It will be interesting to see if I can pass another string with only the parameter ADName
        //       being different.  OK, the over load will nto work because it would be 2 strings but
        //       strangely the URI still works.  Web Api can distinguish between a string and an email.  Weird.
        const string REGEX_EMAIL = @"^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$";

        //[Route(@"api/ExampleData/Items/{contact:regex(^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|ADName|aero|asia|jobs|museum)$)}")]
        [Route(@"api/ExampleData/Items/{contact:regex(" + REGEX_EMAIL + ")}")]
        [HttpGet]
        public List<Item> GetItemByContact(string contact)
        {
            var items = _items.FindAll((p) => p.contact == contact);

            return items;
        }


        // This is what would support a search screen (possibly)
        // [Route(@"api/ExampleData/Items/{contact:regex(^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|ADName|aero|asia|jobs|museum)$)}")]

        // We can place the default value in the routing parameter or in the method parameter.
        // The difference is in the routing parameter the value goes through binding and data type
        // manipulation so it's better to simply add it to the method directly.

        [Route(@"api/ExampleData/Items/Search/{actionParam}/{done}/{id:int}/{completed:datetime}/{myDecimal:decimal}/{myDouble:double}/{myLong:long}/{contact:regex(" + REGEX_EMAIL + ")}")]
        [HttpGet]
        public List<Item> GetItemSearch(string actionParam, string done, DateTime completed, int id = 0, decimal myDecimal = 0, double myDouble = 0, long myLong = 0, string contact = "")
        {
            // 1. Notice that we are doing this different than the examples above.
            // I want to use the where clause capabilities of this kind of linq
            // syntax.  It only returns IEnumerable so I'm able to convert it back
            // to a generic list with the ToList() method.

            // 2. Notice the use of "ANY".  This is because passing nulls and empty strings
            //    is difficult if not impossible.  I struggled with this so rather than struggling
            //    whenever a value is not passed that is string or bool (which doesn't support a 3rd state on the wrire)
            //    is used I just pass them as string and with the value "ANY" because it does not reduce the filtered set.

            // FYI: All these complexities are indicators that we need to be using the BODY instead of the URL.
            var items = from myRow in _items
                        where (id == 0 || myRow.id == id)
                        && (actionParam.Trim() == "ANY" || myRow.action.ToUpper().Contains(actionParam.ToUpper()))
                        && (done == "ANY" || myRow.done.ToString() == done)
                        && (completed < myRow.completed)
                        && (myDecimal == 0 || myDecimal == myRow.myDecimal)
                        && (myDouble == 0 || myDouble == myRow.myDouble)
                        && (myLong == 0 || myLong == myRow.myLong)
                        && (contact.Trim() == "1@1.com" || contact.Trim() == myRow.contact.Trim())

                        select myRow;

            return items.ToList();
        }



        [Route(@"api/ExampleData/Items/Search2/")]
        [HttpPost]
        public List<Item> GetItemSearch2([FromBody]Item data)
        {
            var items = from myRow in _items
                        where (data.id == 0 || myRow.id == data.id)
                        && (data.action.Trim() == "ANY" || myRow.action.ToUpper().Contains(data.action.ToUpper()))
                        && (data.doneWithIndeterminate == "ANY" || myRow.done.ToString() == data.doneWithIndeterminate)
                        && (data.completed < myRow.completed)
                        && (data.myDecimal == 0 || data.myDecimal == myRow.myDecimal)
                        && (data.myDouble == 0 || data.myDouble == myRow.myDouble)
                        && (data.myLong == 0 || data.myLong == myRow.myLong)
                        && (data.contact.Trim() == "" || data.contact.Trim() == myRow.contact.Trim())

                        select myRow;

            return items.ToList();
        }




    }
}