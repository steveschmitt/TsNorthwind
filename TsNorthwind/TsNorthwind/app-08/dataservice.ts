namespace app08 {

    export interface Dataservice {
        getAllCustomers(): Customer[];
    }

    class InMemDataservice implements Dataservice {

        static $inject = ['config'];
        constructor(config: Config) {
            if (config.useBreeze) {
                throw new Error('Config.useBreeze is true but this is an in-memory data source');
            }
        }

        getAllCustomers = () => mockCustomers;


        // Traditional function form:
        //getAllCustomers() {
        //    return mockCustomers; 
        //}
    }

    angular.module('app')
        .service('Dataservice', InMemDataservice);
}