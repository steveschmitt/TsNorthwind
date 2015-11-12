namespace app {

    export interface Logger {
        error(message: string, data?:any, title?:string) : void;
        info(message: string, data?: any, title?: string): void;
        success(message: string, data?: any, title?: string): void;
        warning(message: string, data?: any, title?: string): void;
        log(message: string): void;
    }

    class LoggerClass implements Logger {
        static $inject = ['$log', 'toastr'];

        constructor(private $log, private toastr) { }

        showToasts = true;

        error(message: string, data?: any, title?: string) {
            this.toastr.error(message, title);
            this.$log.error('Error: ' + message, data);
        }

        info(message: string, data?: any, title?: string) {
            this.toastr.info(message, title);
            this.$log.info('Info: ' + message, data);
        }

        success(message: string, data?: any, title?: string) {
            this.toastr.success(message, title);
            this.$log.info('Success: ' + message, data);
        }

        warning(message: string, data?: any, title?: string) {
            this.toastr.warning(message, title);
            this.$log.warn('Warning: ' + message, data);
        }

        log(message: string) {
            this.$log.log(message);
        }
    }

    angular.module('blocks.logger')
        .service('logger', LoggerClass);
}