namespace app18 {
    class EditController {

        customer: Customer
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
            var entity = <breeze.Entity><any>this.customer;
            entity.entityAspect.rejectChanges();
            entity.entityAspect.entityState.isAddedModifiedOrDeleted()
            this.$location.path('/cust');
        }
    }

    angular.module('app').controller('EditController', EditController);

}