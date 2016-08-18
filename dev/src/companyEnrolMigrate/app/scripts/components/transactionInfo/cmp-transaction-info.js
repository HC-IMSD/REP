/**
 * Created by dkilty on 16/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('transaction', ['contactModule25'])
})();

(function () {
    'use strict';

    angular
        .module('transaction')
        .component('cmpTransactionInfo', {
            templateUrl: 'app/scripts/components/transactionInfo/tpl-transaction-info.html',
            controller: transactionInfoCtrl,
            controllerAs: 'transInfoCtrl',
            bindings: {
                contactRecord: '<',
                 onUpdate: '&',
                 isAmend: '<',
                showErrors: '&',
            }
        });

    transactionInfoCtrl.$inject = ['TransactionService']
    function transactionInfoCtrl(TransactionService) {
        var vm = this;
        vm.ngModelOptSetting = {updateOn: 'blur'}
        vm.transactionModel = {};
        var _transactionService = new TransactionService();
        vm.transactionModel = _transactionService.getModelInfo();
        vm.$onInit = function () {

            console.log("default model" + JSON.stringify(vm.transactionModel))
        }
        //TODO rename
        vm.$onChanges = function (changes) {


        }
        vm.showError = function (ctrl) {
            /* if((ctrl.$invalid && ctrl.$touched) || (vm.showErrors()&&ctrl.$invalid )){
             return true
             }*/
            return false
        }

    }

})();

