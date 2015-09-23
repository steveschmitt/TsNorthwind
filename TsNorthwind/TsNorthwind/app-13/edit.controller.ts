namespace app13 {
    class EditController {

        static $inject = ['EditService'];
        constructor(private editService: EditService) {
        }

        get customer() {
            return this.editService.clone;
        }

        save() {
            this.editService.save();
        }

        cancel() {
            this.editService.cancel();
        }
    }

    angular.module('app').controller('EditController', EditController);

}