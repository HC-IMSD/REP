/**
 * Created by Abdessamad on 7/5/2016.
 */

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
                /*formName: '<',*/
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
                isDetailValid: false,
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
            console.info("updating Contact Role...")
            vm.contactModel.addressRole = newRole
            vm.updateContactModel();
        }

        vm.updateContactModel = function () {
         console.log("update Contact Model")
         vm.contactModel.isDetailValid = $scope.contactForm.$valid;
         vm.onUpdate({contact: vm.contactModel});
        }
        vm.showError = function (control) {
            if (control.$invalid && !control.$pristine) {
                return true;
            }
        }


    }

})();