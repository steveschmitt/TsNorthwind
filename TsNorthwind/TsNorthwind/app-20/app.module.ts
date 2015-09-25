namespace app20 {

    export class Constants {
        public static AppController = 'AppController';
        public static EditController = 'EditController';
   }

    angular.module('app', ['breeze.angular', 'ngRoute']);

    angular.module('app').config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/cust', {
                    templateUrl: 'customers.html',
                    controller: Constants.AppController + ' as vm'
                }).
                when('/edit/:id', {
                    templateUrl: 'customer-detail.html',
                    controller: Constants.EditController + ' as vm'
                }).
                otherwise({
                    redirectTo: '/cust'
                });
        }]);

    angular.module('app').run(['BreezeDataservice',
        function (dataservice) {
            dataservice.getMetadata();
        }]);
}