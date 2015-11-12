namespace app19 {

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
                caption: '@label'
            },
            template: '<div><label>{{caption}}</label><input ng-model="source" /></div>'
        };
    });
} 