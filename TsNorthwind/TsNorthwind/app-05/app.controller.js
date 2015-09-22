var app05;
(function (app05) {
    var AppController = (function () {
        function AppController() {
            this.customers = app05.mockCustomers;
        }
        AppController.prototype.onSelect = function (cust) {
            this.currentCustomer = cust;
            //alert(`You picked ${this.currentCustomer.name}`);
        };
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app05 || (app05 = {}));
