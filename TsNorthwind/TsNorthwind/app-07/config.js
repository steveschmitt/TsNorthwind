var app07;
(function (app07) {
    var config = {
        apiHost: 'http://localhost:1931/breeze/',
        //apiHost: 'http://sampleservice.breezejs.com/api/', // remote
        appTitle: 'Breeze Angular Northwind',
        useBreeze: false,
        version: '0.0.0'
    };
    angular.module('app')
        .value('config', config);
})(app07 || (app07 = {}));
