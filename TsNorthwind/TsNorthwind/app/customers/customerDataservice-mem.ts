namespace app {

    class InMemCustomerDataservice implements CustomerDataservice {
        static $inject = ['$q', 'test-data'];
        constructor(private _$q: angular.IQService, private _testData: TestData) { }

        getCustomers() {
            return this._$q.when(this._testData.customers);
        }
    }

    angular
        .module('app.customers')
        .service('customerDataservice-mem', InMemCustomerDataservice);
}