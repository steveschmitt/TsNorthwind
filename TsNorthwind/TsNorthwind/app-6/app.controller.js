var app6;
(function (app6) {
    var AppController = (function () {
        function AppController() {
            this.customers = app6.mockCustomers;
        }
        AppController.prototype.onSelect = function (cust) {
            this.currentCustomer = cust;
            //alert(`You picked ${this.currentCustomer.name}`);
        };
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app6 || (app6 = {}));
//# sourceMappingURL=app.controller.js.map