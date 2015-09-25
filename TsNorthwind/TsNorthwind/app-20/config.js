var app20;
(function (app20) {
    var config = {
        apiHost: 'http://localhost:1931/breeze/',
        //apiHost: 'http://sampleservice.breezejs.com/api/', // remote
        appTitle: 'Breeze Angular Northwind',
        useBreeze: true,
        version: '0.0.0'
    };
    angular.module('app')
        .value('config', config);
})(app20 || (app20 = {}));
//# sourceMappingURL=config.js.map