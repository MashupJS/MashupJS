/*global mashupApp:false */

mashupApp.controller('exApp1.ElementDirectivesController', ['$http', function ($http) {
    'use strict';

    var vm = this;

    $http.get('http://localhost:50004/api/ExampleData/Items/', { withCredentials: true }).success(function(data) {
        vm.items = data;
    });

}]);
