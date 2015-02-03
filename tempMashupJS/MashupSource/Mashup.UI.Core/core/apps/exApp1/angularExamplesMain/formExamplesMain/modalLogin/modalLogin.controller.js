/*global mashupApp:false */

mashupApp.controller('ModalLoginController',
['$scope', '$modalInstance', '$log', 'user', 'myValue', function ($scope, $modalInstance, $log, user, myValue) {
    $scope.myValue = myValue;
    $scope.user = user;
    $scope.submit = function() {

        // $log is an AngularJS Service and must be injected.
        // it has the ability to log 4 different types of message.
        // it can be overriden so we can use it for Instrumentation
        // but AngularJS 2.0 is coming out with diary.js for Instrumentation.

        $log.log('Submiting user info.');
        $log.log(user);
        $log.log('myValue: ' + myValue);

        // Closes the modal and returns a value
        $modalInstance.close('myResult');
    };

    $scope.cancel = function () {
        // Closes the modal
        $modalInstance.dismiss('cancel');
    };

}]);