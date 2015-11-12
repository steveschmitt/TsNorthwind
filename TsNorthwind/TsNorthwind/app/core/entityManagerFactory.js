var app;
(function (app) {
    var EntityManagerFactoryClass = (function () {
        function EntityManagerFactoryClass(breeze, config, logger, wip) {
            // use camelCase property names on the client
            breeze.NamingConvention.camelCase.setAsDefault();
            // create a new manager talking to Northwind service 
            var serviceName = config.apiHost + 'Northwind';
            this.isSampleService = /sampleservice/i.test(serviceName);
            this.manager = new breeze.EntityManager(serviceName);
            wip.initialize(this.manager);
            logger.info('Connecting to ' + serviceName);
        }
        EntityManagerFactoryClass.$inject = ['breeze', 'config', 'logger', 'wip-service'];
        return EntityManagerFactoryClass;
    })();
    angular
        .module('app.core')
        .service('entityManagerFactory', EntityManagerFactoryClass);
})(app || (app = {}));
//# sourceMappingURL=entityManagerFactory.js.map