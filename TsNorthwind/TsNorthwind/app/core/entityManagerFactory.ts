namespace app {

    type Breeze = typeof breeze;

    export interface EntityManagerFactory {
        isSampleService: boolean;
        manager: breeze.EntityManager;
    }
  
    class EntityManagerFactoryClass implements EntityManagerFactory {

        static $inject = ['breeze', 'config', 'logger', 'wip-service'];

        constructor(breeze: Breeze, config:Config, logger:Logger, wip) {
      
            // use camelCase property names on the client
            breeze.NamingConvention.camelCase.setAsDefault();

            // create a new manager talking to Northwind service 
            let serviceName = config.apiHost + 'Northwind';
            this.isSampleService = /sampleservice/i.test(serviceName);

            this.manager = new breeze.EntityManager(serviceName);
            wip.initialize(this.manager);

            logger.info('Connecting to ' + serviceName);
        }

        isSampleService: boolean;
        manager: breeze.EntityManager;
    }

    angular
        .module('app.core')
        .service('entityManagerFactory', EntityManagerFactoryClass);

}