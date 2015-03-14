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
            authenticateUser: ['$route', 'coreRouterAuth', function ($route, coreRouterAuth) { return coreRouterAuth.authenticateUser(); }],
        }
    });
}]);

mashupApp.factory('coreRouterAuth', ['$log', '$q', '$timeout', '$location', '$interval', 'sessionService', 'cacheService',
    'utility', function ($log, $q, $timeout, $location, $interval, sessionService, cacheService,
        utility) {
        'use strict';

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


        var isUserAuthorized = function () {
            // REPLACE WITH YOU AUTHENTICATION CODE.
            return true;
        };

        var resolveRoute = function () {
            // VERIFY USER IS AUTHENTICATED AND AUTHORIZED
            var defer = $q.defer();

            (function () {

                var session = sessionService.getUserSessions();
                //var sessionExists = "core" in session;      <-- what you want to use!
                // CHECK FOR SESSION WITH THE CODE ABOVE.
                // -------------------------------------------------
                var sessionExists = true;                  // <-- remove this, replace with above.
                session.isAuthenticated = true;            // <-- remove this, will be part of the session
                // stubbed code
                // -------------------------------------------------

                var isAuthenticated = false;
                var isAuthorized = false;

                if (sessionExists) {
                    if (session.isAuthenticated) {
                        isAuthenticated = true;
                        isAuthorized = isUserAuthorized();
                    }
                }

                if (!isAuthenticated || !isAuthorized) {
                    $location.path('/');
                }

                logRouteInstrumentation();
                defer.resolve(true);
            })();

            return defer.promise;
        };



        // AUTHENTICATE USER: This is a stub.  Use this pattern in apps that offer authentication.
        var authenticateUser = function () {

            var defer = $q.defer();

            (function () {

                var sessions = sessionService.getUserSessions();
                cacheService.putCache('mashupSessions', sessions);
                //cacheService.putCache('mashupSessions', { session: 1, sessionName: 'session1' });

                defer.resolve(true);
            })();

            return defer.promise;
        };

        return {

            resolveRoute: resolveRoute,
            authenticateUser: authenticateUser
        };
    }]);