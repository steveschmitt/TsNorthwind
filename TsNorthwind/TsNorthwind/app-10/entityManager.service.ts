namespace app10 {

    // Remember to 
    // 1. add 'breeze' to the typings files
    // 2. add 'breeze.debug.js' & 'breeze.bridge.angular.js' to the index.html vendor scripts
    // 3. add 'breeze.angular' to the app.module dependencies
    // 4. add 'breeze-dataservice.ts' and inject this EntityManagerService
    // 5. extend AppController to show breeze customers in an alert
    // 6. add a "Show Breeze Customers" button to 'app.html' 

    // Create type alias for breeze which is both a module/namespace and a type
    type Breeze = typeof breeze;

    export interface EntityManagerService {
        isSampleService: boolean;
        manager: breeze.EntityManager;
    }

    class EntityManagerServiceClass implements EntityManagerService {

        isSampleService: boolean;
        manager: breeze.EntityManager;

        static $inject = ['breeze', 'config'];
        constructor(breeze:Breeze, config:Config) {
      
            // use camelCase property names on the client
            breeze.NamingConvention.camelCase.setAsDefault();

            // create a new manager talking to Northwind service 
            let serviceName = config.apiHost + 'Northwind';
            this.isSampleService = /sampleservice/i.test(serviceName);
            console.log('Connecting to ' + serviceName);

            this.manager = new breeze.EntityManager(serviceName);
        }
    }

    angular
        .module('app')
        .service('EntityManagerService', EntityManagerServiceClass);
}