var app06;
(function (app06) {
    var AppController = (function () {
        function AppController() {
            this.customers = app06.mockCustomers;
        }
        AppController.prototype.onSelect = function (cust) {
            this.currentCustomer = cust;
            //alert(`You picked ${this.currentCustomer.name}`);
        };
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app06 || (app06 = {}));
