/**
 * Created by Abdessamad on 7/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('lifecycleList', [])
})();

(function () {
    'use strict';

    angular
        .module('lifecycleList')
        .component('cmpLifecycleList', {
            templateUrl: 'app/scripts/components/lifecycleList/tpl-lifecycle-list.html',
            bindings: {
                records: '<',
                onUpdate: '&',
                isAmend: '&',
                getNewTransaction: '&'
            },
            controller: lifecycleListCtrl,
            controllerAs: 'lifecycleListCtrl'
        });

    lifecycleListCtrl.$inject = ['$filter'];

    function lifecycleListCtrl($filter) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailsValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.lifecycleList = [];
        vm.columnDef = [
            {
                label: "SEQUENCE_NUM",
                binding: "sequence",
                width: "15"
            },
            {
                label: "REGULATORY_ACTIVITY",
                binding: "activityType",
                width: "25"
            },
            {
                label: "SEQUENCE_DESCRIPT",
                binding: "sequenceConcat",
                width: "60"
            }
        ]

        vm.$onInit = function () {
            //local var from binding
            vm.lifecycleList = vm.records;
            console.log("This is the records " + vm.records)
        }

        vm.$onChanges = function (changes) {
            /* if(changes.addresses && changes.addresses.currentValue) {
             vm.lifecycleList = changes.addresses.currentValue;
             }*/
            if (changes.records) {
                vm.lifecycleList = changes.records.currentValue;
            }

        }

        vm.deleteAddress = function (aID) {
            var idx = vm.lifecycleList.indexOf(
                $filter('filter')(vm.lifecycleList, {sequence: aID}, true)[0]);
            vm.lifecycleList.splice(idx, 1);
            vm.onUpdate({newList: vm.lifecycleList});
            vm.selectRecord = 0;
            vm.isDetailsValid = true; //case that incomplete record is deleted
        }

        vm.addTransaction = function () {
            var defaultTransaction = vm.getNewTransaction();
            vm.lifecycleList.push(defaultTransaction);
            vm.isDetailsValid = true; //set to true to exapnd

            vm.selectRecord = (vm.lifecycleList.length - 1);
            console.log("The select record is " + vm.selectRecord)
            vm.isDetailsValid = false;
        }

        vm.setValid = function (detailValid) {
            vm.isDetailsValid = detailValid;
        }
        vm.onUpdateAddressRecord = function (address) {
            //vm.detailsValid = address.isDetailValid;
            var idx = vm.lifecycleList.indexOf(
                $filter('filter')(vm.lifecycleList, {addressID: address.addressID}, true)[0]
            );
            vm.lifecycleList[idx] = angular.copy(address);
            vm.isDetailsValid = true;
        }
        /**
         * @ngdoc method determines the state of the list errors
         *
         * @returns {boolean}
         */
        vm.showError = function () {
            if ((vm.lifecycleListForm.$invalid && !vm.lifecycleListForm.$pristine)) {
                return true
            }
            return false
        };


    }
})();