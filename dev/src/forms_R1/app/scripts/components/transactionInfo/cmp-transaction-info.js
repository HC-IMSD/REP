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
                'transactionFeesModule'
                'alertModule',
                'errorMessageModule'
            ])
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
                showErrorSummary: '<',
                getTransaction: '&',
                setStartingSequence:'&',
                getRepContact: '&',
                getFee:'&',
                resetEctd: '&',
                deprecateSequence: '&',
                language:'<',
                sequenceUpdated:'<',
                getCurrentSequence:'&',
                updateErrorSummary:'&'
            }
        });

    transactionInfoCtrl.$inject = ['$scope','TransactionService', 'OTHER', 'YES','NO' ,'getContactLists','ENGLISH','FRENCH'];
    function transactionInfoCtrl($scope, TransactionService, OTHER, YES,NO, getContactLists,ENGLISH,FRENCH) {
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
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.min5Error = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_MIN5"}
        ];
        vm.min7Error = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_7"}
        ];
        vm.showSummary=false;
        vm.$onInit = function () {
            _setIdNames();
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
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
            }

        };

        vm.isFeesIndicated=function() {
            return vm.transactionModel.isFees === YES;
        }

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

        //temp used for autimation testing. Ignore for coding
        vm.showFormErrors = function () {

          //  return (vm.showErrors())
        };

        //TODO : needed for subcomponents, replace with one way binding?
        vm.showErrors=function(){

            return  vm.showSummary;
        };

        vm.showError = function (ctrl) {
            if (!ctrl) return;

            if ((ctrl.$invalid && ctrl.$touched) || (vm.showSummary && ctrl.$invalid )) {
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
        vm.updateFeeState=function(){
          if(vm.transactionModel.isFees===YES){
              vm.transactionModel.feeDetails=vm.getFee();

          }else{
              //clear out all the fee details
              vm.transactionModel.feeDetails=null;
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

        $scope.$watch('transInfoCtrl.transInfoForm.$error', function () {
            //vm.updateErrorSummaryState();
            vm.updateErrorSummary();
        }, true);

        function _setIdNames(){
            var scopeId = "_" + $scope.$id;
            vm.companyId="company_id"+scopeId;
            vm.dossierId="dossier_id"+scopeId;
            vm.dossierNameId="dossier_name"+scopeId;
            vm.isEctdId="is_ectd"+scopeId;
            vm.isSolicitedId="is_solicited"+scopeId;
            vm.solictedRqId="solicited_rq"+scopeId;
            vm.solicitedOtherId="solicited_rq_other"+scopeId;
            vm.companyNameId="company_noabbrev"+scopeId;
            vm.contactSameId="contact_same"+scopeId;
            vm.isFeesId="isFees"+scopeId;
        };


}

})
();

