(function () {
    'use strict';
    angular
        .module('transactionFeesModule', [
            'services',
            'hpfbConstants',
            'rw.moneymask'
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
        vm.yesNoList = [YES, NO];
        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {
            vm.submissionType = TransactionLists.getFeeList();
        };


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
        }
        vm.isFeeRemit = function () {
            if (vm.model.feeRemission === YES ) {
                return true;
            }
            vm.model.grossRevenue = "";
            return false;

        };
        vm.calcValue = function () {
            var result = parseFloat(vm.model.grossRevenue) * 0.1;
            if (isNaN(result)) result = 0;
            vm.model.percentGross = result.toFixed(2);
        };
        vm.isEligible = function () {

            if (!vm.model || !vm.model.submissionClass || !vm.model.submissionClass.fee)
                return false;

            if ( vm.isFeeRemit() &&(vm.model.percentGross < vm.model.submissionClass.fee)) {
                return true;
            }
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
        }


        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.submClassId = "sub_class" + scopeId;
            vm.descriptId = "fee_description" + scopeId;
            vm.feeId = "fee_amount" + scopeId;
            ///vm.deferralId = "deferral" + scopeId;
            vm.remitId = "fee_remission" + scopeId;

            vm.revenueId = "grossRevenue" + scopeId;
            vm.percentId = "calcPercent" + scopeId;
            vm.deferralStateId = "deferralState" + scopeId; //statement supporting deferral
            vm.statement10Id = "statementSalse" + scopeId;
            vm.supportInfoId = "supportInfoId" + scopeId;
            vm.versionId = "version" + scopeId;
            vm.otherId = "other" + scopeId;

            vm.PaymentMethod = "paymentMethod" + scopeId;

        }


    }
})();