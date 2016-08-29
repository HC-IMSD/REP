/**
 * Created by dkilty on 29/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('relatedActivityList', ['activityRecord','expandingTable'])
})();

(function () {
    'use strict';

    angular
        .module('relatedActivityList')
        .component('cmpRelatedActivityList', {
            templateUrl: 'app/scripts/components/relatedActivityList/tpl-related-activity-list.html',
            bindings: {
                activities: '<',
                onUpdate: '&',
                getNewActivity:'&',
                isAmend:'&',
            },
            controller: activityListCtrl,
            controllerAs: 'activityListCtrl'
        });

    activityListCtrl.$inject = ['$filter'];

    function activityListCtrl($filter) {

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
           vm.activityList = vm.activities;
        };

        vm.$onChanges=function(changes){
            if(changes.activities) {
                    console.log("Onchanges "+changes.activities.currentValue)
                if(changes.activities.currentValue) {
                    vm.activityList = changes.activities.currentValue;
                    console.log("changing" +JSON.stringify(vm.activityList))
                }
            }

        };


        vm.deleteActivity = function (aID) {
            var idx = vm.activityList.indexOf(
                $filter('filter')(vm.activityList, {actvityId: aID}, true)[0]);
            vm.activityList.splice(idx, 1);
            vm.onUpdate({newList:vm.activityList});
            vm.selectRecord = 0;
            vm.isDetailsValid = true; //case that incomplete record is deleted

        };

        vm.addActivity = function () {
            var defaultActivity=vm.getNewActivity();
            console.log("new activity "+JSON.stringify(defaultActivity));
            vm.activityList.push(defaultActivity);
            console.log("the list "+JSON.stringify(vm.activityList))
            vm.isDetailsValid = true; //set to true to exapnd
            vm.selectRecord=(vm.activityList.length - 1);
            console.log("selectrecord"+vm.selectRecord)
           // vm.isDetailsValid = false;
        };

        vm.setValid = function (detailValid) {
            vm.isDetailsValid = detailValid;
        };
        vm.onUpdateActivityRecord = function (activity) {

            var idx = vm.activityList.indexOf(
                $filter('filter')(vm.activityList, {activityId:activity.activityId}, true)[0]
            );
            vm.activityList[idx] = angular.copy(activity);
            vm.isDetailsValid = true;
        };

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