/**
 * Created by steveZhao on 05/25/2018.
 */

(function () {
    'use strict';

    angular
        .module('requesterRecordModule',
            [   'ui.select',
                'hpfbConstants',
                'errorMessageModule'
            ])
})();

(function () {
    'use strict';

    angular
        .module('requesterRecordModule')
        .config(function (uiSelectConfig) {
            //choices: select2, bootstrap, selectize
            uiSelectConfig.theme = 'select2';
        })
        .component('cmpRequesterRecord', {
            templateUrl: 'app/scripts/components/requesterRecord/tpl-requester-record.html',
            controller: requesterRecordController,
            controllerAs:'requesterRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                showErrors: '<',
                requesterList:'<'
            }
        });

    requesterRecordController.$inject = ['$scope','$filter','OTHER','$translate'];
    function requesterRecordController($scope, $filter, OTHER, $translate) {
        var vm = this;

        vm.model = {"sequenceNumber": "", "solicitedRequester": "", "otherRequesterDetails":"", display: ""};
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.showDetailErrors=false;
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];

        vm.$onInit = function(){
            vm.showDetailErrors=false;
            _setIdNames();
        };

        /**
         * Updates the display value for the object for summary display
         */
        vm.requesterChanged = function($item, $model){
            vm.model.display=$item.en;
            vm.setOtherSolicitor();
        };


        vm.$onChanges = function (changes) {
          /*  if(changes.requesterList){
                vm.requesters = changes.requesterList.currentValue;
           } */
            if (changes.record && changes.record.currentValue) {
                vm.model = changes.record.currentValue;
            }
            if(changes.showErrors){
                vm.showDetailErrors=changes.showErrors.currentValue;
            }

        };

        vm.deleteRecord = function()  {
            vm.onDelete({id: vm.model.sequenceNumber})
        };

        vm.showError = function (ctrl) {
            if(!ctrl) return false;
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid && vm.showDetailErrors) )
        };

        vm.setOtherSolicitor = function () {
            if (vm.model.solicitedRequester.id === OTHER) {
                vm.showOtherSolicitedDetail = true;
            } else {
                vm.showOtherSolicitedDetail = false;
                vm.model.otherRequesterDetails = "";
            }
        };

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.solictedRqId="solicited_rq"+scopeId;
            vm.solicitedOtherId="solicited_rq_other"+scopeId;
        }
    }
})();