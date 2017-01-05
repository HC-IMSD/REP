/**
 * Created by dkilty on 04/01/2017.
 */
(function () {
    'use strict';
    angular
        .module('adminSubmission', ['numberFormat', 'hpfbConstants'])
})();

(function () {
    'use strict';
    angular
        .module('adminSubmission')
        .component('cmpAdminSub', {
            templateUrl: 'app/scripts/components/adminSubmission/tpl-admin-sub.html',
            controller: AdminSubCtrl,
            controllerAs: 'adminCtrl',
            bindings: {
                record: '<',
                showErrors: '<',
                activityTypes: '&',
                yesNoTypes: '&'
            }
        });

    AdminSubCtrl.$inject = ['NO']

    function AdminSubCtrl(NO) {
        var vm = this;
        vm.dinTransferShow = false;
        //only one related activity record
        //yes no licence agreement
        //Din transfer checkbox
        vm.model = {
            sponserName: "",
            dateCleared: "",
            "regActivityType": "",
            "controlNumber": "",
            "licenseAgree": "",
            "dinTransfer": "",
            "notLasa": false
        };
        vm.yesNoList = vm.yesNoTypes();
        vm.activityTypeList = vm.activityTypes({isPilot: true}); //is pilot
        vm.$onInit = function () {
            vm.isLicenseAgreement();
            ///do init
        };
        vm.$onChanges = function (changes) {
            if (changes.record) {
                vm.model = changes.record.currentValue;
                vm.isLicenseAgreement();
            }
        };
        vm.showError = function (isTouched, isInvalid) {
            if (isTouched && isInvalid) {
                return true;
            }
        }

        /**
         * Error display specifically for checkbox
         * @param isTouched
         * @param value
         * @returns {boolean|*}
         */
        vm.showErrorCheckBox = function (isTouched, value) {
            return (!value && isTouched) || (vm.showErrors && !value );
        };

        vm.isLicenseAgreement = function () {
            //if no then show din transfer checkbox
            console.log("launching the license")
            if (vm.model && NO === vm.model.licenseAgree) {
                vm.dinTransferShow = true;
            } else {
                vm.dinTransferShow = false;
                vm.model.dinTransfer = false;
            }
        }

    }
})();