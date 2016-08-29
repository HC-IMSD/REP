/**
 * Created by dkilty on 29/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('relatedActivityList', [])
})();

(function () {
    'use strict';

    angular
        .module('relatedActivityList')
        .component('cmpRelatedActivityList', {
            templateUrl: 'app/scripts/components/addressList/tpl-related-activity-list.html',
            bindings: {
                activities: '<',
                onUpdate: '&',
                getNewActivity:'&',
                isAmend:'&',
            },
            controller: addressListCtrl,
            controllerAs: 'addressListCtrl'
        });

    addressListCtrl.$inject = ['$filter'];

    function addressListCtrl($filter) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailsValid=true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.activityList = [];
        vm.columnDef = [
            {
                label: "ACTIVITY_TYPE",
                binding:"companyName",
                width:"30"
            },
            {
                label: "CITY",
                binding:"city",
                width:"25"
            },
            {
                label: "COUNTRY",
                binding:"country",
                width:"25"
            }

        ];
        vm.$onInit = function () {
            //local var from binding
            vm.activityList = vm.addresses;
        }

        vm.$onChanges=function(changes){
            if(changes.addresses && changes.addresses.currentValue) {
                vm.activityList = changes.addresses.currentValue;

            }

        }


        vm.deleteActivity = function (aID) {
            var idx = vm.activityList.indexOf(
                $filter('filter')(vm.activityList, {addressID: aID}, true)[0]);
            vm.activityList.splice(idx, 1);
            vm.onUpdate({newList:vm.activityList});
            vm.selectRecord = 0;
            vm.isDetailsValid = true; //case that incomplete record is deleted

        }

        vm.addActivity = function () {
            var defaultAddress=vm.getNewAddress()
            vm.activityList.push(defaultAddress);
            vm.isDetailsValid = true; //set to true to exapnd
            vm.selectRecord=(vm.activityList.length - 1);
            vm.isDetailsValid = false;
        }

        vm.setValid = function (detailValid) {
            vm.isDetailsValid = detailValid;
        }
        vm.onUpdateActivityRecord = function (address) {
            //vm.detailsValid = address.isDetailValid;
            var idx = vm.activityList.indexOf(
                $filter('filter')(vm.activityList, {addressID: address.addressID}, true)[0]
            );
            vm.activityList[idx] = angular.copy(address);
            vm.allRolesSelected= vm.isAllRolesSelected();

            vm.isDetailsValid = true;
        }

        /**
         * @ngdoc method determines the state of the list errors
         *
         * @returns {boolean}
         */
        vm.showError = function () {
            if ((vm.activityListForm.$invalid && !vm.activityListForm.$pristine)) {
                return true
            }
            return false
        };


    }
})();