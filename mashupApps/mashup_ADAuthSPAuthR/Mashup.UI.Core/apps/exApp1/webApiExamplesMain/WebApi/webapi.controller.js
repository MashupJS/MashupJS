/*global mashupApp:false */

/*jshint -W106*/

mashupApp.controller('exApp1.WebapiController', ['$http', '$log', 'alertService', function ($http, $log, alertService) {

    var vm = this;

    vm.addAlert = function (messageType, messageBody) {
        //alertService.add(messageType, '<h4>Success!</h4> This is a success message!');
        alertService.add(messageType, messageBody);
    };

    vm.clearResultData = function () {
        vm.resultData = null;
        $log.log('Cleared resultData');
    };

    vm.getItems = function () {
        // NOTE: When we use the 'withCredentials' option we cannot use a wild card '*' for
        $http.get('http://localhost:50004/api/ExampleData/Items/', { withCredentials: true })
            .success(function (data) {
                vm.resultData = data;
                $log.log('Successfully retrieved all items.');
            })
            .error(function (data) {
                //addAlert('alert-danger', '<h4>Failed!</h4> Web Api getItems failed!');
                alertService.add('alert-danger', '<h4>Failed!</h4> Web Api getItems failed!');
            });
        // TODO: There error above doesn't get hi.
    };

    vm.getItemsById_ItemId = 2;
    vm.getItemsById = function () {
        // NOTE: When we use the 'withCredentials' option we cannot use a wild card '*' for
        $http.get('http://localhost:50004/api/ExampleData/Items/' + vm.getItemsById_ItemId, { withCredentials: true })
            .success(function (data) {
                vm.resultData = data;
                $log.log('Successfully retrieved an item by int.');
            });
    };

    vm.getItemsByBool_Done = true;
    vm.getItemsByBool = function () {
        // NOTE: When we use the 'withCredentials' option we cannot use a wild card '*' for
        $http.get('http://localhost:50004/api/ExampleData/Items/' + vm.getItemsByBool_Done, { withCredentials: true })
            .success(function (data) {
                vm.resultData = data;
                $log.log('Successfully retrieved an item by bool.');
            });
    };


    vm.getItemsByDecimal_myDecimal = 1.1;
    vm.getItemsByDecimal = function () {
        // NOTE: When we use the 'withCredentials' option we cannot use a wild card '*' for
        $http.get('http://localhost:50004/api/ExampleData/Items/ByDecimal/' + vm.getItemsByDecimal_myDecimal +
            '/', { withCredentials: true })
            .success(function (data) {
                vm.resultData = data;
                $log.log('Successfully retrieved an item by decimal.');
            });
    };

    vm.getItemsByDate_date = '2014-06-01';
    vm.getItemsByDate = function () {
        // NOTE: When we use the 'withCredentials' option we cannot use a wild card '*' for
        $http.get('http://localhost:50004/api/ExampleData/Items/' + vm.getItemsByDate_date + '/', { withCredentials: true })
            .success(function (data) {
                vm.resultData = data;
                $log.log('Successfully retrieved an item by decimal.');
            });
    };

    // getItemsByAction
    vm.getItemsByAction_action = 'Buy';
    vm.getItemsByAction = function () {
        // NOTE: When we use the 'withCredentials' option we cannot use a wild card '*' for
        $http.get('http://localhost:50004/api/ExampleData/Items/' + vm.getItemsByAction_action + '/', { withCredentials: true })
            .success(function (data) {
                vm.resultData = data;
                $log.log('Successfully retrieved an item by action. Case insensitive search.');
            });
    };

    vm.getItemsByContact_contact = 'name1@domain.com';
    vm.getItemsByContact = function () {
        // NOTE: When we use the 'withCredentials' option we cannot use a wild card '*' for
        $http.get('http://localhost:50004/api/ExampleData/Items/' + vm.getItemsByContact_contact + '/', { withCredentials: true })
            .success(function (data) {
                vm.resultData = data;
                $log.log('Successfully retrieved an item by action. Case insensitive search.');
            });
    };


}]);
