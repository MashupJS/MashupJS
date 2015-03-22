/*global mashupApp:false, _:false */

mashupApp.controller('mashup.LoginController', ['$location', '$log', '$timeout', 'sessionService', 'cacheService', 'utility',
    function ($location, $log, $timeout, sessionService, cacheService, utility) {
        'use strict';

        var vm = this;
        vm.appName = 'coreSession';

        var getAppSession = function () {
            return cacheService.getCache('mashupSessions');
        };

        getAppSession().then(function (data) {
            vm.appSession = data[0];
            // TODO: Improve checking for no session in cache. Maybe move this to the getCache() function.
            if (vm.appSession === 'NoCache' || vm.appSession === 'N' || _.isNull(vm.appSession) || _.isUndefined(vm.appSession)) {
                vm.appSession = { sessions: [] };
                vm.appSession.id = 'mashupSessions';
            }

        });

        vm.login = function () {

            // SIMULARED AUTHENTICATION: REPLACE WITH ACTUAL AUTH CODE HERE.
            var authenticated = true;

            updateAppSession(vm.name, vm.appName);


            if (authenticated) {
                // If authentication succeeded then the session needs updated before logging
                // so the potential new user can be correctly accessed by the logService.
                updateSessionsUser(vm.name, vm.appName);
                logAuthentication(vm.name, vm.appName, authenticated);
                
                // BUG? The $location.path() command never worked the first time. I found this link.
                // http://stackoverflow.com/questions/24143945/location-path-updates-after-the-second-click
                $timeout(function () {
                    $location.path('/');
                }, 0);
            }
            else {
                logAuthentication(vm.name, vm.appName, authenticated);
            }

        };

        var updateSessionsUser = function (userName, appName) {
            // THIS INFORMATION IS USED BY SERVICES THAT NEED TO KNOW THE USER AND APP.
            var session = sessionService.getUserSessions();
            session.userName = userName;
            session.appName = appName;

            sessionService.setUserSession(session);

        };

        var updateAppSession = function (userName, appName) {
            // ASSUMING YOU'LL HAVE YOUR OWN SESSION OBJECT, REPLACE THESE PARAMETERS WITH YOUR AUTH OBJECT.

            var utcMills = utility.localMilToUtcMil(new Date().getTime());
            var localMills = utility.utcMilToLocalMil(utcMills);
            var localDate = Date(localMills);

            // TODO: REPLACE stub roles array
            var roles = ['DomainUser', 'MashupUser', 'Administrator'];

            var sessionAlreadyExists;
            sessionAlreadyExists = !!_.where(vm.appSession.sessions, { 'appName': appName }).length;

            if (sessionAlreadyExists) {
                // If YES then get the index of the session and update it.
                // getting index of the session
                var index = _.findIndex(vm.appSession.sessions, { 'appName': appName });
                // UPDATE SESSION
                vm.appSession.sessions[index].appName = appName;
                vm.appSession.sessions[index].userName = userName;
                vm.appSession.sessions[index].roles = roles;
                vm.appSession.sessions[index].authTimeUTCMills = utcMills;
                vm.appSession.sessions[index].authTimelocalMills = localMills;
                vm.appSession.sessions[index].authTimelocalDate = localDate;
                // Below helps prevent the system from re-authenticating a session that is actively being used.
                vm.appSession.sessions[index].sessionLastChecked = utcMills;   
            }
            else {
                // If NO then push object onto the session.
                // ADD SESSION
                vm.appSession.sessions.push({
                    'appName': appName, 'userName': userName, 'roles': roles ,
                    'authTimeUTCMills': utcMills, 'authTimelocalMills': localMills, 'authTimelocalDate': localDate
                });
            }

            cacheService.putCache('mashupSessions', { name: 'mashupSessions', keyPath: 'id' }, vm.appSession);

        };

        var logAuthentication = function (userName, appName, authenticated) {
            // -------------------------------------------------------------------
            // Instrumentation
            // -------------------------------------------------------------------
            var logObject = utility.getLogObject('Instr', appName, 'mashup.LoginController', 'login',
                authenticated, sessionService);
            // Additional or custom properties for logging.
            logObject.userName = userName;
            logObject.appName = appName;
            logObject.authenticated = authenticated;
            $log.log('Authentication [ User: ' + userName + ' ] on [App: ' + appName + ' ]', logObject);
            // -------------------------------------------------------------------
            // -------------------------------------------------------------------
        };


    }]);
