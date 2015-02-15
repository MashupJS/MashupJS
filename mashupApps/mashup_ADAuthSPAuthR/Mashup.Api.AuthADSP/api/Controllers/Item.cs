using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mashup.Api.AuthADSP.api.Controllers
{
    public class Item
    {
        public int id { get; set; }
        public string action { get; set; }
        public bool done { get; set; }
        public DateTime completed { get; set; }
        public decimal myDecimal { get; set; }
        public double myDouble { get; set; }
        public long myLong { get; set; }
        public string contact { get; set; }
        public string doneWithIndeterminate { get; set; }
    }
}