;/*global mashupApp:false */

mashupApp.service('coreDataService', ['$http', '$q', '$log', 'cacheService', function ($http, $q, $log, cacheService) {
    'use strict';

    return {

        getCache: function (cacheName) {
            var deferred = $q.defer();

            cacheService.getCache(cacheName).then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }

    };
}]);;;;;;;/*
* Alert Service to be shared across controllers
*
* http://www.lovelucy.info/angularjs-global-alert-service.html
* http://jsbin.com/UxapebE/1/edit
*/

/*global mashupApp:false */

mashupApp.factory('alertService', ['$rootScope', function ($rootScope) {
    'use strict';

    var alertService = {};
    // global `alerts` array
    $rootScope.alerts = [];
    alertService.add = function (type, msg) {
        $rootScope.alerts.push({ 'type': type, 'msg': msg, 'close': function () { alertService.closeAlert(this); } });
    };
    alertService.closeAlert = function (alert) {
        alertService.closeAlertIdx($rootScope.alerts.indexOf(alert));
    };
    alertService.closeAlertIdx = function (index) {
        $rootScope.alerts.splice(index, 1);
    };
    return alertService;
}]);;
/*jshint strict: false, bitwise: false */
/*global mashupApp:false */
/*global alert:false*/

// Source for this service.
// http://wemadeyoulook.at/en/blog/implementing-basic-http-authentication-http-requests-angular/

mashupApp.factory('Base64', function () {
    'use strict';

    var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
    return {
        encode: function (input) {
            var output = '';
            var chr1, chr2, chr3 = '';
            var enc1, enc2, enc3, enc4 = '';
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = '';
                enc1 = enc2 = enc3 = enc4 = '';
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = '';
            var chr1, chr2, chr3 = '';
            var enc1, enc2, enc3, enc4 = '';
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            
            if (base64test.exec(input)) {
                alert('There were invalid base64 characters in the input text.\n' +
                    'Valid base64 characters are A-Z, a-z, 0-9, \'+\', \'\/\',and \'=\'\\n' +
                    'Expect errors in decoding.');
            }
            
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = '';
                enc1 = enc2 = enc3 = enc4 = '';

            } while (i < input.length);

            return output;
        }
    };
});;/*global mashupApp:false */
/*global indexedDB:false*/
/*global ydn:false */

