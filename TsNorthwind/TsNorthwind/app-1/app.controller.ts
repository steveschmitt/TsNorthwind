namespace app1 {
    class AppController {
        message = 'Hello Angular';
    }

    angular.module('app')
        .controller('AppController', AppController);
}
