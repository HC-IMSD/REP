(function () {
    'use strict';
    angular
        .module('companyMain', [
            'companyService',
            'applicationInfoService',
            'ngMessages',
            'ngAria',
            'addressList',
            'contactList2',
            'fileIO',
            'ngSanitize',
            'applicationInfo',
            'filterLists',
            'hpfbConstants',
            'ui.bootstrap'
        ])
})();

(function () {
    'use strict';
    angular
        .module('companyMain')
        .component('cmpCompanyMain', {
            templateUrl: 'app/scripts/components/companyMain/tpl-company-main.html',
            controller: companyMainCtrl,
            controllerAs: 'main',
            bindings: {
                formType: '@'
            }
        });

    companyMainCtrl.$inject = ['CompanyService', 'ApplicationInfoService', 'hpfbFileProcessing', '$filter', '$scope'];

    function companyMainCtrl(CompanyService, ApplicationInfoService, hpfbFileProcessing, $filter, $scope) {

        var vm = this;
        //TODO magic number
        vm.rootTag = 'COMPANY_ENROL';
        vm.isIncomplete = true;
        vm.formAmendType = false;
        vm.userType = "EXT";
        vm.saveXMLLabel = "SAVE_DRAFT";
        vm.updateValues = 0;
        vm.applicationInfoService = new ApplicationInfoService();
        vm.showContent = _loadFileContent;
        vm.disableXML = true;
        vm.disableDraftButton=false;
        var _company = new CompanyService();
        vm.configCompany = {
            "label": "COMPANY_ID",
            "fieldLength": "6",
            "tagName": "companyId"
        };

        vm.companyService = _company;
        vm.applTypes = vm.companyService.getApplicationTypes(); //TODO service ofor app types
        vm.company = _company.getModelInfo();

       //TODO this is awkward for managing
        vm.alert1 = {
            show: false
        };
        vm.alert2 = {
            show: false
        };
        vm.alert3 = {
            show: false
        };
        vm.lang="en";

        vm.initUser = function (id) { //TODO needed?
            /*
             if (!id) id = 'EXT'
             vm.userType = id;
             if (id == 'INT') {
             vm.saveXMLLabel = "APPROVE_FINAL"
             } else {
             vm.saveXMLLabel = "SAVE_DRAFT"
             }*/
        };
        vm.$onInit=function(){
          //  vm.lang=
        }

        vm.$onChanges = function (changes) {
            if (changes.formType) {
                vm.userType = changes.formType.currentValue;
                if (vm.userType == 'INT') {
                    vm.saveXMLLabel = "APPROVE_FINAL"
                } else {
                    vm.saveXMLLabel = "SAVE_DRAFT"
                }
            }

        };

        /**
         * @ngdoc method -returns whether this application is an amendment
         * @returns {boolean}
         */
        vm.setAmend = function () {

            vm.formAmendType = (vm.company.applicationType === vm.applicationInfoService.getAmendType())
        };

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
        };

        /**
         * Creates a filename based on HC specifications
         * @returns {string}
         * @private
         */
        function _createFilename() {
            var draft_prefix="DRAFTREPCO";
            var final_prefix= "HCREPCO";
            var filename="";
            if( vm.userType==='INT'){ //TODO magic numbers

                filename=final_prefix;
            }else{
                filename=draft_prefix;
            }
            if(vm.company.companyId){
                filename=filename+"_"+vm.company.companyId;
            }
            if(vm.company.enrolmentVersion){
                //var parts = vm.company.enrolmentVersion.split('.')
                filename = filename + "_" + vm.company.enrolmentVersion;
            }
            return filename;
        }

        /**
         * @ngdcc method updates data and increments version before creating json
         */

        function _transformFile() {
            updateDate();
            if (!vm.isExtern()) {
                vm.company.enrolmentVersion = vm.applicationInfoService.incrementMajorVersion(vm.company.enrolmentVersion);
                vm.company.applicationType = ApplicationInfoService.prototype.getApprovedType();
                updateModelOnApproval();
            } else {
                vm.company.enrolmentVersion = vm.applicationInfoService.incrementMinorVersion(vm.company.enrolmentVersion)
            }
            return _company.transformToFileObj(vm.company);
        }

        $scope.$watch("main.companyEnrolForm.$valid", function () {
            disableXMLSave()
        }, true);

        function disableXMLSave() {
            var isApprovedExternal= (vm.company.applicationType == vm.companyService.getApprovedType() && vm.isExtern());

            vm.disableDraftButton=isApprovedExternal;
            vm.disableXML = vm.companyEnrolForm.$invalid || isApprovedExternal;
        }

        function disableJSONSave() {

            vm.disableJson = (vm.company.applicationType == vm.companyService.getApprovedType() && vm.isExtern())
        }

        function _setComplete() {
            vm.isIncomplete = !vm.company.companyId;
        }

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            _company = new CompanyService();
            var resultJson = fileContent.jsonResult;
            if (resultJson) {
                _company.transformFromFileObj(resultJson);
                vm.company = {};
                angular.extend(vm.company, _company.getModelInfo());
                _setComplete();
                vm.setAmend();

            }
            disableXMLSave();
        }
        /**
         * ngdoc method to set the application type to amend
         * @private
         */
        vm.setApplType = function (type) {

            vm.company.applicationType = type;
            disableXMLSave();
            vm.setAmend();
        };

        //used on update
        vm.onUpdateAddressList = function (newList) {
            vm.company.addressList = newList;
        };

        vm.getNewAddress = function () {
            return _company.createAddressRecord();
        };

        vm.getNewContact = function () {
            return _company.createContactRecord();
        };

        //TODO remove?
        vm.updateAddressRecord = function (address) {
            if (!address) return;
            var idx = vm.company.addressList.indexOf(
                $filter('filter')(vm.company.addressList, {addressID: address.addressID}, true)[0]
            );
            vm.company.addressList[idx] = address;
            var temp = vm.company.addressList;
            vm.company.addressList = [];
            vm.company.addressList = temp;
        };

        //TODO remove?
        vm.onUpdateContactList = function (newList) {
            vm.company.contactList = newList;
        };

        /**
         * @ngdoc method -updates the date field to the current date
         */
        function updateDate() {
            if (vm.company) {
                vm.company.dateSaved = vm.applicationInfoService.getTodayDate()
            }
        }


        vm.isExtern = function () {
            return vm.userType == "EXT";

        };
        /**
         * @ngdoc method when a form gets approved
         * remove any amendment checkboxes
         */
        function updateModelOnApproval() {
            //reset any amend selections
            for (var i = 0; i < vm.company.addressList.length; i++) {
                vm.company.addressList[i].amendRecord = false;
            }
            for (var j = 0; j < vm.company.contactList.length; j++) {
                vm.company.contactList[j].amendRecord = false;
            }
        }

        /**
         * Closes the instruction alerts
         * @param value
         */
        vm.closeAlert = function (value) {
            switch (value) {
                case '1':
                    vm.alert1.show = false;
                    break;
                case '2':
                    vm.alert2.show = false;
                    break;
                case '3':
                    vm.alert3.show = false;
                    break;
            }
        };

        vm.addInstruct = function (value) {

            switch (value) {
                case '1':
                    vm.alert1.show = true;
                    break;
                case '2':
                    vm.alert2.show = true;
                    break;
                case '3':
                    vm.alert3.show = true;
                    break;
            }
        }


    }
})();
