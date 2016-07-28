/**
 * Created by Abdessamad on 7/5/2016.
 */
//TODO look at salutation hookup
(function () {
    'use strict';

    angular
        .module('contactModule', [
            'addressRole'
        ])
})();

(function () {
    'use strict';

    angular
        .module('contactModule').
        component('cmpContactDetails',{
            templateUrl: 'app/views/tpl-contact-details.html',
            controller: contactCtrl,

            bindings: {
                formName: '<',
                contactRecord: '<',
                onUpdate: '&',
                onDelete: '&'
            }
    });

    contactCtrl.$inject = ['$scope']
    function contactCtrl($scope) {
     var vm = this;
     vm.$onInit = function(){

         vm.contactModel = {
             contactId: "",
             amendRecord: false,
             addressRole: {
                 manufacturer: false,
                 mailing: false,
                 billing: false,
                 importer: false
             },
             contactRole: "",
             salutation: "",
             givenName: "",
             surname: "",
             initials: "",
             title: "",
             phone: "",
             PhoneExt: "",
             fax: ""
         };

         if (vm.contactRecord) {
             angular.extend(vm.contactModel, vm.contactRecord);
         }
     }
        //TODO rename
     vm.delete = function () {
         vm.onDelete({contactId: vm.contactModel.contactId});
     }
        //TODO discard?

 }

    vm.onContactRoleUpdate = function (newRole) {
        vm.contactModel.addressRole = newRole
        vm.updateAddressModel();
    }

    vm.updateContactModel = function () {
        //always update the model
        //  console.log('onAddressRoleUpdate: ' + vm.addressModel.companyName);
        //  if($scope.addressForm.$valid)

        //console.log($scope.addressForm.$valid)
        //update if the address details if valid
        vm.contactModel.isDetailValid = $scope.contactForm.$valid;
        vm.onUpdate({contact: vm.contactModel});
    }



})();