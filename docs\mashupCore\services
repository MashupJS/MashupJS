#utilityService
The **Mashup** is a learning tool that also starts as a bootstrap project for line-of-business applications.

The **utilityService** provides general utility functions to modules.

##Purpose
Every application needs utility functions.  In an effort to modularize the *Mashup* general functions, that can be reused, are placed into *utility* modules.

Utility modules begin with **"utility_**.

Two examples of utility modules are:
- utility_LogHelper.js
- utility_UtcDateService.js

An application can easily have 20 or 30 module utilities and a controller might need 5 or 6 of them.  To reduce *dependency injection* complexity all utilities are exposed by the *utility* module hosted in the **utilityService**.

##utilityService
Here is an example of what the **utilityService** looks like when exposing only two other modules.

```

/*global mashupApp:false */

mashupApp.service('utility', function (utility_UtcDateService, utility_LogHelper) {

    //---------------------------------------------------------------------
    // INSTRUCTIONS for 'utility' usage.
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    // Keeps like utility groups together in their own modules then reference 
    // them here and use this general utility class throughout the project.
    // This will allow for more modular, testable, code while keeping the 
    // number of dependency injected modules to minimum.
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------

    //---------------------------------------------------------------------
    // Provides access to the utility_UtcDateService functions.
    // For converting to and from local and UTC dates.
    //---------------------------------------------------------------------
    var utcMilToLocalMil = utility_UtcDateService.utcMilToLocalMil;
    var localMilToUtcMil = utility_UtcDateService.localMilToUtcMil;
    var localDateToUtcDate = utility_UtcDateService.localDateToUtcDate;
    var utcDateToLocalDate = utility_UtcDateService.utcDateToLocalDate;
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------


    var getLogObject = utility_LogHelper.getLogObject;

    return {
        //---------------------------------------------------------------------
        // Provides access to the utility_UtcDateService functions.
        // For converting to and from local and UTC dates.
        //---------------------------------------------------------------------
        localDateToUtcDate: localDateToUtcDate,
        utcDateToLocalDate: utcDateToLocalDate,
        localMilToUtcMil: localMilToUtcMil,
        utcMilToLocalMil: utcMilToLocalMil,
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------

        getLogObject: getLogObject
    };
});


```