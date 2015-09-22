namespace app {

    class Customers {

        static $inject = ['customerDataservice', 'logger'];

        title = 'Customers';
        customers = [];

        constructor(private _dataservice:CustomerDataservice, private _logger: Logger) {
            this._activate();
        }

        private _activate() {
            return this._getCustomers().then(() => {
                this._logger.info('Activated Customers View');
            });
        }

        private _getCustomers() {
            return this._dataservice.getCustomers().then(data => this.customers = data);
        }
    }

    angular
        .module('app.customers')
        .controller('Customers', Customers);
}
