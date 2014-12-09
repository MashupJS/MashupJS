/*global mashupApp:false */

// configure our routes

mashupApp.config(function ($routeProvider) {
    "use strict";

    $routeProvider

        .when('/exApp1/angularExamplesMain', {
            templateUrl: 'apps/exApp1/angularExamplesMain/angularExamplesMain.html',
            controller: 'exApp1.angularExamplesMainController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/angularExamplesMain.controller.js']
                    });
                }]
             , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/webApiExamplesMain', {
            templateUrl: 'apps/exApp1/webApiExamplesMain/webApiExamplesMain.html',
            controller: 'exApp1.webApiExamplesMainController'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/webApiExamplesMain/webApiExamplesMain.controller.js']
                    });
                }]
             , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/formExamplesMain.html',
            controller: 'exApp1.formExamplesMainController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/formExamplesMain.controller.js']
                    });
                }]
             , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/javascriptMain', {
            templateUrl: 'apps/exApp1/javascriptMain/javascriptMain.html',
            controller: 'exApp1.javascriptMainController'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/javascriptMain/javascriptMain.controller.js']
                    });
                }]
             , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/page1', {
            templateUrl: 'apps/exApp1/angularExamplesMain/page1/page1.html',
            controller: 'exApp1.page1Controller',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/page1/page1.controller.js']
                    });
                }]
             , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/page2', {
            templateUrl: "apps/exApp1/angularExamplesMain/page2/page2.html",
            controller: 'exApp1.page2Controller',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/page2/page2.controller.js',
                                'apps/exApp1/angularExamplesMain/page2/page2.html']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/controllers', {
            templateUrl: "apps/exApp1/angularExamplesMain/controllers/controllers.html",
            controller: 'exApp1.controllersController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/controllers/controllers.controller.js',
                                'apps/exApp1/angularExamplesMain/controllers/controllers.html']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/modal', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/modal/modal.html',
            controller: 'exApp1.modalController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/modal/modal.controller.js'
                            , 'apps/exApp1/angularExamplesMain/formExamplesMain/modalDemo/modalDemo.controller.js'
                                , 'apps/exApp1/angularExamplesMain/formExamplesMain/modalLogin/modalLogin.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/proAngular/adamsList', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/proAngular/adamsList/adamsList.html',
            controller: 'exApp1.adamsListController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/proAngular/adamsList/adamsList.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/javascriptMain/jsexamples1', {
            templateUrl: 'apps/exApp1/javascriptMain/jsexamples1/jsexamples1.html',
            controller: 'exApp1.jsexamples1Controller',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/javascriptMain/jsexamples1/jsexamples1.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/alerts', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/alerts/alerts.html',
            controller: 'exApp1.alertsController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/alerts/alerts.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/webApiExamplesMain/webapi', {
            templateUrl: 'apps/exApp1/webApiExamplesMain/webapi/webapi.html',
            controller: 'exApp1.webapiController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/webApiExamplesMain/webapi/webapi.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/webApiExamplesMain/webapi2', {
            templateUrl: 'apps/exApp1/webApiExamplesMain/webapi2/webapi2.html',
            controller: 'exApp1.webapi2Controller',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/webApiExamplesMain/webapi2/webapi2.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/formElements1', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/formElements1/formElements1.html',
            controller: 'exApp1.formElements1Controller',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/formElements1/formElements1.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/formExampleTemplate', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/formExampleTemplate/formExampleTemplate.html',
            controller: 'exApp1.formExampleTemplateController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/formExampleTemplate/formExampleTemplate.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/angularExamples1', {
            templateUrl: 'apps/exApp1/angularExamplesMain/angularExamples1/angularExamples1.html',
            controller: 'exApp1.angularExamples1Controller',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/angularExamples1/angularExamples1.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        
        .when('/exApp1/angularExamplesMain/angularObjects', {
            templateUrl: 'apps/exApp1/angularExamplesMain/angularObjects/angularObjects.html',
            controller: 'exApp1.angularObjectsController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/angularObjects/angularObjects.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        

        .when('/exApp1/angularExamplesMain/bindingExamples', {
            templateUrl: 'apps/exApp1/angularExamplesMain/bindingExamples/bindingExamples.html',
            controller: 'exApp1.bindingExamplesController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/bindingExamples/bindingExamples.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/templateDirectives', {
            templateUrl: 'apps/exApp1/angularExamplesMain/templateDirectives/templateDirectives.html',
            controller: 'exApp1.templateDirectivesController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/templateDirectives/templateDirectives.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/partialViews', {
            templateUrl: 'apps/exApp1/angularExamplesMain/partialViews/partialViews.html',
            controller: 'exApp1.partialViewsController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/partialViews/partialViews.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/imperative', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/imperative/imperative.html',
            controller: 'exApp1.imperativeController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/imperative/imperative.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/declarative', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/declarative/declarative.html',
            controller: 'exApp1.declarativeController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/declarative/declarative.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/angularExamplesMain/formExamplesMain/declareVsImper', {
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/declareVsImper/declareVsImper.html',
            controller: ''
            , resolve: { sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); } }
        })
        .when('/exApp1/angularExamplesMain/elementDirectives', {
            templateUrl: 'apps/exApp1/angularExamplesMain/elementDirectives/elementDirectives.html',
            controller: 'exApp1.elementDirectivesController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/angularExamplesMain/elementDirectives/elementDirectives.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })

        .when('/exApp1/utilityMain', {
            templateUrl: 'apps/exApp1/utilityMain/utilityMain.html',
            controller: 'exApp1.utilityMainController'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/utilityMain/utilityMain.controller.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        })
        .when('/exApp1/utilityMain/lodash', {
            templateUrl: 'apps/exApp1/utilityMain/lodash/lodash.html',
            controller: 'exApp1.lodashController',
            controllerAs: 'vm'
            , resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'mashupApp',
                        files: ['apps/exApp1/utilityMain/lodash/lodash.controller.js'
                        , 'apps/exApp1/~appServices/itemData.service.js'
                        , 'apps/exApp1/~appServices/data.service.js']
                    });
                }]
            , sessionLoad: function ($route, sessionLoad) { return sessionLoad.loadCompleted(); }
            }
        });
});