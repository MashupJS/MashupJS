
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
            var userSession = sessionService.userSession();
            logObject.userId = userSession.UserName;
            logObject.adDomain = userSession.ADDomain;
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