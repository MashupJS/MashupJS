/*global mashupApp:false */

mashupApp.controller('exApp1.DeclarativeController', function () {
    'use strict';

    var vm = this;

    vm.completeShipping = function () {

        window.alert('Your data is saved... add new order...');

        vm.data.shipping.name = '';
        vm.data.shipping.address = '';
        vm.data.shipping.phone = '';
        vm.data.shipping.email = '';
    };

});