var app4;
(function (app4) {
    var AppController = (function () {
        function AppController() {
            this.customers = app4.mockCustomers;
        }
        AppController.prototype.onSelect = function (cust) {
            this.currentCustomer = cust;
            //alert(`You picked ${this.currentCustomer.name}`);
        };
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app4 || (app4 = {}));
