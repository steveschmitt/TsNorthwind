namespace app05 {
    class AppController {

        customers: Customer[];
        currentCustomer: Customer

        constructor() {
            this.customers = mockCustomers;
        }

        onSelect(cust: Customer) {
            this.currentCustomer = cust;
            //alert(`You picked ${this.currentCustomer.name}`);
        }
    }

    angular.module('app')
        .controller('AppController', AppController);
}
