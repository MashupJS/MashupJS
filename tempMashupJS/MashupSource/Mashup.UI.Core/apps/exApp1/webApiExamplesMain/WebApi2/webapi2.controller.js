/*global mashupApp:false */

mashupApp.controller('exApp1.Webapi2Controller', ['$http', '$log', '$filter', function ($http, $log, $filter) {

    var vm = this;

    vm.id = 0;
    vm.action = 'ANY';
    //vm.completed = '1900-01-01';
    vm.completed = new Date('1/1/1900');
    vm.myDecimal = 0;
    vm.myDouble = 0.0;
    vm.myLong = 0;
    vm.contact = 'name1@domain.com';
    vm.doneCheckedState = 'ANY';

    function getParams() {
        var params = {
            id: vm.id,
            action: vm.action,
            completed: vm.completed,
            myDecimal: vm.myDecimal,
            myDouble: vm.myDouble,
            myLong: vm.myLong,
            contact: vm.contact,
            doneWithIndeterminate: vm.doneCheckedState
        };

        return params;
    }


    // Breaking responsibilities here...
    $('#doneCheckBoxControl').data('checked', 1);
    $('#doneCheckBoxControl').prop('indeterminate', true);

    //Using a string to support a 3rd state for searches.  The 'ANY' state.
    vm.doneCheckBox = function () {

        var el = $('#doneCheckBoxControl');
        setIndeterminateCheckBox(el);
    };

    //TODO: Learn how to create a directive for this.
    //RECAP: The checkbox control only has checked and unchecked attributes.  There
    //       is an indeterminate property that creates a 3rd state.  This jQuery code
    //       breaks the notion of single responsibility.  This would be best implemented
    //       as a directive.
    //NOTE:  Need to figure out how to pass in a vm.[property] by reference so this 
    //       function can be made generic.  Right now it's hard coded to local variables.
    function setIndeterminateCheckBox(el) {

        switch (el.data('checked')) {

            // unchecked, going indeterminate
            case 0:
                el.data('checked', 1);
                el.prop('indeterminate', true);
                vm.doneCheckedState = 'ANY';
                break;

                // indeterminate, going checked
            case 1:
                el.data('checked', 2);
                el.prop('indeterminate', false);
                el.prop('checked', true);
                vm.doneCheckedState = 'True';
                break;

                // checked, going unchecked
            default:
                el.data('checked', 0);
                el.prop('indeterminate', false);
                el.prop('checked', false);
                vm.doneCheckedState = 'False';

        }

        $log.log('el.checked = ' + el.checked);
        $log.log('el.prop(\'indeterminate\') = ' + el.prop('indeterminate'));
        $log.log('doneCheckBox()');
    }

    vm.clearResultData = function () {
        vm.resultData = null;
        $log.log('Cleared resultData');
    };

    vm.getItems = function () {
        // NOTE: When we use the 'withCredentials' option we cannot use a wild card '*' for
        $http.get('http://localhost:50004/api/ExampleData/Items/', { withCredentials: true })
            .success(function (data) {
                vm.resultData = data;
                $log.log('Successfully retrieved all items. (webapi2)');
            });
    };

    vm.getItemsSearch = function () {
        // NOTE: When we use the 'withCredentials' option we cannot use a wild card '*' for

        if (vm.action.trim() === ''.trim()) {
            vm.action = 'ANY';
        }

        var urlParams = vm.action + '/' + vm.doneCheckedState + '/' + vm.id + '/';
        urlParams += $filter('date')(vm.completed, 'yyyy-MM-dd') + '/';
        urlParams += vm.myDecimal + '/';
        urlParams += vm.myDouble + '/';
        urlParams += vm.myLong + '/';

        if (vm.contact === '') {
            urlParams += '1@1.com' + '/';
        } else {
            urlParams += vm.contact + '/';
        }

        $http.get('http://localhost:50004/api/ExampleData/Items/Search/' + urlParams, { withCredentials: true })
            .success(function (data) {
                vm.resultData = data;
                $log.log('Successfully retrieved all items. (webapi2)');
            });
    };

    // Example: Sending payload in body and received as JSON String
    // We created a param object and passing it to the JSON.stringify method.
    // You'll notice, in the param object, that we don't do anything to 
    // modify 'contact' as we needed to do for the URL version.  This is 
    // becuase the object property is more durable than the URL of type string
    // with and empty string value.
    // We can do the same with 'action'.
    vm.getItemsSearchFromBody = function () {

        var myData = getParams();

        $http({
            url: 'http://localhost:50004/api/ExampleData/Items/Search2/',
            method: 'POST',
            data: JSON.stringify(myData),
            withCredentials: true,
            contentType: 'application/json'
        })
            .success(function (data) {
                vm.resultData = data;
                $log.log('Successfully retrieved all items. (webapi2.getItemsSearchFromBody)');
            });
    };

    vm.getItemsSearchFromBody4 = function () {

        var myData = getParams();

        $http({
            url: 'http://localhost:50004/api/ExampleData/Items/Search2/',
            method: 'POST',
            data: myData,
            withCredentials: true,
            contentType: 'application/json'
        })
            .success(function (data) {
                vm.resultData = data;
                $log.log('Successfully retrieved all items. (webapi2.getItemsSearchFromBody)');
            });
    };


}]);