mashupApp.service('cacheService', ['$http', '$q', '$log', 'utility', 'detectService',
     'sessionService', function ($http, $q, $log, utility, detectService, sessionService) {
         'use strict';

         // -------------------------------------------------------------------------
         // Kicks off the local caching solution
         // Most caching will be performed by angular-cached-resource.
         // This caching is to satisfy the use case where data is stable and does not
         // need to be retrieved often.  This approach prevents many unnecessary calls
         // across the network.
         // indexedDB.deleteDatabase('mashCacheDB');
         // 
         // -------------------------------------------------------------------------
         // Note on schema:  You'll notice we are not passing in a schema which is 
         // recommended.  This is because we are using YDN-DB/IndexedDB only as a 
         // generic cache and because the Mashup is a composite set of applications
         // we don't want to hold application specific schemas in the core. When
         // using this caching model you will pass yoru schema in as part of your data
         // call.  This schema is then, dynamically, added to the mashCacheDB database.
         // -------------------------------------------------------------------------
         var dbCache = new ydn.db.Storage('mashCacheDB');

         // This only works with the debug version of YDN-DB
         // ydn.debug.log('ydn.db', 'finest');

         // This value 'dbCacheReady' allows the rest of the application to know when the database is ready
         // to use.  Specifically, cacheService needs this.
         var dbCacheReady = false;
         dbCache.onReady(function () {
             dbCacheReady = true;
             console.log('mashCacheDB is ready.  [cacheService]');
         });
         // -------------------------------------------------------------------------

         var isCacheStale = function (cacheName, minutes) {
             // dbCache: is 'mashCacheDB'
             // store: No store is provided but might be added later to remove constaint 'mashCacheAge'
             // subject: is the name of the cache being evaluated.
             // minutes: is the number of minutes before the cache is considered stale.

             var deferred = $q.defer();
             var result = true;

             // get milliseconds version of minutes.
             var ageToleranceMilliseconds = (minutes * 60) * 1000;

             var envSession = sessionService.envSession();

             // manage based on battery
             if (envSession.batteryLevel && envSession.batteryLevel <= 30) {
                 ageToleranceMilliseconds = ageToleranceMilliseconds * 4;
             }

             var currentDateMilliseconds = new Date().getTime();

             // checking dbCacheReady because, if a page loads to quickly, before the cache database is ready
             // then accessing it will cause an error.
             (function wait() {
                 if (dbCacheReady) {

                     // The database is ready so go ahead and begin checking for stale data.
                     try {
                         dbCache.executeSql('SELECT * FROM mashCacheAge WHERE id = \'' + cacheName + '\'')
                             .then(function (record) {
                                 //$log.log('mashCacheAge record for: [ ' + cacheName + ' ] cache.');
                                 //$log.log(record);

                                 // if no record is returned then it is considered stale.
                                 var recordCount = record.length;
                                 if (recordCount > 0) {
                                     var durationMilliseconds = currentDateMilliseconds - record[0].updatedDate;

                                     // Check if the data is stale.
                                     if (durationMilliseconds > ageToleranceMilliseconds) {
                                         result = true;
                                     } else { result = false; }

                                     deferred.resolve(result);
                                 } else {
                                     // no records found so this cache is considered stale.
                                     deferred.resolve(true);
                                 }
                             });
                     }
                     catch (e) {
                         // no data store for the cache was found so it is considered stale.
                         deferred.resolve(true);
                     }

                 } else {
                     // Giving the cache database a moment to set up.
                     setTimeout(wait, 500);
                 }
             })();

             return deferred.promise;
         };

         // Updates the age of any cacheName.
         var updateCacheAge = function (cacheName) {
             // updates the mashCacheAge which keeps track of how old/stale a cache is.
             var cacheJSON = { id: cacheName, updatedDate: new Date().getTime() };
             dbCache.put({ name: 'mashCacheAge', keyPath: 'id' }, cacheJSON);
         };

         var getCache = function (cacheName) {
             var deferred = $q.defer();
             // waiting for dbCacheReady because accessing the cache to early causes an error.
             (function wait() {
                 if (dbCacheReady) {

                     try {
                         dbCache.executeSql('SELECT * FROM \'' + cacheName + '\'').then(function (record) {
                             if (record === 'N') { deferred.resolve(''); }
                             else { deferred.resolve(record); }
                         });

                     }
                     catch (e) {
                         // no data store for the cache was found so it is considered stale.
                         deferred.resolve('NoCache');
                     }

                 } else { setTimeout(wait, 500); }
             })();
             return deferred.promise;
         };

         // --------------------------------------------------------------------------------
         // If the machCache is too old then all the data is wiped out and the user starts again.
         // --------------------------------------------------------------------------------
         var minutesInOneWeek = 10080;  // 10080 = 1 week
         isCacheStale('mashCacheStart', minutesInOneWeek).then(function (result) {
             //alert(result);
             if (result) {
                 // The mashCache is too old and needs cleared.
                 //ydn.db.deleteDatabase('mashCacheDB');
                 //setTimeout(function () { alert('mashCacheDB was stale so deleted.'); }, 1);

                 // TODO: Add this to mashup logging so we can keep track of this happening.
                 //       Possibly make this kind of information available to the user log page.

                 // The first time through there will be no objects and this clear will fail. 
                 try { dbCache.clear(); } catch (e) { }

                 var logObject = utility.getLogObject('mashCasheDelete', 'Mashup.UI.Core', 'cacheService',
                     'root of cacheService', 'Stale-Cache', sessionService);
                 $log.log('mashCacheDB was stale so deleted.', logObject);
                 updateCacheAge('mashCacheStart');
             }
         });
         // --------------------------------------------------------------------------------
         // --------------------------------------------------------------------------------
         // --------------------------------------------------------------------------------

         var getHeartBeatUrl = function (webApiUrl, useHeartBeatConvention, heartBeatUrl) {
             var result = '';

             if (useHeartBeatConvention === true) {
                 result = getHeartBeatUrlByConvention(webApiUrl);
                 return result;
             } else {
                 if (!heartBeatUrl) {
                     var logObject = utility.getLogObject('No heartBeatUrl provided', 'Mashup.UI.Core',
                         'cacheService', 'getHeartBeatUrl', 'return blank', sessionService);
                     $log.warn('useHeartBeatConvention was falsy but no heartBeatUrl provided.', logObject);
                 }

                 // regcheck for valid URL
                 // if url is not a valid URL then return '' and log warning.
                 // else return the heartBeatUrl as is.
                 return heartBeatUrl;
             }

             return result;
         };

         var getHeartBeatUrlByConvention = function (webApiUrl) {
             var result = '';

             // This is not a configurable convention.  This convintion simply adds "api/HearBeat/" to the end of a URL.

             // http://www.sitename.com/article/2009/09/14/this-is-an-article/
             // http://stackoverflow.com/questions/1420881/javascript-jquery-method-to-find-base-url-from-a-string

             var parseUrl = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
             var parts = parseUrl.exec(webApiUrl);
             result = parts[1] + ':' + parts[2] + parts[3] + ':' + parts[4] + '/api/HeartBeat/';

             return result;
         };

         return {

             dbCache: dbCache,

             putCache: function (cacheName, schema, data) {

                 //dbCache.put({ name: cacheName, keyPath: 'id' }, { id: cacheName, data: data });
                 dbCache.put(schema, data);
                 updateCacheAge(cacheName);

             },

             // Retrieve cache
             getCache: function (cacheName) {
                 var deferred = $q.defer();

                 getCache(cacheName).then(function (data) {
                     deferred.resolve(data);
                 }, function (reason) {
                     deferred.reject();
                 });

                 return deferred.promise;

             },
             getData: function (cacheName, schema, webApiUrl, staleMinutes, useHeartBeatConvention, heartBeatUrl, heartBeatName) {

                 var deferred = $q.defer();

                 heartBeatUrl = getHeartBeatUrl(webApiUrl, useHeartBeatConvention, heartBeatUrl);

                 // Check if the cache is stale.
                 isCacheStale(cacheName, staleMinutes).then(function (cacheIsStale) {
                     // If cache stale then get new data.

                     // if no application name is provided for the detect service to use then the url is used.
                     // this is mostly used for logging purposes.
                     heartBeatName = heartBeatName || heartBeatUrl;
                     heartBeatName = heartBeatName || webApiUrl;

                     var webApiAvailable = detectService.detect(heartBeatUrl, heartBeatName);

                     if (cacheIsStale && webApiAvailable) {
                         // cache has become stale so retrieving fresh data.
                         $http.get(webApiUrl, { withCredentials: true })
                             .success(function (data) {

                                 //#region

                                 // -------------------------------------------------------------------------------
                                 // Schema will be passed in so that it can be generated on the fly.
                                 // When a schema for an object store changes it will break and cause
                                 // an error.  We will look for that error and simply delete the
                                 // indexedDB database so the next time this is caused the new schema
                                 // can take hold.  This doesn't seem ideal but the impact is only
                                 // to performance when schemas change for cached data.
                                 // -------------------------------------------------------------------------------
                                 // Normally the schema is defined up front and versioned.  For the cache we want
                                 // developers to have one less thing to consider and allow the mashup core
                                 // to be less coupled to the caching needs of other mashup applications.
                                 // -------------------------------------------------------------------------------

                                 //#endregion

                                 try {
                                     // add data to cache
                                     dbCache.put(schema, data);
                                     // updateCacheAge
                                     updateCacheAge(cacheName);
                                 }
                                 catch (err) {

                                     var logObject = utility.getLogObject('mashCasheDelete', 'Mashup.UI.Core', 'cacheService',
                                         'getData', 'Error', sessionService);
                                     $log.error(err, logObject);
                                     indexedDB.deleteDatabase('mashCacheDB');
                                     $log.log('IndexedDB error on updating a cache. Deleted database to allow new schema.', logObject);

                                 }

                                 // return web api data to the client
                                 // async alert() so the performance perception isn't affected.
                                 //setTimeout(function () { alert('web api data'); }, 1);
                                 deferred.resolve(data);
                             })
                         .error(function () {
                             // if the call fails then return the current cache.
                             // TODO: make an async call to let someone know a service failed?
                             // alert('Web Api Error');
                             detectService.failed(heartBeatUrl, heartBeatName);
                             getCache(cacheName).then(function (data) {
                                 // async alert()
                                 // setTimeout(function () { alert('cache data'); }, 1);
                                 deferred.resolve(data);
                             });
                         });
                     } else {
                         // cached data is still good so return it.
                         getCache(cacheName).then(function (data) {
                             deferred.resolve(data);
                         });
                     }
                 });
                 return deferred.promise;
             }
         };
     }]);
