/*global mashupApp:false */

// exApp1.JSExamples1Controller
mashupApp.controller('exApp1.JSExamples1Controller', ['$log', function ($log) {

    var vm = this;

    var items = [{ 'action': 'Buy Flowers', 'done': false },
                 { 'action': 'Get Shoes', 'done': false },
                 { 'action': 'Collect Tickets', 'done': true },
                 { 'action': 'Call Joe', 'done': false }];

    vm.todo = items;



    vm.createObjects = function() {

        //var myObject1 = new Object();  // JSHing says, 'The object literal notation {} is preferable.'
        // http://jslinterrors.com/the-object-literal-notation-is-preferrable
        var myObject1 = {};
        myObject1.fname = 'John';
        myObject1.lname = 'Adams';

        $log.log('object created with new = ' + myObject1.fname + ' ' + myObject1.lname);

        // object literal approach
        var myObject2 = { fname: 'John', lname: 'Adams' };

        $log.log('object created with new = ' + myObject2.fname + ' ' + myObject2.lname);

    };

    vm.addFunctionToObj = function() {

        // JavaScript is a functional language.
        // Here we are adding a function to an object which is called a method.
        var myData = {
            name: 'Adam',
            weather: 'sunny',
            printMessages: function() {
                $log.log('Hello ' + this.name + '. ');
                $log.log('Today is ' + this.weather + '.');

            }
        };

        myData.printMessages();


    };

 

  
    vm.arrayBasics = function() {

        // Javascript will support arrays with different types.
        // Notice in this array that I do not set the number of items in the array.
        // It will resize itselt.
        // Also notice the variety of datatypes that work in the same array.

        //var myArray = new Array();  // JSHint recommends literal notation.
        var myArray = [];
        myArray[0] = 100;
        myArray[1] = 'Adam';
        myArray[2] = true;

        // creating an array with the Array Literal Style
        var myArray2 = [100, 'Adam', true];

        // detecting an array
        $log.log('angular.isArray(myArray2) = ' + angular.isArray(myArray2));
        $log.log('angular.isArray(\'Adam\') = ' + angular.isArray('Adam'));
        $log.log('angular.isArray(23) = ' + angular.isArray(23));
    };

    vm.nullOrUndefined = function() {

        // if checking for null 'or' undefined then use the ! operator
        var myData = {
            name: 'Adam',
            city: null
        };

        if (!myData.name) {
            $log.log('name IS null or undefined');
        } else {
            $log.log('name is NOT null or undefined');
        }

        if (!myData.city) {
            $log.log('city IS null or undefined');
        } else {
            $log.log('city is NOT null or undefined');
        }

    };


    vm.getDay = function() {
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        vm.day = dayNames[new Date().getDay()];
    };


}]);
