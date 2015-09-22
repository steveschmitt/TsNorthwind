var app;
(function (app) {
    var InMemCustomerDataservice = (function () {
        function InMemCustomerDataservice(_$q, _testData) {
            this._$q = _$q;
            this._testData = _testData;
        }
        InMemCustomerDataservice.prototype.getCustomers = function () {
            return this._$q.when(this._testData.customers);
        };
        InMemCustomerDataservice.$inject = ['$q', 'test-data'];
        return InMemCustomerDataservice;
    })();
    angular
        .module('app.customers')
        .service('customerDataservice-mem', InMemCustomerDataservice);
})(app || (app = {}));
//# sourceMappingURL=customerDataservice-mem.js.map