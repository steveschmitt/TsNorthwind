var app2;
(function (app2) {
    var Customer = (function () {
        function Customer(id, name) {
            if (id === void 0) { id = 0; }
            if (name === void 0) { name = '<new customer>'; }
            this.id = id;
            this.name = name;
        }
        return Customer;
    })();
    app2.Customer = Customer;
})(app2 || (app2 = {}));
//# sourceMappingURL=customer.js.map