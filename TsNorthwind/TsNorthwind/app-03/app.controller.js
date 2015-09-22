var app03;
(function (app03) {
    var AppController = (function () {
        function AppController() {
            this.customers = app03.mockCustomers;
        }
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app03 || (app03 = {}));
