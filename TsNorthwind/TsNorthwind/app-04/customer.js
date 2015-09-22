var app04;
(function (app04) {
    var Customer = (function () {
        function Customer(id, name) {
            if (id === void 0) { id = 0; }
            if (name === void 0) { name = '<new customer>'; }
            this.id = id;
            this.name = name;
        }
        return Customer;
    })();
    app04.Customer = Customer;
})(app04 || (app04 = {}));
