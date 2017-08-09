(function () {
    'use strict';
    angular
        .module('transactionFeesModule', [
            'services',
            'hpfbConstants',
            'rw.moneymask',
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
                showErrors: '&',
                feeRecord: '<'
            }
        });

    transactionFeesController.$inject = ['$scope', '$window', 'TransactionLists', 'YES', 'NO'];

    function transactionFeesController($scope, $window, TransactionLists, YES, NO) {

        var vm = this;
        vm.model = {};
        vm.submissionType = {};
        vm.onePaymentSelected = "";
        vm.yesNoList = [YES, NO];
        vm.requiredOnlyError = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.onePaymentError = [{type: "required", displayAlias: "ONE_PAYMENT_METHOD"}];
        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {
            _setIdNames();
            vm.submissionType = TransactionLists.getFeeList();
        };

        vm.errorsTemp = function () {
            return true;
        }
        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {

            if (changes.feeRecord) {
                vm.model = changes.feeRecord.currentValue;
            }

        };

        vm.showError = function (ctrl) {

            if (!ctrl) return false;

            if ((ctrl.$invalid && ctrl.$touched) || (vm.showErrors() && ctrl.$invalid )) {
                return true
            }
        };
        vm.isPaymentSelected = function () {
            var methodSelected = false;
            var keys = Object.keys(vm.model.paymentMethod);
            for (var i = 0; i < keys.length; i++) {
                if (vm.model.paymentMethod[keys[i]] === true) {
                    methodSelected = true;
                    break;
                }
            }
            vm.onePaymentSelected = ""

            if (methodSelected) {
                vm.onePaymentSelected = true;
                return true
            } else {
                vm.onePaymentSelected = false;
                return false
            }

        }
        vm.isFeeRemit = function () {
            if (vm.model.feeRemission === YES) {
                return true;
            }
            vm.model.grossRevenue = 0;
            return false;

        };
        vm.calcValue = function () {
            var result = parseFloat(vm.model.grossRevenue) * 0.1;
            if (isNaN(result)) result = 0;
            vm.model.percentGross = result.toFixed(2);
        };

        /**
         * Sets the deferral state information
         * @returns {boolean}
         */
        vm.isDeferral = function () {
            if (!vm.model) return false;

            if (vm.model.deferralRequest) {
                return true;
            }
            vm.model.requiredDocs.deferralStat = false;
            return false;
        };

        /**
         * Determines if the entire documentation section should be  shown
         * @returns {boolean}
         */
        vm.showDocumentationSection = function () {
            if (vm.isEligible() || vm.isDeferral()) {
                return true;
            }
            return false;

        };
        /**
         * Determines if payment methods should be shown
         * @returns {boolean}
         */
        vm.showPaymentMethods = function () {
            if (!vm.model) return false;
            return !vm.isDeferral() && (!vm.isEligible() && vm.isLess10K()) || (vm.isEligible() );
        }

        /**
         * Determines if no fees should be sent
         * @returns {boolean}
         */
        vm.isSendNoFees = function () {
            return (!vm.isLess10K() && !vm.isEligible() && !vm.isDeferral())

        }

        /**
         * Returns if the fees are elgible for remissions
         * @returns {boolean}
         */
        vm.isEligible = function () {

            //check if there is no model or submission class chosen
            if (!vm.model || !vm.model.submissionClass || !vm.model.submissionClass.fee) {
                clearRemitRequiredDocs();
                return false;
            }

            if (vm.isFeeRemit() && (vm.model.percentGross < vm.model.submissionClass.fee)) {
                return true;
            }
            clearRemitRequiredDocs();
            return false
        };
        vm.isLess10K = function () {
            if (!vm.model || !vm.model.submissionClass) {
                return false;
            }
            return vm.model.submissionClass.fee < 10000
        };

        vm.openPaymentForm = function () {

            $window.open('http://www.hc-sc.gc.ca/dhp-mps/alt_formats/pdf/prodpharma/applic-demande/form/adv-pa-av-eng.pdf', '_blank');
        }

        vm.setDocOther = function () {
            if (!vm.model) return false;
            if (vm.model.requiredDocs.other) {
                return true;
            }
            vm.model.requiredDocs.otherDetails = "";
            return false
        };

        /**
         * Clears the required data related to remit
         */
        function clearRemitRequiredDocs() {
            if (!vm.model) return;

            vm.model.requiredDocs.revStat = false;
            vm.model.requiredDocs.estMarketShare = false;
            vm.model.requiredDocs.comparison = false;
            vm.model.requiredDocs.salesHistory = false;
            vm.model.requiredDocs.marketPlan = false;
            vm.model.requiredDocs.avgSalePrice = false;
            vm.model.requiredDocs.other = false;
            vm.model.requiredDocs.otherDetails = "";

        }

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.submClassId = "sub_class" + scopeId;
            vm.descriptId = "fee_description" + scopeId;
            vm.feeId = "fee_amount" + scopeId;
            ///vm.deferralId = "deferral" + scopeId;
            vm.remitId = "fee_remission" + scopeId;
            vm.paymentSelectedId = "payment_selected" + scopeId;
            vm.revenueId = "grossRevenue" + scopeId;
            vm.percentId = "calcPercent" + scopeId;
            vm.deferralStateId = "deferralState" + scopeId; //statement supporting deferral
            vm.statement10Id = "statementSalse" + scopeId;
            vm.supportInfoId = "supportInfoId" + scopeId;
            vm.versionId = "version" + scopeId;
            vm.otherId = "other" + scopeId;

            vm.PaymentMethod = "onePaymentMethod" + scopeId;

        }


    }
})();