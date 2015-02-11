/*global mashupApp:false */

mashupApp.controller('mashup.AboutController', ['$log', '$http', '$filter', 'sessionService', 'mashupDataService',
    function ($log, $http, $filter, sessionService, mashupDataService) {
        'use strict';

        //$scope.contacts = sessionService.list();
        // Set to have cache expire in 1 minute.  Useful for some kind
        // of reset.  Probably a condition will occur where we make a
        // security change that we want to happen right away.
        var vm = this;

        vm.user = sessionService.userSession();

        mashupDataService.getCache('mashCacheAge').then(function (data) {

            angular.forEach(data, function (record) {
                record.updatedDateTime = $filter('date')(record.updatedDate, 'short');
            });

            vm.sessionCache = data;

        });

    }]);
