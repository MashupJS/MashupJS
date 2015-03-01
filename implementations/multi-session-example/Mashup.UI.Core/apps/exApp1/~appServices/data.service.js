
/*global mashupApp:false */

// -----------------------------------------------------------------------------
// dataService
// -----------------------------------------------------------------------------
// This will be the only data service you need to add to your controllers.
// All data access will start here.  Data access can occur in this controller
// or link to another more specific data service.  The other more specific
// data services allow the code to be more manageable and scallable but are not
// required.  If you want to put all your data access code here you can.  

mashupApp.service('mashupExamplesDataService', ['$http', '$q', '$log', 'mashupExamplesItemDataService',
    function ($http, $q, $log, mashupExamplesItemDataService) {
        'use strict';

        return {
            getItems1: function () {
                return mashupExamplesItemDataService.getItems1();
            },
            getExample2items: function (staleMinutes) {
                return mashupExamplesItemDataService.getExample2items(staleMinutes);
            },
            getExample4items: function (staleMinutes, id) {
                return mashupExamplesItemDataService.getExample4items(staleMinutes, id);
            },
            getExample6items: function (staleMinutes, action) {
                return mashupExamplesItemDataService.getExample6items(staleMinutes, action);
            },
            getExample7items: function (staleMinutes, done, contact) {
                return mashupExamplesItemDataService.getExample7items(staleMinutes, done, contact);
            },
            getExample8items: function (staleMinutes, contact) {
                return mashupExamplesItemDataService.getExample8items(staleMinutes, contact);
            },
            getExample9items: function (staleMinutes, contact) {
                return mashupExamplesItemDataService.getExample9items(staleMinutes, contact);
            },
            getExample10items: function (staleMinutes, contact) {
                return mashupExamplesItemDataService.getExample10items(staleMinutes, contact);
            },
            getExample11items: function (staleMinutes, contact) {
                return mashupExamplesItemDataService.getExample11items(staleMinutes, contact);
            },

        };
    }]);
