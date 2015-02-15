/*global mashupApp:false */

mashupApp.controller('exApp1.ModalController', ['$modal', '$log', function ($modal, $log) {
    'use strict';

    var vm = this;

    vm.message = 'Modal examples here...';

    // ------------------------------------------------------------------------- //
    // Part of the controller supporting the modal popup.
    // ------------------------------------------------------------------------- //
    vm.user = {
        user: 'name',
        password: null
    };

    vm.modalLoginClick = function () {

        // To control the size of the modal modify the css style embedded in the page fragment.
        // There is an example in modalLogin.html

        var modalLogin = $modal.open({
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/modalLogin/modalLogin.html',
            backdrop: 'static', // can be true 
            windowClass: 'modal',
            controller: 'ModalLoginController',
            keyboard: true,

            resolve: {
                // The resolve property executes first to set up the values being
                // passed into the ModalLoginController.  Values not predicated with $ must
                // be passed in explicitly.  The $ indicates a DI or Dependency Injection so
                // no extra effort need go into passing values.  This is a benefit of 
                // defining services which can be passed via DI.
                user: function () { return vm.user; },
                // When I pass this as a value, IE: user2: '5', it doesn't work.
                // When I pass it as a function it does work.
                myValue: function () { return '5'; },
            }

        });
        //get result here...  This seems like almost an if/else.  The second
        //function only runs when I press the cancel button which fires dismiss.
        //TODO: Figure out why this is so.
        modalLogin.result.then(function (result) {
            $log.log('result: ' + result);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    // ------------------------------------------------------------------------- //
    // ------------------------------------------------------------------------- //

    // ------------------------------------------------------------------------- //
    // Below handles the Basic, large, and small render of the modal dialogs.
    // ------------------------------------------------------------------------- //
    vm.items = ['item1', 'item2', 'item3'];

    vm.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'apps/exApp1/angularExamplesMain/formExamplesMain/modalDemo/modalDemo.html',
            controller: 'modalDemoController',
            size: size,

            resolve: {
                items: function () {
                    return vm.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            vm.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

}]);
