
/*global mashupApp:false */

mashupApp.service('utility_LogHelper', function () {
    'use strict';
    var getLogObject = function (subject, app, mod, func, status, sessionService, sessionName) {

        var logObject = {
            subject: subject,
            app: app,
            module: mod,
            func: func,
            status: status
        };

        try {
            var userSession = sessionService[sessionName].userSession();

            // new convention to make this work
            // sessions must have UserName and ApplicationName
            logObject.UserName = userSession.UserName;
            logObject.AppName = userSession.AppName; 

            // new but is probably to much information
            // logObject.userSession = userSession;

            // old
            //logObject.userId = userSession.UserName;
            //logObject.adDomain = userSession.ADDomain;
        }
        catch (e) { }

        try {
            var envSession = sessionService.envSession();
            logObject.osName = envSession.osName;
            logObject.browser = envSession.browserName + ' ' + envSession.fullVersion;

            if (envSession.deviceType === 'desktop') {
                logObject.deviceType = envSession.deviceType;
            } else {
                logObject.deviceType = envSession.deviceType + ': ' + envSession.mobileType;
            }
        }
        catch (e) { }

        return logObject;

    };

    return {

        getLogObject: getLogObject

    };

});