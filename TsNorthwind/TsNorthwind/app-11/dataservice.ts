namespace app11 {

    export interface Dataservice {
        getAllCustomers(): angular.IPromise<Customer[]>;
    }

    class InMemDataservice implements Dataservice {

        static $inject = ['config', '$q'];
        constructor(config: Config, protected _$q: angular.IQService) {
            if (config.useBreeze) {
                throw new Error('Config.useBreeze is true but this is an in-memory data source');
            }
        }

        getAllCustomers() {
            return this._$q.when(mockCustomers); 
        }
    }


    // Simulates network latency by waiting before returning customers
    const DELAY = 1000;

    class SlowInMemDataservice extends InMemDataservice {

        constructor(config: Config, _$q: angular.IQService) {
            super(config, _$q);
        }

        getAllCustomers() {
            let deferred = this._$q.defer<Customer[]>();
            setTimeout(() => deferred.resolve(mockCustomers), DELAY)
            return deferred.promise;
        }
    }


    angular.module('app')
        //.service('Dataservice', InMemDataservice);
        .service('Dataservice', SlowInMemDataservice);

}