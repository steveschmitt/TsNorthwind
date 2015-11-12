var app;
(function (app) {
    var CustomerDataserviceClass = (function () {
        function CustomerDataserviceClass($injector, config) {
            var ds = config.useBreeze ? 'customerDataservice-bz' : 'customerDataservice-mem';
            return $injector.get(ds);
        }
        CustomerDataserviceClass.$inject = ['$injector', 'config'];
        return CustomerDataserviceClass;
    })();
    angular.module('app.customers')
        .service('customerDataservice', CustomerDataserviceClass);
})(app || (app = {}));
//# sourceMappingURL=customerDataservice.js.map