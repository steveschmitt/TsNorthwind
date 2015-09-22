namespace app01 {
    class AppController {
        message = 'Hello Angular';
    }

    angular.module('app')
        .controller('AppController', AppController);
}
