/*global mashupApp:false, _:false */

// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 
// core/config/route.config.js
// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 

mashupApp.factory('coreRouteHelper', ['$log', '$q', '$location', 'sessionService',
     'utility', function ($log, $q, $location, sessionService,
         utility) {
         'use strict';

         var logRouteInstrumentation = function (appName) {
             // -------------------------------------------------------------------
             // Instrumenting the application so we can track what pages get used.
             // -------------------------------------------------------------------
             var logObject = utility.getLogObject('Instr', appName, 'coreRouteHelper', 'logRoute',
                 'resolving route', sessionService);
             // Additional or custom properties for logging.
             logObject.absUrl = $location.absUrl();
             logObject.url = $location.url();
             $log.log('UI-Routing to [ ' + $location.url() + ' ]', logObject);
             // -------------------------------------------------------------------
             // -------------------------------------------------------------------
         };

         var logRoute = function (appName) {

             var defer = $q.defer();

             (function () {
                 logRouteInstrumentation(appName);
                 defer.resolve(true);
             })();

             return defer.promise;
         };

         return {

             logRoute: logRoute
         };
     }]);;/*global mashupApp:false */

// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 
// core/apps/app1/~appConfig/route.config.js
// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 

///*jshint laxcomma: true*/

mashupApp.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider
        .when('/app1/page1', {
            templateUrl: 'apps/app1/page1/page1.html',
            controller: 'app1.Page1Controller',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: [
                    '$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'mashupApp',
                            files: ['apps/app1/page1/page1.controller.min.js']
                        });
                    }
                ],
                logRoute: ['$route', 'coreRouteHelper', function ($route, coreRouteHelper) { return coreRouteHelper.logRoute(); }]
            }
        })
        .when('/app1/page2', {
            templateUrl: 'apps/app1/page2/page2.html',
            controller: 'app1.Page2Controller',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: [
                    '$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'mashupApp',
                            files: ['apps/app1/page2/page2.controller.min.js']
                        });
                    }
                ],
                logRoute: ['$route', 'coreRouteHelper', function ($route, coreRouteHelper) { return coreRouteHelper.logRoute(); }]

            }
        });
}]);;/*global mashupApp:false */

// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 
// core/apps/app2/~appConfig/route.config.js
// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 

///*jshint laxcomma: true*/

mashupApp.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider
        .when('/app2/page3', {
            templateUrl: 'apps/app2/page3/page3.html',
            controller: 'app2.Page3Controller',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: [
                    '$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'mashupApp',
                            files: ['apps/app2/page3/page3.controller.min.js']
                        });
                    }
                ],
                logRoute: ['$route', 'coreRouteHelper', function ($route, coreRouteHelper) { return coreRouteHelper.logRoute(); }]
            }
        })
        .when('/app2/page4', {
            templateUrl: 'apps/app2/page4/page4.html',
            controller: 'app2.Page4Controller',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: [
                    '$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'mashupApp',
                            files: ['apps/app2/page4/page4.controller.min.js']
                        });
                    }
                ],
                logRoute: ['$route', 'coreRouteHelper', function ($route, coreRouteHelper) { return coreRouteHelper.logRoute(); }]

            }
        });
}]);;/*global mashupApp:false, _:false */

// configure routes
mashupApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.otherwise({ redirectTo: '/mashup' });

    $routeProvider
    .when('/mashup/about', {
        templateUrl: 'apps/mashup/about.html',
        controller: 'mashup.AboutController',
        controllerAs: 'vm',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load({
                    name: 'mashupApp',
                    files: ['apps/mashup/about.controller.min.js']
                });
            }],
            resolveRoute: ['$route', 'mashupRouterAuth', function ($route, mashupRouterAuth) {
                return mashupRouterAuth.resolveRoute(['Administrator']);
            }],
        }
    })

    .when('/mashup', {
        templateUrl: 'apps/mashup/welcome.html',
        controller: 'mashup.WelcomeController',
        controllerAs: 'vm',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'mashupApp',
                    files: ['apps/mashup/welcome.controller.min.js']
                });
            }],
            resolveRoute: ['$route', 'mashupRouterAuth', function ($route, mashupRouterAuth) {
                return mashupRouterAuth.resolveRoute(['MashupUser']);
            }],
        }
    })
    .when('/mashup/login', {
        templateUrl: 'apps/mashup/login.html',
        controller: 'mashup.LoginController',
        controllerAs: 'vm',
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'mashupApp',
                    files: ['apps/mashup/login.controller.min.js']
                });
            }],
            logRoute: ['$route', 'coreRouteHelper', function ($route, coreRouteHelper) { return coreRouteHelper.logRoute('mashup'); }],

        }
    });

}]);

mashupApp.factory('mashupRouterAuth', ['$log', '$q', '$timeout', '$location', '$interval', 'sessionService', 'cacheService',
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


                    if (!isAuthenticated) {
                        // HERE YOU CAN SET $location.path('/login') to force authentication.
                        $location.path('/mashup/login');

                        if (!isAuthorized) {
                            // Just kill the page change completely.
                            defer.reject();
                        }
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
            if (authGroupArray.length === 0) { result = true; }

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
