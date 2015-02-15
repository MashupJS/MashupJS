using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mashup.Api.AuthADSP.HelperClasses
{
    public static class GMT
    {
        public static DateTime GmtToLocal(DateTime gmtDate, int tzOffsetMinutes)
        {
            DateTime result = gmtDate;

            result = gmtDate.AddMinutes(tzOffsetMinutes);

            return result;
        }

        public static DateTime LocalToGmt(DateTime gmtDate, int tzOffsetMinutes)
        {
            // Used when passing parameters to Stored Proc but not when the 
            // Stored Proc is planning to use GetDate().  We handle that locally.
            DateTime result = gmtDate;

            result = gmtDate.AddMinutes(-tzOffsetMinutes);

            return result;
        }

    }
}
