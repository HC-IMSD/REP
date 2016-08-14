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
                isAmend:'&',
                companyService:'<'
            },
            controller: addressListCtrl,
            controllerAs: 'addressListCtrl'
        });

    addressListCtrl.$inject = ['$filter','CompanyService'];

    function addressListCtrl($filter, CompanyService) {

        var vm = this;
        vm.selectRecord=0; //the record to select
        vm.isDetailsValid=true; //used to track if details valid. If they are  not do not allow expander collapse
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

       /* vm.setValid=function(value){
            vm.isDetailValid=value; //this is a shared value

        }*/

        vm.deleteAddress = function (aID) {
            var idx = vm.addressList.indexOf(
                $filter('filter')(vm.addressList, {addressID: aID}, true)[0]);
            vm.addressList.splice(idx, 1);
            vm.onUpdate({newList:vm.addressList});
            vm.isDetailsValid = true; //case that incomplete record is deleted
            vm.allRolesSelected= vm.isAllRolesSelected();
            console.log("delete contact roles status "+vm.allRolesSelected)
        }

        vm.addAddress = function () {
            var defaultAddress=vm.getNewAddress()
            vm.addressList.push(defaultAddress);
            vm.isDetailsValid = true; //set to true to exapnd
            vm.selectRecord=(vm.addressList.length - 1);
            vm.isDetailsValid = false;
        }

        vm.updateValid=function(detailValid){
            vm.isDetailsValid = detailValid;
            console.log("Address list detail valid"+detailValid)
        }
        vm.onUpdateAddressRecord = function (address) {
            //vm.detailsValid = address.isDetailValid;
            var idx = vm.addressList.indexOf(
                $filter('filter')(vm.addressList, {addressID: address.addressID}, true)[0]
            );
            vm.addressList[idx] = angular.copy(address);
            vm.allRolesSelected= vm.isAllRolesSelected();

            vm.isDetailsValid = true;
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
        };
        /**
         * @ngdoc method determines the state of the list errors
         *
         * @returns {boolean}
         */
        vm.showError = function () {
            if ((vm.addressListForm.$invalid && !vm.addressListForm.$pristine)) {
                return true
            }
            return false
        };

        /**
         * @ngdoc method determines if all the roles have been selected for the address
         * @returns {boolean}
         */
        vm.isAllRolesSelected=function(){
            var rolesSelected = 0;
            //var repPrimarySelected=false;
            //var repSecondarySelected=false;
            if (!vm.addressList) return false;
            var companyRole= vm.companyService.createAddressRole();
            var numKeys=vm.companyService.getNumberKeys(companyRole);

            for(var i=0;i<vm.addressList.length;i++) {
                var obj = vm.addressList[i].addressRole;
                for (var key in obj) {
                    var attrName = key;
                    var attrValue = obj[key];
                    if (attrValue && companyRole.hasOwnProperty(attrName)) {
                        rolesSelected++;
                    }
                }
            }
            if(rolesSelected===numKeys){
                return true;
            }
            return false;
        }



    }
})();