;/*global mashupApp: false */
/*global ydn: false*/
/*global _:false */

mashupApp.service('detectService', ['$http', '$q', '$log', '$interval', '$filter', '$rootScope', 'utility', 'sessionService',
    function ($http, $q, $log, $interval, $filter, $rootScope, utility, sessionService) {
        'use strict';

        // Manage logServiceDB.Heartbeats.
        // delete all records over 1 week old.
        // Manage the log size.
        (function () {

            var logHeartbeatLog = new ydn.db.Storage('logServiceDB');

            var logHeartbeatReady = false;

            logHeartbeatLog.onReady(function () {
                logHeartbeatReady = true;
                console.log('logServiceDB is ready. [detectService]');
            });

            // TODO: Consider altering the interval based on the power of the device, batter power, network speed.
            var intervalTime = 10080000;// check every 2 hours
            var retainDuration = 604800000; // one week is 604800000

            setInterval(function () {

                // wait until logDbReady is ready. IE: true
                (function wait() {
                    if (logHeartbeatReady) {

                        // delete all records older than 1 week.
                        var indexLongDate = new Date().getTime() - retainDuration;
                        // TODO: figure out how to add ydn to angular modules to avoid implicit declaration.
                        var keyRange = ydn.db.KeyRange.upperBound(indexLongDate, true);

                        var logObject = utility.getLogObject('detectManagement:Truncate', 'Mashup.UI.Core',
                            'detectService', 'anonymous:setInterval', null, sessionService);
                        // Truncate all logs older than a week old.
                        logHeartbeatLog.remove('heartbeat', keyRange)
                            .done(function (count) {
                                logObject.status = true;
                                logObject.count = count;

                                $log.log('Truncating old [heartbeat] records.', logObject);
                                //$log.log(['Truncating old [heartbeat] records.', logObject], 'log');

                            }).fail(function (e) {
                                logObject.status = false;

                                $log.log('Truncating old [heartbeat] records. (failed)', logObject);

                                throw e;
                            });

                    } else {
                        // Giving the cache database a moment to set up.
                        setTimeout(wait, 500);
                    }
                })();

            }, intervalTime, 0, false);
        })();

        // add heartBeatMonitorList array.  Is defined in canDetectHeartBeat function.
        $rootScope.heartBeatMonitorList = [];

        var envSession = sessionService.envSession();

        var heartBeatMonitorInterval = 300000; // 5 minutes
        // manage based on battery
        if (envSession.batteryLevel && envSession.batteryLevel <= 30) {
            heartBeatMonitorInterval = heartBeatMonitorInterval * 2;
        }

        // starts up heartBeatMonitor immediately.
        $interval(function () {

            // for each item in heartBeatMonitorList, verify a connection is possible.
            _.each($rootScope.heartBeatMonitorList, function (item) {

                var result = true;

                // attempt to call the heartbeat WebApi.
                $http.get(item.url, { withCredentials: true })
                    .success(function (data) {
                        result = true;
                        item.detected = result;
                        // record results to the log and include data if available.
                        recordHeartBeatResult(item.id, result, data);
                    })
                    .error(function () {
                        result = false;
                        item.detected = result;

                        // record results to the log
                        recordHeartBeatResult(item.id, result);

                        // add to codeBlueList to be processed by the codeBlueMonitor process if not already added.
                        addToCodeBlueList(item);

                    });

            });

        }, heartBeatMonitorInterval, 0, false); // Starting at 1 minute but this might be adjusted.

        var recordHeartBeatResult = function (webApiName, result, data) {

            var datetime = $filter('date')(new Date().getTime(), 'short');

            var msg = 'The heartbeat result for \'' + webApiName + '\' is: [ ' + result + ' ] at ' + datetime;

            var logObject = utility.getLogObject('HeartBeat', 'Mashup.UI.Core', 'detectService',
                'recordHeartBeatResult', result, sessionService);
            if (result) {
                logObject.msg = msg;
                console.info(angular.fromJson(logObject));
            } else {
                logObject.subject = 'HeartBeatFail';
                $log.error('HeartBeatFail: ' + msg, logObject);
            }
        };

        var addToCodeBlueList = function (item) {
            if (!_.where($rootScope.codeBlueList, { 'id': item.id }).length) {

                $rootScope.codeBlueList.push(item);

                if (!codeBlueMonitor) {

                    var logObject = utility.getLogObject('StartCodeBlueMonitor', 'Mashup.UI.Core',
                        'detectService', 'addToCodeBlueList', 'Starting', sessionService);
                    $log.info('Starting up code Blue monitor from heartbeat monitor.', logObject);
                    startCodeBlueMonitor();
                }
            }
        };

        // add codeBlueList
        $rootScope.codeBlueList = [];

        // variable holding the promise from the $interval.  This is used to stop the codeBlueMonitor once all
        // connections are detected.
        var codeBlueMonitor;

        // function to check for a pulse for codeBlue list. (every 5 seconds)
        var startCodeBlueMonitor = function () {

            //var codeBlueMonitorInterval = envSession.envSession();
            var codeBlueMonitorInterval = 60000; // 10 seconds

            // manage based on battery
            if (envSession.batteryLevel && envSession.batteryLevel <= 30) {
                codeBlueMonitorInterval = codeBlueMonitorInterval * 3;
            }

            codeBlueMonitor = $interval(function () {

                var datetime = $filter('date')(new Date().getTime(), 'short');

                if ($rootScope.codeBlueList.length === 0) {
                    // no more items in codeBlueList so stop the codeBlueMonitor
                    $interval.cancel(codeBlueMonitor);
                    // set the promise to false so it can be evaluated later to determin if it is running.
                    codeBlueMonitor = false;

                    var logObject = utility.getLogObject('CodeBlueMonitor', 'Mashup.UI.Core',
                        'detectService', 'startCodeBlueMonitor', 'ended', sessionService);
                    $log.info('codeBlueMonitor ended ' + datetime, logObject);

                } else {
                    // Process each item in the codeBlueList
                    _.each($rootScope.codeBlueList, function (item) {

                        var result = true;

                        $http.get(item.url, { withCredentials: true })
                            .success(function (data) {
                                result = true;
                                item.detected = result;
                                // record results to the log and include data if available.
                                recordCodeBlueResult(item.id, result, data);
                                // remove item from list
                                $rootScope.codeBlueList = _.filter($rootScope.codeBlueList,
                                    function (x) { return x.id !== item.id; });
                            })
                            .error(function () {
                                result = false;
                                item.detected = result;
                                // record results to the log
                                recordCodeBlueResult(item.id, result);
                            });

                    });
                }

            }, codeBlueMonitorInterval, 0, false); // runs ever 10 seconds when running.
        };

        var recordCodeBlueResult = function (webApiName, result, data) {
            var datetime = $filter('date')(new Date().getTime(), 'short');

            var msg = 'The code Blue result for ' + webApiName + ' is: [ ' + result + ' ] at ' + datetime;

            var logObject = utility.getLogObject('CodeBlueMonitor', 'Mashup.UI.Core',
                'detectService', 'recordCodeBlueResult', result, sessionService);
            logObject.webApiName = webApiName;

            if (result) {
                $log.info(msg, logObject);
            } else {
                $log.error(msg, logObject);

            }

        };

        // Used to let the calling application know what results we currently have.
        // No connectivity attempt is made here.
        var canDetectHeartBeat = function (heartBeatUrl, webApiName) {

            // if no heartBeatUrl provided then short curcuit this method and return true allowing the webapi call to continue.
            if (!heartBeatUrl) {
                return true;
            }

            try {

                var record = _.where($rootScope.heartBeatMonitorList, { 'id': webApiName });

                if (record.length === 0) {

                    // No failure is detected so we assume a connection is possible.
                    // If the client fails to connect then we'll add this to the codeBlue list.
                    var newItem = { id: webApiName, url: heartBeatUrl, detected: true };
                    $rootScope.heartBeatMonitorList.push(newItem);

                    return true;
                } else {
                    // an item was found so returning the last known good information on this item.
                    return record[0].detected;
                }

            } catch (e) {

                var logObject = utility.getLogObject('CodeBlueMonitor', 'Mashup.UI.Core',
                    'detectService', 'canDetectHeartBeat', 'Error', sessionService);
                logObject.webApiName = webApiName;
                logObject.heartBeatUrl = heartBeatUrl;
                logObject.error = e;

                $log.error('detectService.canDetectHeartBeat: ' + e, logObject);
            }

            return true;
        };

        // Determine congestion and if a threshold is met to allow connectivity.
        // - This is determined by the user call passing in threshold requiements (not sure what that is yet)
        // - Also included in the calculation is the devices general performance information
        // - - If the machine always performs slowly then consider that the normal.

        return {

            // Detects whether or not a connection has failed the last time connected to.
            detect: function (heartBeatUrl, webApiName) {
                return canDetectHeartBeat(heartBeatUrl, webApiName);
            },

            // A method to tell the detectService an attempt has failed.
            failed: function (heartBeatUrl, webApiName) {
                // update the codeRed list.

                var logObject = utility.getLogObject('CodeBlueMonitor', 'Mashup.UI.Core',
                    'detectService', 'detectService.failed', false, sessionService);
                logObject.webApiName = webApiName;
                logObject.heartBeatUrl = heartBeatUrl;

                $log.warn('detectService.failed: A call to Web Api: ' + webApiName + ' failed', logObject);

                // if not already added to codeBlueList then add.
                if (!_.where($rootScope.codeBlueList, { 'id': webApiName }).length) {
                    var newItem = { id: webApiName, url: heartBeatUrl, detected: false };
                    $rootScope.codeBlueList.push(newItem);
                }

                // start up the codeBlueMonitor
                if (!codeBlueMonitor) {
                    // $log.detectService("Starting up code Blue monitor from failed method call.");
                    startCodeBlueMonitor();
                }

                // TODO: add a method to get the current state of apps for display to the user or admin.

            }
        };
    }]);;
