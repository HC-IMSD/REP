/**
 * Created by dkilty on 10/30/2016.
 */

(function () {
    'use strict';

    angular
        .module('countryRecordModule',
            [   'ui.select',
                'hpfbConstants',
                'errorMessageModule'
            ])
})();

(function () {
    'use strict';

    angular
        .module('countryRecordModule')
        .config(function (uiSelectConfig) {
            //choices: select2, bootstrap, selectize
            uiSelectConfig.theme = 'select2';
        })
        .component('cmpCountryRecord', {
            templateUrl: 'app/scripts/components/country-list/tpl-country-record.html',
            controller: countryRecordController,
            controllerAs:'countryRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                showErrors: '<',
                countryList:'<',
                updateCountryList:'<',
                fieldsetLabel:'@'
            }
        });

    countryRecordController.$inject = ['$scope','$filter','$translate','UNKNOWN'];
    function countryRecordController($scope,$filter, $translate, UNKNOWN) {
        var vm = this;

        vm.model = {"id": "", "country": "","unknownCountryDetails":"","display":""};
        vm.countries=[];
        vm.onChangeCount = 0;
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
        vm.countryChanged=function($item,$model){
            // vm.model.id = vm.record.id;
            // vm.model.display = vm.record.country;
            for(var i = 0; vm.countries.length; i++){
                if(vm.countries[i][vm.lang] === vm.model.display){
                    vm.model.country = vm.countries[i];
                    break;
                }
            }
            vm.updateCountryList();
        };


        vm.$onChanges = function (changes) {
            if(changes.countryList && vm.onChangeCount < 2){
                vm.updateCountryList();
                vm.countries=changes.countryList.currentValue;
                vm.onChangeCount++;
            } else {
                vm.onChangeCount = 0;
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

        vm.isUnknown=function(){
            if(!vm.model || !vm.model.country){
                return false;
            }
            if(vm.model.country.id===UNKNOWN){
                return true;
            }
            return false;
        };

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.countryId="country_name" + scopeId;
            vm.unknownCountryId="unknown_country_details" + scopeId;
        }
    }
})();