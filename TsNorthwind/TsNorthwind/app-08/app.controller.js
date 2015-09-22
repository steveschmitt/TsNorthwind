var app08;
(function (app08) {
    var AppController = (function () {
        function AppController(config, dataservice) {
            var serverLocation = config.useBreeze ? config.apiHost : 'memory';
            this.dataSource = "Serving data from " + serverLocation;
            this.customers = dataservice.getAllCustomers();
        }
        AppController.prototype.onSelect = function (cust) {
            this.currentCustomer = cust;
        };
        AppController.$inject = ['config', 'Dataservice']; // near the constructor!
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app08 || (app08 = {}));
