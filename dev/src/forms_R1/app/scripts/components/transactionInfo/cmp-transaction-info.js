/**
 * Created by dkilty on 16/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('transactionInfo',
            ['lifecycleList',
                'filterLists',
                'hpfbConstants',
                'ui.bootstrap',
                'dataLists',
                'ui.select',
                'addressModule',
                'contactModule',
                'alertModule'])
})();

(function () {
    'use strict';

    angular
        .module('transactionInfo')
        .config(function (uiSelectConfig) {
            //choices: select2, bootstrap, selectize
            uiSelectConfig.theme = 'select2';
        })
        .component('cmpTransactionInfo', {
            templateUrl: 'app/scripts/components/transactionInfo/tpl-transaction-info.html',
            controller: transactionInfoCtrl,
            controllerAs: 'transInfoCtrl',
            bindings: {
                transactionRoot: '<',
                //onUpdate: '&',
                isAmend: '<',
                showErrors: '&',
                getTransaction: '&',
                setStartingSequence:'&',
                getRepContact: '&',
                resetEctd: '&',
                deprecateSequence: '&',
                language:'<',
                sequenceUpdated:'<',
                getCurrentSequence:'&'
            }
        });

    transactionInfoCtrl.$inject = ['TransactionService', 'OTHER', 'YES','NO' ,'getContactLists','ENGLISH','FRENCH'];
    function transactionInfoCtrl(TransactionService, OTHER, YES,NO, getContactLists,ENGLISH,FRENCH) {
        var vm = this;
        vm.ngModelOptSetting = {updateOn: 'blur'};
        vm.transactionModel = {};
        vm.yesNoList = [YES, NO];
        vm.showEctdSection = true;
        vm.showSolicitedDetail = false;
        vm.showOtherSolicitedDetail = false;
        vm.activityEditable = true;
        vm.isEctd = false;
        vm.requesterList = [];
        vm.alerts = [false,false];
        vm.requesterList = [];
        vm.lang=ENGLISH;
        vm.sequenceChange=false;
        vm.$onInit = function () {
            loadContactData(); //asynch load of contact data
            vm.updateEctdState();
            vm.setSolicitedState();
        };


        vm.$onChanges = function (changes) {
            if (changes.transactionRoot) {
                vm.transactionModel = changes.transactionRoot.currentValue;
                vm.updateEctdState();
                vm.setSolicitedState();
            }
            if(changes.language){

                vm.lang=changes.language.currentValue;
            }
            if(changes.sequenceUpdated){
                vm.sequenceChange=changes.sequenceUpdated.currentValue;
            }

        };

        vm.getNewTransaction = function () {
            return (vm.getTransaction());
        };

        vm.setSequence=function(start){

            if(isNaN(start) ||start==null){
                start=0;
            }
            vm.setStartingSequence({startVal:start});

        };

        vm.getNewRepContact = function () {
            return (vm.getRepContact());
        };

        vm.subtractSequence = function () {
            vm.deprecateSequence();
        };
        vm.showFormErrors = function () {

            return (vm.showErrors())
        };

        vm.showError = function (ctrl) {
            if (!ctrl) return;

            if ((ctrl.$invalid && ctrl.$touched) || (vm.showErrors() && ctrl.$invalid )) {
                return true;
            }
            return false;
        };
        vm.updateEctdState = function () {
            if (isEctdValue()) {
                vm.isEctd = true;
            } else {
                vm.isEctd = false;
            }
        };
        function isEctdValue() {
            return vm.transactionModel.isEctd === YES;
        }

        function isSolicitedValue() {
            return vm.transactionModel.isSolicited === YES;
        }

        function isActivityChangesValue() {
            return vm.transactionModel.isActivityChanges === YES;
        }


        function loadContactData() {
            getContactLists.getInternalContacts()
                .then(function (data) {
                    vm.requesterList = data;
                    return true;
                });
        }

        /**
         * @ngdoc method sets the visibilty of the solicited requester field. Clears
         * the data if the field is hidden
         */
        vm.setSolicitedState = function () {
            if (isSolicitedValue()) {
                vm.showSolicitedDetail = true;
            } else {
                vm.showSolicitedDetail = false;
                vm.transactionModel.solicitedRequester = "";
            }
            vm.setOtherSolicitor();
        };
        vm.setOtherSolicitor = function () {
            if (vm.transactionModel.solicitedRequester.id === OTHER) {
                vm.showOtherSolicitedDetail = true;
            } else {
                vm.showOtherSolicitedDetail = false;
                vm.transactionModel.otherSolicitedRequester = "";
            }
        };

        vm.updateActivityChanges = function () {
            vm.activityEditable = isActivityChangesValue();
        };

        //deprecated
        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
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



        /***
         * used to determine the form language
         * @returns {boolean}
         */
        vm.isFrench=function(){
            return(vm.lang===FRENCH);
        };

}

})
();

