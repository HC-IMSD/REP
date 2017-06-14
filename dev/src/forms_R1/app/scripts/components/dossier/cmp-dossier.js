/**
 * Created by Abdessamad on 6/29/2016.
 */


(function () {
    'use strict';

    var dependencies = [
        'tabsModule',
        'refProductListModule',
         'drugUseModule',
         'scheduleAModule',
        'dossierDataLists',
        'dataLists',
        'filterLists',
        'fileIO',
        'contactModule26',
        'applicationInfoService',
        'applicationInfo',
        'ui.bootstrap',
        'numberFormat',
        'ngMessages',
        'ngAria',
        'theraClass',
        'dossierService',
        'ngSanitize'
    ];

    angular
        .module('dossierModule', dependencies);
})();

(function () {
    'use strict';
    angular
        .module('dossierModule')
        .component('cmpDossier', {
            templateUrl: 'app/scripts/components/dossier/tpl-dossier.html',
            controller: dossierCtrl,
            controllerAs: 'dos',
            bindings: {
                dossierRecordInput: '<',
                onUpdateDossier: '&',
                onDeleteDossier: '&',
                formType: '@',
                service: '<'
                // selectedCountryChanged: '&'
            }
        });

    dossierCtrl.$inject = ['$scope', 'hpfbFileProcessing', 'ApplicationInfoService', 'DossierService', 'DossierLists', 'getRoleLists', 'YES','INTERNAL_TYPE','EXTERNAL_TYPE','APPROVED_TYPE','FRENCH','$translate'];


    function dossierCtrl($scope, hpfbFileProcessing, ApplicationInfoService, DossierService, DossierLists, getRoleLists, YES,INTERNAL_TYPE,EXTERNAL_TYPE,APPROVED_TYPE,FRENCH,$translate) {

        var vm = this;
        vm.showContent = _loadFileContent; //binds the component to the function
        vm.applicationInfoService = new ApplicationInfoService();
        vm.userType = EXTERNAL_TYPE;
        vm.saveXMLLabel = "SAVE_DRAFT";
        vm.yesNoList = DossierLists.getYesNoList();
        vm.yesValue = YES; //is this needed?
        vm.formTypeList = getRoleLists.getFormTypes();
        //config for applicationInfoCompoenent
        vm.configField = {
            "label": "DOSSIER_ID",
            "fieldLength": "7",
            "tagName": "dossierID",
            "errorMsg": "MSG_LENGTH_7",
            "isDossier": true
        };

        vm.isIncomplete = true;
        vm.formAmend = false;
        vm.showAllErrors = false;
        vm.errorAppendix = [];
        vm.extraAppendix = [];
        vm.noThera = "";
        vm.oneRefSelected = "";
        vm.updateSummary=0; //increment to send message to error summaries
        vm.showSummary=false;
        vm.alerts = [false, false, false, false,false,false,false]; //for help boxes
        vm.lang = $translate.proposedLanguage() || $translate.use();




        vm.$onInit = function () {
            vm.dossierService = new DossierService();
            vm.dossierModel = vm.dossierService.getDefaultObject();
            vm.showSummary=false;
        };
        /**
         * @ngdoc captures any change events from variable bindings
         * @param changes
         */
        vm.$onChanges = function (changes) {

            if (changes.formType) {
                vm.userType = changes.formType.currentValue;
                if (vm.userType == INTERNAL_TYPE) {
                    vm.saveXMLLabel = "APPROVE_FINAL"
                } else {
                    vm.saveXMLLabel = "SAVE_DRAFT"
                }
            }

        };


        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;
        };

        vm.appendixMissingError = function () {
            return (vm.errorAppendix && vm.errorAppendix.length > 0);

        };
        vm.appendixExtraError = function () {
            return (vm.extraAppendix && vm.extraAppendix.length > 0);

        };


        vm.thirdPartySignedChanged = function () {
            return (vm.dossierModel.drugProduct.thirdPartySigned === YES);
        };

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            var resultJson = fileContent.jsonResult;
            if (resultJson) {
                vm.dossierModel = vm.dossierService.loadFromFile(resultJson);
                //process file load results
                //load into data model as result json is not null
                vm.dossierForm.$setDirty();
            }
            //if content is attempted to be loaded show all the errors
            vm.showNoRefReError();
            getAppendix4Errors();
            _setComplete();
            vm.showAllErrors = true;
            disableXMLSave();
        }

        vm.recordsChanged = function () {
            getAppendix4Errors();
        };

        vm.isRefProducts = function () {

            if (vm.dossierModel.isRefProducts === YES) {
                return true;
            }
            vm.dossierModel.drugProduct.canRefProducts = [];
            return false;
        };

        vm.setApplicationType = function (value) {
            vm.dossierModel.applicationType = value;
            vm.formAmend = vm.dossierModel.applicationType === vm.applicationInfoService.getAmendType();
            disableXMLSave();
        };

        vm.cdnRefUpdated = function (list) {
            //don't do anything with the list
            vm.showNoRefReError();
        };

        vm.showNoRefReError = function () {

            if (vm.dossierModel.drugProduct.canRefProducts.length > 0 && vm.dossierModel.isRefProducts === YES) {
                vm.oneRefSelected = "sel";
                return false
            } else {
                vm.oneRefSelected = "";
                return true;
            }
        };

        vm.disableJSONSave=function() {

            return(vm.dossierModel.applicationType == APPROVED_TYPE&& vm.isExtern());

        }

        function getAppendix4Errors() {
            var appendixCheck = vm.dossierService.getMissingAppendix4(vm.dossierModel);
            vm.errorAppendix = appendixCheck.missing;
            vm.extraAppendix = appendixCheck.extra;
        }

        /**
         * @ngdoc Used to determine if the form is incomplete
         *
         * @private
         * @return true if the form is incomplete
         */
        function _setComplete() {
            vm.isIncomplete = !vm.activityRoot.dossierID;
        }

        $scope.$watch("dos.dossierForm.$invalid", function () {
            disableXMLSave()
        }, true);

        /**
         * @ngdoc disables the XML save button
         */
        function disableXMLSave() {
            var formInvalid = true; //TODO hack
            if (vm.dossierForm) {
                formInvalid = vm.dossierForm.$invalid;
            }
            vm.disableXML = (formInvalid || (vm.dossierModel.applicationType == vm.applicationInfoService.getApprovedType() && vm.isExtern()));

        }

        function _setComplete() {
            vm.isIncomplete = !vm.dossierModel.dossierID;
        }

        /**
         * @ngdoc - determines if the form is the internal or the external version
         * @returns {boolean}
         */
        vm.isExtern = function () {
            return vm.userType == EXTERNAL_TYPE;

        };

        /**
         * Used to show all the fields in an error state. Can be activated by a parent component
         * @returns {boolean}
         */
        vm.showErrors = function () {
            return (vm.showAllErrors);
        };
        /**
         * For individual controls, whether to show the error for a fiedl
         * @param isInvalid - control $invalid flag
         * @param isTouched -control $touched flag
         * @returns {*|dossierCtrl.showErrors}
         */
        vm.showError = function (isInvalid, isTouched) {
            return ((isInvalid && isTouched) || (vm.showErrors() && isInvalid))
        };

        /***
         * Manages the schedule A details since the fields are always in the model
         */
        vm.isSchedA = function () {
            if (!vm.dossierModel || !vm.dossierModel.drugProduct || !vm.dossierService) return false; //never happen case;
            if (vm.dossierModel.drugProduct.isScheduleA) {

                return true;
            } else {
                vm.dossierModel.drugProduct.scheduleAGroup = vm.dossierService.getDefaultScheduleA();
            }
            return false;
        };

        /**
         * Save as a json file. Convert interal model to external model for output
         */
        vm.saveJson = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsJson(writeResult, _createFilename(), vm.dossierService.getRootTagName());
            vm.showAllErrors = true;
            //_setComplete()
        };

        vm.saveXML = function () {
            vm.showSummary=true;
            if(vm.dossierForm.$invalid) {
                console.log("sending message for dossier root update")
                vm.showErrorSummary = vm.showErrorSummary + 1;
                vm.updateErrorSummaryState();
            }else {
                var writeResult = _transformFile();
                hpfbFileProcessing.writeAsXml(writeResult, _createFilename(), vm.dossierService.getRootTagName());
                vm.showAllErrors = false;
                vm.dossierForm.$setPristine();
            }
        };


        /**
         * Takes the internal model and transforms to a json object compatible with the output
         * @returns {*}
         * @private
         */
        function _transformFile() {
            updateDate();
            if (!vm.isExtern()) {
                if(!vm.dossierForm.$pristine) {
                    vm.dossierModel.enrolmentVersion = vm.applicationInfoService.incrementMajorVersion(vm.dossierModel.enrolmentVersion);
                    vm.dossierModel.applicationType = ApplicationInfoService.prototype.getApprovedType();
                }
                // updateModelOnApproval(); //updates all the amend
            } else {

                vm.dossierModel.enrolmentVersion = vm.applicationInfoService.incrementMinorVersion(vm.dossierModel.enrolmentVersion);
            }
            return vm.dossierService.dossierToOutput(vm.dossierModel);
        }

        /**
         * @ngdoc -creates a filename for dossier file. If it exists,adds control number
         * @returns {string}
         * @private
         */
        function _createFilename() {

            var draft_prefix = "DRAFTREPDO";
            var final_prefix = "HCREPDO";
            var filename = "";
            var separator="-";
            if (vm.userType === INTERNAL_TYPE) {

                filename = final_prefix;
            } else {
                filename = draft_prefix;
            }
            if (vm.dossierModel && vm.dossierModel.dossierID) {
                filename = filename + separator + vm.dossierModel.dossierID;
            }
            if (vm.dossierModel.enrolmentVersion) {
                filename = filename + separator + vm.dossierModel.enrolmentVersion;
            }
            filename= filename.replace(".",separator);
            return filename.toLowerCase();
        }

        /**
         * @ngdoc method -updates the date field to the current date
         */
        function updateDate() {
            if (vm.dossierModel) {
                vm.dossierModel.dateSaved = vm.applicationInfoService.getTodayDate();
            }
        }
        
        /**
         * Manages errors for no Thera
         * @returns {boolean}
         */
        vm.noTheraRecs = function () {

            if (!vm.dossierModel || !vm.dossierModel.drugProduct) {
                vm.noThera = "";
                return false;
            }
            if (!vm.dossierModel.drugProduct.therapeutic || vm.dossierModel.drugProduct.therapeutic.length === 0) {
                vm.noThera = "";
                return true;
            }
            vm.noThera = vm.dossierModel.drugProduct.therapeutic.length;
            return false;
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



    }//endcontroller

})();


