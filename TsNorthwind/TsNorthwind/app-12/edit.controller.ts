namespace app12 {
    class EditController {
        customer: Customer;

        static $inject = ['EditService'];
        constructor(editService: EditService) {
            this.customer = editService.customer;
        }
    }

    angular.module('app').controller('EditController', EditController);

}