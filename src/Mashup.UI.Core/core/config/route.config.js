/*global mashupApp:false, _:false */

// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 
// core/config/route.config.js
// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 

// configure routes

mashupApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.otherwise({ redirectTo: '/' });

    $routeProvider
    .when('/about', {
        templateUrl: 'core/about.html',
        controller: 'mashup.AboutController',
        controllerAs: 'vm',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load({
                    name: 'mashupApp',
                    files: ['core/about.controller.js']
                });
            }],
            resolveRoute: ['$route', 'coreRouterAuth', function ($route, coreRouterAuth) { return coreRouterAuth.resolveRoute(['Administrator']); }],
        }
    })

    .when('/', {
        templateUrl: 'core/welcome.html',
        controller: 'mashup.WelcomeController',
        controllerAs: 'vm',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'mashupApp',
                    files: ['core/welcome.controller.min.js']
                });
            }],
            resolveRoute: ['$route', 'coreRouterAuth', function ($route, coreRouterAuth) { return coreRouterAuth.resolveRoute(['MashupUser']); }],
        }
    })
    .when('/login', {
        templateUrl: 'core/login.html',
        controller: 'mashup.LoginController',
        controllerAs: 'vm',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'mashupApp',
                    files: ['core/login.controller.min.js']
                });
            }],

        }
    });

}]);

mashupApp.factory('coreRouterAuth', ['$log', '$q', '$timeout', '$location', '$interval', 'sessionService', 'cacheService',
    'utility', 'coreRouteHelper', function ($log, $q, $timeout, $location, $interval, sessionService, cacheService,
        utility, coreRouteHelper) {
        'use strict';

        // METHOD CALLED BY THE ROUTER TO VERIFY AUTHENTICATION AND THEN AUTHORIZATION.
        var resolveRoute = function (authGroupArray) {
            // VERIFY USER IS AUTHENTICATED AND AUTHORIZED AND IF NOT REROUTE TO LOGIN PAGE.
            var defer = $q.defer();

            (function () {

                getAppSession().then(function (data) {
                    var appUserSession = data[0];
                    var session = _.first(_.where(appUserSession.sessions, { 'appName': 'coreSession' }));

                    var isAuthenticated = isUserAuthenticated(session);
                    var isAuthorized = isUserAuthorized(session, authGroupArray);

                    if (!isAuthorized) {
                        // Just kill the page change completely.
                        defer.reject();
                    }

                    if (!isAuthenticated) {
                        // HERE YOU CAN SET $location.path('/login') to force authentication.
                        $location.path('/login');
                    }
                    else {
                        session.sessionLastUsed = utility.localMilToUtcMil(new Date().getTime());
                    }

                    coreRouteHelper.logRoute('mashup');
                    defer.resolve(true);

                });

            })();

            return defer.promise;
        };

        var getAppSession = function () {
            return cacheService.getCache('mashupSessions');
        };

        // CHECK AUTHENTICATION
        var isUserAuthenticated = function (session) {
            // REPLACE WITH YOU AUTHENTICATION CODE.
            if (_.isNull(session) || _.isUndefined(session)) {
                return false;
            }
            else {
                var userId = session.userName;
                var isAuthenticated = session.isAuthenticated;
                var authDateTime = session.authDateTime;
                var utcMills = session.authTimeUTCMills;

                var result = true;

                // Check if user is authenticated.
                if (!isAuthenticated) { result = false; }

                // Check if the session is stale
                var currentUtcMills = utility.localMilToUtcMil(new Date().getTime());

                var minutes = 60;  // HARD CODED SESSION EXPIRATION FOR DEMO PURPOSES.
                var expireUtcMills = utcMills + (60000 * minutes);

                if (expireUtcMills < currentUtcMills) { result = false; }

                return result;
            }
            return true;
        };

        // CHECK AUTHORIZATION
        var isUserAuthorized = function (session, authGroupArray) {
            // REPLACE WITH YOU AUTHORIZATION CODE.
            var result = false;

            // if no group is passed then assume isAuthorized = true;
            if (authGroupArray.length === 0) { result = true;}

            if (_.isNull(session)) {
                result = false;
            }
            else {
                // verify authGroupArray is an array.
                // verify session.roles has a match with a group in authGroupArray
                if (angular.isArray(authGroupArray)) {
                    // JavaScript FOR loop is faster.  This is more readable so for small lists I'll used angular.isArray.
                    // http://stackoverflow.com/questions/13843972/angular-js-break-foreach
                    angular.forEach(authGroupArray, function (value, key) {
                        if (_.contains(session.roles, value)) {
                            result = true;
                        }
                    });
                }
            }
            return result;
        };
        return {

            resolveRoute: resolveRoute
        };
    }]);

mashupApp.factory('coreRouteHelper', ['$log', '$q', '$location', 'sessionService',
     'utility', function ($log, $q, $location, sessionService,
         utility) {
         'use strict';

         var logRouteInstrumentation = function (application) {
             // -------------------------------------------------------------------
             // Instrumenting the application so we can track what pages get used.
             // -------------------------------------------------------------------
             var logObject = utility.getLogObject('Instr', application, 'coreRouteHelper', 'logRoute',
                 'resolving route', sessionService);
             // Additional or custom properties for logging.
             logObject.absUrl = $location.absUrl();
             logObject.url = $location.url();
             $log.log('UI-Routing to [ ' + $location.url() + ' ]', logObject);
             // -------------------------------------------------------------------
             // -------------------------------------------------------------------
         };

         var logRoute = function (application) {

             var defer = $q.defer();

             (function () {
                 logRouteInstrumentation(application);
                 defer.resolve(true);
             })();

             return defer.promise;
         };

         return {

             logRoute: logRoute
         };
     }]);