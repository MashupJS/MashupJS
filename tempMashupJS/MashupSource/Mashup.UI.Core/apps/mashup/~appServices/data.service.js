/*global mashupApp:false */

mashupApp.service('mashupDataService', ['$http', '$q', '$log', 'cacheService', function ($http, $q, $log, cacheService) {
    'use strict';

    return {
  
        getUserInfo: function (staleMinutes) {
            var deferred = $q.defer();

            var cacheName = 'Mashup_getUserInfo';
            var schema = { name: cacheName, keyPath: 'UserId' };
            var webApiUrl = 'http://localhost:50002/api/local/GetCurrentUser';

            var useHeartBeatConvention = true;
            //var useHeartBeatConvention = false;
            //var heartBeatUrl = 'http://localhost:50002/api/HeartBeat/';
            //var heartBeatName = 'Mashup.Api.AuthADSP';

            cacheService.getData(cacheName, schema, webApiUrl, staleMinutes, useHeartBeatConvention).then(function (data) {
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