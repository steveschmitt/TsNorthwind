var app7;
(function (app7) {
    var AppController = (function () {
        function AppController(config) {
            var serverLocation = config.useBreeze ? config.apiHost : 'memory';
            this.dataSource = "Serving data from " + serverLocation;
            this.customers = app7.mockCustomers;
        }
        AppController.prototype.onSelect = function (cust) {
            this.currentCustomer = cust;
        };
        AppController.$inject = ['config']; // near the constructor!
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app7 || (app7 = {}));
