﻿namespace app17 {
    class AppController {

        private _customers: Customer[]; // local copy of customers
        currentCustomer: Customer;
        dataSource: string;

        static $inject = ['config', 'BreezeDataservice', 'EditService']; // near the constructor!

        constructor(config:Config, private _dataservice:BreezeDataservice, private _editservice: EditService) {
            let serverLocation = config.useBreeze ? config.apiHost : 'memory';
            this.dataSource = `Serving data from ${serverLocation}`;
            //this._getAllCustomers();
            this._getCustomerPage(1, 10);
        }

        get customers() {
            // Note $digest error (infinite loop) if you implement as
            // return this._getAllCustomers();
            return this._customers; // || this._getAllCustomers();
        }

        /////////
        private _getAllCustomers() {
            this._dataservice.getAllCustomers()
                .then(custs => this._customers = custs);

            return this._customers;
        }

        private _getCustomerPage(pageNumber: number, pageSize: number) {
            this._dataservice.getCustomerPage(pageNumber, pageSize)
                .then(custs => this._customers = custs);

            return this._customers;
        }

    }



    angular.module('app')
        .controller('AppController', AppController);
}
