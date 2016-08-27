/**
 * Created by dkilty on 8/14/2016.
 */

(function () {
    'use strict';
    angular
        .module('applicationInfo', [])
})();


(function () {
    'use strict';
    angular
        .module('applicationInfo')
        .component('cmpApplicationInfo', {
            templateUrl: 'app/scripts/components/applicationInfo/tpl-application-info.html',
            controller: ApplInfoCtrl,
            controllerAs: 'infoCtrl',
            bindings: {
                record: '<',
                userType: '<',
                isIncomplete: '<',
                setAmendState: '&',
                updateValues: '<'
            }
        });

    function ApplInfoCtrl() {
        var vm = this;
        vm.applTypes = ["NEW", "AMEND", "APPROVED"];
        vm.formType = 'EXT';
        vm.infoModel = {
            applicationType: "NEW",
            enrolmentVersion: "0.0",
            dateSaved: ""
        };
        vm.setAsIncomplete = true;

        vm.$onInit = function () {
            ///do init
        };
        vm.$onChanges = function (changes) {
            if (changes.userType) {
                vm.formType = changes.userType.currentValue;
            }
            if (changes.updateValues) {
                if (changes.updateValues.currentValue) {
                    _transformFile();
                }
            }
            if (changes.record) {
                console.log("chgange " + changes.record.currentValue.applicationType);
                vm.infoModel = changes.record.currentValue;
            }
            if (changes.isIncomplete) {
                vm.setAsIncomplete = changes.isIncomplete.currentValue;
            }
        };

        vm.isExtern = function () {
            console.log("SDFSD" + vm.formType)
            return vm.formType == "EXT";

        };

        vm.setAmend = function () {

            vm.setAmendState();
        }


        /**
         * @ngdcc method updates data and increments version before creating json
         */
        function _transformFile() {
            updateDate();
            if (!vm.isExtern()) {
                incrementMajorVersion();
            } else {
                incrementMinorVersion();
            }
        }
        function updateDate() {
            if (vm.record) {
                vm.record.dateSaved = _getTodayDate();
            }
        }
        function _getTodayDate() {
            var d = new Date();
            var isoDate = d.getFullYear() + '-'
                + pad(d.getMonth() + 1) + '-'
                + pad(d.getDate());
            return (isoDate);
            function pad(n) {
                return n < 10 ? '0' + n : n
            }
        }
        function incrementMinorVersion() {
            if (!vm.record.enrolmentVersion) {
                vm.record.enrolmentVersion = "0.1";
            } else {
                var parts = vm.record.enrolmentVersion.split('.');
                var dec = parseInt(parts[1]);

                vm.record.enrolmentVersion = parts[0] + "." + (dec + 1);
            }
        }

        /**
         * Increments the major version. Sets the minor to false
         */
        function incrementMajorVersion() {
            if (!vm.record.enrolmentVersion) {
                vm.record.enrolmentVersion = "1.0";
            } else {
                var parts = vm.record.enrolmentVersion.split('.');
                var whole = parseInt(parts[0]);
                vm.record.enrolmentVersion = (whole + 1) + ".0";
            }
        }

    }
})();
