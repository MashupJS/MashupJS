/*global mashupApp:false */

mashupApp.controller('exApp1.ControllersController', function () {
    'use strict';

    // vm = View Model
    var vm = this;

    vm.a = 1;
    vm.b = 2;

    vm.myValue = 0;

    vm.add = function (a, b) {
        vm.myValue = a + b;
    };

});

