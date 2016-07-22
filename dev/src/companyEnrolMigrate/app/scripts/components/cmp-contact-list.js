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
                onUpdate: '&'
            }
        });

    contactListCtrl.$inject = ['$filter']

    function contactListCtrl($filter){
        var vm = this;

        vm.contactList = [];

        vm.$onInit = function () {


            vm.focused = false;

            vm.tableRowExpanded = false;
            vm.tableRowIndexCurrExpanded = "";
            vm.tableRowIndexPrevExpanded = "";
            vm.dayDataCollapse = [true, true, true, true, true, true];

            vm.transactionShow = 0;

            vm.newAdrFormShow = false;
            vm.contactList = vm.contacts;

           // console.log("cmpContactList $onInit: contactList " + JSON.stringify(vm.contactList));

        }

        vm.deleteContact = function(cID){

            var idx = vm.contactList.indexOf(
                $filter('contactFilter')(vm.contactList,{contactId: cID},true)[0]
            );
            vm.contactList.splice(idx,1);
            vm.onUpdate({newList:vm.contactList});
        }



        vm.addContact = function (contact) {
            vm.contactList.push(contact);
            vm.onUpdate({newList:vm.contactList});
        }

        vm.onUpdateContactRecord = function(contact){
                var idx = vm.contactList.indexOf(
                    $filter('contactFilter')(vm.contactList,{contactId: contact.contactId},true)[0]
                );

                vm.contactList[idx] = contact;
                vm.onUpdate({newList:vm.contactList});

        }

       /* var url = "data/company-enrol.txt";
        $http.get(url)
            .success(function (data, status, headers, config) {

                vm.contactList = data.COMPANY_ENROL.contact_record;

                // console.log("json success: " + JSON.stringify(data));
            })
            .error(function (data, status, headers, config) {
                vm.statusval = status;
                console.log("json error: " + status);
            });*/

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
