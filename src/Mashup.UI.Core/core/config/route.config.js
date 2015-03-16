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
    }]);