/*global mashupApp:false */
/*global ydn:false */

// I read about this in aPress's Pro AngularJS by Adam Freeman.
// I copied this implementation from Vinny Linck's article 'AngularJS: How to override $log implementation
// http://vinnylinck.tumblr.com/post/58833687265/angularjs-how-to-override-log-implementation
// Obviously I've made many customizations but wanted to give credit to where my work began.

// All logs are saved locally in the indexeddb database 'logServiceDB'.
// Because this log can potentially consume a lot of space we will limited it.
// We can limit the log based on duration, size, and type of machine. IE: desktop vs mobile device.

// Future TODO: Request the log via SignalR or some other subscrib method.  Not polling.

mashupApp.config(['$provide', function ($provide) {
    $provide.decorator('$log', ['$delegate', 'logService', function ($delegate, logService) {
        return logService($delegate);
    }]);
}]);

mashupApp.factory('logService', ['$filter', 'sessionService', 'utility',
    function ($filter, sessionService, utility) {
        'use strict';

        return function ($delegate) {

            // Each log event will be interrogated and check the subject property.  
            // If the subject matches an event we are listening for then we will route it.

            var CONST_CUST_PARMS = 1;
            var CONST_STANDARD_LOGGING_PARM = 0;

            var schema = {
                stores: [{
                    name: 'log',
                    keyPath: 'logId',
                    autoIncrement: false,
                },
                {
                    name: 'heartbeat',
                    keyPath: 'logId',
                    autoIncrement: false
                }]
            };

            var logDb = new ydn.db.Storage('logServiceDB', schema);

            var logDbReady = false;

            logDb.onReady(function () {
                logDbReady = true;
                console.log('logServiceDB is ready. [logService]');
            });
            logDb.addEventListener('error', function (event) {
                var e = event.getError();
                console.log('connection failed with ' + e.name);
                // TODO: attempt WebApi call to let someone know the log is failing for this user.
            });

            // adding more information to the logging object.
            var buildLogObject = function (args, logType) {
                // args[1] is the result of a user passing extra data, as a second parameter, into the $log function.
                // We are adding all these properties to args[0] so that we can save a flat record to the database.
                // This will make interrogating the data much simpler in the future.
                // If an extra parameter was never passed then nothing will happen.

                var longDateTime = new Date().getTime();
                // To decouple this module so it can be a drop in module the utility module needed removed from DI.
                // Implementing the localMilToUtcMil directly instead of using utility.localMilToUtcMil(longDateTime)

                var longDateTimeUtc = utility.localMilToUtcMil(longDateTime);
                var dateTime = $filter('date')(longDateTime, 'short');
                var dateTimeUtc = $filter('date')(longDateTimeUtc, 'short');

                var logServiceObj = {
                    msg: args[CONST_STANDARD_LOGGING_PARM],
                    logId: longDateTimeUtc,
                    dateTimeLocal: dateTime,
                    dateTimeUtc: dateTimeUtc,
                    logType: logType,
                    transmitted: false
                };

                // Taking all the values added to args[0] and adding to args[1].
                if (args.length > 1) {
                    for (var name in args[CONST_CUST_PARMS]) {
                        if (args[CONST_CUST_PARMS].hasOwnProperty(name)) {
                            logServiceObj[name] = args[CONST_CUST_PARMS][name];
                        }
                    }
                }
                return logServiceObj;
            };

            // add additional logging
            var additionalProcessing = function (args, logType) {

                // wait until logDbReady is ready. IE: true
                (function wait() {
                    if (logDbReady) {

                        if (angular.isString(args[CONST_STANDARD_LOGGING_PARM])) {

                            var logServiceObj = buildLogObject(args, logType);

                            var subject = logServiceObj.subject;

                            switch (subject) {

                                case 'Perf':
                                    {

                                        break;
                                    }
                                case 'HeartBeatFail':
                                case 'CodeBlueMonitor':
                                    {
                                        logDb.put({ name: 'heartbeat' }, logServiceObj);
                                        break;
                                    }
                                case 'Debug':
                                    {
                                        // This is a space for doing anything you need to do with debug data.
                                        // This can be saved to a separate IndexedDB database or table.
                                        // This can be sent to a WebApi or file.
                                        // Using the 'subject' property you can add any custom behavior you need.
                                        break;
                                    }
                                case 'Error':
                                    {
                                        // Do something.
                                        break;
                                    }
                            }

                            logDb.put({ name: 'log' }, logServiceObj);
                        }
                    } else {
                        // Giving the cache database a moment to set up.
                        setTimeout(wait, 500);
                    }
                })();
            };

            // Manage the log size.
            (function () {

                // TODO: Consider altering the interval based on the power of the device, batter power, network speed.
                var intervalTime = null;
                var logDuration = null;

                var envSession = sessionService.envSession();

                // manage based on deviceType
                if (envSession.deviceType === 'desktop') {
                    intervalTime = 7200000;// check every 2 hours
                    logDuration = 604800000; // 1 week is 604800000
                } else {
                    intervalTime = 1800000;// check every 30 minutes
                    logDuration = 172800000; // 2 days is 172800000
                }
                // manage based on battery
                if (envSession.batteryLevel && envSession.batteryLevel <= 30) {
                    intervalTime = intervalTime * 4;
                    logDuration = logDuration * 4;
                }

                setInterval(function () {

                    // wait until logDbReady is ready. IE: true
                    (function wait() {
                        if (logDbReady) {

                            // delete all records older than 1 week.
                            var indexLongDateUtc = utility.localMilToUtcMil(new Date().getTime()) - logDuration;// - 7;

                            // TODO: figure out how to add ydn to angular modules to avoid implicit declaration.
                            var keyRange = ydn.db.KeyRange.upperBound(indexLongDateUtc, true);

                            var logObject = utility.getLogObject('logManagement:Truncate', 'Mashup.UI.Core',
                                'logService', 'anonymous:setInterval', null, sessionService);
                            // Truncate all logs older than a week old.
                            logDb.remove('log', keyRange)
                                .done(function (count) {
                                    logObject.status = true;
                                    logObject.count = count;

                                    additionalProcessing(['Truncating old [log] records.', logObject], 'log');
                                    console.log(['Truncating old [log] records.', logObject]);

                                }).fail(function (e) {
                                    logObject.status = false;

                                    additionalProcessing(['Truncating old [log] records. (failed)', logObject], 'log');
                                    console.log(['Truncating old [log] records.', logObject]);

                                    throw e;
                                });

                        } else {
                            // Giving the cache database a moment to set up.
                            setTimeout(wait, 500);
                        }
                    })();

                }, intervalTime, 0, false);
            })();

            return {
                // The extra try/catch statements might seem unnecessary and they might be.  The goal
                // is to keep the log service from causing the application to break should anything go wrong.
                log: function () {
                    $delegate.log(arguments[CONST_STANDARD_LOGGING_PARM]);
                    try {
                        additionalProcessing(arguments, 'log');
                    } catch (e) {
                    }
                },

                info: function () {
                    $delegate.info(arguments[CONST_STANDARD_LOGGING_PARM]);
                    try {
                        additionalProcessing(arguments, 'info');
                    } catch (e) {
                    }
                },

                error: function () {
                    $delegate.error(arguments[CONST_STANDARD_LOGGING_PARM]);
                    try {
                        additionalProcessing(arguments, 'error');
                    } catch (e) {
                    }
                },

                warn: function () {
                    $delegate.warn(arguments[CONST_STANDARD_LOGGING_PARM]);
                    try {
                        additionalProcessing(arguments, 'warn');
                    } catch (e) {
                    }
                }
            };
        };
    }]);;
