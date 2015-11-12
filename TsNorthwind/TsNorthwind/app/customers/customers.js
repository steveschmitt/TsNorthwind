var app;
(function (app) {
    var Customers = (function () {
        function Customers(_dataservice, _logger) {
            this._dataservice = _dataservice;
            this._logger = _logger;
            this.title = 'Customers';
            this.customers = [];
            this._activate();
        }
        Customers.prototype._activate = function () {
            var _this = this;
            return this._getCustomers().then(function () {
                _this._logger.info('Activated Customers View');
            });
        };
        Customers.prototype._getCustomers = function () {
            var _this = this;
            return this._dataservice.getCustomers().then(function (data) { return _this.customers = data; });
        };
        Customers.$inject = ['customerDataservice', 'logger'];
        return Customers;
    })();
    angular
        .module('app.customers')
        .controller('Customers', Customers);
})(app || (app = {}));
//# sourceMappingURL=customers.js.map