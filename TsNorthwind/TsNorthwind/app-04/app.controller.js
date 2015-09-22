var app04;
(function (app04) {
    var AppController = (function () {
        function AppController() {
            this.customers = app04.mockCustomers;
        }
        AppController.prototype.onSelect = function (cust) {
            this.currentCustomer = cust;
            //alert(`You picked ${this.currentCustomer.name}`);
        };
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app04 || (app04 = {}));
