var app8;
(function (app8) {
    var InMemDataservice = (function () {
        function InMemDataservice(config) {
            // make a copy so controller can mutate array
            this.getAllCustomers = function () { return app8.mockCustomers.slice(); };
            if (config.useBreeze) {
                throw new Error('Config.useBreeze is true but this is an in-memory data source');
            }
        }
        return InMemDataservice;
    })();
    angular.module('app')
        .service('Dataservice', InMemDataservice);
})(app8 || (app8 = {}));
