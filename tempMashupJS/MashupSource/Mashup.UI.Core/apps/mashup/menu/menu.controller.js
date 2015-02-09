/*global mashupApp:false */

mashupApp.controller('menuController', ['$scope', '$modalInstance', '$log', function ($scope, $modalInstance, $log) {
    'use strict';

    $scope.close = function() {
        // Closes the modal and returns a value
        $modalInstance.dismiss('Menu closed');
    };

}]);