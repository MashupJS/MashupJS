/*global mashupApp:false */

mashupApp.controller('exApp1.FormElements1Controller', ['$http', 'alertService', function ($http, alertService) {
    'use strict';

    var vm = this;

    // For the radio button example.
    vm.data = {};

    // This will be a standard part of all screens.
    // TODO: Add this to the standard page and to any other pages that can use it.
    // TODO: Upgrade this to something better and maybe use tostr.
    vm.addAlert = function (messageType, message) {
        alertService.add(messageType, message);
        //alertService.add(messageType, '<h4>Success!</h4> This is a success message!');
    };

    vm.completeShipping = function () {
        // Notice that you don't see these model elements defined here.  That is because
        // Angular adds them automatically if they are referenced in the UI for any reason.
        // Best practice is to explicitly name your model elements in the controller to
        // support separation of responsibilities.  But this feature can make development faster.
        vm.data.shipping.name = '';
        vm.data.shipping.address = '';
    };

    $http.get('http://localhost:50004/api/ExampleData/Items/', { withCredentials: true }).success(function(data) {
        vm.items = data;
    });

}]);
