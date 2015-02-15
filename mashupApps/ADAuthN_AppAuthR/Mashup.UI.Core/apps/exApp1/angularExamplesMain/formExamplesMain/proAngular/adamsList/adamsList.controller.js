/*global mashupApp:false */
// 13. adding a more advanced filter
mashupApp.filter('exApp1.checkedItems', function () {
    'use strict';

    return function(items, showComplete) {
        var resultArr = [];
        angular.forEach(items, function(item) {

            if (item.done === false || showComplete === true) {
                resultArr.push(item);
            }
        });
        return resultArr;
    };
});

mashupApp.controller('exApp1.AdamsListController', ['$http', function ($http) {
    'use strict';

    var vm = this;

    var model = {
        user: 'Adam'
    };

    // NOTE: When we use the 'withCredentials' option we cannot use a wild card '*' for
    $http.get('http://localhost:50004/api/ExampleData/Items/', { withCredentials: true }).success(function(data) {
        model.items = data;
    });

    // here we are adding the model, defined above, to the vm as vm.todo
    vm.todo = model;

    // 9. adding more behavior to the controller
    vm.incompleteCount = function() {
        var count = 0;
        angular.forEach(vm.todo.items, function(item) {
            if (!item.done) {
                count++;
            }
        });
        return count;
    };

    // 10. adding more behavior that affects other behavior
    vm.warningLevel = function() {
        return vm.incompleteCount() < 3 ? 'lable-success' : 'label-warning';
    };

    // 11. adding new item method
    vm.addNewItem = function(actionText) {
        vm.todo.items.push({ action: actionText, done: false });
    };


}]);
