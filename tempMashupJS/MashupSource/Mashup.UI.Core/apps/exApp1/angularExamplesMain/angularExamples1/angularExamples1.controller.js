/*global mashupApp:false */

// jsexamples1Controller
mashupApp.controller('exApp1.AngularExamples1Controller', ['$log', '$location', '$http', 'MyService', 'environment',
    function ($log, $location, $http, MyService, environment) {
    'use strict';

    var vm = this;

    vm.InputDayOfWeek = 'Tuesday';

    vm.NumericDay = 1;

    // For the service example.
    vm.myProperty1 = '';
    vm.myIntegerValue = 0;
    vm.myfucntion = '';
    vm.connectionString = '';

    vm.runService = function () {
        vm.myProperty1 = MyService.myProperty1;
        vm.myIntegerValue = MyService.myIntegerValue;
        vm.myfunction = MyService.myfunction();
        vm.connectionString = MyService.connectionString;
    };

    // For the application value example.
    vm.myEnvironment = '';
    vm.getEnvironment = function () {
        vm.myEnvironment = environment;
    };
    
}]);

// adding a directive
// This doesn't work yet!  Only works on the initial load but not when the data changes.
mashupApp.directive('highlight', function() {
    return function(scope, element, attrs) {
        //if (scope.InputDayOfWeek == attrs['highlight']) {
        if (scope.InputDayOfWeek === attrs.highlight) {
            element.css('color', 'red');
        }
    };
});

mashupApp.filter('dayName', function () {
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return function (input) {
        return angular.isNumber(input) ? dayNames[input] : input;
    };
});

mashupApp.service('MyService', function () {

    // This seems like a simple way to provide global data/functions to the application.
    // I'm not sure that is the intent but seems to be a mechanism for doing it.

    // The object created inside this service is accessible via 'this.' 
    // Everythig you place into this. is accessible by modules this service is passed to.

    this.myProperty1 = 'This is my property';
    this.myIntegerValue = 5;
    this.myfunction = function() { return this.myProperty1 + ' ' + this.myIntegerValue; };

    this.connectionString = 'This could be some connection string passed to the data service.';

});

mashupApp.value('environment', 'Development');