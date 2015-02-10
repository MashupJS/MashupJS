/*global mashupApp:false */

// exApp1.AngularObjectsController
mashupApp.controller('exApp1.AngularObjectsController', ['$log', function ($log) {
    'use strict';

    var vm = this;

    var items = [{ 'action': 'Buy Flowers', 'done': false },
                 { 'action': 'Get Shoes', 'done': false },
                 { 'action': 'Collect Tickets', 'done': true },
                 { 'action': 'Call Joe', 'done': false }];

    vm.todo = items;


    vm.logTypes = function () {

        // $log does the same thing console does.
        // The advantage of $log is it can be overridden

        console.log('Message from console.log');
        console.info('Message from console.info');
        console.warn('Message from console.warn');
        console.error('Message from console.error');

        $log.log('Message from $log.log');
        $log.info('Message from $log.info');
        $log.warn('Message from $log.warn');
        $log.error('Message from $log.error');

    };

    vm.basicStringManip = function () {
        /*jshint -W109*/

        // angular.isArray
        $log.log("angular.isArray(vm.todo) = " + angular.isArray(vm.todo));
        // angular.uppercase
        $log.log("angular.uppercase('shouting') = " + angular.uppercase('shouting'));
        // angular.lowercase
        $log.log("angular.lowercase('WhiSpeRing') = " + angular.lowercase('WhiSpeRing'));
        // angular.isNumber
        $log.log("angular.isNumber('7') = " + angular.isNumber('7'));
        $log.log("angular.isNumber(7) = " + angular.isNumber(7));

        /*jshint -W109*/
    };


    vm.addFunctionToObj = function () {

        // JavaScript is a functional language.
        // Here we are adding a function to an object which is called a method.
        var myData = {
            name: 'Adam',
            weather: 'sunny',
            printMessages: function () {
                $log.log('Hello ' + this.name + '. ');
                $log.log('Today is ' + this.weather + '.');

            }
        };

        myData.printMessages();


    };

    vm.extendObj = function () {

        var myData = {
            name: 'Adam',
            weather: 'sunny'
        };

        // now we will create a new object and extend it with the object we just created.
        // Using angular.extend

        var myExtendedObject = {
            city: 'London'
        };

        angular.extend(myExtendedObject, myData);

        $log.log(myExtendedObject.name);
        $log.log(myExtendedObject.city);

    };

    vm.angularForEach = function () {

        var myData = {
            name: 'Adam',
            weather: 'sunny',
            printMessages: function () {
                $log.log('Hello ' + this.name + '. ');
                $log.log('Today is ' + this.weather + '.');

            }
        };

        // iterating each property of an object /w javascript
        for (var prop in myData) {
            if (myData.hasOwnProperty(prop))
            { $log.log('Name: ' + prop + ' Value: ' + myData[prop]); }
        }

        // iterating each property with angular.forEach
        angular.forEach(myData, function (value, key) {
            { $log.log('Name: ' + key + ' Value: ' + value); }
        });

    };
    
    vm.nullOrUndefined = function () {

        // if checking for null 'or' undefined then use the ! operator
        var myData = {
            name: 'Adam',
            city: null
        };

        if (!myData.name) {
            { $log.log('name IS null or undefined'); }
        } else {
            { $log.log('name is NOT null or undefined'); }
        }

        if (!myData.city) {
            { $log.log('city IS null or undefined'); }
        } else {
            { $log.log('city is NOT null or undefined'); }
        }

        // angular.isDefined & angular.isUndefined
        $log.log('name: ' + angular.isDefined(myData.name));
        $log.log('city: ' + angular.isDefined(myData.city));
        $log.log('country: ' + angular.isDefined(myData.country));


    };

    vm.angularCopy = function () {

        var myData = {
            name: 'Adam',
            city: null,
            country: 'USA'
        };

        var myNewData = angular.copy(myData);

        $log.log('name: ' + myNewData.name);
        $log.log('city: ' + myNewData.city);
        $log.log('country: ' + myNewData.country);

    };


    vm.getDay = function () {
        var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        vm.day = dayNames[new Date().getDay()];
    };


}]);
