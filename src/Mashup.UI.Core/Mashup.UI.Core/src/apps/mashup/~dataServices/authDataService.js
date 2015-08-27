/*global mashupApp:false */

mashupApp.service('authDataService', ['$http', '$q', '$log', 'cacheService', function ($http, $q, $log, cacheService) {
    'use strict';

    return {

        getUserInfo: function (staleMinutes) {
            var deferred = $q.defer();

            var cacheName = 'Mashup_getUserInfo';
            var schema = { name: cacheName, keyPath: 'UserId' };
            // var webApiUrl = 'http://localhost:50002/api/local/GetCurrentUser';

            var useHeartBeatConvention = true;

            var options = {
                url: 'http://localhost:50002/api/local/GetCurrentUser',
                method: 'GET',
                withCredentials: true,
                contentType: 'application/json'
            };


            cacheService.getData(cacheName, schema, options, staleMinutes, useHeartBeatConvention)
                .then(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        getCache: function (cacheName) {
            var deferred = $q.defer();

            cacheService.getCache(cacheName).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }

    };
}]);