/**
 * Created by dkilty on 03/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspMain', [
            'fileIO',
            'applicationInfoService',
            'hpfbConstants',
            'cspService',
            'cspApplicant',
            'cspHCOnly',
            'cspMainApplication',
            'cspPatent',
            'cspTimelySubmission',
            'cspFeePayment',
            'cspCertification'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspMain')
        .component('cmpCspMain', {
            templateUrl: 'app/scripts/components/cspMain/tpl-csp-main.html',
            controller: cspMainCtrl,
            controllerAs: 'main',
            bindings: {
                formType: '@'
            }
        });

    cspMainCtrl.$inject = ['CspService', 'hpfbFileProcessing', 'ApplicationInfoService', 'INTERNAL_TYPE', 'EXTERNAL_TYPE'];
    function cspMainCtrl(CspService, hpfbFileProcessing, ApplicationInfoService, INTERNAL_TYPE, EXTERNAL_TYPE) {

        var vm = this;
        vm.userType=EXTERNAL_TYPE;
        vm.saveXMLLabel = "SAVE_DRAFT"; //used to dynamically label save button
        vm.modelService = null;
        vm.cspModel = {};
        vm.countryList = [];
        vm.paymentType = [];
        vm.drugUseList = [];
        vm.rootTag = "";
        vm.showContent = _loadFileContent; //could just make a function avail
        vm.applicationInfoService = null;


        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit=function(){
            vm.modelService = new CspService(); //create the service
            vm.cspModel = vm.modelService.getModelInfo(); //the model
            vm.countryList = vm.modelService.getMarketingCountries();
            vm.paymentType = vm.modelService.getAdvancedPaymentTypes();
            vm.drugUseList = vm.modelService.getDrugUses();
            vm.rootTag = vm.modelService.getRootTag();
            vm.applicationInfoService = new ApplicationInfoService();
        };

        /**
         * Called on binding changes
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

        vm.showHCOnlySection=function(){

            return (vm.userType===INTERNAL_TYPE);
        };

        /**
         * If a file is successfully loaded, this function is called
         * Transform the raw data here to the internal data model
         * @param fileContent
         * @private
         */
        function _loadFileContent(fileContent) {
            if (!fileContent)return;

            var resultJson = fileContent.jsonResult;
            if (resultJson) {
                vm.modelService = new CspService(); //do I need to do this?
                vm.modelService.transformFromFileObj(resultJson);
                vm.cspModel = vm.modelService.getModelInfo(); //the model
                //angular.extend(vm.company, vm.companyService.getModelInfo());
                //vm.companyEnrolForm.$setDirty();
            }
        }

        /**
         *
         * @ngdoc method Saves the model content in JSON format
         */
        vm.saveJson = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsJson(writeResult, _createFilename(), vm.rootTag);
        };
        /**
         * @ngdoc method - saves the data model as XML format
         */
        vm.saveXML = function () {
            var writeResult = _transformFile();

            hpfbFileProcessing.writeAsXml(writeResult, _createFilename(), vm.rootTag);
            vm.companyEnrolForm.$setPristine();
        };


        /**
         * Creates the filename for the output file
         * @returns {string}
         * @private
         */
        function _createFilename() {
            //TODO algorithm
            return "foo"
        }

        function _transformFile() {
            updateDate();
            /* if (!vm.isExtern()) {
             if(!vm.companyEnrolForm.$pristine) {
             vm.company.enrolmentVersion = vm.applicationInfoService.incrementMajorVersion(vm.company.enrolmentVersion);
             vm.company.applicationType = ApplicationInfoService.prototype.getApprovedType();
             updateModelOnApproval();
             }
             } else {
             vm.company.enrolmentVersion = vm.applicationInfoService.incrementMinorVersion(vm.company.enrolmentVersion)
             }*/
            return vm.modelService.transformToFileObj(vm.cspModel);
        }

        function updateDate() {
            if (vm.company) {
                vm.company.dateSaved = vm.applicationInfoService.getTodayDate()
            }
        }

    }
})();


