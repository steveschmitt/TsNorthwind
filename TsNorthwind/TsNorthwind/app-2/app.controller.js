var app2;
(function (app2) {
    var AppController = (function () {
        function AppController() {
            this.customer = new app2.Customer(42, 'Johnny Rocket');
        }
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app2 || (app2 = {}));
//# sourceMappingURL=app.controller.js.map