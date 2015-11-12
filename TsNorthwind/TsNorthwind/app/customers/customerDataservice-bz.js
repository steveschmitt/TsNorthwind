var app;
(function (app) {
    var BreezeCustomerDataservice = (function () {
        function BreezeCustomerDataservice(_$q, breeze, emFactory, _logger) {
            this._$q = _$q;
            this._logger = _logger;
            this._hasQueriedCustomer = false;
            this._manager = emFactory.manager;
        }
        BreezeCustomerDataservice.prototype.getCustomers = function () {
            var _this = this;
            var query = breeze.EntityQuery.from('Customers')
                .orderBy('companyName');
            // if previously queried
            // query the cache instead of the remote server
            if (this._hasQueriedCustomer) {
                query = query.using(breeze.FetchStrategy.FromLocalCache);
            }
            return this._manager
                .executeQuery(query)
                .then(function (data) {
                _this._hasQueriedCustomer = true; // remember we queried it
                return data.results;
            })
                .catch(function (error) {
                var msg = 'Customer query failed:\n' + error.message;
                _this._logger.error(msg);
                return _this._$q.reject(error); //pass error along
            });
        };
        BreezeCustomerDataservice.$inject = ['$q', 'breeze', 'entityManagerFactory', 'logger'];
        return BreezeCustomerDataservice;
    })();
    angular
        .module('app.customers')
        .service('customerDataservice-bz', BreezeCustomerDataservice);
})(app || (app = {}));
//# sourceMappingURL=customerDataservice-bz.js.map