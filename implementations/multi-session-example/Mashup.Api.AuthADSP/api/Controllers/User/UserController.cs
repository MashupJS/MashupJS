using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Collections;
using System.Data.SqlClient;
using Mashup.Api.AuthADSP.api.Entities;
using Mashup.Api.AuthADSP.HelperClasses;
using Mashup.Api.AuthADSP.DAL;

namespace Mashup.Api.AuthADSP.api.Controllers.User
{
    [Authorize]
    public class UserController : ApiController
    {
        [Route("api/{env}/GetUsers/{tzOffsetMinutes}/{userId}/{userName}/{active}")]
        [HttpGet]
        public List<UserEntity> GetUsers(string env, string tzOffsetMinutes, string userId, string userName
                                            , string active)
        {
            int? _tzOffsetMinutes = NullHelper.FromStringNullToInt32(tzOffsetMinutes);
            int? _userId = NullHelper.FromStringNullToInt32(userId);
            bool? _active = NullHelper.ToNullableBool(active);

            var users = DataAccess.GetUsers(env, _tzOffsetMinutes, _userId
                                            , NullHelper.FromStringNullToString(userName), _active);
            return users;
        }

        [Route("api/{env}/GetCurrentUser")]
        [HttpGet]
        public List<UserEntity> GetCurrentUser(string env)
        {
            // The purpose of this WebApi is to get the users authenticated credentials
            // for use by the UI to dynamically configure the user experience.
            // This simply identifies the Windows Authenticated user and passes back
            // the users information.
            // Do not mistake this for a method of securing the Web Api.  This must be 
            // done using a different "Token" style approach.

            // ---------------------------------------------------------------------------
            // Get users network identity
            // ---------------------------------------------------------------------------
            var userIdentity = System.Web.HttpContext.Current.Request.LogonUserIdentity;
            var user = new UserEntity()
            {
                ADName = userIdentity.Name,
                AuthenticationType = userIdentity.AuthenticationType,
                IsAnonymous = userIdentity.IsAnonymous,
                IsAuthenticated = userIdentity.IsAuthenticated,
                Owner = userIdentity.Owner.ToString(),
                Token = userIdentity.Token.ToString(),
                AuthCheckedDateTime = DateTime.Now,
                Groups = GetCurrentUsersGroups()
            };

            // ---------------------------------------------------------------------------
            // Get mashup account.  The mashup and AD information are combined.
            // ---------------------------------------------------------------------------
            user.UserName = GetLogin(user.ADName);
            user.ADDomain = GetDomain(user.ADName);
            var mashUser = DataAccess.GetUsers(env, null, null, user.UserName, null);

            if (mashUser.Count > 0)
            {
                CombineMashAndADUserInfo(user, mashUser);
            }
            else
            {
                // boiler-plate for updating entities
                user.DatabaseAction = CRUD.Create;
                user.ActiveCode = true;
                user.CreatedBy = user.UserId;

                // Create mashup account for AD user
                DataAccess.UpdateUser(env, user);

                // Get mashup account
                mashUser = DataAccess.GetUsers(env, null, null, user.UserName, null);

                CombineMashAndADUserInfo(user, mashUser);
            }

            // ---------------------------------------------------------------------------
            // Get users Mashup roles
            // ---------------------------------------------------------------------------
            user.Roles = DataAccess.GetRoles(env, null, true, user.UserId);

            // NOTE: Returning an array because this is how data is stored in the indexedDB.
            // If I don't return as an array then when the client will receive an entity
            // from the database and an array from cache and that's a problem.
            // TODO: Resolve this issue somehow so that the server can return what it should.
            // possibly check if array on the client and convert it there.
            var currentUser = new List<UserEntity>();

            currentUser.Add(user);
            return currentUser;
        }

        // This little gem came from the following site: "Get User Group Memberships in User from ASP.NET"
        // http://www.codeproject.com/Articles/18102/Howto-Almost-Everything-In-Active-Directory-via-C
        private List<ADGroupEntity> GetCurrentUsersGroups()
        {
            var groups = new List<ADGroupEntity>();

            foreach (System.Security.Principal.IdentityReference group in System.Web.HttpContext.Current.Request.LogonUserIdentity.Groups)
            {
                var entity = new ADGroupEntity();
                entity.Name = group.Translate(typeof(System.Security.Principal.NTAccount)).ToString();
                groups.Add(entity);
            }
            return groups;
        }

        private static void CombineMashAndADUserInfo(UserEntity user, List<UserEntity> mashUser)
        {
            user.UserId = mashUser[0].UserId;
            user.ActiveCode = mashUser[0].ActiveCode;
            user.ActiveStatus = mashUser[0].ActiveStatus;
            user.FirstName = mashUser[0].FirstName;
            user.LastName = mashUser[0].LastName;
            user.FullName = mashUser[0].FullName;
            user.Email = mashUser[0].Email;
            user.CreatedDateTime = mashUser[0].CreatedDateTime;
            user.CreatedBy = mashUser[0].CreatedBy;
            user.CreatedByUserName = mashUser[0].CreatedByUserName;
            user.UpdatedDateTime = mashUser[0].UpdatedDateTime;
            user.UpdatedBy = mashUser[0].UpdatedBy;
            user.UpdatedByUserName = mashUser[0].UpdatedByUserName;
        }

        private static string GetDomain(string ADName)
        {
            string s = ADName;
            int stop = s.IndexOf("\\");
            return (stop > -1) ? s.Substring(0, stop) : string.Empty;
        }

        private static string GetLogin(string ADName)
        {
            string s = ADName;
            int stop = s.IndexOf("\\");
            return (stop > -1) ? s.Substring(stop + 1, s.Length - stop - 1) : string.Empty;
        }

    }
}
