namespace app7 {
    class AppController {

        customers: Customer[];
        currentCustomer: Customer;
        dataSource: string;

        static $inject = ['config']; // near the constructor!

        constructor(config:Config) {

            let serverLocation = config.useBreeze ? config.apiHost : 'memory';
            this.dataSource = `Serving data from ${serverLocation}`;

            this.customers = mockCustomers;
        }

        onSelect(cust: Customer) {
            this.currentCustomer = cust;
        }
    }

    angular.module('app')
        .controller('AppController', AppController);
}
