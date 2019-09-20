/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('formulationRecordModule', 
            [
                'activeIngListModule',
                'nonMedIngListModule',
                'containerTypeListModule',
                'materialIngListModule',
                'roaListModule',
                'countryListModule',
                'dossierDataLists',
                'hpfbConstants',
                'ui.select',
                'errorSummaryModule',
                'errorMessageModule',
                'alertModule'
            ])
})();

(function () {
    'use strict';

    angular
        .module('formulationRecordModule')
        .config(function (uiSelectConfig) {
            //choices: select2, bootstrap, selectize
            uiSelectConfig.theme = 'select2';
        })

        .component('cmpFormulationRecord', {
            templateUrl: 'app/scripts/components/formulations/tpl-formulation-record.html',
            controllerAs: 'formulRecCtrl',
            controller: formulationRecCtrl,
            bindings: {
                deleteBtn: '<',
                record:'<',
                //onAddNew: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                showErrors:'&',
                recordChanged:'&',
                addCopy:'&',
                errorSummaryUpdate:'<',
                isFileLoaded: '<',
                showErrorSummary:'<',
                updateErrorSummary:'&'
            }

        });

    formulationRecCtrl.$inject = ['DossierLists', '$translate', '$scope', 'FRENCH'];
    function formulationRecCtrl(DossierLists, $translate ,$scope, FRENCH) {

        var vm = this;
        vm.noCountries="";
        vm.noROAValues="";
        vm.noActiveValues="";
        vm.dosageFormList = DossierLists.getDosageFormList();
        vm.otherValue = DossierLists.getDosageOther();
        vm.yesNoList = DossierLists.getYesNoList();
        vm.updateSummary=0; //message to update the summary component
        vm.showSummary=false; //show the errror summary object
        vm.alerts = [false, false, false,false]; //for help boxes
       // vm.formName="";
        vm.summaryName="";
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.frmModel = {
            "isAnimalHumanMaterial": ""
        };
        vm.exclusions={
            "ingRecCtrl.activeIngForm":"true",
            "nIngRecCtrl.nonMedIngForm":"true",
            "mirCtrl.materialIngRecordForm":"true",
            "ctrCtrl.containerTypeForm":"true"
        };
        vm.alias={
            "no_country": {
                "type": "elementnoid",
                "target": "list_country"
            },
            "no_roa": {
                "type": "element",
                "target": "list_roa"
            },
            "no_active": {
                "type": "element",
                "target": "list_active"
            },
            "no_container": {
                "type": "element",
                "target": "list_container"
            }
        };
        vm.transcludeList={

        };
        // "cmp-roa-record": "true"
        vm.$onInit = function () {

            _setIdNames();
            vm.noCountry();
        };
        vm.$onChanges=function(changes){
            if(changes.record){
                vm.frmModel = changes.record.currentValue;
                vm.summaryName="cmp-formulation-record_"+(vm.frmModel.formulationId-1);
                vm.updateDosageForm();
            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
               // console.log("Formulation show summary value is "+vm.showSummary)
            }
            if(changes.errorSummaryUpdate){

                vm.updateErrorSummaryState();
            }

        };

        vm.delete = function(){
            if (vm.record) {
                vm.onDelete();
            }

        };
        vm.copy=function(){
            if(vm.record){
                var formulationCopy=angular.copy(vm.record);
                vm.addCopy({record:formulationCopy});
            }

        };
        //TODO Delete
       /* vm.showErrors=function(){
            return vm.showSummary;
        }
*/
        vm.showError=function(isInvalid,isTouched){
           return(((isInvalid && isTouched)||(isInvalid && vm.showSummary)))
        };
        /***
         * Shows the no country of manufacture errro
         * TODO: Not show this until someone saves?
         * @returns {boolean}
         */
        vm.noCountry=function(){
            if(!vm.frmModel){
                vm.noCountries="";
                return false;
            }
            if(!vm.frmModel.countryList || vm.frmModel.countryList.length===0){
                vm.noCountries="";
                return true;
            }
            vm.noCountries=vm.frmModel.countryList.length;
            return false;
        };
        /**
         * Tracks for error handling if there are one or more ROA
         * @returns {boolean}
         */
        vm.noROA=function(){

            if(!vm.frmModel){
                vm.noROAValues="";
                return false;
            }
            if(!vm.frmModel.routeAdmins || vm.frmModel.routeAdmins.length===0){
                vm.noROAValues="";
                return true;
            }
            vm.noROAValues="values";
            return false;

        };
        /*vm.noActives=function(){

            if(!vm.frmModel){
                vm.noActiveValues="";
                return true;
            }
            if(!vm.frmModel.activeIngList || vm.frmModel.activeIngList.length===0){
                vm.noActiveValues="";
                return true;
            }
            vm.noActiveValues="values";
            return false;

        };*/
        /**
         * Checks if there is at least one container type
         * @returns {boolean}
         */
        vm.noContainers=function(){

            if(!vm.frmModel){
                vm.noContainerValues="";
                return true;
            }
            if(!vm.frmModel.containerTypes || vm.frmModel.containerTypes.length===0){
                vm.noContainerValues="";
                return true;
            }
            vm.noContainerValues="values";
            return false;

        };



        vm.updateActiveIngList = function(list){
            if(!list) return;

            vm.frmModel.activeIngList = list;
            vm.recordChanged();
        };

        vm.updateNonMedIngList = function(list){
            if(!list) return;

            vm.frmModel.nMedIngList = list;
            vm.recordChanged();
        };

        vm.updateContainerTypeList = function(list){
            if(!list) return;

            vm.frmModel.containerTypes = list;

        };

        vm.updateMaterialList = function(list){
            if(!list) return;

            vm.frmModel.animalHumanMaterials = list;
            vm.recordChanged();
        };

        vm.updateRoaList = function(list){
            if(!list) return;

            vm.frmModel.routeAdmins = list;
        };

        vm.updateCountryList = function(list){
            if(!list) return;

            vm.frmModel.countryList = list;
            vm.noCountry();
        };
        /**
         * @ngDoc determines if dosage Other should be shown
         * @returns {boolean}
         */
        vm.isDosageOther = function () {

            if(!vm.frmModel|| !vm.frmModel.dosageForm) return false;
            if (vm.frmModel.dosageForm.id === vm.otherValue) {
                return true;
            } else {
                vm.frmModel.dosageFormOther = "";
                return false;
            }
        };

        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;
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
        vm.isFrench=function(){
            return(vm.lang===FRENCH);
        };

        vm.dosageFormChange = function() {
            var found = false;
            for(var i = 0; i < vm.dosageFormList.length; i++) {
                var option =vm.dosageFormList[i];
                if(option['id'] === vm.frmModel.dosageFormHtml) {
                    vm.frmModel.dosageForm = option;
                    found = true;
                    break;
                }
            }
            if( ! found ){
                vm.frmModel.dosageForm = {};
                vm.frmModel.dosageFormHtml = "";
            }
        };

        vm.updateDosageForm = function() {
            if (vm.frmModel.dosageForm && vm.frmModel.dosageForm.id != "") {
                for (var i = 0; i < vm.dosageFormList.length; i++) {
                    var option = vm.dosageFormList[i];
                    if (option['id'] === vm.frmModel.dosageForm['id']) {
                        vm.frmModel.dosageFormHtml = option[vm.lang];
                        break;
                    }
                }
            }
        };

        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.formulationFormRecordId="formulationRecord" + scopeId;
            vm.dosageId = "dosage_form" + scopeId;
            vm.dosageOtherId = "dosage_form_other" + scopeId;
            vm.noActiveId="no_active"+scopeId; //Todo: can remove?
            vm.noContainerId="no_container"+scopeId;
            vm.noRoaId="no_roa"+scopeId;
            vm.noCountryId="no_country"+scopeId;
            vm.isAnimalHumanMaterialId="is_animal_human_material"+scopeId;
        }

        $scope.$watch('formulRecCtrl.formulationForm.$error', function () {
            vm.updateErrorSummary();
        }, true);


    }
})();
