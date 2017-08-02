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
                showErrors:'&',
                feeRecord:'<'
            }
        });

    transactionFeesController.$inject = ['$scope','TransactionLists','YES','NO'];
    function transactionFeesController($scope,TransactionLists,YES,NO) {

        var vm = this;
       vm.model={};
       vm.submissionType={};
        vm.yesNoList = [YES, NO];
        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit=function(){
            vm.submissionType=TransactionLists.getFeeList();
        };



        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {

            if(changes.feeRecord){
                vm.model=changes.feeRecord.currentValue;
            }

        };


         vm.showError=function(ctrl){

            if(!ctrl) return false;

            if ((ctrl.$invalid && ctrl.$touched) || (vm.showErrors() && ctrl.$invalid )) {
                return true
            }
        }

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.submClassId = "submClass" + scopeId;
            vm.descriptId="descript"+scopeId;
            vm.feeId="feeAmount"+scopeId;
          vm.deferralId="deferral"+scopeId;
          vm.remitId="applyRemit"+scopeId;
          vm.revenueId="grossRevenue"+scopeId;
            vm.deferralStateId="deferralState"+scopeId; //statement supporting deferral
            vm.certId="cert"+scopeId;
            vm.supportInfoId="supportInfoId"+scopeId;
            vm.versionId="version"+scopeId;
            vm.otherId="other"+scopeId;
            vm.PaymentMethod="paymentMethod"+scopeId

        }



    }
})();