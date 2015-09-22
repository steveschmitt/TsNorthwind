namespace app3 {
    class AppController {

        customers: Customer[];
        constructor() {
            this.customers = mockCustomers;
        }
    }

    angular.module('app')
        .controller('AppController', AppController);
}
