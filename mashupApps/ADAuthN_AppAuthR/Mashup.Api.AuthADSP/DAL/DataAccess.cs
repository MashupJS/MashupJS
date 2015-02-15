using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

using System.Data.SqlClient;
using System.Configuration;
using Mashup.Api.AuthADSP.HelperClasses;
using Mashup.Api.AuthADSP.api.Entities;

namespace Mashup.Api.AuthADSP.DAL
{
    public static class DataAccess
    {

        public static List<ErrorLogEntity> GetErrorLogs(string env, int? tzOffsetMinutes, int? errorLogId, int? userId)
        {
            var connectionString = ConfigurationManager.ConnectionStrings[env].ConnectionString;

            var resultEntity = new List<ErrorLogEntity>();

            using (var connection = new SqlConnection(connectionString))
            {
                using (var command = new SqlCommand("[GetErrorLogs]") { CommandType = CommandType.StoredProcedure, Connection = connection })
                {
                    // =====================================================================================================
                    // Add Parameters
                    // =====================================================================================================

                    //SqlParameter[] paramCollection = new SqlParameter[0];

                    if (userId != null)
                    {
                        var param_UserId = new SqlParameter("@UserId", userId)
                        {
                            Direction = ParameterDirection.Input,
                            SqlDbType = System.Data.SqlDbType.Int
                        };
                        command.Parameters.Add(param_UserId);
                    }

                    if (errorLogId != null)
                    {
                        var param_errorLogId = new SqlParameter("@errorLogId", errorLogId)
                        {
                            Direction = ParameterDirection.Input,
                            SqlDbType = System.Data.SqlDbType.Int
                        };
                        command.Parameters.Add(param_errorLogId);
                    }

                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection))
                    {
                        if (reader != null)
                        {
                            while (reader.Read())
                            {
                                var entity = new ErrorLogEntity();

                                entity.ErrorLogId = NullHelper.GetInt32FromReader(reader, "ErrorLogId");
                                entity.ErrorNumber = NullHelper.GetInt32FromReader(reader, "ErrorNumber");
                                entity.ErrorSeverity = NullHelper.GetInt32FromReader(reader, "ErrorSeverity");
                                entity.ErrorState = NullHelper.GetInt32FromReader(reader, "ErrorState");
                                entity.ErrorProcedure = NullHelper.GetStringFromReader(reader, "ErrorProcedure");
                                entity.ErrorLine = NullHelper.GetInt32FromReader(reader, "ErrorLine");
                                entity.ErrorMessage = NullHelper.GetStringFromReader(reader, "ErrorMessage");
                                entity.ErrorAdditionalInfo = NullHelper.GetStringFromReader(reader, "ErrorAdditionalInfo");
                                entity.ExceptionHelpLink = NullHelper.GetStringFromReader(reader, "ExceptionHelpLink");
                                entity.ExceptionTargetSite = NullHelper.GetStringFromReader(reader, "ExceptionTargetSite");
                                entity.ExceptionMessage = NullHelper.GetStringFromReader(reader, "ExceptionMessage");
                                entity.ExceptionSource = NullHelper.GetStringFromReader(reader, "ExceptionSource");
                                entity.ExceptionStackTrace = NullHelper.GetStringFromReader(reader, "ExceptionStackTrace");
                                entity.ExceptionAdditionalInfo = NullHelper.GetStringFromReader(reader, "ExceptionAdditionalInfo");
                                entity.UserId = NullHelper.GetInt32FromReader(reader, "UserId");
                                entity.FriendlyMessage = NullHelper.GetStringFromReader(reader, "FriendlyMessage");
                                entity.CreatedDateTime = NullHelper.GetDateFromReader(reader, "CreatedDateTime", tzOffsetMinutes);

                                resultEntity.Add(entity);
                            }
                        }
                    }
                }
            }

