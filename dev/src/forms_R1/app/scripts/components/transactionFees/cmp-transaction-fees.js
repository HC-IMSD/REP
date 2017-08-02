(function () {
    'use strict';
    angular
        .module('TransactionFeesModule', [
            'services'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('TransactionFeesModule')
        .component('cmpTransactionFees', {
            templateUrl: 'app/scripts/components/transactionFees/tpl-transaction-fees.html',
            controller: transactionFeesController,
            controllerAs: 'transFeeCtrl',
            bindings: {
                showErrors:'&',
                feeRecord:'<'
            }
        });

    transactionFeesController.$inject = ['$scope','TransactionLists'];
    function transactionFeesController($scope,TransactionLists) {

        var vm = this;
       vm.model=null;
       vm.submissionType={};

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
          /*  vm.deferralId="deferral"+scopeId;
            vm.certId="cert"+scopeId;
            vm.supportInfoId="supportInfoId"+scopeId;
            vm.versionId="version"+scopeId;
            vm.otherId="other"+scopeId;
            vm.PaymentMethod="paymentMethod"+scopeId;*/

        }



    }
})();