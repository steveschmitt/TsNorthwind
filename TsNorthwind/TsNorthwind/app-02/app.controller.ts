namespace app02 {
    class AppController {

        customer: Customer;
        constructor() {
            this.customer = new Customer(42, 'Johnny Rocket');
        }
    }

    angular.module('app')
        .controller('AppController', AppController);
}
