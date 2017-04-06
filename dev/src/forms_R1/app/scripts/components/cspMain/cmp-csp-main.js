/**
 * Created by dkilty on 03/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspMain', [
            'hpfbConstants',
            'cspService',
            'cspApplicant',
            'cspHCOnly',
            'cspMainApplication',
            'cspPatent',
            'cspTimelySubmission',
            'cspFeePayment',
            'cspCertification'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspMain')
        .component('cmpCspMain', {
            templateUrl: 'app/scripts/components/cspMain/tpl-csp-main.html',
            controller: cspMainCtrl,
            controllerAs: 'main',
            bindings: {
                formType: '@'
            }
        });

    cspMainCtrl.$inject = ['CspService','INTERNAL_TYPE', 'EXTERNAL_TYPE'];
    function cspMainCtrl(CspService,INTERNAL_TYPE, EXTERNAL_TYPE) {

        var vm = this;
        vm.userType=EXTERNAL_TYPE;
        vm.saveXMLLabel = "SAVE_DRAFT"; //used to dynamically label save button
        vm.countryList = [];
        vm.paymentType = [];
        vm.drugUseList = [];
        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit=function(){
            vm.modelService = new CspService(); //create the service
            vm.cspModel = vm.modelService.getModelInfo(); //the model
            vm.countryList = vm.modelService.getMarketingCountries();
            vm.paymentType = vm.modelService.getAdvancedPaymentTypes();
            vm.drugUseList = vm.modelService.getDrugUses();
        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {

            if (changes.formType) {
                vm.userType = changes.formType.currentValue;
                if (vm.userType == INTERNAL_TYPE) {
                    vm.saveXMLLabel = "APPROVE_FINAL"
                } else {
                    vm.saveXMLLabel = "SAVE_DRAFT"
                }
            }
        };

        vm.showHCOnlySection=function(){

            return (vm.userType===INTERNAL_TYPE);
        }

    }
})();


