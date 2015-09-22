var AppController = (function () {
    function AppController() {
        this.message = 'Hello Angular';
    }
    return AppController;
})();
angular.module('app', [])
    .controller('AppController', AppController);
