/**
 * Created by Abdessamad on 7/5/2016.
 */
//TODO look at salutation hookup
(function () {
    'use strict';

    angular
        .module('contactModule', [
            'addressRole',
            'dataLists'
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


    contactCtrl.$inject = ['$scope', 'getContactLists', 'getRoleLists']
    function contactCtrl($scope, getContactLists, getRoleLists) {
        var vm = this;
        vm.salutationList = getContactLists.getSalutationList();
        vm.contactRoleList = getRoleLists.getContactRoles();
        vm.langCorrespondance = getContactLists.getLanguages();
        vm.$onInit = function () {
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


        vm.onContactRoleUpdate = function (newRole) {
            vm.contactModel.addressRole = newRole
            vm.updateAddressModel();
        }

        /* vm.updateContactModel = function () {
         //always update the model
         //  console.log('onAddressRoleUpdate: ' + vm.addressModel.companyName);
         //  if($scope.addressForm.$valid)

         //console.log($scope.addressForm.$valid)
         //update if the address details if valid
         console.log("update Contact Model")
         vm.contactModel.isDetailValid = $scope.contactForm.$valid;
         vm.onUpdate({contact: vm.contactModel});
         }*/
        vm.showError = function (control) {
            // contactForm.contactEmail.$invalid &&!contactForm.contactEmail.$pristine
            //  console.log("state"+control.$invalid +control.$pristine);
            if (control.$invalid && !control.$pristine) {
                return true;
            }
        }


    }

})();