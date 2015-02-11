/*global mashupApp:false */

// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 
// core/apps/exApp1/~appConfig/route.config.js
// --------------------------------------------------------------------------------------------- 
// --------------------------------------------------------------------------------------------- 

///*jshint laxcomma: true*/

mashupApp.config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider

        .when('/exApp1/angularExamplesMain', {
            templateUrl: 'apps/exApp1/angularExamplesMain/angularExamplesMain.html',
            controller: 'exApp1.AngularExamplesMainController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/angularExamplesMain.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/webApiExamplesMain', {
            templateUrl: 'apps/exApp1/webApiExamplesMain/webApiExamplesMain.html',
            controller: 'exApp1.WebApiExamplesMainController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/webApiExamplesMain/webApiExamplesMain.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/formExamplesMain.html',
            controller: 'exApp1.FormExamplesMainController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/formExamplesMain.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/javascriptMain', {
            templateUrl: 'apps/exApp1/javascriptMain/javascriptMain.html',
            controller: 'exApp1.JavascriptMainController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/javascriptMain/javascriptMain.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/page1', {
            templateUrl: 'apps/exApp1/angularExamplesMain/page1/page1.html',
            controller: 'exApp1.Page1Controller',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/page1/page1.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/page2', {
            templateUrl: 'apps/exApp1/angularExamplesMain/page2/page2.html',
            controller: 'exApp1.Page2Controller',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/page2/page2.controller.min.js',
                                'apps/exApp1/angularExamplesMain/page2/page2.html']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/controllers', {
            templateUrl: 'apps/exApp1/angularExamplesMain/controllers/controllers.html',
            controller: 'exApp1.ControllersController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/controllers/controllers.controller.min.js',
                                'apps/exApp1/angularExamplesMain/controllers/controllers.html']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/modal', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/modal/modal.html',
            controller: 'exApp1.ModalController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/modal/modal.controller.min.js',
                             'apps/exApp1/angularExamplesMain/formExamplesMain/modalDemo/modalDemo.controller.min.js',
                                 'apps/exApp1/angularExamplesMain/formExamplesMain/modalLogin/modalLogin.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/proAngular/adamsList', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/proAngular/adamsList/adamsList.html',
            controller: 'exApp1.AdamsListController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/proAngular/adamsList/adamsList.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/javascriptMain/jsexamples1', {
            templateUrl: 'apps/exApp1/javascriptMain/jsexamples1/jsexamples1.html',
            controller: 'exApp1.JSExamples1Controller',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/javascriptMain/jsexamples1/jsexamples1.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/alerts', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/alerts/alerts.html',
            controller: 'exApp1.AlertsController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/alerts/alerts.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/webApiExamplesMain/webapi', {
            templateUrl: 'apps/exApp1/webApiExamplesMain/webapi/webapi.html',
            controller: 'exApp1.WebapiController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/webApiExamplesMain/webapi/webapi.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/webApiExamplesMain/webapi2', {
            templateUrl: 'apps/exApp1/webApiExamplesMain/webapi2/webapi2.html',
            controller: 'exApp1.Webapi2Controller',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/webApiExamplesMain/webapi2/webapi2.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/formElements1', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/formElements1/formElements1.html',
            controller: 'exApp1.FormElements1Controller',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/formElements1/formElements1.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/formExampleTemplate', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/formExampleTemplate/formExampleTemplate.html',
            controller: 'exApp1.FormExampleTemplateController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        /*jshint -W101*/
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/formExampleTemplate/formExampleTemplate.controller.min.js']
                        /*jshint +W101*/
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/angularExamples1', {
            templateUrl: 'apps/exApp1/angularExamplesMain/angularExamples1/angularExamples1.html',
            controller: 'exApp1.AngularExamples1Controller',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        /*jshint -W101*/
                        files: ['apps/exApp1/angularExamplesMain/angularExamples1/angularExamples1.controller.min.js']
                        /*jshint +W101*/
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })

        .when('/exApp1/angularExamplesMain/angularObjects', {
            templateUrl: 'apps/exApp1/angularExamplesMain/angularObjects/angularObjects.html',
            controller: 'exApp1.AngularObjectsController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/angularObjects/angularObjects.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })


        .when('/exApp1/angularExamplesMain/bindingExamples', {
            templateUrl: 'apps/exApp1/angularExamplesMain/bindingExamples/bindingExamples.html',
            controller: 'exApp1.BindingExamplesController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/bindingExamples/bindingExamples.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/templateDirectives', {
            templateUrl: 'apps/exApp1/angularExamplesMain/templateDirectives/templateDirectives.html',
            controller: 'exApp1.TemplateDirectivesController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/templateDirectives/templateDirectives.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/partialViews', {
            templateUrl: 'apps/exApp1/angularExamplesMain/partialViews/partialViews.html',
            controller: 'exApp1.PartialViewsController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/partialViews/partialViews.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/imperative', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/imperative/imperative.html',
            controller: 'exApp1.ImperativeController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        /*jshint -W101*/
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/imperative/imperative.controller.min.js']
                        /*jshint +W101*/
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/declarative', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/declarative/declarative.html',
            controller: 'exApp1.DeclarativeController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        /*jshint -W101*/
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/declarative/declarative.controller.min.js']
                        /*jshint +W101*/
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/declareVsImper', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/declareVsImper.html',
            controller: '',
            resolve: { sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }] }
        })
        .when('/exApp1/angularExamplesMain/elementDirectives', {
            templateUrl: 'apps/exApp1/angularExamplesMain/elementDirectives/elementDirectives.html',
            controller: 'exApp1.ElementDirectivesController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/elementDirectives/elementDirectives.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })

        .when('/exApp1/utilityMain', {
            templateUrl: 'apps/exApp1/utilityMain/utilityMain.html',
            controller: 'exApp1.UtilityMainController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/utilityMain/utilityMain.controller.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        })
        .when('/exApp1/utilityMain/lodash', {
            templateUrl: 'apps/exApp1/utilityMain/lodash/lodash.html',
            controller: 'exApp1.LodashController',
            controllerAs: 'vm',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/utilityMain/lodash/lodash.controller.min.js',
                         'apps/exApp1/~appServices/itemData.service.min.js',
                         'apps/exApp1/~appServices/data.service.min.js']
                    });
                }],
                sessionLoad: ['$route', 'sessionLoad', function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }]
            }
        });
}]);