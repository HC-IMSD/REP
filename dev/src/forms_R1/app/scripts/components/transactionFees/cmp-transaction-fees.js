(function () {
    'use strict';
    angular
        .module('transactionFeesModule', [
            'services',
            'hpfbConstants',
            'errorMessageModule'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('transactionFeesModule')
        .component('cmpTransactionFees', {
            templateUrl: 'app/scripts/components/transactionFees/tpl-transaction-fees.html',
            controller: transactionFeesController,
            controllerAs: 'transFeeCtrl',
            bindings: {
                feeRecord: '<',
                language:'<',
                showErrorSummary: '<',
                updateErrorSummary:'&'
            }
        });

    transactionFeesController.$inject = ['$scope', '$window', 'TransactionLists', 'YES', 'NO','ENGLISH','FRENCH','ADVANCE_FEE_PAYMENT_EN','ADVANCE_FEE_PAYMENT_FR'];

    function transactionFeesController($scope, $window, TransactionLists, YES, NO,ENGLISH,FRENCH, ADVANCE_FEE_PAYMENT_EN,ADVANCE_FEE_PAYMENT_FR) {

        var vm = this;
        vm.model = {};
        vm.submissionType = {};
        vm.mitigationList = {};
       // vm.onePaymentSelected = "";
        vm.yesNoList = [YES, NO];
        vm.requiredOnlyError = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        //vm.onePaymentError = [{type: "required", displayAlias: "ONE_PAYMENT_METHOD"}];
        vm.alerts = [false, false, false];
        vm.lang=ENGLISH;
        vm.smallBusinessSelected = false;
        vm.urgentHealthNeedSelected = false;
        vm.fundedInstitutionSelected = false;
        vm.govermentSelected = false;
        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {
            _setIdNames();
            vm.submissionType = TransactionLists.getFeeList();
            vm.mitigationList = TransactionLists.getMitigationList();
            vm.alerts = [false, false, false];
        };

        vm.errorsTemp = function () {
            return true;
        };
        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {

            if(changes.language){
                vm.lang=changes.language.currentValue;
            }
            if (changes.feeRecord) {
                vm.model = changes.feeRecord.currentValue;
                console.log( vm.model.mitigation.mitigationType.id );
                vm.updateMitigationType(vm.model.mitigation.mitigationType.id);
            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
            }

        };

        vm.showError = function (ctrl) {

            if (!ctrl) return false;

            if ((ctrl.$invalid && ctrl.$touched) || (vm.showSummary && ctrl.$invalid )) {
                return true
            }
        };

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.submClassId = "sub_class" + scopeId;
            vm.descriptId = "fee_description" + scopeId;
            vm.feeId = "fee_amount" + scopeId;
            //vm.remitNoPaymentId = "fee_remit_no_payment" + scopeId;
            vm.mitigationTypeId = "mitigation_type" + scopeId;
            vm.certifyOrganizationId = "certify_organization" + scopeId;
            vm.smallBusinessFeeApplicationId = "small_business_fee_application" + scopeId;
            vm.firstSubmissionId = "first_submission" + scopeId;
            vm.certifyFundedHealthInstitutionId = "certify_funded_health_institution" + scopeId;
            vm.certifyUrgentHealthNeedId = "certify_urgent_health_need" + scopeId;
            vm.certifyGovermentOrganizationId = "certify_goverment_organization" + scopeId;
        }
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

        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
        }

        vm.selectMitigationType = function () {
            vm.updateMitigationType(vm.model.mitigation.mitigationType.id);
        };

        vm.updateMitigationType = function (value) {
            if (!value) {
                vm.model.mitigation.mitigationType = "";
                return;
            }

            switch (value) {
                case("SMALL_BUSINESS"):
                    vm.smallBusinessSelected = true;
                    vm.urgentHealthNeedSelected = false;
                    vm.fundedInstitutionSelected = false;
                    vm.govermentSelected = false;
                    break;
                case("URGENT_HEALTH_NEED"):
                    vm.smallBusinessSelected = false;
                    vm.urgentHealthNeedSelected = true;
                    vm.fundedInstitutionSelected = false;
                    vm.govermentSelected = false;
                    break;
                case("FUNDED_INSTITUTION"):
                    vm.smallBusinessSelected = false;
                    vm.urgentHealthNeedSelected = false;
                    vm.fundedInstitutionSelected = true;
                    vm.govermentSelected = false;
                    break;
                case("GOVERMENT_ORGANIZATION"):
                    vm.smallBusinessSelected = false;
                    vm.urgentHealthNeedSelected = false;
                    vm.fundedInstitutionSelected = false;
                    vm.govermentSelected = true;
                    break;
            }
        }

    }
})();