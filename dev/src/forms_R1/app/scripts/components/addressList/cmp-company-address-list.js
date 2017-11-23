/**
 * Created by Abdessamad on 7/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('addressList', ['addressRecord','hpfbConstants','errorSummaryModule'])
})();
//test
(function () {
    'use strict';

    angular
        .module('addressList')
        .component('cmpCompanyAddressList', {
            templateUrl: 'app/scripts/components/addressList/tpl-company-address-list.html',
            bindings: {
                addresses: '<',
                onUpdate: '&',
                getNewAddress: '&',
                isAmend: '<',
                companyService: '<',
                showErrorSummary:'<',
                errorSummaryUpdate:'<',
                updateErrorSummary:'&' //update the parent error summary
            },
            controller: addressListCtrl,
            controllerAs: 'addressListCtrl'
        });

    addressListCtrl.$inject = ['$filter'];

    function addressListCtrl($filter) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailsValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.allRolesSelected = "";
        vm.resetCollapsed = false;
        vm.updateSummary=0; //sends signal to update error summary object
        vm.showSummary=false;
        vm.addressList = [];
        vm.columnDef = [
            {
                label: "COMPANY",
                binding: "companyName",
                width: "30"
            },
            {
                label: "CITY",
                binding: "city",
                width: "25"
            },
            {
                label: "COUNTRY",
                binding: "countryDisplay",
                width: "25"
            },
            {
                label: "ROLES",
                binding: "roleConcat",
                width: "20"
            }
        ];



        vm.$onInit = function () {
            //local var from binding
            vm.addressList = vm.addresses;
            vm.allRolesSelected = vm.companyService.isAllRolesSelected(vm.addressList);
            updateRolesConcat();
        };

        vm.$onChanges = function (changes) {
            if (changes.addresses && changes.addresses.currentValue) {
                vm.addressList = changes.addresses.currentValue;
                vm.allRolesSelected = vm.companyService.isAllRolesSelected(vm.addressList);
                updateRolesConcat();
                vm.isDetailsValid=true;
                vm.updateErrorSummaryState();
            }

            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
            }
            if(changes.errorSummaryUpdate){

                vm.updateErrorSummaryState();
            }

        };

        function updateRolesConcat() {
            if (!vm.addressList) return;
            for (var i = 0; i < vm.addressList.length; i++) {
                vm.addressList[i].roleConcat = vm.companyService.getRolesConcat(vm.addressList[i]);
            }
        }

        vm.deleteAddress = function (aID) {
            var idx = vm.addressList.indexOf(
                $filter('filter')(vm.addressList, {addressID: aID}, true)[0]);
            vm.addressList.splice(idx, 1);
            //vm.onUpdate({newList: vm.addressList});
            vm.selectRecord = 0;
            vm.isDetailsValid = true; //case that incomplete record is deleted
            vm.allRolesSelected = vm.companyService.isAllRolesSelected(vm.addressList);
            vm.resetCollapsed = !vm.resetCollapsed;
            vm.updateErrorSummaryState();
        };

        vm.addAddress = function () {
            var defaultAddress = vm.getNewAddress();
            vm.addressList.push(defaultAddress);
            vm.isDetailsValid = true; //set to true to expand?
            vm.selectRecord = (vm.addressList.length - 1);
            vm.isDetailsValid = false;
        };

        vm.disableAddAddress = function () {
            return (!(vm.addressList.length < vm.companyService.getNumberOfAddressRoles() && vm.isDetailsValid));

        };

        vm.setValid = function (detailValid) {
            vm.isDetailsValid = detailValid;
        };
        vm.onUpdateAddressRecord = function (address) {
            var idx = vm.addressList.indexOf(
                $filter('filter')(vm.addressList, {addressID: address.addressID}, true)[0]
            );
            vm.addressList[idx] = angular.copy(address);
            vm.allRolesSelected = vm.companyService.isAllRolesSelected(vm.addressList);
            vm.isDetailsValid = true;
            vm.resetCollapsed = !vm.resetCollapsed;
        };

        vm.isREPRoleSelected = function (roleToCheck, recordID) {
            return vm.companyService.isREPRoleSelected(roleToCheck, recordID, vm.addressList);
        };
        /**
         * @ngdoc method determines the state of the list errors
         *
         * @returns {boolean}
         */
        vm.showError = function () {

            // Could show on not pristine&&!vm.addressListForm.$pristine
            return(!vm.companyService.isAllRolesSelected(vm.addressList));
        };

        vm.updateErrorSummaryState=function(){
            vm.updateSummary= vm.updateSummary+1;
        };
    }
})();