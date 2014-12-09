/*global mashupApp:false */

// configure our routes

mashupApp.config(function ($routeProvider) {
    "use strict";

    $routeProvider
        .when('/about', {
            templateUrl: 'apps/mashup/about/about.html',
            controller: 'mashup.aboutController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    // you can lazy load files for an existing module
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/mashup/about/about.controller.js', 'apps/mashup/~appServices/data.service.js']
                    });
                }]
                , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }

        })
        .when('/', {
            templateUrl: 'apps/mashup/welcome/welcome.html',
            controller: 'mashup.welcomeController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/mashup/welcome/welcome.controller.js']
                    });
                }]
            , 
                sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })

    ;

});