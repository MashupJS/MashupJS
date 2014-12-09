﻿/*global mashupApp:false */

mashupApp.controller('modalDemoController',
function ($scope, $modalInstance, $log, items) {
    
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});