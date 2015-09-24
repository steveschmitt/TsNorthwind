namespace app19 {
    
    export class BreezeCustomer implements breeze.Entity {
        entityAspect: breeze.EntityAspect;
        entityType: breeze.EntityType;

        companyName: string;
        contactName: string;
        contactTitle: string;
        customerID: string;
        address: string;
        city: string;
        country: string;
        postalCode: string;
        phone: string;
        fax: string;

        get fullName() { return `${this.contactName}, ${this.contactTitle}` }
    }
}