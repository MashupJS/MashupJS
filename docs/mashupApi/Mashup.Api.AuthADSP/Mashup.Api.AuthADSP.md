#Mashup.Api.AuthADSP
This is a basic authentication service using Windows Integration and Stored Procedures.  Hence the name *AuthADSP*.  If we were to publish a Federated authentication service using Entity Framework then the name might be *Mashup.Api.AuthFedEF*.

###Process

 1. Index.html is loaded or reloaded
 2. The route attempts to retrieve user credentials
 3. If the user doesn't already exist in the Mashup database they are added.
 4. The combination of Windows Identity and Mashup user information are returned.

###GetCurrentUser function
This function combines Windows Identity and Mashup user information including Windows Groups and Mashup Roles.

The Mashup can use either or both Windows Groups and/or Mashup Roles for **authorization**. 

##Database
To ease setup the database is in the *App_Data* folder.  This is also a good place to develop the database schema.  Scripts generated from schema development can be placed in the *App_Data/mashupcoreScripts* folder.  Obviously, when working outside the local machine the database should be deployed to a SQL Server.

##Stored Procs
This implementation of the Mashup.Api.AuthADSP uses stored procedures but this is not an opinionated implementation.  The Mashup will have several Auth WebApi(s) demonstrating a number of technologies.


###GetUsers
The **GetUsers** stored proc demonstrates how to use one stored proc to handle all user queries.   

```
CREATE PROCEDURE [dbo].[GetUsers]
@UserId int = null
, @UserName varchar(50) = null
, @Active bit = null
AS
BEGIN
SET NOCOUNT ON;
-- EXEC GetUsers
	SELECT DISTINCT [User].[UserId]
		  ,[User].[UserName]
		  ,[User].[FirstName]
		  ,[User].[LastName]
		  ,[User].[Active] AS ActiveCode
		  , ActiveStatus = CASE [User].Active
							WHEN 1 THEN 'Active'
							WHEN 0 THEN 'Inactive'
							END
		  ,[User].[Email]
		  ,[User].[CreatedDateTime]
		  ,[User].[CreatedBy]
		  ,[CreatedByUser].UserName CreatedByUserName
		  ,[User].[UpdatedDateTime]
		  ,[User].[UpdatedBy]
		  ,[UpdatedByUser].UserName UpdatedByUserName  
		  ,[User].[LastName] + ', ' + [User].[FirstName] AS FullName -- Used for dropdowns
	FROM [User]
	LEFT OUTER JOIN [User] CreatedByUser ON CreatedByUser.UserId = [User].UserId
	LEFT OUTER JOIN [User] UpdatedByUser ON UpdatedByUser.UserId = [User].UserId
	WHERE
		ISNull([User].UserId, 0) = Coalesce(@UserId, [User].UserId, 0)
	AND ISNull([User].UserName, '0') = Coalesce(@UserName, [User].UserName, '0')
	AND ISNull([User].Active, '0') = Coalesce(@Active, [User].Active, '0')
	ORDER BY UserName
END
```


###UpdateUser
 The **UpdateUser** stored proc demonstrates how to use one stored proc to handle all updates for a table.  Using the *Merge* statement you can avoid having to create 3 stored procs for insert, update, and delete.
 
