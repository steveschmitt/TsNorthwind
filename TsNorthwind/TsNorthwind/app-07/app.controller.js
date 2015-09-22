var app07;
(function (app07) {
    var AppController = (function () {
        function AppController(config) {
            var serverLocation = config.useBreeze ? config.apiHost : 'memory';
            this.dataSource = "Serving data from " + serverLocation;
            this.customers = app07.mockCustomers;
        }
        AppController.prototype.onSelect = function (cust) {
            this.currentCustomer = cust;
        };
        AppController.$inject = ['config']; // near the constructor!
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app07 || (app07 = {}));
