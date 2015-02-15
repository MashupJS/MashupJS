/*global mashupApp:false */

// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 
// core/app/mashup/~appConfig/route.config.js
// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 


mashupApp.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider
        .when('/about', {
            templateUrl: 'apps/mashup/about/about.html',
            controller: 'mashup.AboutController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/mashup/about/about.controller.min.js', 'apps/mashup/~appServices/data.service.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }

        })
        .when('/', {
            templateUrl: 'apps/mashup/welcome/welcome.html',
            controller: 'mashup.WelcomeController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/mashup/welcome/welcome.controller.min.js', 'apps/mashup/~appServices/data.service.min.js']
                    });
                }],

                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }

        });
}]);