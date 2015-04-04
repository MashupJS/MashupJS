/*global mashupApp:false */

mashupApp.controller('menuController', ['$scope', '$modalInstance', '$log', function ($scope, $modalInstance, $log) {
    'use strict';

    $scope.close = function () {
        // Closes the modal and returns a value
        $modalInstance.dismiss('Menu closed');
    };

    $scope.menuJson = [
        {
            "name": "Applications", "id": "catApps", "isOpen": "true", "icon": " fa-power-off ", "groups":
                [{ "name": "app1", "id": "menuItemApp1" },
                     { "name": "app2", "id": "menuItemApp2" },
                     { "name": "mashup", "id": "menuItemMashup" }
                ]
        }, {
            "name": "Utilities", "id": "catUtilities", "isOpen": "false", "icon": " fa-cogs ", "groups": []
        }, {
            "name": "Administrative", "id": "catAdmin", "isOpen": "false", "icon": " fa-users", "groups": []
        }, {
            "name": "Examples", "id": "catExamples", "isOpen": "false", "icon": " fa-file-code-o ", "groups": []
        }
    ];
    
}]);