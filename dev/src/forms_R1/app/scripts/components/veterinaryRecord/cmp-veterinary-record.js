/**
 * Created by Abdessamad on 9/25/2016.
 */

(function () {
    'use strict';

    angular
        .module('veterinaryRecordModule', [
            'dossierDataLists',
            'hpfbConstants',
            'errorSummaryModule',
            'errorMessageModule'
        ])
})();

(function () {
    'use strict';

    angular
        .module('veterinaryRecordModule')
        .component('cmpVeterinaryRecord', {
            templateUrl: 'app/scripts/components/veterinaryRecord/tpl-veterinary-record.html',
            controllerAs: 'vetCtrl',
            controller: veterinaryRecCtrl,
            bindings: {
                deleteBtn: '<',
                record:'<',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                showErrors:'&',
                isDetailValid: '&',
                recordIndex:'<',
                errorSummaryUpdate:'<',
                showErrorSummary:'<'
            }

        });
    veterinaryRecCtrl.$inject=['DossierLists',  '$scope', 'FRENCH'];
    function veterinaryRecCtrl(DossierLists,  $scope, FRENCH) {

        var vm = this;
        vm.lang = "en";
       // vm.selfLifeUnitsList = DossierLists.getShelfLifeUnitsList();
        vm.vetModel = { //TODO move to service
            "speciesSubtypeUse": "",
            "foodProducingAnimalUse": "",
            "withdrawalTime":"",
            "days":"",
            "hours" :""
        };
        vm.backup = angular.copy(vm.vetModel);

        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.numberError = [
            {type: "number", displayAlias: "MSG_ERR_INVALID_NUM"}
        ];
        vm.numberInvalidMinMax=[
            {type: "number", displayAlias: "MSG_ERR_INVALID_NUM"},
            {type: "min", displayAlias: "MSG_ERR_INVALID_NUM_MIN"},
            {type: "max", displayAlias: "MSG_ERR_INVALID_NUM_MAX"}
        ];
        vm.dateFormatError=[
            {type: "date", displayAlias: "MSG_ERR_DATE_FORMAT"}
        ];

        vm.updateSummary=0; //message to update the summary component
        vm.showSummary=false; //show the error summary object
        vm.focusSummary=0;
        vm.alerts = [false, false, false]; //for help boxes
        vm.yesNoList = DossierLists.getYesNoList();
        vm.speciesSubspeciesList = DossierLists.getSpeciesSubspeciesList();

        vm.$onInit = function () {
            _setIdNames();
        };

        vm.$onChanges = function (changes) {
            if (changes.record && changes.record.currentValue) {
                vm.vetModel = angular.copy(changes.record.currentValue);
              //  vm.vetModel.shelfLifeNumber = Number(changes.record.currentValue.shelfLifeNumber);
                vm.backup = angular.copy(vm.vetModel);
            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
            }
            if(changes.errorSummaryUpdate){
                vm.updateErrorSummaryState();
            }

        };

        vm.updateVeterinaryModel = function () {
            if(vm.veterinaryForm.$valid) {
                vm.isDetailValid({state: true});
                vm.veterinaryForm.$setPristine();
                vm.onUpdate({record: vm.vetModel});

            }else{
                vm.showSummary=true;
                vm.makeFocused();
                vm.updateErrorSummaryState();
            }
        };

        vm.discardChanges = function(){
            vm.vetModel = angular.copy(vm.backup);
            vm.veterinaryForm.$setPristine();
            vm.onCancel();
        };

        vm.delete = function(){
            if (vm.record) {
                //  console.log('product details delete product');
                vm.onDelete();
            }
        };
        /**
         * Manages visibility of error messages for an indvidual control
         * @param isInvalid
         * @param isTouched
         * @returns {*}
         */
        vm.showError=function(ctrl){

            if(!ctrl){
                return false;
            }
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid &&  vm.showSummary) /* TODO add showErrors||(isInvalid && vm.showErrors())*/)
        };

        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
        };

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

        /**
         * Determines if form is in french
         * @returns {boolean}
         */
        vm.isFrench = function(){
            return(vm.lang===FRENCH);
        };

        $scope.$watch('vetCtrl.veterinaryForm.$dirty', function () {
            vm.isDetailValid({state: !vm.veterinaryForm.$dirty});
        }, true);

        $scope.$watch('vetCtrl.veterinaryForm.$error', function () {
            vm.updateErrorSummaryState();
        }, true);

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.veterinaryFormId = "veterinaryRecordForm" + scopeId;
            vm.speciesSubtypeId = "SPECIES_SUBTYPES"+ scopeId;
            vm.speciesSubtypeUseId = "SPECIES_SUBTYPES_USE" + scopeId;
            vm.foodProducingAnimalUseId = "FOOD_PRODUCING_ANIMAL_USE" +scopeId;
            vm.withdrawalTimeId = "WITHDRAWAL_TIME" +scopeId;
            vm.daysId = "DAYS" +scopeId;
            vm.hoursId = "HOURS" +scopeId;
        }

        /**
         * Sends a signal to the error Summary component to set focus
         */
        vm.makeFocused=function(){
            vm.focusSummary = vm.focusSummary+1;
        }

        /**
         * Sends a signal to the error Summary to recalculate its state
         */
        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;

        };

        vm.isFoodroducingAnimal=function() {
            return vm.vetModel.foodProducingAnimalUse === 'Y';
        };


    }

})();
