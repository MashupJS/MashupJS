/*global mashupApp:false */

mashupApp.controller('exApp1.declarativeController', function () {
    "use strict";

    var vm = this;

    vm.completeShipping = function () {

        alert("Your data is saved... add new order...");

        vm.data.shipping.name = "";
        vm.data.shipping.address = "";
        vm.data.shipping.phone = "";
        vm.data.shipping.email = "";
    };

});