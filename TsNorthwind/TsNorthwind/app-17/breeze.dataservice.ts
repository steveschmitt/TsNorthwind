namespace app17 {
    // export only if we're using special methods (e.g. paging)
    export class BreezeDataservice implements Dataservice {
        name = 'BreezeDataservice';

        private _manager: breeze.EntityManager;

        static $inject = ['EntityManagerService'];
        constructor(ems: EntityManagerService) {
            this._manager = ems.manager;
        }

        getAllCustomers() {
            return this.queryCustomers(null, null);
        }

        private queryCustomers(skip: number, take: number) {
            // We are lying about the return type. 
            // The results will be Customer entities, not of the type `Customer` defined here
            // We'll have to fix this soon
            var query = breeze.EntityQuery
                .from('Customers')
                .orderBy('companyName')
                .using(this._manager);
            if (skip) {
                query = query.skip(skip);
            }
            if (take) {
                query = query.take(take);
            }
            
            return <angular.IPromise<Customer[]>><any>query.execute()
                .then(data => data.results)
                .catch(error => {
                    // Todo: add a logging service!
                    let msg = `Get customers failed: "${error.message || error}".`;
                    console.error(msg);
                    alert(msg);
                });
        }

        getCustomerPage(pageNumber: number, pageSize: number) {
            var skip = (pageNumber - 1) * pageSize;
            return this.queryCustomers(skip, pageSize);
        }

        getCustomerById(id: number): Customer {
            return <Customer><any>this._manager.getEntityByKey('Customer', id);
        }
    }

    angular.module('app')
        .service('BreezeDataservice', BreezeDataservice);

} 