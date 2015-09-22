var app8;
(function (app8) {
    var AppController = (function () {
        function AppController(config, dataservice) {
            var serverLocation = config.useBreeze ? config.apiHost : 'memory';
            this.dataSource = "Serving data from " + serverLocation;
            this.customers = app8.mockCustomers;
        }
        AppController.prototype.onSelect = function (cust) {
            this.currentCustomer = cust;
        };
        AppController.$inject = ['config', 'Dataservice']; // near the constructor!
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app8 || (app8 = {}));
