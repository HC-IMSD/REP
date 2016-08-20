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
                getTransaction: '&'
            }
        });

    transactionInfoCtrl.$inject = ['TransactionService']
    function transactionInfoCtrl(TransactionService) {
        var vm = this;
        vm.ngModelOptSetting = {updateOn: 'blur'}
        vm.transactionModel = vm.transactionRoot;


        vm.$onInit = function () {
            console.log("default model" + JSON.stringify(vm.transactionModel))
            console.log("The transaction service for info " + vm.transactionServiceInfo)
        }
        //TODO rename
        vm.$onChanges = function (changes) {

        }
        vm.getNewTransaction = function () {
            return (vm.getTransaction());
        }
        vm.showError = function (ctrl) {
            /* if((ctrl.$invalid && ctrl.$touched) || (vm.showErrors()&&ctrl.$invalid )){
             return true
             }*/
            return false
        }

    }

})();

