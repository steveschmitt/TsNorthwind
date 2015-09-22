var app3;
(function (app3) {
    var AppController = (function () {
        function AppController() {
            this.customers = app3.mockCustomers;
        }
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app3 || (app3 = {}));
//# sourceMappingURL=app.controller.js.map