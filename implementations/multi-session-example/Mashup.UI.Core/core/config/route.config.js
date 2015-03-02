/*global mashupApp:false */

// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 
// core/config/route.config.js
// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 

// configure our routes

// TODO: add a universal resolve that will run for all routes.  Will need to angular.extend $routeProvider.
// for now just copying the following resolve to every method:
// , resolve: { coreRouteHelper: function ($route, coreRouteHelper) { return coreRouteHelper.logRoute(); } }

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
            logRoute: ['$route', 'coreRouteHelper', function ($route, coreRouteHelper) { return coreRouteHelper.logRoute(); }]
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
            logRoute: ['$route', 'coreRouteHelper', function ($route, coreRouteHelper) { return coreRouteHelper.logRoute(); }]
        }
    });



}]);

mashupApp.factory('coreRouteHelper', ['$log', '$q', '$timeout', '$location', '$interval', 'sessionService',
    'coreDataService', 'utility', function ($log, $q, $timeout, $location, $interval, sessionService,
        coreDataService, utility) {
        'use strict';

        var logRouteInstrumentation = function () {
            // -------------------------------------------------------------------
            // Instrumenting the application so we can track what pages get used.
            // -------------------------------------------------------------------
            var logObject = utility.getLogObject('Instr', 'Mashup.UI.Core', 'coreRouteHelper', 'logRoute',
                'resolving route', sessionService);
            // Additional or custom properties for logging.
            logObject.absUrl = $location.absUrl();
            logObject.url = $location.url();
            $log.log('UI-Routing to [ ' + $location.url() + ' ]', logObject);
            // -------------------------------------------------------------------
            // -------------------------------------------------------------------
        };

        var logRoute = function () {

            var defer = $q.defer();

            (function () {
                logRouteInstrumentation();
                defer.resolve(true);
            })();

            return defer.promise;
        };

        return {

            logRoute: logRoute
        };
    }]);