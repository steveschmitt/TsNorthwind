var app02;
(function (app02) {
    var Customer = (function () {
        function Customer(id, name) {
            if (id === void 0) { id = 0; }
            if (name === void 0) { name = '<new customer>'; }
            this.id = id;
            this.name = name;
        }
        return Customer;
    })();
    app02.Customer = Customer;
})(app02 || (app02 = {}));
