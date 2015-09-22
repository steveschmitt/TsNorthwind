var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app09;
(function (app09) {
    var InMemDataservice = (function () {
        function InMemDataservice(config, _$q) {
            this._$q = _$q;
            if (config.useBreeze) {
                throw new Error('Config.useBreeze is true but this is an in-memory data source');
            }
        }
        InMemDataservice.prototype.getAllCustomers = function () {
            return this._$q.when(app09.mockCustomers);
        };
        InMemDataservice.$inject = ['config', '$q'];
        return InMemDataservice;
    })();
    // Simulates network latency by waiting before returning customers
    var DELAY = 1000;
    var SlowInMemDataservice = (function (_super) {
        __extends(SlowInMemDataservice, _super);
        function SlowInMemDataservice(config, _$q) {
            _super.call(this, config, _$q);
        }
        SlowInMemDataservice.prototype.getAllCustomers = function () {
            var deferred = this._$q.defer();
            setTimeout(function () { return deferred.resolve(app09.mockCustomers); }, DELAY);
            return deferred.promise;
        };
        return SlowInMemDataservice;
    })(InMemDataservice);
    angular.module('app')
        .service('Dataservice', SlowInMemDataservice);
})(app09 || (app09 = {}));