            return resultEntity;
        }
        public static int UpdateErrorLog(string env, ErrorLogEntity errorLogEntity)
        {
            var connectionString = ConfigurationManager.ConnectionStrings[env].ConnectionString;

            var resultEntity = 0;

            using (var connection = new SqlConnection(connectionString))
            {
                using (var command = new SqlCommand("[UpdateErrorLog]") { CommandType = CommandType.StoredProcedure, Connection = connection })
                {
                    // =====================================================================================================
                    // Add Parameters
                    // =====================================================================================================

                    if (errorLogEntity.ErrorLogId != null)
                    {
                        var param_ErrorLogId = new SqlParameter("@ErrorLogId", errorLogEntity.ErrorLogId) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.Int };
                        command.Parameters.Add(param_ErrorLogId);
                    }

                    if (errorLogEntity.ErrorNumber != null)
                    {
                        var param_ErrorNumber = new SqlParameter("@ErrorNumber", errorLogEntity.ErrorNumber) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.Int };
                        command.Parameters.Add(param_ErrorNumber);
                    }

                    if (errorLogEntity.ErrorSeverity != null)
                    {
                        var param_ErrorSeverity = new SqlParameter("@ErrorSeverity", errorLogEntity.ErrorSeverity) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.Int };
                        command.Parameters.Add(param_ErrorSeverity);
                    }

                    if (errorLogEntity.ErrorState != null)
                    {
                        var param_ErrorState = new SqlParameter("@ErrorState", errorLogEntity.ErrorState) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.Int };
                        command.Parameters.Add(param_ErrorState);
                    }

                    if (errorLogEntity.ErrorProcedure != null)
                    {
                        var param_ErrorProcedure = new SqlParameter("@ErrorProcedure", errorLogEntity.ErrorProcedure) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.VarChar, Size = 126 };
                        command.Parameters.Add(param_ErrorProcedure);
                    }

                    //,@ErrorLine int = null
                    if (errorLogEntity.ErrorLine != null)
                    {
                        var param_ErrorLine = new SqlParameter("@ErrorLine", errorLogEntity.ErrorLine) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.Int };
                        command.Parameters.Add(param_ErrorLine);
                    }

                    //,@ErrorMessage varchar(2048) = ''
                    if (errorLogEntity.ErrorMessage != null)
                    {
                        var param_ErrorMessage = new SqlParameter("@ErrorMessage", errorLogEntity.ErrorMessage) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.VarChar, Size = 2048 };
                        command.Parameters.Add(param_ErrorMessage);
                    }

                    //,@ErrorAdditionalInfo varchar(2048) = ''
                    if (errorLogEntity.ErrorAdditionalInfo != null)
                    {
                        var param_ErrorAdditionalInfo = new SqlParameter("@ErrorAdditionalInfo", errorLogEntity.ErrorAdditionalInfo) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.VarChar, Size = 2048 };
                        command.Parameters.Add(param_ErrorAdditionalInfo);
                    }

                    //,@ExceptionHelpLink varchar(2048) = ''
                    if (errorLogEntity.ExceptionHelpLink != null)
                    {
                        var param_ExceptionHelpLink = new SqlParameter("@ExceptionHelpLink", errorLogEntity.ExceptionHelpLink) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.VarChar, Size = 2048 };
                        command.Parameters.Add(param_ExceptionHelpLink);
                    }

                    //,@ExceptionTargetSite varchar(2048) = ''
                    if (errorLogEntity.ExceptionTargetSite != null)
                    {
                        var param_ExceptionTargetSite = new SqlParameter("@ExceptionTargetSite", errorLogEntity.ExceptionTargetSite) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.VarChar, Size = 2048 };
                        command.Parameters.Add(param_ExceptionTargetSite);
                    }

                    //,@ExceptionMessage varchar(2048) = ''
                    if (errorLogEntity.ExceptionMessage != null)
                    {
                        var param_ExceptionMessage = new SqlParameter("@ExceptionMessage", errorLogEntity.ExceptionMessage) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.VarChar, Size = 2048 };
                        command.Parameters.Add(param_ExceptionMessage);
                    }

                    //,@ExceptionStackTrace varchar(4096) = ''
                    if (errorLogEntity.ExceptionStackTrace != null)
                    {
                        var param_ExceptionStackTrace = new SqlParameter("@ExceptionStackTrace", errorLogEntity.ExceptionStackTrace) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.VarChar };
                        command.Parameters.Add(param_ExceptionStackTrace);
                    }


                    if (errorLogEntity.ExceptionSource != null)
                    {
                        var param_ExceptionSource = new SqlParameter("@ExceptionSource", errorLogEntity.ExceptionSource) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.VarChar, Size = 4096 };
                        command.Parameters.Add(param_ExceptionSource);
                    }

                    //,@ExceptionAdditionalInfo varchar(2048) = ''
                    if (errorLogEntity.ExceptionAdditionalInfo != null)
                    {
                        var param_ExceptionAdditionalInfo = new SqlParameter("@ExceptionAdditionalInfo", errorLogEntity.ExceptionAdditionalInfo) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.VarChar, Size = 2048 };
                        command.Parameters.Add(param_ExceptionAdditionalInfo);
                    }

                    if (errorLogEntity.UserId != null)
                    {
                        var param_UserId = new SqlParameter("@UserId", errorLogEntity.UserId) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.Int };
                        command.Parameters.Add(param_UserId);
                    }

                    //,@FriendlyMessage varchar(500) = ''
                    if (errorLogEntity.FriendlyMessage != null)
                    {
                        var param_FriendlyMessage = new SqlParameter("@FriendlyMessage", errorLogEntity.FriendlyMessage) { Direction = ParameterDirection.Input, SqlDbType = System.Data.SqlDbType.VarChar, Size = 500 };
                        command.Parameters.Add(param_FriendlyMessage);
                    }

                    // ==========================================================================================
                    // Standard parameters for success fail
                    // ==========================================================================================
                    var param_Return = new SqlParameter("@ReturnErrorLogId", System.Data.SqlDbType.Int)
                    {
                        Direction = ParameterDirection.Output
                    };
                    command.Parameters.Add(param_Return);
                    // ==========================================================================================

                    connection.Open();
                    command.ExecuteNonQuery();

                    resultEntity = (int)command.Parameters["@ReturnErrorLogId"].Value;
                }
            }

            return resultEntity;
        }


        public static List<UserEntity> GetUsers(string env, int? tzOffsetMinutes, int? userId, string userName, bool? active)
        {
            var connectionString = ConfigurationManager.ConnectionStrings[env].ConnectionString;

            var resultEntity = new List<UserEntity>();

            using (var connection = new SqlConnection(connectionString))
            {
                using (var command = new SqlCommand("[GetUsers]") { CommandType = CommandType.StoredProcedure, Connection = connection })
                {
                    // =====================================================================================================
                    // Add Parameters
                    // =====================================================================================================

                    //SqlParameter[] paramCollection = new SqlParameter[0];

                    if (userId != null)
                    {
                        var param_UserId = new SqlParameter("@UserId", userId)
                        {
                            Direction = ParameterDirection.Input,
                        };
                        command.Parameters.Add(param_UserId);
                    }

                    if (userName != String.Empty)
                    {
                        var param_userName = new SqlParameter("@UserName", userName)
                        {
                            Direction = ParameterDirection.Input,
                            SqlDbType = System.Data.SqlDbType.VarChar,
                            Size = 50
                        };
                        command.Parameters.Add(param_userName);
                    }

                    if (active != null)
                    {
                        var param_Active = new SqlParameter("@Active", active)
                        {
                            Direction = ParameterDirection.Input,
                            SqlDbType = System.Data.SqlDbType.Bit,
                        };
                        command.Parameters.Add(param_Active);
                    }

                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection))
                    {
                        if (reader != null) // does this always evaluate to true? Why is this line here?
                        {
                            while (reader.Read())
                            {
                                var entity = new UserEntity();

                                entity.UserId = NullHelper.GetInt32FromReader(reader, "UserId");
                                entity.UserName = NullHelper.GetStringFromReader(reader, "UserName");
                                entity.FirstName = NullHelper.GetStringFromReader(reader, "FirstName");
                                entity.LastName = NullHelper.GetStringFromReader(reader, "LastName");
                                entity.ActiveCode = NullHelper.GetBooleanFromReader(reader, "ActiveCode");
                                entity.ActiveStatus = NullHelper.GetStringFromReader(reader, "ActiveStatus");
                                entity.Email = NullHelper.GetStringFromReader(reader, "Email");
                                entity.CreatedDateTime = NullHelper.GetDateFromReader(reader, "CreatedDateTime", tzOffsetMinutes);
                                entity.CreatedBy = NullHelper.GetInt32FromReader(reader, "CreatedBy");
                                entity.CreatedByUserName = NullHelper.GetStringFromReader(reader, "CreatedByUserName");
                                
                                entity.UpdatedDateTime = NullHelper.GetDateFromReader(reader, "UpdatedDateTime", tzOffsetMinutes);
                                
                                entity.UpdatedBy = NullHelper.GetInt32FromReader(reader, "UpdatedBy");
                                entity.UpdatedByUserName = NullHelper.GetStringFromReader(reader, "UpdatedByUserName");
                                entity.FullName = NullHelper.GetStringFromReader(reader, "FullName");

                                resultEntity.Add(entity);
                            }
                        }
                    }
                }
            }

            return resultEntity;
        }
        public static List<RoleEntity> GetRoles(string env, int? tzOffsetMinutes, bool? active, int? userId)
        {
            var resultEntity = new List<RoleEntity>();

            var connectionString = ConfigurationManager.ConnectionStrings[env].ConnectionString;

            using (var connection = new SqlConnection(connectionString))
            {
                using (var command = new SqlCommand("[GetRoles]") { CommandType = CommandType.StoredProcedure, Connection = connection })
                {
                    // =====================================================================================================
                    // Add Parameters
                    // =====================================================================================================

                    if (userId != null)
                    {
                        var param_UserId = new SqlParameter("@UserId", userId)
                        {
                            Direction = ParameterDirection.Input,
                            SqlDbType = System.Data.SqlDbType.Int,
                        };
                        command.Parameters.Add(param_UserId);
                    }

                    if (active != null)
                    {
                        var param_Active = new SqlParameter("@Active", active)
                        {
                            Direction = ParameterDirection.Input,
                            SqlDbType = System.Data.SqlDbType.Bit,
                        };
                        command.Parameters.Add(param_Active);
                    }


                    connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection))
                    {
                        if (reader != null)
                        {
                            while (reader.Read())
                            {
                                var entity = new RoleEntity();

                                entity.RoleId = NullHelper.GetInt32FromReader(reader, "RoleId");
                                entity.RoleName = NullHelper.GetStringFromReader(reader, "RoleName");
                                entity.Active = NullHelper.GetBooleanFromReader(reader, "Active");
                                entity.ActiveStatus = NullHelper.GetStringFromReader(reader, "ActiveStatus");
                                entity.CreatedDateTime = NullHelper.GetDateFromReader(reader, "CreatedDateTime", tzOffsetMinutes);
                                entity.CreatedBy = NullHelper.GetInt32FromReaderNullable(reader, "CreatedBy");

                                resultEntity.Add(entity);
                            }
                        }
                    }
                }
            }

            return resultEntity;
        }

        public static void UpdateUser(string env, UserEntity userEntity)
        {
            var connectionString = ConfigurationManager.ConnectionStrings[env].ConnectionString;

            using (var connection = new SqlConnection(connectionString))
            {
                using (var command = new SqlCommand("[UpdateUser]") { CommandType = CommandType.StoredProcedure, Connection = connection })
                {
                    // =====================================================================================================
                    // Add Parameters
                    // =====================================================================================================

                    //if (userEntity.UserId != null)
                    //{
                    var param_UserId = new SqlParameter("@UserId", userEntity.UserId)
                    {
                        Direction = ParameterDirection.Input,
                        SqlDbType = System.Data.SqlDbType.Int
                    };
                    command.Parameters.Add(param_UserId);
                    //}

                    if (userEntity.UserName != String.Empty)
                    {
                        var param_userName = new SqlParameter("@UserName", userEntity.UserName)
                        {
                            Direction = ParameterDirection.Input,
                            SqlDbType = System.Data.SqlDbType.VarChar,
                            Size = 50
                        };
                        command.Parameters.Add(param_userName);
                    }

                    if (userEntity.FirstName != String.Empty)
                    {
                        var param_FirstName = new SqlParameter("@FirstName", userEntity.FirstName)
                        {
                            Direction = ParameterDirection.Input,
                            SqlDbType = System.Data.SqlDbType.VarChar,
                            Size = 50
                        };
                        command.Parameters.Add(param_FirstName);
                    }

                    if (userEntity.LastName != String.Empty)
                    {
                        var param_LastName = new SqlParameter("@LastName", userEntity.LastName)
                        {
                            Direction = ParameterDirection.Input,
                            SqlDbType = System.Data.SqlDbType.VarChar,
                            Size = 50
                        };
                        command.Parameters.Add(param_LastName);
                    }

                    // This bool always evaluates to true or false so no if statement required.
                    var param_ActiveCode = new SqlParameter("@Active", userEntity.ActiveCode)
                    {
                        Direction = ParameterDirection.Input,
                        SqlDbType = System.Data.SqlDbType.Bit
                    };
                    command.Parameters.Add(param_ActiveCode);


                    if (userEntity.Email != String.Empty)
                    {
                        var param_Email = new SqlParameter("@Email", userEntity.Email)
                        {
                            Direction = ParameterDirection.Input,
                            SqlDbType = System.Data.SqlDbType.VarChar,
                            Size = 250
                        };
                        command.Parameters.Add(param_Email);
                    }

                    var param_Action = new SqlParameter("@Action", userEntity.DatabaseAction)
                    {
                        Direction = ParameterDirection.Input,
                        SqlDbType = System.Data.SqlDbType.Int
                    };
                    command.Parameters.Add(param_Action);

                    // ==========================================================================================
                    // Standard parameters for success fail
                    // ==========================================================================================
                    var param_Return = new SqlParameter("@ReturnValue", System.Data.SqlDbType.Int)
                    {
                        Direction = ParameterDirection.ReturnValue
                    };
                    command.Parameters.Add(param_Return);
                    // ==========================================================================================

                    connection.Open();
                    command.ExecuteNonQuery();

                    // ==========================================================================================
                    // Check for database exception and raise.  We won't handle exceptions here but we will log them.
                    // If an error has occurred then the returnValue will be the database error log of the error.
                    // ==========================================================================================
                    int returnValue = (int)command.Parameters["@ReturnValue"].Value;
                    if (returnValue != 0)
                    {
                        HelperClasses.CustomDatabaseException customDatabaseExeption = new CustomDatabaseException(returnValue, "Error occurred while managing a user.");
                        throw customDatabaseExeption;
                    }
                    // ==========================================================================================

                }
            }
        }


    }
}