var appCommon;
(function (appCommon) {
    appCommon.mockCustomers = [
        new appCommon.Customer(1, 'Johnny', 'Rocket'),
        new appCommon.Customer(2, 'Sally', 'Rocket'),
        new appCommon.Customer(3, 'Jimmy', 'Rocket'),
        new appCommon.Customer(4, 'Johnny', 'Depp'),
        new appCommon.Customer(5, 'Johnny', 'Wayne'),
        new appCommon.Customer(6, 'Johnny', 'Cash'),
    ];
})(appCommon || (appCommon = {}));
