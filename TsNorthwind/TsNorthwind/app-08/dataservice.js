var app08;
(function (app08) {
    var InMemDataservice = (function () {
        function InMemDataservice(config) {
            this.getAllCustomers = function () { return app08.mockCustomers; };
            if (config.useBreeze) {
                throw new Error('Config.useBreeze is true but this is an in-memory data source');
            }
        }
        InMemDataservice.$inject = ['config'];
        return InMemDataservice;
    })();
    angular.module('app')
        .service('Dataservice', InMemDataservice);
})(app08 || (app08 = {}));
