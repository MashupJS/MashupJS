/*global mashupApp:false */

// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 
// core/config/route.config.js
// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 

// configure our routes

// TODO: add a universal resolve that will run for all routes.  Will need to angular.extend $routeProvider.
// for now just copying the following resolve to every method:
// , resolve: { sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); } }

mashupApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.otherwise({ redirectTo: '/' });

}]);

mashupApp.factory('sessionLoad', ['$log', '$q', '$timeout', '$location', '$interval', 'sessionService',
    'mashupDataService', 'utility', function ($log, $q, $timeout, $location, $interval, sessionService,
        mashupDataService, utility) {
    'use strict';

    var userInfoCacheDuration = 60;
    var userInfoLastChecked = 0;

    var logRouteInstrumentation = function () {
        // -------------------------------------------------------------------
        // Instrumenting the application so we can track what pages get used.
        // -------------------------------------------------------------------
        var logObject = utility.getLogObject('Instr', 'Mashup.UI.Core', 'sessionLoad', 'loadComplete',
            'UI-Routing', sessionService);
        // Additional or custom properties for logging.
        logObject.absUrl = $location.absUrl();
        logObject.url = $location.url();
        $log.log('UI-Routing to [ ' + $location.url() + ' ]', logObject);
        // -------------------------------------------------------------------
        // -------------------------------------------------------------------
    };

    var loadCompleted = function () {
        
        var defer = $q.defer();

        (function () {
            // This controller only loads once when this site with any route is reloaded.
            // For now this is where I'll put code that needs to load once.

            // Attempt to shortcircuit call to getUserInfo if it has been called within the cache duration.
            var duration = (new Date().getTime() - userInfoLastChecked) / (1000 * 60); // 1000 is one second and 60 is one minute.
            if (duration > userInfoCacheDuration) {

                mashupDataService.getUserInfo(60).then(function (data) {

                    if (data === null || data === undefined || data === '' || data.length === 0) {

                        // TODO: add this to a log that is transmitted immediately  will need to 
                        // implement the log transmission module first.
                        $log.info('The getUserInfo returned an empty array.  Just thought you should know.');

                    } else {
                        // saving session information for the rest of the mashup to use.
                        userInfoLastChecked = new Date().getTime();
                        sessionService.setUserSession(data[0]);
                    }

                    logRouteInstrumentation();

                    // TODO: Might be a good place to put some AuthR code.  Anything we do here needs to also be done at the server.
                    // The client side is to easily manipulated.
                    defer.resolve(true);
                }),
                /*jshint -W030*/
                    function () {
                        // if userInfoLastChecked is not 0 then the user has been authenticated at some point.
                        // if an error occurs then we should not prevent the user from navigating to the next page.
                        if (userInfoLastChecked) {
                            defer.resolve(true);
                        }
                    };
                /*jshint +W030*/
            } else {
                // short circuit because we are within the duration threshold
                logRouteInstrumentation();
                defer.resolve(true);
            }
        })();

        return defer.promise;
    };

    // Example of delay that can occure between routes.
    //loadCompleted: function () {
    //    var defer = $q.defer();

    //    $timeout(function () {
    //        defer.resolve();
    //    }, 5000);

    //    return defer.promise;
    //}
    
    return {

        // Good jsfiddle on how this works. http://jsfiddle.net/JYvsZ/

        loadCompleted: loadCompleted
    };
}]);