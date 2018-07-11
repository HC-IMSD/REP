/**
 * Created by dkilty on 16/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('transactionInfo',
            ['lifecycleList',
                'requesterListModule',
                'filterLists',
                'hpfbConstants',
                'ui.bootstrap',
                'dataLists',
                'ui.select',
                'addressModule',
                'contactModule',
                'transactionFeesModule',
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
                getTransaction: '&',
                setStartingSequence:'&',
                getRepContact: '&',
                getFee:'&',
                resetEctd: '&',
                deprecateSequence: '&',
                language:'<',
                sequenceUpdated:'<',
                getCurrentSequence:'&',
                showErrorSummary: '<',
                updateErrorSummary:'&'
            }
        });

    transactionInfoCtrl.$inject = ['$scope', 'OTHER', 'YES', 'NO', 'NEW', 'EXISTING', 'getContactLists', 'getRoleLists', 'ENGLISH', 'FRENCH'];
    function transactionInfoCtrl($scope,OTHER,YES,NO,NEW,EXISTING,getContactLists,getRoleLists,ENGLISH,FRENCH) {
        var vm = this;
        vm.ngModelOptSetting = {updateOn: 'blur'};
        vm.transactionModel = {
        };
        vm.yesNoList = [YES, NO];
        vm.newExistingList = [NEW, EXISTING];
        vm.showNewActivityFields = false;
        vm.showThirdPartyNote = false;
        vm.showAdminSub = false;
        vm.showEctdSection = true;
        vm.showSolicitedDetail = false;
        vm.showOtherSolicitedDetail = false;
        vm.activityEditable = true;
        vm.isEctd = false;
        vm.alerts = [false, false, false, false, false, false, false, false];
        vm.requesterList = [];
        vm.formTypeList = getRoleLists.getFormTypes();
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
            vm.updateActivityType();
            vm.setThirdParty();
            vm.setAdminSubmission();
            vm.updateEctdState();
            vm.setSolicitedState();
            loadAdminSubData();
        };


        vm.$onChanges = function (changes) {
            if (changes.transactionRoot) {
                vm.transactionModel = changes.transactionRoot.currentValue;
                vm.updateActivityType();
                vm.setThirdParty();
                vm.setAdminSubmission();
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
        };

        vm.getNewTransaction = function () {
            return (vm.getTransaction());
        };

        vm.setSequence=function(start){

            if(isNaN(start) ||start === null){
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

        vm.updateActivityType = function () {
            vm.showNewActivityFields = isNewActivity();
            if(!vm.showNewActivityFields){
                vm.transactionModel.isThirdParty = "";
                vm.transactionModel.isPriority = "";
                vm.transactionModel.isNoc = "";
                vm.transactionModel.isAdminSub = "";
                vm.transactionModel.subType = "";
                vm.showThirdPartyNote = false;
                vm.showAdminSub = false;

            }
        };

        vm.setThirdParty = function () {
            vm.showThirdPartyNote = (vm.transactionModel.isThirdParty === YES);
        };

        vm.updateEctdState = function () {
            if (isEctdValue()) {
                vm.isEctd = true;
            } else {
                vm.isEctd = false;
            }
        };
        vm.updateFeeState=function(){
          if(vm.transactionModel.isFees === YES){
              vm.transactionModel.feeDetails = vm.getFee();

          }else{
              //clear out all the fee details
              vm.transactionModel.feeDetails = null;
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

        function isNewActivity() {
            return vm.transactionModel.transactionType === NEW;
        }

        function loadAdminSubData() {
            getContactLists.getAdminSubType()
                .then(function (data) {
                    vm.adminSubTypeList = data;
                    return true;
                });
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
                vm.transactionModel.solicitedRequesterReord = [];
            }
        };

        vm.updateActivityChanges = function () {
            vm.activityEditable = isActivityChangesValue();
        };

        vm.updateRequesterList = function(list){
            if(!list) return;
            vm.transactionModel.solicitedRequesterReord = list;
        };

        /**
         * Sets the visibility and state of the related activities
         */
        vm.setAdminSubmission = function () {
            if (vm.transactionModel.isAdminSub === YES) {
                vm.showAdminSub = true;
            } else {
                vm.showAdminSub = false;
                vm.transactionModel.subType = "";
            }
        };

        /**
         * Open the instruction alerts
         * @param value
         */
        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
        };

        /**
         * Close the instruction alerts
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
            vm.productNameId="prod_name"+scopeId;
            vm.isEctdId="is_ectd"+scopeId;
            vm.isSolicitedId="is_solicited"+scopeId;
            vm.solictedRqId="solicited_rq"+scopeId;
            vm.solicitedOtherId="solicited_rq_other"+scopeId;
            vm.companyNameId="company_noabbrev"+scopeId;
            vm.contactSameId="confirm_contact_valid"+scopeId;
            vm.isFeesId="is_fee_transaction"+scopeId;
            vm.typeId="dossier_type"+ scopeId;
            vm.isNewActivityId="is_new_activity"+ scopeId;
            vm.thirdPartyId = "is_signed_3rd_party" + scopeId;
            vm.isAdminSubId = "is_admin_submission" + scopeId;
            vm.adminSubTypeId = "admin_sub_type" + scopeId;
            vm.isPriorityId = "is_priority" + scopeId;
            vm.isNocId = "is_noc" + scopeId;
        }

}

})
();

