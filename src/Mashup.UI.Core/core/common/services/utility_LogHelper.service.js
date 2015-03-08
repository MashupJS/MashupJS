
/*global mashupApp:false */

mashupApp.service('utility_LogHelper', function () {
    'use strict';
    var getLogObject = function (subject, app, mod, func, status, sessionService) {

        var logObject = {
            subject: subject,
            app: app,
            module: mod,
            func: func,
            status: status
        };

        try {
            var userSessions = sessionService.getUserSessions();

            // convention to make this work
            // each applications router will set these values.  This way
            // the dependence on session is a little more loosely coupled.
            logObject.logUserName = userSessions['core'].logUserName;
            logObject.logAppName = userSessions['core'].logAppName;

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