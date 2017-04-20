/**
 * Created by dkilty on 20/04/2017.
 */


(function () {
    'use strict';

    angular
        .module('errorMessageModule', [])
})();

(function () {
    'use strict';

    angular
        .module('errorMessageModule')
        .component('cmpErrorMessage', {
            templateUrl: 'app/scripts/components/error-message/tpl-error-message.html',
            controller: errorMessageController,
            controllerAs: 'errMessageCtrl',

            bindings: {
                fieldName: '<', //theName of the field
                formRef: '<',
                showError: '&',
                errorTypes: '<'
            }
        });
    // errorMessageController.$inject = [];

    function errorMessageController() {
        var vm = this;
        vm.field_name = "";
        vm.form_ref = null;

        vm.fieldRecords = [];

        vm.$onChanges = function (changes) {

            if (changes.fieldName) {
                vm.field_name = changes.fieldName.currentValue;
            }
            if (changes.formRef) {

                vm.form_ref = changes.formRef.currentValue;
            }
            if (changes.errorTypes) {
                vm.fieldRecords = changes.errorTypes.currentValue;
            }
        };

        /**
         * Controls the visiblity of the error message section
         * @returns {*}
         */
        vm.showErrorMessage = function () {
            if (!vm.form_ref) return false;
            console.log(vm.fieldName)
            console.log(vm.form_ref[vm.fieldName])
            return ((vm.showError() && vm.form_ref[vm.fieldName].$invalid) || (vm.form_ref[vm.fieldName].$touched && vm.form_ref[vm.fieldName].$invalid));
        }
        //errMessageCtrl.field_ref[errMessageCtrl.fieldName]
    }
})();