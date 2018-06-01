/**
 * Created by steveZhao on 05/25/2018.
 */

(function () {
    'use strict';

    angular
        .module('requesterRecordModule',
            [   'ui.select',
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

    requesterRecordController.$inject = ['$scope','$filter','$translate'];
    function requesterRecordController($scope, $filter, $translate) {
        var vm = this;

        vm.model = {"id": "", "en": "", "otherRequesterDetails":""};
        vm.countries=[];
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
            vm.model.display=$model.id; //todo????
            vm.setOtherSolicitor();
        };


        vm.$onChanges = function (changes) {
            if(changes.countryList){  //todo ????
                vm.countries=changes.countryList.currentValue;
            }
            if (changes.record && changes.record.currentValue) {
                vm.model = changes.record.currentValue;
            }
            if(changes.showErrors){
                vm.showDetailErrors=changes.showErrors.currentValue;
            }

        };

        vm.deleteRecord = function()  {
            vm.onDelete({id: vm.model.id})
        };

        vm.showError = function (ctrl) {
            if(!ctrl) return false;
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid && vm.showDetailErrors) )
        };

        vm.setOtherSolicitor = function () {
            if (vm.model.solicitedRequester.en === OTHER) { //todo ???? or vm.model.en
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