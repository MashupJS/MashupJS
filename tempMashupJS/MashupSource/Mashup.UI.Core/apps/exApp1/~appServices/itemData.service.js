/*global _:false */
/*global mashupApp:false */

mashupApp.service('mashupExamplesItemDataService', ['$http', '$q', '$log', 'cacheService', function ($http, $q, $log, cacheService) {
    'use strict';

    return {
        // Directly calling the web api. Not using the mashup cache but can leverage 
        // the caching of angular-cached-resource

        getItems1: function () {
            return $http.get('http://localhost:50004/api/ExampleData/Items/', { withCredentials: true });
        },

        getExample2items: function (staleMinutes) {

            var cacheName = 'mashupExamples_example2items';
            var schema = { name: cacheName, keyPath: 'id' };
            var webApiUrl = 'http://localhost:50004/api/ExampleData/Items/';

            return cacheService.getData(cacheName, schema, webApiUrl, staleMinutes, true);
        },

        getExample4items: function (staleMinutes, id) {
            var deferred = $q.defer();

            var cacheName = 'exApp1_example4items';
            var schema = { name: cacheName, keyPath: 'id' };
            var webApiUrl = 'http://localhost:50004/api/ExampleData/Items/';

            cacheService.getData(cacheName, schema, webApiUrl, staleMinutes, true).then(function (data) {

                try {

                    var record = _.where(data, { 'id': parseInt(id) });
                    deferred.resolve(record);

                } catch (e) { $log.error(e); }

            });
            return deferred.promise;
        },

        getExample6items: function (staleMinutes, action) {
            var deferred = $q.defer();

            var cacheName = 'exApp1_example6items';
            var schema = {
                name: cacheName, keyPath: 'id'
            };
            var webApiUrl = 'http://localhost:50004/api/ExampleData/Items/';

            cacheService.getData(cacheName, schema, webApiUrl, staleMinutes, true).then(function (data) {

                try {

                    var record = _.where(data, { 'action': action });
                    deferred.resolve(record);

                } catch (e) { $log.error(e); }

            });
            return deferred.promise;
        },

        getExample7items: function (staleMinutes, doneParam, contactParam) {
            var deferred = $q.defer();

            var cacheName = 'exApp1_example7items';
            var schema = { name: cacheName, keyPath: 'id' };
            var webApiUrl = 'http://localhost:50004/api/ExampleData/Items/';

            cacheService.getData(cacheName, schema, webApiUrl, staleMinutes, true).then(function (data) {

                try {

                    doneParam = JSON.parse(doneParam.toLowerCase());

                    var record = _.where(data, { done: doneParam, contact: contactParam });
                    deferred.resolve(record);

                } catch (e) { $log.error(e); }

            });
            return deferred.promise;
        },

        getExample8items: function (staleMinutes, actionParam) {
            var deferred = $q.defer();

            var cacheName = 'mashupExamples_example8items';
            var schema = { name: cacheName, keyPath: 'id' };
            var webApiUrl = 'http://localhost:50004/api/ExampleData/Items/';

            cacheService.getData(cacheName, schema, webApiUrl, staleMinutes, true).then(function (data) {

                try {
                    var records = _.filter(data, function (row) {
                        return row.action.substring(0, actionParam.length) === actionParam;
                    });

                    deferred.resolve(records);

                } catch (e) { $log.error(e); }
            });
            return deferred.promise;
        },

        getExample9items: function (staleMinutes) {
            var deferred = $q.defer();

            var cacheName = 'mashupExamples_example9items';
            var schema = { name: cacheName, keyPath: 'id' };
            var webApiUrl = 'http://localhost:50004/api/ExampleData/Items/';

            cacheService.getData(cacheName, schema, webApiUrl, staleMinutes, true).then(function (data) {

                // data is the JSON object being evaluated.  This can be replaced by a filter to further
                // reduce the JSON array before the columns are retrieved.  

                try {
                    var records = _.map(data,
                        function (task) {
                            return { id: task.id, action: task.action };
                        }
                    );

                    deferred.resolve(records);

                } catch (e) { $log.error(e); }
            });
            return deferred.promise;
        },

        getExample10items: function (staleMinutes) {
            var deferred = $q.defer();

            var cacheName = 'mashupExamples_example10items';
            var schema = { name: cacheName, keyPath: 'id' };
            var webApiUrl = 'http://localhost:50004/api/ExampleData/Items/';

            cacheService.getData(cacheName, schema, webApiUrl, staleMinutes, true).then(function (data) {

                // Performed with JavaScript only.
                // Grouping by 'done'
                // totals on myDecimal and myDouble
                // sort on done

                try {

                    var doneGroups = _.groupBy(data, function (group) { return group.done; });

                    var result = [];

                    _.forEach(doneGroups, function (groupRecord) {

                        var record = {};
                        record.done = groupRecord[0].done;
                        record.myDecimalSum = 0;
                        record.myDoubleMax = 0;
                        // record.myDecimalSum2 = 0;
                        record.myDecimalAvg = 0;

                        _.forEach(groupRecord, function (properties) {
                            record.myDecimalSum = record.myDecimalSum + properties.myDecimal;
                        });

                        // get the average.  We already have the sum.
                        record.myDecimalAvg = record.myDecimalSum / groupRecord.length;

                        // returns a record with the max value in myDouble.  It's not simply returning a single value.
                        // Notice I go an extra layer to get the single value I'm looking for.
                        record.myDoubleMax = _.max(groupRecord, function (properties) { return properties.myDouble; }).myDouble;
                        record.myDoubleMin = _.min(groupRecord, function (properties) { return properties.myDouble; }).myDouble;

                        // TODO: figure out how to use reduce against a complex array.  
                        // All the examples are of a simple single column array.
                        //
                        // sum using _.reduce from lodash
                        // could not get this to work.  It was concatenating instead of summarizing.
                        //record.myDecimalSum2 = _.reduce(groupRecord, function (sum, num) {
                        //    return sum + num.myDecimal;
                        //});

                        result.push(record);
                    });

                    var records = _.sortBy(result, 'done');

                    // will reverse the sort order.
                    records.reverse();


                    deferred.resolve(records);

                } catch (e) { $log.error(e); }
            });
            return deferred.promise;
        },

        getExample11items: function (staleMinutes, actionParam) {
            var deferred = $q.defer();

            var cacheName = 'mashupExamples_example11items';
            var schema = { name: cacheName, keyPath: 'id' };
            var webApiUrl = 'http://localhost:50004/api/ExampleData/Items/';

            cacheService.getData(cacheName, schema, webApiUrl, staleMinutes, true).then(function (data) {

                try {
                    var records = _.filter(data, function (row) {
                        return row.action.indexOf(actionParam) !== -1;
                        // From the Mozilla web site.  This is a nice explaination of why this works.
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf

                        //Checking occurrences

                        //Note that '0' doesn't evaluate to true and '-1' doesn't evaluate to false. 
                        // Therefore, when checking if a specific string exists within another string 
                        // the correct way to check would be:

                        //'Blue Whale'.indexOf('Blue') != -1; // true
                        //'Blue Whale'.indexOf('Bloe') != -1; // false
                    });

                    deferred.resolve(records);

                } catch (e) { $log.error(e); }
            });
            return deferred.promise;
        }

    };
}]);

