namespace app20 {

    export interface IBreezeDataservice {
        getAllCustomers(): ng.IPromise<BreezeCustomer[]>;
        getCustomerPage(pageNumber: number, pageSize: number): ng.IPromise<BreezeCustomer[]>;
        getCustomerById(custId: string): BreezeCustomer;
        saveChanges(): ng.IPromise<any>;
    }

    // returns different data than the InMemDataService
    export class BreezeDataservice implements IBreezeDataservice {
        name = 'BreezeDataservice';

        private _manager: breeze.EntityManager;
        private _hasMetadata = false;

        static $inject = ['EntityManagerService'];
        constructor(ems: EntityManagerService) {
            this._manager = ems.manager;
        }

        getAllCustomers() {
            return this.queryCustomers(null, null);
        }

        private queryCustomers(skip: number, take: number): ng.IPromise<BreezeCustomer[]> {
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
            //.inlineCount(true); only if need to demo; it adds "&$inlinecount=allpages" to query and data.inlineCount to response
            return <ng.IPromise<BreezeCustomer[]>><any>query.execute()
                .then(data => {
                    var x = data;
                    return data.results
                })
                .catch(error => {
                    // Todo: add a logging service!
                    let msg = `Get customers failed: "${error.message || error}".`;
                    console.error(msg);
                    alert(msg);
                });
        }

        getMetadata(): ng.IPromise<any> {
            return this._manager.fetchMetadata().then(() => {
                this._hasMetadata = true;
                var ms = this._manager.metadataStore.exportMetadata();
                console.log(ms);
            });
        }

        getCustomerPage(pageNumber: number, pageSize: number) {
            var skip = (pageNumber - 1) * pageSize;
            return this.queryCustomers(skip, pageSize);
        }

        getCustomerById(id: string): BreezeCustomer {
            if (!this._hasMetadata) return null;
            return <BreezeCustomer>this._manager.getEntityByKey('Customer', id);
        }

        saveChanges(): ng.IPromise<any> {
            return this._manager.saveChanges()
                .then((result) => alert('Save success'))
                .catch((err) => alert('Save failed: ' + err.message));
        }
    }

    angular.module('app')
        .service('BreezeDataservice', BreezeDataservice);

} 