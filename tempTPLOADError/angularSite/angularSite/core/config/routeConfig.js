/*global mashupApp:false */

// configure our routes

// TODO: add a universal resolve that will run for all routes.  Will need to angular.extend $routeProvider.
// for now just copying the following resolve to every method:
// , resolve: { sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); } }

mashupApp.config(function ($routeProvider) {

    $routeProvider.otherwise({ redirectTo: '/page1' });

    $routeProvider
            .when('/page1', {
                templateUrl: 'page1/page1.html',
                controller: 'page1Controller'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['page1/page1Controller.js']
                    });
                }]
            }
            })
           //.when('/page2', {
           //    templateUrl: 'page2/page2.html',
           //    controller: 'page2Controller'
           // , resolve: {
           //     loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
           //         return $ocLazyLoad.load({
           //             name: 'mashupApp',
           //             files: ['page2/page2Controller.js']
           //         });
           //     }]
           // }
           //})



    .when('/page2', {
        templateUrl: "http://localhost:53383/app/page2/page2.html",
        controller: 'page2Controller'
        , resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'mashupApp',
                    files: ['page2/page2Controller.js',
                            'http://localhost:53383/app/page2/page2.html']
                });
            }]

        }
    })



    ;


});
