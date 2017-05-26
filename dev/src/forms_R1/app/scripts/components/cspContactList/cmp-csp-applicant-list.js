/**
 * Created by dkilty on 4/24/2017.
 */


/**
 * Created by dkilty on 05/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspContactList', [
            'cspApplicant',
            'hpfbConstants'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspContactList')
        .component('cmpCspApplicantList', {
            templateUrl: 'app/scripts/components/cspContactList/tpl-csp-applicant-list.html',
            controller: cspApplicantListController,
            controllerAs: 'cspApplListCtrl',
            bindings: {
                record: '<',
                showErrors: '&',
                addApplicant: '&',
                deleteApplicant: '&',
                updateErrorSummary: '&'
            }
        });
    cspApplicantListController.$inject = ['$translate', 'FRENCH'];
    function cspApplicantListController($translate, FRENCH) {

        var vm = this;
        vm.model = "";
        vm.alerts = [false,false];
        vm.lang = $translate.proposedLanguage() || $translate.use();
        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {
            vm.alerts = [false,false];
        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {
            if (changes.record) {

                vm.model = changes.record.currentValue;
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
         * Closes the instruction alerts
         * @param value
         */
        vm.closeAlert = function (value) {
            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = false;
            }
        };

        vm.isFrench = function () {
            return (vm.lang === FRENCH);
        };

    }
})();
