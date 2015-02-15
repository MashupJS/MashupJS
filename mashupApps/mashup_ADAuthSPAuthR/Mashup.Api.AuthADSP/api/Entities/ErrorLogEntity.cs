using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mashup.Api.AuthADSP.api.Entities
{
    public class ErrorLogEntity : CRUDEntity
    {
        public int? ErrorLogId { get; set; }
        public int? ErrorNumber { get; set; }
        public int? ErrorSeverity { get; set; }
        public int? ErrorState { get; set; }
        public string ErrorProcedure { get; set; }
        public int? ErrorLine { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorAdditionalInfo { get; set; }
        public string ExceptionHelpLink { get; set; }
        public string ExceptionTargetSite { get; set; }
        public string ExceptionMessage { get; set; }
        public string ExceptionSource { get; set; }
        public string ExceptionStackTrace { get; set; }
        public string ExceptionAdditionalInfo { get; set; }
        public int? UserId { get; set; }
        public string FriendlyMessage { get; set; }
        public DateTime CreatedDateTime { get; set; }

    }
}
