var logger = (function () {
    function logger($log, toastr) {
        this.$log = $log;
        this.toastr = toastr;
        this.showToasts = true;
    }
    logger.prototype.error = function (message, data, title) {
        this.toastr.error(message, title);
        this.$log.error('Error: ' + message, data);
    };
    logger.prototype.info = function (message, data, title) {
        this.toastr.info(message, title);
        this.$log.info('Info: ' + message, data);
    };
    logger.prototype.success = function (message, data, title) {
        this.toastr.success(message, title);
        this.$log.info('Success: ' + message, data);
    };
    logger.prototype.warning = function (message, data, title) {
        this.toastr.warning(message, title);
        this.$log.warn('Warning: ' + message, data);
    };
    logger.prototype.log = function (message) {
        this.$log.log(message);
    };
    logger.$inject = ['$log', 'toastr'];
    return logger;
})();
angular.module('blocks.logger')
    .service('logger', logger);
//# sourceMappingURL=logger.js.map