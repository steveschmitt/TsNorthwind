namespace app15 {

    function spaceout(input: string) {
        //console.log("spaceout " + input);
        if (!input) return input;
        var split = input.split("");
        return input.split("").join(" ");
    }

    angular.module("app").filter('spaceout', () => spaceout);

    function customerSort(custs: Customer[]) {
        //console.log("customerSort");
        if (!custs || !custs.length) return custs;
        return custs.sort((a: Customer, b: Customer) => {
            return a.fullName.localeCompare(b.fullName);
        });
    }

    angular.module("app").filter('customerSort', () => customerSort);

} 