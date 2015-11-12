var app;
(function (app) {
    var LoggerClass = (function () {
        function LoggerClass($log, toastr) {
            this.$log = $log;
            this.toastr = toastr;
            this.showToasts = true;
        }
        LoggerClass.prototype.error = function (message, data, title) {
            this.toastr.error(message, title);
            this.$log.error('Error: ' + message, data);
        };
        LoggerClass.prototype.info = function (message, data, title) {
            this.toastr.info(message, title);
            this.$log.info('Info: ' + message, data);
        };
        LoggerClass.prototype.success = function (message, data, title) {
            this.toastr.success(message, title);
            this.$log.info('Success: ' + message, data);
        };
        LoggerClass.prototype.warning = function (message, data, title) {
            this.toastr.warning(message, title);
            this.$log.warn('Warning: ' + message, data);
        };
        LoggerClass.prototype.log = function (message) {
            this.$log.log(message);
        };
        LoggerClass.$inject = ['$log', 'toastr'];
        return LoggerClass;
    })();
    angular.module('blocks.logger')
        .service('logger', LoggerClass);
})(app || (app = {}));
//# sourceMappingURL=logger.js.map