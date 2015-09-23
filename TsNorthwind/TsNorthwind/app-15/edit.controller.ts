namespace app15 {
    class EditController {

        static $inject = ['Dataservice', 'EditService', '$routeParams', '$location'];
        constructor(dataService: Dataservice, private editService: EditService, private $routeParams, private $location: ng.ILocationService) {
            var id = $routeParams.id;
            var custs = mockCustomers.filter((cust) => cust.id == id);
            if (custs.length) {
                editService.setCustomer(custs[0]);
            }
        }

        get customer() {
            return this.editService.clone;
        }

        save() {
            this.editService.save();
            this.$location.path('/cust');
        }

        cancel() {
            this.editService.cancel();
            this.$location.path('/cust');
        }
    }

    angular.module('app').controller('EditController', EditController);

}