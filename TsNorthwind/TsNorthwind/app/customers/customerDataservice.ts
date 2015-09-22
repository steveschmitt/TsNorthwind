namespace app {

    export interface CustomerDataservice {
        getCustomers(): angular.IPromise<any>;
    }

    class CustomerDataserviceClass implements CustomerDataservice {
        static $inject = ['$injector', 'config'];

        constructor($injector, config) {
            var ds = config.useBreeze ? 'customerDataservice-bz' : 'customerDataservice-mem';
            return <CustomerDataservice>$injector.get(ds);
        }
        getCustomers: () => angular.IPromise<any>;
    }

    angular.module('app.customers')
        .service('customerDataservice', CustomerDataserviceClass);
}