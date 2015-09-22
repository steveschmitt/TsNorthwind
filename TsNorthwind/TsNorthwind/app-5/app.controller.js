var app5;
(function (app5) {
    var AppController = (function () {
        function AppController() {
            this.customers = app5.mockCustomers;
        }
        AppController.prototype.onSelect = function (cust) {
            this.currentCustomer = cust;
            //alert(`You picked ${this.currentCustomer.name}`);
        };
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app5 || (app5 = {}));
//# sourceMappingURL=app.controller.js.map