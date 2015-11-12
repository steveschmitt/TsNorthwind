namespace app18 {

    export class EditService {
        private orig: Customer;
        clone: Customer;
        setCustomer(cust: Customer) {
            if (!cust) return;
            this.orig = cust;
            this.clone = new Customer(cust.id, cust.firstName, cust.lastName);
        }

        save() {
            this.orig.id = this.clone.id;
            this.orig.firstName = this.clone.firstName;
            this.orig.lastName = this.clone.lastName;
        }

        cancel() {
            this.clone.id = this.orig.id;
            this.clone.firstName = this.orig.firstName;
            this.clone.lastName = this.orig.lastName;
        }
    }

    angular.module('app').service('EditService', EditService);
}
 