/*global mashupApp:false */
/*jshint -W106*/

mashupApp.controller('exApp1.LodashController', ['alertService', 'mashupExamplesDataService',
    function (alertService, mashupExamplesDataService) {

        var vm = this;

        vm.items1 = '';

        mashupExamplesDataService.getItems1().success(function (data) {
            vm.items1 = data;
        });


        vm.example2items = '';
        vm.example2items_cache = 60;

        vm.example2items_click = function () {
            mashupExamplesDataService.getExample2items(vm.example2items_cache).then(function (data) {
                vm.example2items = data;
            });
        };


        vm.example4items = '';
        vm.example4items_cache = 60;
        vm.example4items_id = 1;

        vm.example4items_click = function () {
            mashupExamplesDataService.getExample4items(vm.example4items_cache, vm.example4items_id).then(function (data) {
                vm.example4items = data;
            });
        };


        vm.example6items = '';
        vm.example6items_cache = 60;
        vm.example6items_action = 'Buy Gloves';

        vm.example6items_click = function () {
            mashupExamplesDataService.getExample6items(vm.example6items_cache, vm.example6items_action).then(function (data) {
                vm.example6items = data;
            });
        };


        vm.example7items = '';
        vm.example7items_cache = 60;
        vm.example7items_done = 'false';
        vm.example7items_contact = 'name1@domain.com';

        vm.example7items_click = function () {
            mashupExamplesDataService.getExample7items(vm.example7items_cache, vm.example7items_done, vm.example7items_contact)
                .then(function (data) {
                    vm.example7items = data;
                });
        };



        vm.example8items = '';
        vm.example8items_cache = 60;
        vm.example8items_action = 'Buy';

        vm.example8items_click = function () {
            mashupExamplesDataService.getExample8items(vm.example8items_cache, vm.example8items_action).then(function (data) {
                vm.example8items = data;
            });
        };



        vm.example9items = '';
        vm.example9items_cache = 60;

        vm.example9items_click = function () {
            mashupExamplesDataService.getExample9items(vm.example9items_cache).then(function (data) {
                vm.example9items = data;
            });
        };



        vm.example10items = '';
        vm.example10items_cache = 60;

        vm.example10items_click = function () {
            mashupExamplesDataService.getExample10items(vm.example10items_cache).then(function (data) {
                vm.example10items = data;
            });
        };



        vm.example11items = '';
        vm.example11items_cache = 60;
        vm.example11items_action = 'Buy';

        vm.example11items_click = function () {
            mashupExamplesDataService.getExample11items(vm.example11items_cache, vm.example11items_action).then(function (data) {
                vm.example11items = data;
            });
        };

    }]);
