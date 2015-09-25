namespace app20 {
    class EditController {

        customer: BreezeCustomer
        static $inject = ['BreezeDataservice', 'EditService', '$routeParams', '$location'];
        constructor(dataService: BreezeDataservice, private editService: EditService, private $routeParams, private $location: ng.ILocationService) {
            var id = $routeParams.id;
            this.customer = dataService.getCustomerById(id);
        }

        ok() { // now "ok", not "save", since we are accepting the change but not saving to server yet.
            //this.editService.save();
            this.$location.path('/cust');
        }

        revert() {
            // undo any changes
            this.customer.entityAspect.rejectChanges();
            this.$location.path('/cust');
        }

        getValidationErrors(property: string): string {
            if (!this.customer) return;
            var errors = this.customer.entityAspect.getValidationErrors(property);
            var messages = errors.map((e) => e.errorMessage);
            return messages.join("; ");
        }
    }

    angular.module('app').controller(Constants.EditController, EditController);

}