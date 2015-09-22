namespace app10 {

    class BreezeDataservice implements Dataservice {
        private _manager: breeze.EntityManager;

        static $inject = ['EntityManagerService'];
        constructor(ems: EntityManagerService ) {
            this._manager = ems.manager;
        }

        getAllCustomers() {
            // We are lying about the return type. 
            // The results will be Customer entities, not of the type `Customer` defined here
            // We'll have to fix this soon
            return <angular.IPromise<Customer[]>><any> breeze.EntityQuery
                .from('Customers')
                .orderBy('companyName')
                .using(this._manager)
                .execute()
                .then(data => data.results)
                .catch(error => {
                    // Todo: add a logging service!
                    let msg = `Get customers failed: "${error.message || error}".`;
                    console.error(msg);
                    alert(msg);
                }); 
        }
    }

    angular.module('app')
        .service('BreezeDataservice', BreezeDataservice);

}