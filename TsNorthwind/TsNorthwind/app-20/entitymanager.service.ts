namespace app20 {

    export interface EntityManagerService {
        manager: breeze.EntityManager;
    }

    class EntityManagerServiceClass implements EntityManagerService {

        //isSampleService: boolean;
        manager: breeze.EntityManager;

        static $inject = ['breeze']; // required to make breeze.bridge.angular initialize
        constructor(breeze) {
      
            // use camelCase property names on the client
            breeze.NamingConvention.camelCase.setAsDefault();

            // create a new manager talking to Northwind service 
            let serviceName = '/breeze/Northwind';  // get this from config?
            //this.isSampleService = /sampleservice/i.test(serviceName);
            console.log('EntityManagerServiceClass: using ' + serviceName);
            
            this.manager = new breeze.EntityManager(serviceName);
        }
    }

    angular
        .module('app')
        .service('EntityManagerService', EntityManagerServiceClass);

}