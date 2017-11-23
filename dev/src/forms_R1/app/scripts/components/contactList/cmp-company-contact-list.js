/**
 * Created by dkilty on 8/6/2016.
 */

(function () {
    'use strict';

    angular
        .module('contactList2', ['contactRecord','expandingTable','errorSummaryModule'])
})();

(function () {
    'use strict';

    angular
        .module('contactList2')
        .component('cmpCompanyContactList', {
            templateUrl: 'app/scripts/components/contactList/tpl-contact-list.html',
            controller: contactListCtrl,
            controllerAs: 'contactListCtrl',
            bindings: {
                contacts: '<',
                onUpdate: '&',
                getNewContact: '&',
                isAmend: '<',
                companyService:'<',
                showErrorSummary:'<',
                errorSummaryUpdate:'<',
                updateErrorSummary:'&' //update the parent error summary
            }
        });
    contactListCtrl.$inject = ['$filter'];
    function contactListCtrl($filter) {
        var vm = this;
        vm.selectRecord = -1; //the record to select
        vm.isDetailValid=true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.allRolesSelected=false;
        vm.contactList = [];
        vm.formAmend = false;
        vm.resetCollapsed = false;//used to signal expanding table collapse
        vm.updateSummary=0; //sends signal to update error summary object
      //  vm.showSummary=false; //flag to control error summary visibility
        vm.columnDef = [
            {
                label: "FIRSTNAME",
                binding:"givenName",
                width:"25"
            },
            {
                label: "LASTNAME",
                binding:"surname",
                width:"30"
            },
            {
                label: "JOBTITLE",
                binding:"title",
                width:"25"
            },
            {
                label: "ROLES",
                binding:"roleConcat",
                width:"20"
            }
        ];


        vm.alias = {
       /*     "roleMissing": {
                "type": "fieldset",
                "parent": "fs_roleMissing"
            },
            "contactRolesValid": {
                "type": "element",
                "target": "addContact"
            }*/
        };
        vm.exclusions = {
           // "contactRec.contactRecForm": "true"
        };


        /**
         * using to get contact list
         */
        vm.$onInit = function () {
            vm.focused = false;
            //vm.contactList = vm.contacts; //HERE Is how it is bound
            //updateRolesConcat();
            //vm.allRolesSelected = vm.isAllContactRolesSelected();
        };
        vm.$onChanges = function (changes) {
            if (changes.contacts) {
                vm.contactList = changes.contacts.currentValue;
                updateRolesConcat();
                vm.allRolesSelected = vm.companyService.isAllContactRolesSelected(vm.contactList);
                vm.isDetailValid=true;
                vm.updateErrorSummaryState()
            }
            if (changes.isAmend) {
                vm.formAmend = changes.isAmend.currentValue;
            }
            if(changes.errorSummaryUpdate){
                vm.updateErrorSummaryState();
            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
                //vm.updateErrorSummaryState()
            }
        };

        vm.updateErrorSummaryState=function(){
            vm.updateSummary= vm.updateSummary+1;
        };


        function updateRolesConcat() {
            if (!vm.contactList) return;
            for (var i = 0; i < vm.contactList.length; i++) {
                vm.contactList[i].roleConcat = vm.companyService.getRolesConcat(vm.contactList[i]);
            }
        }


        vm.setValid=function(value){

            vm.isDetailValid = value; //this is a shared value
        };

        vm.showError = function () {
            // !vm.contactListForm.$pristine
            return(!vm.companyService.isAllContactRolesSelected(vm.contactList));
           /* if ((!vm.isAllContactRolesSelected() )) {
                return true
            }
            return false*/
        };

        vm.onUpdateContactRecord = function (record) {

            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {contactId: record.contactId}, true)[0]
            ); //TODO fix filter
            vm.contactList[idx] = angular.copy(record);
            vm.allRolesSelected= vm.companyService.isAllContactRolesSelected(vm.contactList);
            vm.resetCollapsed = !vm.resetCollapsed;

        };

        vm.deleteContact = function (cID) {
            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {contactId: cID}, true)[0]
            );
            vm.contactList.splice(idx, 1);
            vm.onUpdate({newList: vm.contactList});
            vm.isDetailValid = true; //case that incomplete record
            vm.allRolesSelected= vm.companyService.isAllContactRolesSelected(vm.contactList);
            vm.resetCollapsed = !vm.resetCollapsed;
            vm.updateErrorSummaryState();

        };

        /**
         * Adds a contact to the contact list
         */
        vm.addContact = function () {
            var defaultContact = vm.getNewContact();
            vm.contactList.push(defaultContact);
            //select table row first then make invalid
            vm.selectRecord=(vm.contactList.length - 1);
            vm.isDetailValid= false;
           // vm.showSummary=false;
        };

        /**
         * @ngdoc method - checks if all the roles have been selected
         * @param roleToCheck (optional) returns if a role has been selected.
         *                     If no value check if all roles have been selected
         * @param recordID
         * @returns {boolean}
         */
        vm.isREPRoleSelected = function (roleToCheck, recordID) {
            return vm.companyService.isContactREPRoleSelected(roleToCheck, recordID, vm.contactList);
        };


        vm.disableAddContact = function () {
            if(!vm.contactList) return false; //should never happen
            return (!(vm.contactList.length < vm.companyService.getNumberOfContractRoles() && vm.isDetailValid))

        };
    }

})();
