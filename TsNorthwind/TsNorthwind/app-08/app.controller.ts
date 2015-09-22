namespace app08 {
    class AppController {

        customers: Customer[];
        currentCustomer: Customer;
        dataSource: string;

        static $inject = ['config', 'Dataservice']; // near the constructor!

        constructor(config:Config, dataservice:Dataservice) {

            let serverLocation = config.useBreeze ? config.apiHost : 'memory';
            this.dataSource = `Serving data from ${serverLocation}`;

            this.customers = dataservice.getAllCustomers();
        }

        onSelect(cust: Customer) {
            this.currentCustomer = cust;
        }
    }

    angular.module('app')
        .controller('AppController', AppController);
}
