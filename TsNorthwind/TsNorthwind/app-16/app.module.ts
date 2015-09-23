angular.module('app', ['ngRoute']);

angular.module('app').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/cust', {
                templateUrl: 'customers.html',
                controller: 'AppController as vm'
            }).
            when('/edit/:id', {
                templateUrl: 'customer-detail.html',
                controller: 'EditController as vm'
            }).
            otherwise({
                redirectTo: '/cust'
            });
    }]);