// This module holds the most common information other application components might need.
// The reason this module is vauge is to reduce the number of services injected into modules.

// Included in this module:
// - User information
// - App, Web Api, and Database environments

/*global mashupApp:false */
/*jshint maxcomplexity:13 */  // This is to address the complexity of the if statements below.

mashupApp.service('sessionService', function () {
    'use strict';

    var envSession = {};

    // Get the OS and general environment string.
    (function () {
        // This piece of code is credited to this page.
        // http://www.javascripter.net/faq/operatin.htm

        // This script sets OSName variable as follows:
        // 'Windows'    for all versions of Windows
        // 'MacOS'      for all versions of Macintosh OS
        // 'Linux'      for all versions of Linux
        // 'UNIX'       for all other UNIX flavors 
        // 'Unknown OS' indicates failure to detect the OS

        var OSName = 'Unknown OS';
        if (navigator.appVersion.indexOf('Win') !== -1) { OSName = 'Windows'; }
        if (navigator.appVersion.indexOf('Mac') !== -1) { OSName = 'MacOS'; }
        if (navigator.appVersion.indexOf('X11') !== -1) { OSName = 'UNIX'; }
        if (navigator.appVersion.indexOf('Linux') !== -1) { OSName = 'Linux'; }

        envSession.osName = OSName;
        envSession.appVersion = navigator.appVersion;
    })();

    (function () {
        // This piece of code is credited to this page.
        // http://www.javascripter.net/faq/browsern.htm
        //Browser name = Mozilla Firefox
        //Full version = 32.0
        //Major version = 32
        //navigator.appName = Netscape
        //navigator.userAgent = Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0

        var nAgt = navigator.userAgent;
        var browserName = navigator.appName;
        var fullVersion = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // In Opera, the true version is after 'Opera' or after 'Version'
        if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
            browserName = 'Opera';
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) !== -1)
            { fullVersion = nAgt.substring(verOffset + 8); }
        }
            // In MSIE, the true version is after 'MSIE' in userAgent
        else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
            browserName = 'Microsoft Internet Explorer';
            fullVersion = nAgt.substring(verOffset + 5);
        }
            // In Chrome, the true version is after 'Chrome' 
        else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
            browserName = 'Chrome';
            fullVersion = nAgt.substring(verOffset + 7);
        }
            // In Safari, the true version is after 'Safari' or after 'Version' 
        else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
            browserName = 'Safari';
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) !== -1)
            { fullVersion = nAgt.substring(verOffset + 8); }
        }
            // In Firefox, the true version is after 'Firefox' 
        else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
            browserName = 'Firefox';
            fullVersion = nAgt.substring(verOffset + 8);
        }
            // In most other browsers, 'name/version' is at the end of userAgent 
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
                  (verOffset = nAgt.lastIndexOf('/'))) {
            browserName = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);
            if (browserName.toLowerCase() === browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(';')) !== -1)
        { fullVersion = fullVersion.substring(0, ix); }
        if ((ix = fullVersion.indexOf(' ')) !== -1)
        { fullVersion = fullVersion.substring(0, ix); }

        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        envSession.browserName = browserName;
        envSession.fullVersion = fullVersion;
        envSession.majorVersion = majorVersion;
    })();

    (function () {
        // This piece of code is credited to this page.
        // http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/

        // detect desktop versus mobile
        // if mobile then detect which mobileType
        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };

        var mobileType = '';
        // check if mobile or desktop
        if (isMobile.any()) {
            envSession.deviceType = 'mobile';
            if (isMobile.Android()) { mobileType = 'Android'; }
            if (isMobile.BlackBerry()) { mobileType = 'BlackBerry'; }
            if (isMobile.iOS()) { mobileType = 'iPhone|iPad|iPod'; }
            if (isMobile.Opera()) { mobileType = 'Opera Mini'; }
            if (isMobile.Windows()) { mobileType = 'IEMobile'; }
        } else {
            envSession.deviceType = 'desktop';
        }
        envSession.mobileType = mobileType;

    })();

    (function () {
        // Retrieve battery information

        var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;

        if (battery) {
            var batteryLevelChanged = function () {
                envSession.batteryLevel = battery.level * 100;
            };

            battery.addEventListener('levelchange', function (e) {
                console.warn('sessionService: Battery level change: ', battery.level);
                batteryLevelChanged();
            }, false);

        }

    })();

    // The userSession object is used for general logging.  This prevents
    // the log interception from having to know what user and app are invoking 
    // the logService.  Each route will set these values.
    var userSessions = {};

    return {

        getUserSessions: function () {

            if (!userSessions.hasOwnProperty('logUserName')) {
                userSessions.logUserName = 'unknown-user';
            }

            if (!userSessions.hasOwnProperty('logAppName')) {
                userSessions.logAppName = 'unknown-app';
            }
            return userSessions;
        },

        setUserSession: function (session) {
            userSessions = session; return true;
        },

        envSession: function () { return envSession; }

    };
});

