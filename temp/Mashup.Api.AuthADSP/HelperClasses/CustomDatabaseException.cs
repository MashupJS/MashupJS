using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mashup.Api.AuthADSP.HelperClasses
{
    public class CustomDatabaseException : System.Exception
    {
        // The goal is to capture the database error log id and a friendly message and raise them 
        // as a custom exception.  This information can either be used to give the user a friendly
        // error message or the ErrorLogId can be used to retrieve the details of the error message
        // for an admininistrator/developer.
        public int ErrorLogId { get; set; }
        public string FriendlyMessage { get; set; }

        public CustomDatabaseException() : base() { }
        public CustomDatabaseException(int errorLogId, string friendlyMessage)
            : base()
        { ErrorLogId = errorLogId; FriendlyMessage = friendlyMessage; }

        // NOTE FROM BOB: In full disclosure... I borrowed the below Serialization method.
        // A constructor is needed for serialization when an
        // exception propagates from a remoting server to the client. 
        protected CustomDatabaseException(System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context) { }
    }
}