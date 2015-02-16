/*global mashupApp:false */

mashupApp.controller('mashup.AboutController', ['$filter', 'coreDataService',
    function ($filter, coreDataService) {

//mashupApp.controller('mashup.AboutController', ['$log', '$http', '$filter', 'sessionService', 'mashupDataService',
//    function ($log, $http, $filter, sessionService, mashupDataService) {
        'use strict';

        var vm = this;

        // vm.user = sessionService.userSession();

        coreDataService.getCache('mashCacheAge').then(function (data) {

            angular.forEach(data, function (record) {
                record.updatedDateTime = $filter('date')(record.updatedDate, 'short');
            });

            vm.sessionCache = data;

        });

    }]);