;
/*global mashupApp:false */
/*jshint -W106 */


mashupApp.service('utility', ['utility_UtcDateService', 'utility_LogHelper', function (utility_UtcDateService, utility_LogHelper) {
    'use strict';

    //---------------------------------------------------------------------
    // INSTRUCTIONS for 'utility' usage.
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    // Keeps like utility groups together in their own modules then reference 
    // them here and use this general utility class throughout the project.
    // This will allow for more modular, testable, code while keeping the 
    // number of dependency injected modules to minimum.
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------

    //---------------------------------------------------------------------
    // Provides access to the utility_UtcDateService functions.
    // For converting to and from local and UTC dates.
    //---------------------------------------------------------------------
    var utcMilToLocalMil = utility_UtcDateService.utcMilToLocalMil;
    var localMilToUtcMil = utility_UtcDateService.localMilToUtcMil;
    var localDateToUtcDate = utility_UtcDateService.localDateToUtcDate;
    var utcDateToLocalDate = utility_UtcDateService.utcDateToLocalDate;
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------


    var getLogObject = utility_LogHelper.getLogObject;

    return {
        //---------------------------------------------------------------------
        // Provides access to the utility_UtcDateService functions.
        // For converting to and from local and UTC dates.
        //---------------------------------------------------------------------
        localDateToUtcDate: localDateToUtcDate,
        utcDateToLocalDate: utcDateToLocalDate,
        localMilToUtcMil: localMilToUtcMil,
        utcMilToLocalMil: utcMilToLocalMil,
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------

        getLogObject: getLogObject
    };
}]);

