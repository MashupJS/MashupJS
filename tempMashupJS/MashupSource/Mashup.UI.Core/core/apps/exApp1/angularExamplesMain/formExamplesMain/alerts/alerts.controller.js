/*global mashupApp:false */

mashupApp.controller('exApp1.AlertsController', ['alertService', function (alertService) {
    "use strict";

    var vm = this;

    vm.addAlert = function (messageType) {
        alertService.add(messageType, '<h4>Success!</h4> This is a success message!');
        // options
        // alert-success
        // alert-warning
        // alert-info
        // alert-danger
    };

    vm.alertCode = "alertService.add(messageType, '<h4>Success!</h4> This is a success message!');";

}]);
