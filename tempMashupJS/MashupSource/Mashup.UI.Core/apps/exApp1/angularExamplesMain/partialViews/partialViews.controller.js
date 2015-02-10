/*global mashupApp:false */

mashupApp.controller('exApp1.PartialViewsController', ['$scope', '$log', '$location', '$http',
    function ($scope, $log, $location, $http) {
        'use strict';

        // $scope.items =[];
        $http.get('http://localhost:50004/api/ExampleData/Items/', { withCredentials: true })
            .success(function (data) {
                $scope.items = data;
            });


        $scope.viewFile = function () {
            return $scope.showList ? '../apps/exApp1/angularExamplesMain/partialViews/myList.html' :
                '../apps/exApp1/angularExamplesMain/partialViews/myTable.html';
        };


        $scope.reportChange = function () {
            $log.log('Displayed content: ' + $scope.viewFile());
        };



        // For the list selection option example.
        $scope.data = {};



    }]);