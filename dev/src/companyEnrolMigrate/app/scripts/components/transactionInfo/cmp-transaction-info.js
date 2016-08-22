/**
 * Created by dkilty on 16/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('transactionInfo', ['contactModule25', 'lifecycleList'])
})();

(function () {
    'use strict';

    angular
        .module('transactionInfo')
        .component('cmpTransactionInfo', {
            templateUrl: 'app/scripts/components/transactionInfo/tpl-transaction-info.html',
            controller: transactionInfoCtrl,
            controllerAs: 'transInfoCtrl',
            bindings: {
                transactionRoot: '<',
                 onUpdate: '&',
                 isAmend: '<',
                showErrors: '&',
                getTransaction: '&',
                getRepContact: '&',
                resetEctd: '&'
            }
        });

    transactionInfoCtrl.$inject = ['TransactionService']
    function transactionInfoCtrl(TransactionService) {
        var vm = this;
        vm.ngModelOptSetting = {updateOn: 'blur'}
        vm.transactionModel = vm.transactionRoot;
        vm.yesNoList = ['Y', 'N'];
        vm.showEctdSection = true;

        vm.$onInit = function () {
            console.log("default model" + JSON.stringify(vm.transactionModel))
            console.log("The transaction service for info " + vm.transactionServiceInfo)
            vm.updateEctdState()
        }
        //TODO rename
        vm.$onChanges = function (changes) {
            if (changes.transactionRoot) {
                //  vm.updateEctdState();
            }
        }
        vm.getNewTransaction = function () {
            return (vm.getTransaction());
        }
        vm.getNewRepContact = function () {

            return (vm.getRepContact());
        }

        vm.showError = function (ctrl) {
            /* if((ctrl.$invalid && ctrl.$touched) || (vm.showErrors()&&ctrl.$invalid )){
             return true
             }*/
            return false
        }
        vm.updateEctdState = function () {
            if (isEctdValue()) {
                vm.showEctdSection = true;
            } else {
                //clear data
                vm.resetEctd();
                vm.showEctdSection = false;
            }
        }
        function isEctdValue() {
            if (vm.transactionModel.isEctd === 'Y') {
                return true
            }
            return false;
        }
    }

})();

