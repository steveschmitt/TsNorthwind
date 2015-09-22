var app4;
(function (app4) {
    var Customer = (function () {
        function Customer(id, name) {
            if (id === void 0) { id = 0; }
            if (name === void 0) { name = '<new customer>'; }
            this.id = id;
            this.name = name;
        }
        return Customer;
    })();
    app4.Customer = Customer;
})(app4 || (app4 = {}));
