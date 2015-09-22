var app03;
(function (app03) {
    var Customer = (function () {
        function Customer(id, name) {
            if (id === void 0) { id = 0; }
            if (name === void 0) { name = '<new customer>'; }
            this.id = id;
            this.name = name;
        }
        return Customer;
    })();
    app03.Customer = Customer;
})(app03 || (app03 = {}));
