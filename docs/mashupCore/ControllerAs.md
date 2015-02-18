---
title: Use Angular's Controller As syntax
tags:
- Angular Controller
- AngularJS
- JavaScript
- MashupJS
- SPA
- Angular2.0
- Best Practice
- 
---


#Use Angular's **Controller As** syntax

###http://robertdunaway.github.io

Sure, when we first learn to use Controllers, we start with the standard constructor with $scope.

There is a better way.


##101 Using Controllers

The controller can be paired with the html in the html itself or in the route configuration. For the purpose of this demonstration, we’ll use the route configuration.

####Here we have a route pairing up a controller with its view.
This is a common approach and perfectly acceptable but not a best practice.

When dealing with scope, you’ll find yourself referencing the $parent in Views with nested controllers.

$scope is deprecated or gone in Angular 2.0 so it wouldn’t hurt to learn to live without it.

####Route
```
.when('/exApp1/angularExamplesMain/controllers', {
       templateUrl: "apps/exApp1/angularExamplesMain/controllers/controllers.html",
       controller: 'exApp1.controllersController',
       ...
```

####Controller
```
/*global mashupApp:false */
mashupApp.controller('exApp1.controllersController', function ($scope) {
    $scope.a = 1;
    $scope.b = 2;
    $scope.myValue = 0;
    $scope.add = function (a,b) {
        $scope.myValue = a + b;
    }
});
```

####Using Controller As syntax
The Controller As approach puts the controller on the scope, so it’s not necessary to pass in $scope anymore.
Simply referencing variables and functions with “this” is enough.

The challenge with “this” is “this” can have varying meanings in different contexts.

So while we no longer have to deal with $parent we now have to deal with what “this” really means at any given point.

Notice the **controllerAs: ‘vm’** syntax in the route config.


#####Route
```
.when('/exApp1/angularExamplesMain/controllers', {
       templateUrl: "apps/exApp1/angularExamplesMain/controllers/controllers.html",
       controller: 'exApp1.controllersController',
       controllerAs: 'vm',
       ...
```
#####Controller
```
/*global mashupApp:false */
mashupApp.controller('exApp1.controllersController', function () {
    this.a = 1;
    this.b = 2;
    this.myValue = 0;
    this.add = function (a,b) {
        this.myValue = a + b;
    }
}); 
```

##Best Practice
####Setting "this" equal to a local variable
Assigning a local value a reference to "this" solves the problem of "this" potentially meaning something different in a different context.

In this case "vm" will always mean what it meant at the moment it was set equal to "this".

Additional References:
https://github.com/johnpapa/angularjs-styleguide#controllers 
http://www.johnpapa.net/angularjss-controller-as-and-the-vm-variable/

####Route
```
.when('/exApp1/angularExamplesMain/controllers', {
       templateUrl: "apps/exApp1/angularExamplesMain/controllers/controllers.html",
       controller: 'exApp1.controllersController',
       controllerAs: 'vm',
       ...
```
####Controller
```
/*global mashupApp:false */
mashupApp.controller('exApp1.controllersController', function () {
    // vm = View Model
    var vm = this;
    vm.a = 1;
    vm.b = 2;
    vm.myValue = 0;
    vm.add = function (a,b) {
        vm.myValue = a + b;
    }
});    
```
####Local variable “vm” and Controller As “vm”
You might see where using “vm” in two different contexts in the view and controller might be bad coding practice.

In an effort at maintaining good coding practice, I could name the local value something different but now I’d refer to the add method in code as vp.add() and in the markup as vw.add().

The approach of naming the local variable and controller the same doesn’t seem to cause any practical conflict.


####Route
```
.when('/exApp1/angularExamplesMain/controllers', {
       templateUrl: "apps/exApp1/angularExamplesMain/controllers/controllers.html",
       controller: 'exApp1.controllersController',
       controllerAs: 'vm',
       ...
```

####Controller
```
/*global mashupApp:false */
mashupApp.controller('exApp1.controllersController', function () {
    // vm = ViewModel
    var vp = this;
    vp.a = 1;
    vp.b = 2;
    vp.myValue = 0;
    vp.add = function (a, b) {
        vp.myValue = a + b;
    }
});
```
