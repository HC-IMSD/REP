(function () {
    'use strict';
    angular
        .module('dossierApp', [
            'pascalprecht.translate',
            'ngMessages',
            'ngAria',
            'addressList',
            'contactList',
            'fileIO'
        ])
})();

(function () {
    'use strict';
    angular
        .module('dossierApp')
        .controller('MainController', MainController);

    MainController.$inject = ['CompanyService','hpfbFileProcessing','$filter']

    function MainController(CompanyService,hpfbFileProcessing,$filter) {

        var vm = this;
        var url = "data/company-enrol.txt";
        //TODO magic number
        vm.rootTag='COMPANY_ENROL'
        vm.isIncomplete = true;

        vm.applTypes = ["NEW", "AMEND", "APPROVED"]
        vm.setAmendState = _setApplTypeToAmend;
        vm.showContent = _loadFileContent;

        var _company = new CompanyService();

       vm.company = {
           dataChecksum: "",
           enrolmentVersion: "1",
           dateSaved: "1999-01-21",
           applicationType: "APPROVED",
           softwareVersion: "string",
           companyId: "string",
           addressList: [],
           contactList: []
       };
       vm.company = _company.getModelInfo();
       // angular.extend(vm.company,_company.getModelInfo())
       // vm.company.applicationType = "AMEND";

        vm.isAmend=function(){
            return(vm.company.applicationType==="AMEND")
        }
        //converts the address list into something usable
        vm.saveJson=function(){
            updateDate();
            incrementMinorVersion();
            //july company holds all the current
            var writeResult=_company.transformToFileObj(vm.company);
            console.log("this is the transform result:\n"+writeResult)
            hpfbFileProcessing.writeAsJson(writeResult, "test.json", vm.rootTag);
        }
        function _setComplete() {
            if (vm.company.companyId) {
                vm.isIncomplete = false;
            } else {
                vm.isIncomplete = true;
            }
        }
        function _loadFileContent(fileContent) {
            console.log("Calling the content callback")
            if(!fileContent)return;
            _company = new CompanyService();
            //used to do this way, caused focus issues
           // vm.company = _company.getModelInfo();

           var resultJson = fileContent.jsonResult;
            console.log("Result JSON is: " + JSON.stringify(resultJson))
            if(resultJson) {
                _company.transformFromFileObj(resultJson)
                vm.company={}
                angular.extend(vm.company,_company.getModelInfo())
                _setComplete();
            }
        };
        function _setApplTypeToAmend() {
            //TODO magic number
            vm.company.applicationType = 'AMEND';
        }

        //used on update
        vm.onUpdateAddressList = function (newList) {
            console.log("app update the address List")
            vm.company.addressList = newList;
        }

        vm.getNewAddress = function () {
            console.log("This is hte temptest")
            var result = _company.createAddressRecord();
            return result;
        }

        vm.getNewContact = function () {
            console.log("This is hte contact gte")
            var result = _company.createContactRecord();
            return result;
        }

        vm.updateAddressRecord=function(address){
            console.log("in app updateAddressRecord"+address)
            if(!address) return;
            var idx = vm.company.addressList.indexOf(
                $filter('filter')(vm.company.addressList, {addressID: address.addressID}, true)[0]
            );
            console.log("found an entry "+idx)
            vm.company.addressList[idx] = address
            var temp=vm.company.addressList;
            vm.company.addressList=[];
            vm.company.addressList=temp;
        }

        vm.onUpdateContactList = function (newList) {
            vm.company.contactList = newList;
        }
        function updateDate(){
            if(vm.company) {
                var d=new Date();
                var isoDate = d.getFullYear() + '-'
                    + pad(d.getMonth() + 1) + '-'
                    + pad(d.getDate())
                vm.company.dateSaved=isoDate;

            }
            function pad(n) {return n<10 ? '0'+n : n}
        }

        function incrementMinorVersion() {
            if (!vm.company.enrolmentVersion) {
                vm.company.enrolmentVersion = "0.1";
            } else {
                //TODO convert to number?
                var parts = vm.company.enrolmentVersion.split('.')
                var dec = parseInt(parts[1]);
                //var whole=parseInt(parts[0]);
                var result = parts[0] + "." + (dec + 1);
                vm.company.enrolmentVersion = result;
            }
        }
    }
})();

(function () {
    'use strict';
    angular
        .module('dossierApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                files: [
                    {
                        prefix: 'app/resources/countries-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/address-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/stateProvinces-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/general-',
                        suffix: '.json'
                    },
                    {
                     prefix: 'app/resources/fileIO-',
                     suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/messages-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/contact-',
                        suffix: '.json'
                    }
                ]
            })
            $translateProvider.preferredLanguage('en');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
        }]);
})();