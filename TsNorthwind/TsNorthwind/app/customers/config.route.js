(function () {
    appRun.$inject = ['routehelper'];
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/customers/customers.html',
                    controller: 'Customers',
                    controllerAs: 'vm',
                    title: 'Customers',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-university"></i> Customers'
                    }
                }
            }
        ];
    }
    angular
        .module('app.customers')
        .run(appRun);
})();
//# sourceMappingURL=config.route.js.map