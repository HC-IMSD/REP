/**
 * Created by dkilty on 8/6/2016.
 */


(function () {
    'use strict';

    angular
        .module('contactModule26', ['contactModule25', 'expandingTable'])
})();


(function () {
    'use strict';

    angular
        .module('contactModule26')
        .component('cmpRepContactList', {
            templateUrl: 'app/scripts/components/repContactList/tpl-rep-contact-list.html',
            controller: contactListCtrl,
            controllerAs: 'contactListCtrl',
            bindings: {
                contacts: '<',
                onUpdate: '&',
                getNewContact: '&',
                isAmend: '&'
                /*companyService:'<'*/
            }
        });
    contactListCtrl.$inject = ['$filter']
    function contactListCtrl($filter) {
        var vm = this;
        vm.selectRecord = -1; //the record to select
        vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.allRolesSelected = false;
        vm.contactList = [];
        vm.columnDef = [
            {
                label: "FIRST_NAME",
                binding: "givenName",
                width: "25"
            },
            {
                label: "LAST_NAME",
                binding: "surname",
                width: "30"
            },
            {
                label: "JOB_TITLE",
                binding: "title",
                width: "25"
            },
            {
                label: "ROLES",
                binding: "roleConcat",
                width: "20"
            }
        ]
        /**
         * using to get contact list
         */
        vm.$onInit = function () {
            vm.focused = false;
            vm.contactList = vm.contacts; //HERE Is how it is bound
        }
        vm.$onChanges = function (changes) {
            if (changes.contacts && changes.contacts.currentValue) {
                vm.contactList = changes.contacts.currentValue;
            }

        }


        vm.setValid = function (value) {

            vm.isDetailValid = value; //this is a shared value
        }

        vm.showError = function () {

            if ((vm.contactListForm.$invalid && !vm.contactListForm.$pristine)) {
                return true
            }
            return false
        }

        vm.onUpdateContactRecord = function (record) {

            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {contactId: record.contactId}, true)[0]
            ); //TODO fix filter
            vm.contactList[idx] = angular.copy(record);

        }

        vm.deleteContact = function (cID) {
            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {contactId: cID}, true)[0]
            );
            vm.contactList.splice(idx, 1);
            vm.onUpdate({newList: vm.contactList});
            vm.isDetailValid = true; //case that incomplete record
            vm.selectRecord = -1

        }

        /**
         * Adds a contact to the contact list
         */
        vm.addContact = function () {
            var defaultContact = vm.getNewContact()
            vm.contactList.push(defaultContact);
            //select table row first then make invalid
            vm.isDetailValid = true;
            vm.selectRecord = (vm.contactList.length - 1);
            vm.isDetailValid = false;
        }


    }

})();
