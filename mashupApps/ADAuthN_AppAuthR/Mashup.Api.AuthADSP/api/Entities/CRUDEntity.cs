using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mashup.Api.AuthADSP.api.Entities
{
    public class CRUDEntity
    {
        public CRUDEntity()
        {
            DatabaseAction = CRUD.None;
        }

        public CRUD DatabaseAction { get; set; }
    }

    public enum CRUD
    {
        Create = 0,
        Update = 1,
        Delete = 2,
        None = 3
    }
}