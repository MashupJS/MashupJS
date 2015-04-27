/*global mashupApp:false */

// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 
// core/config/route.config.js
// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 

// configure our routes

// TODO: add a universal resolve that will run for all routes.  Will need to angular.extend $routeProvider.
// for now just copying the following resolve to every method:
// , resolve: { coreRouterAuth: function ($route, coreRouterAuth) { return coreRouterAuth.logRoute(); } }

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
                    files: ['core/about.controller.min.js']
                });
            }],
            resolveRoute: ['$route', 'coreRouterAuth', function ($route, coreRouterAuth) { return coreRouterAuth.resolveRoute(); }],
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
            resolveRoute: ['$route', 'coreRouterAuth', function ($route, coreRouterAuth) { return coreRouterAuth.resolveRoute(); }],
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
                    files: ['core/login.controller.js']
                });
            }],
            
        }
    });

}]);

mashupApp.factory('coreRouterAuth', ['$log', '$q', '$timeout', '$location', '$interval', 'sessionService', 'cacheService',
    'utility', function ($log, $q, $timeout, $location, $interval, sessionService, cacheService,
        utility) {
        'use strict';

        var resolveRoute = function () {
            // VERIFY USER IS AUTHENTICATED AND AUTHORIZED AND IF NOT REROUTE TO LOGIN PAGE.
            var defer = $q.defer();

            (function () {

                getAppSession().then(function (data) {
                    var appUserSession = data;

                    var isAuthenticated = isUserAuthenticated(appUserSession);
                    var isAuthorized = isUserAuthorized(appUserSession);

                    if (!isAuthenticated || !isAuthorized) {
                        // HERE YOU CAN SET $location.path('/login') to force authentication.
                        // $location/path('/login');
                        $location.path('/login');
                    }

                    if (isAuthenticated) {
                        updateSessionsUser('Bob', 'coreSession');
                    }

                    logRouteInstrumentation();
                    defer.resolve(true);

                });

            })();

            return defer.promise;
        };

        var updateSessionsUser = function (logUserName, logAppName) {
            // THIS INFORMATION IS USED BY SERVICES THAT NEED TO KNOW THE USER AND APP.
            var session = sessionService.getUserSessions();
            session.logUserName = logUserName;
            session.logAppName = logAppName;
            sessionService.setUserSession(session);
        };

        var getAppSession = function () {
            return cacheService.getCache('mashupSessions');
        };

        var isUserAuthenticated = function (appUserSession) {
            // REPLACE WITH YOU AUTHENTICATION CODE.
            if (appUserSession === 'NoCache') {
                return false;
            }
            else {
                // If userId exists
                // If last authorization was within acceptable range
                return true;
            }
            return true;
        };

        var isUserAuthorized = function (appUserSession) {
            // REPLACE WITH YOU AUTHORIZATION CODE.
            if (appUserSession === 'NoCache') {
                return false;
            }
            return true;
        };

        var logRouteInstrumentation = function () {
            // -------------------------------------------------------------------
            // Instrumenting the application so we can track what pages get used.
            // -------------------------------------------------------------------
            var logObject = utility.getLogObject('Instr', 'Mashup.UI.Core', 'coreRouterAuth', 'resolveRoute',
                'resolving route', sessionService);
            // Additional or custom properties for logging.
            logObject.absUrl = $location.absUrl();
            logObject.url = $location.url();
            $log.log('Routing to [ ' + $location.url() + ' ]', logObject);
            // -------------------------------------------------------------------
            // -------------------------------------------------------------------
        };

        return {

            resolveRoute: resolveRoute
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
}]);