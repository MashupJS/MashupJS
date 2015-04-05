/*global mashupApp:false */

mashupApp.controller('menuController', ['$scope', '$modalInstance', '$log', function ($scope, $modalInstance, $log) {
    'use strict';

    $scope.close = function () {
        // Closes the modal and returns a value
        $modalInstance.dismiss('Menu closed');
    };
    
    //$scope.menuJson = [
    //    {
    //        "name": "Applications", "id": "catApps", "isOpen": "true", "icon": " fa-power-off ", "session": "coreSession", "role": "MashupUser", "groups":
    //            [{
    //                "name": "app1", "id": "menuItemApp1", "desc": "Application 1, page 1.", "url": "/app1/page1", "icon": " fa-bar-chart ", "session": "coreSession", "role": "MashupUser"
    //            }, {
    //                "name": "app2", "id": "menuItemApp2", "desc": "Application 2, page 3.", "url": "/app2/page3", "icon": " fa-laptop ", "session": "coreSession", "role": "MashupUser"
    //            }, {
    //                "name": "mashup", "id": "menuItemMashup", "desc": "Starter pages.", "url": "/", "icon": " fa-home ", "session": "coreSession", "role": "MashupUser"
    //            }
    //            ]
    //    }, {
    //        "name": "Utilities", "id": "catUtilities", "isOpen": "false", "icon": " fa-cogs ", "session": "coreSession", "role": "MashupUser", "groups": []
    //    }, {
    //        "name": "Administrative", "id": "catAdmin", "isOpen": "false", "icon": " fa-users", "session": "coreSession", "role": "MashupUser", "groups": []
    //    }, {
    //        "name": "Examples", "id": "catExamples", "isOpen": "false", "icon": " fa-file-code-o ", "session": "coreSession", "role": "MashupUser", "groups": []
    //    }
    //];


}]);