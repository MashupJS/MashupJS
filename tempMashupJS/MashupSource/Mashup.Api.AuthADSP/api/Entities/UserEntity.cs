using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mashup.Api.AuthADSP.api.Entities
{
    public class UserEntity : CRUDEntity
    {
        // properties provided by AD
        public string ADName { get; set; }
        public string ADDomain { get; set; }
        public string AuthenticationType { get; set; }
        public bool IsAnonymous { get; set; }
        public bool IsAuthenticated { get; set; }
        public string Owner { get; set; }
        public string Token { get; set; }
        public DateTime AuthCheckedDateTime { get; set; }
        public List<ADGroupEntity> Groups { get; set; }
        public List<RoleEntity> Roles { get; set; }
        public List<string> Privileges { get; set; } // Not implemented yet.

        // properties provided by the MashupCoreApi
        public int UserId { get; set; }
        public string UserName { get; set; }  // should be the same as above.
        public bool ActiveCode { get; set; }
        public string ActiveStatus { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedByUserName { get; set; }
        public DateTime UpdatedDateTime { get; set; }
        public int UpdatedBy { get; set; }
        public string UpdatedByUserName { get; set; }

    }
}