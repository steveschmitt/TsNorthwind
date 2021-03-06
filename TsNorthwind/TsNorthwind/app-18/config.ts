﻿namespace app18 {

    let config = {
        apiHost: 'http://localhost:1931/breeze/', // local 
        //apiHost: 'http://sampleservice.breezejs.com/api/', // remote

        appTitle: 'Breeze Angular Northwind',
        useBreeze: true, // not yet
        version: '0.0.0'
    }

    export type Config = typeof config;
    
    angular.module('app')
        .value('config', config);
}