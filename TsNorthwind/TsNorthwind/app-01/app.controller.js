var app01;
(function (app01) {
    var AppController = (function () {
        function AppController() {
            this.message = 'Hello Angular';
        }
        return AppController;
    })();
    angular.module('app')
        .controller('AppController', AppController);
})(app01 || (app01 = {}));
