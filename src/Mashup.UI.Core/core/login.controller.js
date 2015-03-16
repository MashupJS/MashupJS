/*global mashupApp:false */

mashupApp.controller('mashup.LoginController', ['$location', 'sessionService', 'cacheService', 'utility', function ($location, sessionService, cacheService, utility) {
    'use strict';

    var vm = this;

    var getAppSession = function () {
        return cacheService.getCache('coreSession');
    };

    getAppSession().then(function (data) {
        vm.appSession = data;
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

        // There is no cache or the coreSession hasn't been added yet.
        if (vm.appSession == 'NoCache') { // || !vm.appSession.hasOwnProperty('mashupSessions')) {

            vm.appSession = { sessions: [] };

            vm.appSession.id = 'mashupSessions';
        };
        
        var utcMills = utility.localMilToUtcMil(new Date().getTime());
        var localMills = utility.utcMilToLocalMil(utcMills);
        var localDate = Date(localMills);

        vm.appSession.sessions.push({
            'appName': appSessionName, 'userName': userName,
            'authTimeUTCMills': utcMills, 'authTimelocalMills': localMills, 'authTimelocalDate': localDate
        });
                
        // use where clause to get the session we just added.
        // figure out how to tell if the item exists or not.
        // if not then add with push.
        // if yes then update

        cacheService.putCache('mashupSessions', { name: 'mashupSessions', keyPath: 'id' }, vm.appSession);

    };

}]);
