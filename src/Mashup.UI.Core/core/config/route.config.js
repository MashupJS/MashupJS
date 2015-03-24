/*global mashupApp:false, _:false */

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
    'utility', 'coreRouteHelper', function ($log, $q, $timeout, $location, $interval, sessionService, cacheService,
        utility, coreRouteHelper) {
        'use strict';

        // METHOD CALLED BY THE ROUTER TO VERIFY AUTHENTICATION AND THEN AUTHORIZATION.
        var resolveRoute = function () {
            // VERIFY USER IS AUTHENTICATED AND AUTHORIZED AND IF NOT REROUTE TO LOGIN PAGE.
            var defer = $q.defer();

            (function () {

                getAppSession().then(function (data) {
                    var appUserSession = data[0];
                    var session = _.first(_.where(appUserSession.sessions, { 'appName': 'coreSession' }));

                    var isAuthenticated = isUserAuthenticated(session);
                    var isAuthorized = isUserAuthorized(session);

                    if (!isAuthenticated || !isAuthorized) {
                        // HERE YOU CAN SET $location.path('/login') to force authentication.
                        // $location/path('/login');
                        $location.path('/login');
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
                // If userId exists
                // If last authorization was within acceptable range

                var userId = session.userName;
                var isAuthenticated = session.isAuthenticated;
                var authDateTime = session.authDateTime;




                //vm.appSession.sessions[index].authTimeUTCMills = utcMills;
                //vm.appSession.sessions[index].authTimelocalMills = localMills;
                //vm.appSession.sessions[index].authTimelocalDate = localDate;
                //// Below helps prevent the system from re-authenticating a session that is actively being used.
                //vm.appSession.sessions[index].sessionLastChecked = utcMills;

                return true;
            }
            return true;
        };

        // CHECK AUTHORIZATION
        var isUserAuthorized = function (session) {
            // REPLACE WITH YOU AUTHORIZATION CODE.
            if (_.isNull(session)) {
                return false;
            }
            return true;
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