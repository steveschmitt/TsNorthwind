namespace app8 {

    export interface Dataservice {
        getAllCustomers(): Customer[];
    }

    class InMemDataservice implements Dataservice {

        constructor(config: Config) {
            if (config.useBreeze) {
                throw new Error('Config.useBreeze is true but this is an in-memory data source');
            }
        }

        // make a copy so controller can mutate array
        getAllCustomers = () => mockCustomers.slice();


        // Traditional function form:
        //getAllCustomers() {
        //    // make a copy so controller can mutate array
        //    return mockCustomers.slice(); 
        //}
    }

    angular.module('app')
        .service('Dataservice', InMemDataservice);
}