/**
 * Created by dkilty on 8/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('activityForm', [])
})();

(function () {
    'use strict';

    angular
        .module('activityForm')
        .component('cmpActivityRationale', {
            templateUrl: 'app/scripts/components/activityRationale/tpl-activity-rationale.html',
            controller: activityRationaleCtrl,
            controllerAs: 'actRatCtrl',

            bindings: {
                activityRecord: '<',
                isRequired: '<',
                showErrors: "@"
            }
        });
    function activityRationaleCtrl() {
        var vm = this;
        vm.record = {}
        vm.requiredState = false;
        /**
         *
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.activityRecord) {
                vm.record = changes.activityRecord.currentValue;
            }
            if (changes.isRequired) {
                vm.requiredState = changes.isRequired.currentValue;
            }
        };
        vm.showError = function (isTouched, isInvalid) {
            if ((isInvalid && isTouched)) {
                //|| (vm.showErrors() && isInvalid )
                return true
            }
            return false
        }
        vm.showErrorMissing = function () {
            //TODO service
            if (!vm.requiredState) {
                return false;
            }
            if (vm.record.newRoa || vm.record.newClaims
                || vm.record.changeFormulation
                || vm.record.changeDrugSubstance
                || vm.record.replaceSterility
                || vm.record.confirmitoryStudies
                || vm.record.confirmitoryStudies) {
                return false;
            }
            //text box
            if (vm.record.otherRationaleDetails) {
                return false
            }

            if ((vm.activityTypeForm.$dirty && vm.activityTypeForm.$invalid) || ( vm.showErrors() && vm.activityTypeForm.$invalid)) {
                return true
            }
        }


    }
})();