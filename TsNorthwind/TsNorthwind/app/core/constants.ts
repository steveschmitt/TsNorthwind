declare var toastr: any;
declare var moment: any;

angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('moment', moment);