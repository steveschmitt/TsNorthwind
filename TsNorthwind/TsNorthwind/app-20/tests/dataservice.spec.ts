namespace app20 {
    /*
       Testing an IN MEMORY async dataservice
       
       Features include:
       * injection of a dependency (config)
       * injecting that dependency in beforeEach and setting a value BEFORE it is used by service
       * injecting a particular implementation of dataservice into the test using annotation form
       * synchronous testing of a method that returns a promise
       * synchronous testing of a method that waits (using $timeout) before resolving a promise

       A real dataservice would make HTTP calls and probably could not be test this way
       The test techniques remain valuable tools in your kit 
       (e.g. for testing controllers with mocked dataservices)
       See a related dataservice lesson for testing services that make HTTP calls.
     */

    // friendly aliases
    let module = angular.mock.module;
    let inject = angular.mock.inject;
    var $httpBackend;

    describe('Dataservice', () => {

        // Identify module to test
        // could replace any definitions at this point
        beforeEach(module('app'));
        beforeEachSafeConfig(); // calls injector; module definitions now frozen

        describe('Dataservice', () => {

            it('is the "InMemDataservice"', inject((Dataservice: Dataservice) => {
                expect(Dataservice.name).toEqual('InMemDataservice');
            }));

        });     



        describe('InMemDataservice', () => {

            describe('creation', () => {

                it('can create service',
                    inject(['InMemDataservice', (service: Dataservice) => {
                        expect(service).toBeDefined();
                    }]));


                //it('service throws when "useBreeze" is true',
                //    inject((config:Config, $injector: any) => {
                //        config.useBreeze = true;
                //        expect(() => {
                //            let service: Dataservice = $injector.get('InMemDataservice');
                //        }).toThrowError(/memory/); // "memory" appears in error message
                //    }));
            });

            // Method returns a $q promise
            // angular-mocks mocks $q so that tester can control promise resolution
            // To test any service relying on $q
            // we have to manipulate the mocked version of $q to 
            // tell it when to fullfill the promise
            // by calling $rootScope.$apply().
            describe('#getAllCustomers', () => {

                let $rootScope: angular.IScope;
                let service: Dataservice;

                beforeEach(inject(['$rootScope', 'InMemDataservice',
                    (_$rootScope_: angular.IScope, svc: Dataservice) => {
                        $rootScope = _$rootScope_;
                        service = svc;
                }]));

                it('returns customers', () => {
                    let custs: Customer[];
                    custs = service.getAllCustomers();

                    //$rootScope.$apply(); // to flush $q else test fails because promise not resolved
                    expect(custs.length).toBeGreaterThan(0);
                });

            });
        });



        describe('BreezeDataservice', () => {

            // The BreezeDataservice queries asynchronously, so we have to explicitly
            // $apply() to make the digest cycle happen.  That makes the $httpBackend respond,
            // so the entityManager can respond.
            describe('#getAllCustomers', () => {

                let $scope: ng.IScope;
                let service: BreezeDataservice;

                beforeEach(inject(['$rootScope', 'BreezeDataservice',
                    (_$rootScope_: ng.IScope, svc: BreezeDataservice) => {
                        $scope = _$rootScope_;
                        service = svc;
                    }]));

                it('returns customers after a delay when promise resolves ', () => {
                    let custs: BreezeCustomer[];
                    service.getAllCustomers()
                        .then(results => {
                            custs = results
                        });

                    $httpBackend.flush(); // to flush delays and incidentally flush $q
                    expect(custs.length).toBeGreaterThan(0);
                });

            });
        });

        ///// helpers /////

        // Set up angular's $httpBackend to return hard-coded responses to breeze queries


        function beforeEachSafeConfig() {
            //beforeEach(inject((ems: EntityManagerService) => config.useBreeze = false));
            beforeEach(inject(function (_$httpBackend_) {
                $httpBackend = _$httpBackend_;
                var customersRx = /breeze\/Northwind\/Customers/;
                var metadataRx = /breeze\/Northwind\/Metadata/;
                $httpBackend.whenGET(metadataRx).respond(() => {
                    console.log("fetch metadata");
                    return [200, metadata, {}];
                });
                $httpBackend.whenGET(customersRx).respond(() => {
                    console.log("fetch customers");
                    return [200, customers, {}];
                });
            }));
        }


        // Breeze query responses, captured from network traffic or exported from an entityManager

        // metadata for Customer entity only; others have been removed for brevity
        var metadata =
            { "metadataVersion": "1.0.5", "namingConvention": "camelCase", "localQueryComparisonOptions": "caseInsensitiveSQL", "dataServices": [{ "serviceName": "/breeze/Northwind/", "hasServerMetadata": true, "jsonResultsAdapter": "webApi_default", "useJsonp": false }], "structuralTypes": [{ "shortName": "Customer", "namespace": "Northwind.Models", "autoGeneratedKeyType": "None", "defaultResourceName": "Customers", "dataProperties": [{ "name": "customerID", "dataType": "Guid", "isNullable": false, "defaultValue": "00000000-0000-0000-0000-000000000000", "isPartOfKey": true, "validators": [{ "name": "required" }, { "name": "guid" }] }, { "name": "customerID_OLD", "dataType": "String", "maxLength": 5, "validators": [{ "maxLength": 5, "name": "maxLength" }] }, { "name": "companyName", "dataType": "String", "isNullable": false, "defaultValue": "", "maxLength": 40, "validators": [{ "name": "required" }, { "maxLength": 40, "name": "maxLength" }] }, { "name": "contactName", "dataType": "String", "maxLength": 30, "validators": [{ "maxLength": 30, "name": "maxLength" }] }, { "name": "contactTitle", "dataType": "String", "maxLength": 30, "validators": [{ "maxLength": 30, "name": "maxLength" }] }, { "name": "address", "dataType": "String", "maxLength": 60, "validators": [{ "maxLength": 60, "name": "maxLength" }] }, { "name": "city", "dataType": "String", "maxLength": 15, "validators": [{ "maxLength": 15, "name": "maxLength" }] }, { "name": "region", "dataType": "String", "maxLength": 15, "validators": [{ "maxLength": 15, "name": "maxLength" }] }, { "name": "postalCode", "dataType": "String", "maxLength": 10, "validators": [{ "maxLength": 10, "name": "maxLength" }] }, { "name": "country", "dataType": "String", "maxLength": 15, "validators": [{ "maxLength": 15, "name": "maxLength" }] }, { "name": "phone", "dataType": "String", "maxLength": 24, "validators": [{ "maxLength": 24, "name": "maxLength" }] }, { "name": "fax", "dataType": "String", "maxLength": 24, "validators": [{ "maxLength": 24, "name": "maxLength" }] }, { "name": "rowVersion", "dataType": "Int32", "concurrencyMode": "Fixed", "validators": [{ "min": -2147483648, "max": 2147483647, "name": "int32" }] }, { "name": "userSessionId", "dataType": "Guid", "validators": [{ "name": "guid" }] }], "navigationProperties": [{ "name": "orders", "entityTypeName": "Order:#Northwind.Models", "isScalar": false, "associationName": "Order_Customer", "invForeignKeyNames": ["customerID"] }] }], "resourceEntityTypeMap": { "Customers": "Customer:#Northwind.Models" } };

        var customers = [
            {
                $id: "1",
                $type: "Northwind.Models.Customer, Northwind.Models",
                CustomerID: "785efa04-cbf2-4dd7-a7de-083ee17b6ad2",
                CompanyName: "Alfreds Futterkiste",
                ContactName: "Maria K. Anders",
                ContactTitle: "Sales Representative",
                Address: "Obere Str. 57",
                City: "Berlin",
                Region: null,
                PostalCode: "12209",
                Country: "Germany",
                Phone: "030-0074321",
                Fax: "030-0076545",
                RowVersion: null,
                Orders: null
            },
            {
                $id: "2",
                $type: "Northwind.Models.Customer, Northwind.Models",
                CustomerID: "256d4372-baa7-4937-9d87-d9a4e06146f8",
                CompanyName: "Ana Trujillo Emparedados y helados",
                ContactName: "Ana Trujillo",
                ContactTitle: "Owner",
                Address: "Avda. de la Constitución 2222",
                City: "México D.F.",
                Region: null,
                PostalCode: "05021",
                Country: "Mexico",
                Phone: "(5) 555-4729",
                Fax: "(5) 555-3745",
                RowVersion: null,
                Orders: null
            },
            {
                $id: "3",
                $type: "Northwind.Models.Customer, Northwind.Models",
                CustomerID: "b61cf396-206f-41a6-9766-168b5cbb8edd",
                CompanyName: "Antonio Moreno Taquería",
                ContactName: "Antonio Moreno",
                ContactTitle: "Owner",
                Address: "Mataderos 2312",
                City: "México D.F.",
                Region: null,
                PostalCode: "05023",
                Country: "Mexico",
                Phone: "(5) 555-3932",
                Fax: null,
                RowVersion: null,
                Orders: null
            },
        ];


    });
}