var app1;
(function (app1) {
    var AppController = (function () {
        function AppController() {
            this.message = 'Hello Angular';
        }
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app1 || (app1 = {}));
//# sourceMappingURL=app.controller.js.map