/**
 * Created by Abdessamad on 7/4/2016.
 */

(function () {
    'use strict';

    angular
        .module('addressRole', ['hpfbConstants',  'alertModule'])
})();

(function () {
    'use strict';

    angular
        .module('addressRole')
        .component('cmpAddressRole', {
            templateUrl: 'app/scripts/components/addressRole/tpl-address-role.html',
            controller: addressRoleCtrl,
            controllerAs: 'ar',
            bindings: {
                //formName: '<',
                record: '<',
                onUpdate: '&',
                showErrors: '&',
                isContact: '<',
                alreadySelected: '&',
                isAmend: '<',
                legendText: '@',
                importerUpdated: '&',
                deselectImporter: '&',
                updateErrorSummary: '&'

            }
        });

    addressRoleCtrl.$inject = ['ENGLISH','$scope','$translate'];
    function addressRoleCtrl(ENGLISH,$scope, $translate) {

        var vm = this;
        vm.isReq = true;
        vm.isSelected = ""; //checkbox causes issues. Store in text
        vm.isEditable = true;
        vm.inUser = false;
        vm.alerts = [false, false];
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.showCMError = false;
        vm.duplicateRole=[
            {type: "duplicateRole", displayAlias: "TYPE_DUPLICATEROLE"}
        ];

        vm.roleModel = {
            manufacturer: false,
            mailing: false,
            billing: false,
            importer: false,
            repPrimary: false,
            repSecondary: false
        };
        vm.$onInit = function () {
            //after init

            if (vm.record) {
                //doesn't copy as this is a dumb component
                vm.roleModel = vm.record.addressRole;
                vm.oneSelected();
            }
            _setIdNames();
        };
        vm.$onChanges = function (changes) {
            if (changes.record) {
                vm.roleModel = (changes.record.currentValue.addressRole);
                vm.oneSelected();
                checkAllControlsForDuplicates();

            }
            if (changes.isAmend) {
                vm.isEditable = changes.isAmend.currentValue;
            }
        };
        /**
         * Checks all the controls and updates the error state
         * todo: to update this method to use dynamic control name ??
         */
        function checkAllControlsForDuplicates() {
            if (!vm.roleForm) return;
            vm.checkForDuplicates(vm.roleForm.mailing, 'mailing');
            vm.checkForDuplicates(vm.roleForm.billing, 'billing');
            vm.checkForDuplicates(vm.roleForm.repPrimary, 'repPrimary');
            vm.checkForDuplicates(vm.roleForm.repSecondary, 'repSecondary');
            vm.checkForDuplicates(vm.roleForm.manufacturer, 'manufacturer');
            vm.updateErrorSummary();
        }


        vm.updateImporterState = function (ctrl, toCheck) {
            vm.oneSelected(ctrl, toCheck);
            vm.importerUpdated({state: vm.roleModel.importer});
            // todo: set manu role input untouch ??
            checkAllControlsForDuplicates();
        };

        vm.updateOtherState = function (ctrl, toCheck) {
            var result = vm.oneSelected(ctrl, toCheck);
            vm.deselectImporter({state: vm.roleModel.manufacturer});
            //vm.deselectImporter({state: vm.roleModel.manufacturer || vm.roleModel.mailing || vm.roleModel.billing})
        };


        /**
         *
         * @param ctrl the form control
         * @param toCheck the json name of the property to check
         * @returns {boolean}
         */
        vm.oneSelected = function (ctrl, toCheck) {
            var obj = vm.roleModel;

                if(toCheck !== 'importer') {
                    vm.checkForDuplicates(ctrl, toCheck);
                }

            for (var key in obj) {
                var attrName = key;
                var attrValue = obj[key];
                if (attrValue === true) {
                    vm.isSelected = true;
                    vm.updateErrorSummary();
                    return true;
                }
            }
            vm.isSelected = "";
            vm.updateErrorSummary();
            return false
        };
        vm.roleBlur = function () {
            var obj = vm.roleModel;
            for (var key in obj) {
                var attrName = key;
                var attrValue = obj[key];
                if (attrValue === true) {
                    vm.isSelected = true;
                    vm.updateErrorSummary();
                    return true;
                }
            }
            vm.isSelected = "";
            vm.roleForm[vm.roleMissingId].$setTouched();
            return false
        }
        vm.checkForDuplicates = function (ctrl, toCheck) {
            if (ctrl) {
                var isDup = isDuplicateSelected(toCheck);
                ctrl.$setValidity("duplicateRole", !isDup);
            }
        };

        function isDuplicateSelected(toCheck) {
            var obj = vm.roleModel;
            for (var key in obj) {
                var attrName = key;
                var attrValue = obj[key];
                if (attrName == toCheck) {
                    if (!attrValue) return false;
                    return (vm.alreadySelected({roleName: attrName}));
                }
            }
            return false
        }

        vm.showError = function (ctrl) {
            if ((ctrl.$invalid) || (vm.showErrors() && ctrl.$invalid)) {
                return true
            }
            return false
        }

        /**
         * Specical show error function as relying on a hiddend field
         * @returns {boolean}
         */
        vm.showErrorMissing = function () {

            if ((((vm.isContact && vm.roleForm[vm.chkManuContactId].$touched) || (!vm.isContact && vm.roleForm[vm.chkManuId].$touched)) && !vm.isSelected) || (vm.showErrors() && !vm.isSelected)) {
                return true;
            }
            return false;
        };

        /**
         * Closes the instruction alerts
         * @param value
         */
        vm.closeAlert = function (value) {
            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = false;
            }
        };

        /*
        Makes an instruction visible baseed on an index passed in
        Index sets the UI state in the alerts array
         */
        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
        };

        /**
         * Determines if the current language is french
         * @returns {boolean}
         */
        vm.isFrench=function(){
            return(vm.lang!== ENGLISH);
        };

        function _setIdNames() {
            var scopeId="_"+  $scope.$id;
            vm.fieldsetId = "fs_roleMissing" +scopeId;
            vm.roleMissingId = "roleMissing" +scopeId;
            vm.contactRoleMissingId = "contactRoleMissing" +scopeId;
            vm.chkManuId = "manufacturer" +scopeId;
            vm.chkMailId = "mailing" +scopeId;
            vm.chkBillId = "billing" +scopeId;
            vm.chkManuContactId = "contactManufacturer" + scopeId;
            vm.chkMailContactId = "contactMailing" + scopeId;
            vm.chkBillContactId = "contactBilling" + scopeId;
            vm.chkImpId = "chk-importer" +scopeId;
            vm.chkRePrimId = "repPrimary" +scopeId;
            vm.chkRepSecId = "repSecondary" +scopeId;
        }


    }//end controller



})();