;
/*global mashupApp:false */

mashupApp.service('utility_LogHelper', function () {
    'use strict';
    var getLogObject = function (subject, app, mod, func, status, sessionService) {

        var logObject = {
            subject: subject,
            app: app,
            module: mod,
            func: func,
            status: status
        };

        try {
            var userSessions = sessionService.getUserSessions();

            if (!userSessions.hasOwnProperty('logUserName')) {
                logObject.logUserName = 'unknown-user-property';
            } else {
                logObject.logUserName = userSessions.logUserName;
            }

            if (!userSessions.hasOwnProperty('logAppName')) {
                logObject.logAppName = 'unknown-app-property';
            } else {
                logObject.logAppName = userSessions.logAppName;
            }
            
        }
        catch (e) { }

        try {
            var envSession = sessionService.envSession();
            logObject.osName = envSession.osName;
            logObject.browser = envSession.browserName + ' ' + envSession.fullVersion;

            if (envSession.deviceType === 'desktop') {
                logObject.deviceType = envSession.deviceType;
            } else {
                logObject.deviceType = envSession.deviceType + ': ' + envSession.mobileType;
            }
        }
        catch (e) { }

        return logObject;

    };

    return {

        getLogObject: getLogObject

    };

});;
/*global mashupApp:false */

mashupApp.service('utility_UtcDateService', function () {
	'use strict';

	var utcMilToLocalMil = function (milliseconds) {
		var now = new Date();
		return new Date().setTime(milliseconds - (now.getTimezoneOffset() * 60000));
	};

	var localMilToUtcMil = function (milliseconds) {
		var now = new Date();
		return new Date().setTime(milliseconds + (now.getTimezoneOffset() * 60000));
	};

	var localDateToUtcDate = function (localDate) {
		return new Date(localMilToUtcMil(localDate.getTime()));
	};

	var utcDateToLocalDate = function (utcDate) {
		return new Date(utcMilToLocalMil(utcDate.getTime()));
	};
	
	//(function () {

	//    var longDateTime = new Date().getTime();
	//    var longDateTimeUTC = localMilToUtcMil(longDateTime);

	//    var newDateLongDateTime = new Date(longDateTime);
	//    var newDateLongDateTimeUTC = new Date(longDateTimeUTC);

	//    var longConvertBackToLocal = utcMilToLocalMil(longDateTimeUTC);
	//    var newLongConvertBackToLocal = new Date(longConvertBackToLocal);

	//    var newUTCDateFromLocal = localDateToUtcDate(newDateLongDateTime);
	//    var newLocalDateFromUtc = utcDateToLocalDate(newDateLongDateTimeUTC);

	//    console.log("");
	//    console.log("Create long date values");
	//    console.log("newDateLongDateTime: " + newDateLongDateTime);
	//    console.log("longDateTime: " + longDateTime);

	//    console.log("");
	//    console.log("Create UTC values from long dates created above");
	//    console.log("newDateLongDateTimeUTC: " + newDateLongDateTimeUTC);
	//    console.log("longDateTimeUTC: " + longDateTimeUTC);

	//    console.log("");
	//    console.log("Convert UTC back to Local");
	//    console.log("longConvertBackToLocal: " + longConvertBackToLocal);
	//    console.log("newLongConvertBackToLocal: " + newLongConvertBackToLocal);

	//    console.log("");
	//    console.log("Convert Local Date to UTC Date");
	//    console.log("newUTCDateFromLocal: " + newUTCDateFromLocal);

	//    console.log("");
	//    console.log("Convert UTC Date to Local Date");
	//    console.log("newLocalDateFromUtc: " + newLocalDateFromUtc);

	//})();

	return {

		localDateToUtcDate: localDateToUtcDate,

		utcDateToLocalDate: utcDateToLocalDate,

		localMilToUtcMil: localMilToUtcMil,

		utcMilToLocalMil: utcMilToLocalMil

	};

});