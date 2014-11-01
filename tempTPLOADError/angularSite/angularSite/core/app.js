// -------------------------------------------------------------------------
// Kicks off the angularJS application
// create the module and name it "mashupApp"
// -------------------------------------------------------------------------
var mashupApp = angular.module('mashupApp', ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'oc.lazyLoad']);
// -------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------
// This configures ocLazyLoadProvider and let's it know that some modules have already been
// loaded.  Without this the Menu dialog would not work because some directive was loaded twice.
// https://github.com/ocombe/ocLazyLoad/issues/71
// ----------------------------------------------------------------------------------------------
angular.module('mashupApp').config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        loadedModules: ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'oc.lazyLoad']
    });

}]);

// To disable $sce:
mashupApp.config(['$sceProvider', function($sceProvider) {
    $sceProvider.enabled(false);
}]);

// TODO: Remember to remove if this isn't part of the solution.
// Headers causing a problem when sending a GET request to a cross domain.
mashupApp.config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    // I thought this would stop the OPTIONS from being triggered which initiates preflight
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

}]);


// Found this while looking for a solution for CORS problem when running local.  This is not to solve that problem
// but seem sto solve a problem people are having so I'm holding onto this.
// http://stackoverflow.com/questions/19590818/angularjs-and-windows-8-route-error
//mashupApp.config( [
//    '$compileProvider',
//    function( $compileProvider )
//    {   
//        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0|chrome-extension):/);
//        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
//    }
//]);

//mashupApp.config( [
//    '$compileProvider',
//    function( $compileProvider )
//    {   
//        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
//        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
//    }
//]);