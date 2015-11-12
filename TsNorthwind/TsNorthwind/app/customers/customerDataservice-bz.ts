namespace app {

    type Breeze = typeof breeze;

    class BreezeCustomerDataservice implements CustomerDataservice {

        private _hasQueriedCustomer = false;
        private _manager: breeze.EntityManager;

        static $inject = ['$q', 'breeze', 'entityManagerFactory', 'logger'];
        constructor(private _$q:angular.IQService, breeze:Breeze, emFactory:EntityManagerFactory, private _logger:Logger) {
            this._manager = emFactory.manager; 
        }

        getCustomers() {
            var query = breeze.EntityQuery.from('Customers')
                .orderBy('companyName');

            // if previously queried
            // query the cache instead of the remote server
            if (this._hasQueriedCustomer){
                query = query.using(breeze.FetchStrategy.FromLocalCache);
            }

            return this._manager
                .executeQuery(query)
                .then(data => {
                    this._hasQueriedCustomer = true; // remember we queried it
                    return data.results;   
                })
                .catch(error => {
                    var msg = 'Customer query failed:\n' + error.message;
                    this._logger.error(msg);
                    return this._$q.reject(error); //pass error along
                });
        }
    }


    angular
        .module('app.customers')
        .service('customerDataservice-bz', BreezeCustomerDataservice);
}