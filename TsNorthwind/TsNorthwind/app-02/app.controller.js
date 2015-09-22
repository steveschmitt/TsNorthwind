var app02;
(function (app02) {
    var AppController = (function () {
        function AppController() {
            this.customer = new app02.Customer(42, 'Johnny Rocket');
        }
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app02 || (app02 = {}));
