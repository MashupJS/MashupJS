using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mashup.Api.AuthADSP.api.Entities
{
    public class RoleEntity : CRUDEntity
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public bool Active { get; set; }
        public string ActiveStatus { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int? CreatedBy { get; set; }
    }
}