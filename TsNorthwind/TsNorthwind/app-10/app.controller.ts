namespace app10 {
    class AppController {

        private _customers: Customer[]; // local copy of customers
        currentCustomer: Customer;
        dataSource: string;

        static $inject = ['config', 'Dataservice', 'BreezeDataservice']; // near the constructor!

        constructor(config:Config, private _dataservice:Dataservice, private _bzDataservice: Dataservice) {
            let serverLocation = config.useBreeze ? config.apiHost : 'memory';
            this.dataSource = `Serving data from ${serverLocation}`;
        }

        get customers() {
            // Note $digest error (infinite loop) if you implement as
            // return this._getAllCustomers();
            return this._customers || this._getAllCustomers();
        }

        onSelect(cust: Customer) {
            this.currentCustomer = cust;
        }

        showBreezeCustomers() {
            this._bzDataservice.getAllCustomers()
                .then(custs =>
                    alert(custs.map(c => c['companyName']).join('\n')));
        }

        /////////
        private _getAllCustomers() {
            this._dataservice.getAllCustomers()
                .then(custs => this._customers = custs);

            return this._customers;
        }
    }



    angular.module('app')
        .controller('AppController', AppController);
}
