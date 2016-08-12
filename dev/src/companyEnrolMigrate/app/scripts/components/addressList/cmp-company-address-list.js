/**
 * Created by Abdessamad on 7/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('addressList2', ['addressRecord'])
})();

(function () {
    'use strict';

    angular
        .module('addressList2')
        .component('cmpCompanyAddressList', {
            templateUrl: 'app/scripts/components/addressList/tpl-company-address-list.html',
            bindings: {
                addresses: '<',
                onUpdate: '&',
                getNewAddress:'&',
                isAmend:'&'
            },
            controller: addressListCtrl,
            controllerAs: 'addressListCtrl'
        });

    addressListCtrl.$inject = ['$filter'];

    function addressListCtrl($filter) {

        var vm = this;
        vm.selectRecord=0; //the record to select
        vm.detailsValid = true;
        vm.addressList = [];
        vm.columnDef = [
            {
                label: "COMPANY",
                binding:"companyName"
            },
            {
                label: "CITY",
                binding:"city"
            },
            {
                label: "COUNTRY",
                binding:"country"
            },
            {
                label: "ROLE",
                binding:"roleConcat"
            }
        ]

        vm.$onInit = function () {
            //local var from binding
            vm.addressList = vm.addresses;
        }

        vm.$onChanges=function(changes){
            if(changes.addresses && changes.addresses.currentValue) {
                vm.addressList = changes.addresses.currentValue;
            }

        }


        vm.deleteAddress = function (aID) {
            var idx = vm.addressList.indexOf(
                $filter('filter')(vm.addressList, {addressID: aID}, true)[0]);
            vm.addressList.splice(idx, 1);
            vm.onUpdate({newList:vm.addressList});
            vm.detailsValid = true; //case that incomplete record is deleted
           /* if (vm.addressList.length == 0) {
                vm.resetTableRow();
            } else {
                //deleted so this setting should be false
                vm.tableRowExpanded = false;
                vm.tableRowIndexCurrExpanded = "";
            }*/
        }

        vm.addAddress = function () {
            var defaultAddress=vm.getNewAddress()
            vm.addressList.push(defaultAddress);
            vm.detailsValid = true; //set to true to exapnd
            vm.selectRecord=(vm.addressList.length - 1);
          vm.detailsValid = false;
        }

        vm.updateValid=function(detailValid){
            vm.detailsValid = detailValid;
        }
        vm.onUpdateAddressRecord = function (address) {
            //vm.detailsValid = address.isDetailValid;
            var idx = vm.addressList.indexOf(
                $filter('filter')(vm.addressList, {addressID: address.addressID}, true)[0]
            );
            vm.addressList[idx] = angular.copy(address);
        }
        vm.isREPRoleSelected = function (roleToCheck,recordID) {
            var rolesSelected = 0;
            //if no role to check, see if all selected
            if (!vm.addressList) return false;
            for (var i = 0; i < vm.addressList.length; i++) {
                if (vm.addressList[i].addressRole[roleToCheck] == true) {
                    //don't count it if it is the existing record
                    if(vm.addressList[i].contactId!==recordID) {
                        rolesSelected = rolesSelected + 1;
                    }
                    if(rolesSelected>0) {
                        return true;
                    }
                }
            }
            return false;
        }

    }
})();