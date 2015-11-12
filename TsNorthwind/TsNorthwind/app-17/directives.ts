namespace app17 {

    angular.module("app").directive('firstdirective', function () {
        return {
            template: "<div>This is my directive</div>"
        }
    });

    angular.module("app").directive('custeditdirective', function () {
        return {
            template: '<div><label>First: </label><input ng-model="vm.customer.firstName" /></div><div><label > Last: </label><input ng-model="vm.customer.lastName" /> </div>'
        }
    });

    angular.module("app").directive("editInput", function () {
        return {
            scope: {
                source: '=',
            },
            template: '<div><label>First: </label><input ng-model="source" /></div>'
        };
    });
} 