```
 CREATE PROCEDURE [dbo].[UpdateUser]
@UserId int = null
,@UserName varchar(50) = ''
,@FirstName varchar(50) = ''
,@LastName varchar(50) = ''
,@Active bit = null
,@Email varchar(250) = ''
,@CreatedBy int = null
,@UpdatedBy int = null
,@Action int = null

AS
BEGIN
SET NOCOUNT ON;
-- TODO: Error Handling, what will be our standard.
-- TODO: Return new UserId and the action that was taken.

-- Notice that Action is used to determin if a delete should occurr.  It's not used to update.
-- Notice the UserId is not used only to find a record.  Not even for a good where clause.
-- No CreatedBy or CreatedDateTime in UPDATE
-- No UpdatedBy or UpdatedDateTime in INSERT

--DECLARE @CreatedDateTime DATETIME;
--SET @CreatedDateTime = dbo.GetGMT_Now();

--DECLARE @UpdatedDateTime DATETIME;
--SET @UpdatedDateTime = dbo.GetGMT_Now();

BEGIN TRANSACTION;
BEGIN TRY

 MERGE [User] AS target
    USING (SELECT @UserId
				,@UserName 
				,@FirstName 
				,@LastName 
				,@Active
				,@Email 
				,GetUtcDate() 
				,@CreatedBy 
				,GetUtcDate() 
				,@UpdatedBy 
				,@Action ) AS source (UserId
									,UserName 
									,FirstName 
									,LastName 
									,Active
									,Email 
									,CreatedDateTime 
									,CreatedBy 
									,UpdatedDateTime 
									,UpdatedBy 
									,[Action] )
    
    ON (target.UserId = source.UserId)
        
    WHEN MATCHED AND source.[Action] NOT IN (2) THEN 
        UPDATE SET UserName = source.UserName
					,FirstName = source.FirstName
					,LastName = source.LastName
					,Active = source.Active
					,Email = source.Email
					,UpdatedDateTime = source.UpdatedDateTime
					,UpdatedBy = source.UpdatedBy
        
	WHEN NOT MATCHED AND source.[Action] NOT IN (2) THEN	
	   INSERT
           ([UserName]
           ,[FirstName]
           ,[LastName]
           ,[Active]
           ,[Email]
           ,[CreatedDateTime]
           ,[CreatedBy])
     VALUES
           (source.UserName
           ,source.FirstName
           ,source.LastName
           ,source.Active
           ,source.Email
           ,source.CreatedDateTime
           ,source.CreatedBy)
	WHEN MATCHED AND source.[Action] = 2 THEN	
		DELETE;
	    
END TRY
BEGIN CATCH
IF @@TRANCOUNT > 0 -- > 0 means that records were changes so roll them back.
  BEGIN
    ROLLBACK TRANSACTION;
  END
  
	DECLARE @AdditionalInformation varchar(2048) = '@UserId=' + CAST(@UserId AS VARCHAR) + '@UserName=' + @UserName + ' | @FirstName=' + @FirstName + ' | @LastName=' + @LastName
	DECLARE @FriendlyMessage varchar(500) = 'Attempt to manage user failed.'
	
	-- ===========================================================================
	-- IF User could not be deleted because of some relationship then set the 
	-- active attribute to inactive.
	-- ===========================================================================
	IF (@Action = 2) AND EXISTS (SELECT * FROM [User] WHERE UserId = @UserId)
	BEGIN
		BEGIN TRANSACTION;
		UPDATE [User] SET Active = 0 WHERE UserId = @UserId;
		SET @FriendlyMessage = 'User could not be deleted but was set to [Inactive].'
	END
	-- ===========================================================================
	ELSE
		BEGIN
			DECLARE @ErrorNumber int = ERROR_NUMBER()
			DECLARE @ErrorSeverity int = ERROR_SEVERITY()
			DECLARE @ErrorState int = ERROR_STATE()
			DECLARE @ErrorProcedure nvarchar(126) = ERROR_PROCEDURE()
			DECLARE @ErrorLine int = ERROR_LINE()
			DECLARE @ErrorMessage nvarchar(2048) = ERROR_MESSAGE()
			DECLARE @ErrorLogId int
			EXEC [dbo].[UpdateErrorLog] null, @ErrorNumber, @ErrorSeverity, @ErrorState, @ErrorProcedure, @ErrorLine, @ErrorMessage
											, @AdditionalInformation,null,null,null,null,null,null,null, @FriendlyMessage, @ErrorLogId OUTPUT
			Return @ErrorLogId;				
		END																		
END CATCH

IF @@TRANCOUNT > 0 -- > 0 means that records were changes so commit them.
BEGIN
  COMMIT TRANSACTION;
  Return 0
END
    
END
```


##UpdateErrorLog
This procedure handles all errors produced by stored procedures.  When an error is recorded the table ID is returned to the client allowing it the opportunity to provide additional information if it exists.

```
CREATE PROCEDURE [dbo].[UpdateErrorLog]
@ErrorLogId int = null
,@ErrorNumber int = null
,@ErrorSeverity int = null
,@ErrorState int = null
,@ErrorProcedure varchar(126) = ''
,@ErrorLine int = null
,@ErrorMessage varchar(2048) = ''
,@ErrorAdditionalInfo varchar(2048) = ''
,@ExceptionHelpLink varchar(2048) = ''
,@ExceptionTargetSite varchar(2048) = ''
,@ExceptionMessage varchar(2048) = ''
,@ExceptionSource varchar(2048) = ''
,@ExceptionStackTrace varchar(max) = ''
,@ExceptionAdditionalInfo varchar(2048) = ''
,@UserId int = null
,@FriendlyMessage varchar(500) = ''
,@ReturnErrorLogId int OUTPUT
```

The first several parameters beginning with **Error...** are for capturing error information from other stored procedures.  

The second set of parameters beginning with **Exception...** hold information provided by the WebApi and html/js client.