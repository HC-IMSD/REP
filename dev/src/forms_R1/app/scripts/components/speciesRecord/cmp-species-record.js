/**
 * Created by steveZhao on 09/03/2019.
 */

(function () {
    'use strict';

    angular
        .module('speciesRecordModule',
            [
                'hpfbConstants',
                'dossierDataLists',
                'filterLists',
                'errorMessageModule'
            ])
})();

(function () {
    'use strict';

    angular
        .module('speciesRecordModule')
        .component('cmpSpeciesRecord', {
            templateUrl: 'app/scripts/components/speciesRecord/tpl-species-record.html',
            controller: speciesRecordController,
            controllerAs:'speciesRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                onUpdate: '&',
                showErrors: '<',
                isFocus: '<',
                cancelFocus: '&'
            }
        });

    speciesRecordController.$inject = ['DossierLists', '$translate', '$scope'];
    function speciesRecordController(DossierLists, $translate, $scope) {
        var vm = this;
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.speciesList = DossierLists.getSpeciesList();
        vm.subtypesList = DossierLists.getSubTypesList();

        vm.model = {
            species: "",
            subtypes: "",
            specSubt: "",
            isTreatFPA: "",
            withdrawalDays: "",
            withdrawalHours: "",
            timeCombined: ""
        };

        vm.updateSummary=0; //triggers and error summary update
        vm.fdId="";
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];

        vm.showDetailErrors=false;
        vm.min5Error = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_MIN5"}
        ];

        vm.$onInit = function(){
            vm.showDetailErrors=false;
            if (vm.record) {
                vm.model = vm.record;
            }
            _setIdNames();
        };

        vm.$onChanges = function (changes) {
            if (changes.record && changes.record.currentValue) {
                vm.model = changes.record.currentValue;
            }
            if(changes.showErrors){
                vm.showDetailErrors=changes.showErrors.currentValue;
            }

        };
        vm.updateErrorSummaryState=function(){
            vm.updateSummary= vm.updateSummary+1;
        };

        vm.saveRecord = function()  {
            if (vm.speciesForm.$valid) {
                vm.model.specSubt = vm.model.species[vm.lang] + ', ' + vm.model.subtypes[vm.lang];
                vm.model.timeCombined = vm.model.withdrawalDays + ' days and ' + vm.model.withdrawalHours + ' hours';
                if (vm.record) {
                    vm.onUpdate({species: vm.model});
                }
                vm.speciesForm.$setPristine();
                vm.showDetailErrors=false;
                vm.updateErrorSummaryState();
                vm.model.focusSpeciesId = false;
            } else {
                vm.showDetailErrors=true;
            }
        };

        vm.deleteRecord = function()  {
            vm.onDelete({id: vm.model.speciesId})
        };

        vm.showError = function (ctrl) {
            if(!ctrl) return false;
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid && vm.showDetailErrors) )
        };

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.speciesId="VET_SPECIES"+scopeId;
            vm.subtypesId="VET_SUBTYPES"+scopeId;
            vm.isTreatFPAId = "IS_TREAT_FP" + scopeId;
            vm.daysId = "VET_DAYS" + scopeId;
            vm.hoursId = "VET_HOURS" + scopeId;
        }
    }
})();