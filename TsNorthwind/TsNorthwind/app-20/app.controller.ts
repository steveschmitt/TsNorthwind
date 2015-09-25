namespace app20 {
    export class AppController {

        private _customers: BreezeCustomer[]; // local copy of customers
        currentCustomer: Customer;
        dataSource: string;
        page: number;
        pageSize: number = 10;

        static $inject = ['BreezeDataservice']; // near the constructor!
        constructor(private _dataservice:BreezeDataservice) {
            //this._getAllCustomers();
            this.page = 1;
            this._getCustomerPage();
        }

        get customers() {
            // Note $digest error (infinite loop) if you implement as
            // return this._getAllCustomers();
            return this._customers; // || this._getAllCustomers();
        }

        next() {
            if (this._customers.length >= this.pageSize) {
                this.page++;
                this._getCustomerPage();
            }
        }

        previous() {
            if (this.page > 1) {
                this.page--;
                this._getCustomerPage();
            }
        }

        save() {
            this._dataservice.saveChanges();
        }

        /////////
        private _getAllCustomers() {
            this._dataservice.getAllCustomers()
                .then(custs => this._customers = custs);

            return this._customers;
        }

        private _getCustomerPage() {
            this._dataservice.getCustomerPage(this.page, this.pageSize)
                .then(custs => this._customers = custs);

            return this._customers;
        }

    }



    angular.module('app')
        .controller(Constants.AppController, AppController);
}
