/*global mashupApp:false, _:false */

mashupApp.controller('mashup.LoginController', ['$location', 'sessionService', 'cacheService', 'utility',
    function ($location, sessionService, cacheService, utility) {
        'use strict';

        var vm = this;

        var getAppSession = function () {
            return cacheService.getCache('mashupSessions');
        };

        getAppSession().then(function (data) {
            vm.appSession = data[0];

            if (vm.appSession === 'NoCache' || vm.appSession === 'N' || _.isNull(vm.appSession) || _.isUndefined(vm.appSession)) {
                vm.appSession = { sessions: [] };
                vm.appSession.id = 'mashupSessions';
            }

        });

        vm.login = function () {

            updateSessionsUser(vm.data.login.name, 'coreSession');
            updateAppSession(vm.data.login.name, 'coreSession');
            $location.path('/');
        };

        var updateSessionsUser = function (userName, appName) {
            // THIS INFORMATION IS USED BY SERVICES THAT NEED TO KNOW THE USER AND APP.
            var session = sessionService.getUserSessions();
            session.userName = userName;
            session.appName = appName;

            sessionService.setUserSession(session);

        };

        var updateAppSession = function (userName, appSessionName) {
            // Add application session.  Each app will have it's own session or share a session.

            //if (vm.appSession === 'NoCache' || vm.appSession === 'N') {

            //    vm.appSession = { sessions: [] };

            //    vm.appSession.id = 'mashupSessions';
            //}

            var utcMills = utility.localMilToUtcMil(new Date().getTime());
            var localMills = utility.utcMilToLocalMil(utcMills);
            var localDate = Date(localMills);


            var sessionAlreadyExists;

            //if (_.isNull(vm.appSession) || _.isUndefined(vm.appSession)) {
            //    sessionAlreadyExists = false;
            //}
            //else {
            sessionAlreadyExists = !!_.where(vm.appSession.sessions, { 'appName': 'coreSession' }).length;
            //}

            if (sessionAlreadyExists) {
                // If YES then get the index of the session and update it.
                // getting index of the session
                var index = _.findIndex(vm.appSession.sessions, { 'appName': 'coreSession' });
                // UPDATE SESSION
                vm.appSession.sessions[index].appName = appSessionName;
                vm.appSession.sessions[index].userName = userName;
                vm.appSession.sessions[index].authTimeUTCMills = utcMills;
                vm.appSession.sessions[index].authTimelocalMills = localMills;
                vm.appSession.sessions[index].authTimelocalDate = localDate;
            }
            else {
                // If NO then push object onto the session.
                // ADD SESSION
                vm.appSession.sessions.push({
                    'appName': appSessionName, 'userName': userName,
                    'authTimeUTCMills': utcMills, 'authTimelocalMills': localMills, 'authTimelocalDate': localDate
                });
            }

            cacheService.putCache('mashupSessions', { name: 'mashupSessions', keyPath: 'id' }, vm.appSession);

        };

    }]);
