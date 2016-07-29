/**
 * Created by Abdessamad on 7/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('contactList', ['contactModule'])
})();

(function () {
    'use strict';

    angular
        .module('contactList')
        .component('cmpContactList',{
            templateUrl: 'app/views/tpl-contact-list.html',
            controller: contactListCtrl,
            bindings: {
                formName: '<',
                contacts: '<',
                onUpdate: '&',
                getNewContact: '&'
            }
        });

    contactListCtrl.$inject = ['$filter']

    function contactListCtrl($filter){
        var vm = this;
        vm.detailsValid = true; //TODO new
        vm.contactList = [];
        vm.$onInit = function () {
            vm.detailsValid = true;
            vm.focused = false;
            vm.tableRowExpanded = false;
            vm.tableRowIndexCurrExpanded = "";
            vm.tableRowIndexPrevExpanded = "";
            vm.dayDataCollapse = [true, true, true, true, true, true];
            vm.transactionShow = 0;
            vm.newAdrFormShow = false;
            vm.contactList = vm.contacts; //HERE Is how it is bound

        }

        vm.deleteContact = function(cID){

            var idx = vm.contactList.indexOf(
                $filter('filter')(vm.contactList, {contactId: cID}, true)[0]
            );
            vm.contactList.splice(idx,1);
            vm.onUpdate({newList:vm.contactList});
        }


        vm.addContact = function () {
            var defaultContact = vm.getNewContact() //TODO new
            vm.contactList.push(defaultContact);
            vm.selectTableRow((vm.contactList.length - 1), ""); //TODO new
            vm.detailsValid = false; //TODO new
            vm.onUpdate({newList: vm.contactList});//TODO new
        }

        vm.onUpdateContactRecord = function (contact) {
            console.info("addressList::onUpdateContactRecord:updating a contact record")
            vm.detailsValid = contact.isDetailValid;
                var idx = vm.contactList.indexOf(
                    $filter('filter')(vm.contactList, {contactId: contact.contactId}, true)[0]
                );
                vm.contactList[idx] = contact;
                vm.onUpdate({newList:vm.contactList});
        }

        vm.dayDataCollapseFn = function () {
            for (var i = 0; vm.contactList.length - 1; i += 1) {
                vm.dayDataCollapse.append('true');
            }
        };

        vm.selectTableRow = function (index, contactId) {
            if (vm.dayDataCollapse === 'undefined') {
                vm.dayDataCollapse = vm.dayDataCollapseFn();
            } else {

                if (vm.tableRowExpanded === false && vm.tableRowIndexCurrExpanded === "") {
                    vm.tableRowIndexPrevExpanded = "";
                    vm.tableRowExpanded = true;
                    vm.tableRowIndexCurrExpanded = index;
                    // vm.storeIdExpanded = storeId;
                    vm.dayDataCollapse[index] = false;
                } else if (vm.tableRowExpanded === true) {
                    if (vm.tableRowIndexCurrExpanded === index) {
                        vm.tableRowExpanded = false;
                        vm.tableRowIndexCurrExpanded = "";
                        vm.dayDataCollapse[index] = true;
                    } else {
                        vm.tableRowIndexPrevExpanded = vm.tableRowIndexCurrExpanded;
                        vm.tableRowIndexCurrExpanded = index;
                        //  vm.storeIdExpanded = storeId;
                        vm.dayDataCollapse[vm.tableRowIndexPrevExpanded] = true;
                        vm.dayDataCollapse[vm.tableRowIndexCurrExpanded] = false;
                    }
                }
            }
        }
    }

})();
