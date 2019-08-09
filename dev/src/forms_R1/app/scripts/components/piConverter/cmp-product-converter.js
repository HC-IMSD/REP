/**
 * Created by Abdessamad on 6/29/2016.
 */


(function () {
    'use strict';

    var dependencies = [
        'dossierDataLists',
        'dataLists',
        'filterLists',
        'fileIO',
        'applicationInfoService',
        'ui.bootstrap',
        'numberFormat',
        'ngMessages',
        'ngAria',
        'piConverterService',
        'ngSanitize'
    ];

    angular
        .module('piConverterModule', dependencies);
})();

(function () {
    'use strict';
    angular
        .module('piConverterModule')
        .component('cmpProductConverter', {
            templateUrl: 'app/scripts/components/piConverter/tpl-product-converter.html',
            controller: piConverterCtrl,
            controllerAs: 'picCtrl',
            bindings: {
                dossierRecordInput: '<',
                onUpdateDossier: '&',
                onDeleteDossier: '&',
                formType: '@',
                service: '<'
            }
        });

    piConverterCtrl.$inject = ['$scope', 'hpfbFileProcessing', 'ApplicationInfoService', 'PiConverterService', 'DossierLists', 'getRoleLists', 'YES','INTERNAL_TYPE','EXTERNAL_TYPE','APPROVED_TYPE','FRENCH','$translate','$anchorScroll','$location'];


    function piConverterCtrl($scope, hpfbFileProcessing, ApplicationInfoService, PiConverterService, DossierLists, getRoleLists, YES,INTERNAL_TYPE,EXTERNAL_TYPE,APPROVED_TYPE,FRENCH,$translate, $anchorScroll,$location) {

        var vm = this;
        vm.showContent = _loadFileContent; //binds the component to the function
        vm.applicationInfoService = new ApplicationInfoService();
        vm.userType = EXTERNAL_TYPE;
        vm.saveXMLLabel = "APPROVE_FINAL";
        vm.yesNoList = DossierLists.getYesNoList();
        vm.yesValue = YES; //is this needed?
        vm.formTypeList = getRoleLists.getFormTypes();

        vm.isIncomplete = true;
        vm.formAmend = false;
       // vm.showAllErrors = false;
        vm.errorAppendix = [];
        vm.extraAppendix = [];
        vm.noThera = "";

        //error summary fields
        vm.updateSummary=0; //increment to send message to error summaries
        vm.showSummary=false;
        vm.isFileLoaded=false;
        vm.transcludeList={};
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.rootTag="";
        vm.drugUseList=[];
        vm.disinfectantTypeList=[];
        vm.extraAppendixModel="none";
        vm.missingAppendixModel="none";

        vm.$onInit = function () {
            vm.showSummary = false;
            vm.drugUseList = DossierLists.getDrugUseList();
            vm.disinfectantTypeList = DossierLists.getDisinfectantTypeList();
            // _setIdNames();
            vm.piConverterService = new PiConverterService();
            vm.model = vm.piConverterService.getDefaultObject();
            vm.rootTag= vm.piConverterService.getRootTagName();
            vm.setVisibleTabIndex=-1;
        };
        /**
         * @ngdoc captures any change events from variable bindings
         * @param changes
         */
        vm.$onChanges = function (changes) {

          /*  if (changes.formType) {
                vm.userType = changes.formType.currentValue;
                if (vm.userType === INTERNAL_TYPE) {
                    vm.saveXMLLabel = "APPROVE_FINAL"
                } else {
                    vm.saveXMLLabel = "SAVE_DRAFT"
                }
            }
           */
        };


        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;
        };

        vm.appendixMissingError = function () {
            if(vm.errorAppendix && vm.errorAppendix.length > 0){
                vm.missingAppendixModel="";
                return true
            }else{
               // vm.missingAppendixModel=false;
                return false
            }

        };
        vm.appendixExtraError = function () {
            if (vm.extraAppendix && vm.extraAppendix.length > 0){
                vm.extraAppendixModel="";
                return true;
            }else{
               // vm.extraAppendixModel=false;
                return false;
            }

        };


        vm.thirdPartySignedChanged = function () {
            return (vm.model.drugProduct.thirdPartySigned === YES);
        };

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            var resultJson = fileContent.jsonResult;
            if (resultJson) {
                vm.model = vm.piConverterService.loadFromFile(resultJson);
                //process file load results
                //load into data model as result json is not null
                vm.drugUseUpdate();
                vm.drugProdForm.$setDirty();
            }
            //if content is attempted to be loaded show all the errors
            getAppendix4Errors();
            _setComplete();
            vm.isFileLoaded = true;
           // vm.showAllErrors = true;
           // disableXMLSave();
        }

        vm.recordsChanged = function () {
            getAppendix4Errors();
        };

        function getAppendix4Errors() {
            var appendixCheck = vm.piConverterService.getMissingAppendix4(vm.model);
            vm.errorAppendix = appendixCheck.missing;
            vm.extraAppendix = appendixCheck.extra;
            vm.appendixMissingError();
            vm.appendixExtraError();
        }

        /**
         * @ngdoc Used to determine if the form is incomplete
         * Todo: check if this works
         * @private
         * @return true if the form is incomplete
         */
        function _setComplete() {
            vm.isIncomplete = !vm.model.dossierID;
        }

        $scope.$watch("drugProdCtrl.drugProdForm.$error", function () {

            vm.updateErrorSummaryState();
        }, true);

        /**
         * @ngdoc - determines if the form is the internal or the external version
         * @returns {boolean}
         */
        vm.isExtern = function () {
            return vm.userType === EXTERNAL_TYPE;

        };

        /***
         * determin to display Disinfectant Type field
         */
        vm.isDisinfectant = function () {
            if (!vm.model || !vm.model.drugProduct || !vm.model.drugProduct.drugUse) return false;
            return (vm.model.drugProduct.drugUse.id === "DISINFECT");
        };

        /***
         * reset Disinfectant Type field
         */
        vm.drugUseUpdate = function () {
            if (!vm.isDisinfectant()) {
                vm.model.drugProduct.disinfectantType = {
                    hospital: false,
                    foodProcessing: false,
                    medicalInstruments: false,
                    domestic: false,
                    barn: false,
                    institutionalIndustrial: false,
                    contactLens: false
                };
            }
        };

        /**
         * Save as a json file. Convert interal model to external model for output
         */
        vm.saveJson = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsJson(writeResult, _createFilename(), vm.piConverterService.getRootTagName());
           // vm.showAllErrors = true; //TODO get rid of this?
            //_setComplete()
        };


        /**
         * Takes the internal model and transforms to a json object compatible with the output
         * @returns {*}
         * @private
         */
        function _transformFile() {
            updateDate();
            if (!vm.isExtern()) {
                if(!vm.drugProdForm.$pristine) {
                    vm.model.enrolmentVersion = vm.applicationInfoService.incrementMajorVersion(vm.model.enrolmentVersion);
                    //vm.model.applicationType = ApplicationInfoService.prototype.getApprovedType();
                }
                // updateModelOnApproval(); //updates all the amend
            } else {

                vm.model.enrolmentVersion = vm.applicationInfoService.incrementMinorVersion(vm.model.enrolmentVersion);
            }
            return vm.piConverterService.formDataToOutput(vm.model);
        }

        /**
         * @ngdoc -creates a filename for dossier file. If it exists,adds control number
         * @returns {string}
         * @private
         */
        function _createFilename() {

            var date = new Date();
            var filename = "HCREPPI";
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var separator = "-";

            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }

            filename = filename + separator + date.getFullYear() + separator + month + separator + day + separator + hours + minutes;
            return (filename.toLowerCase());
        }

        /**
         * @ngdoc method -updates the date field to the current date
         */
        function updateDate() {
            if (vm.model) {
                vm.model.dateSaved = vm.applicationInfoService.getTodayDate();
            }
        }


    }//endcontroller

})();


