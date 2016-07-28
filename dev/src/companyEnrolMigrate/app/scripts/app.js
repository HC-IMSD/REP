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

    MainController.$inject = ['CompanyService','hpfbFileProcessing']

    function MainController(CompanyService,hpfbFileProcessing) {

        var vm = this;
        var url = "data/company-enrol.txt";
        //TODO magic number
        vm.rootTag='COMPANY_ENROL'
        vm.isIncomplete = true;

        vm.applTypes = ["NEW", "AMEND", "APPROVED"]
        vm.setAmendState = _setApplTypeToAmend;
        vm.showContent = _loadFileContent;

        var _company = new CompanyService();
        vm.company = _company.getModelInfo();
        vm.company.applicationType = "NEW";

        /*        var result2 = _company.transformToFileObj();
         console.log("ready to make file" + JSON.stringify(result2,null, 2));*/

        //converts the address list into something usable
        vm.saveJson=function(){
            updateDate();
            incrementMinorVersion();
            var writeResult=_company.transformToFileObj();
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
            alert("Calling the content callback")
            var resultJson = fileContent.jsonResult;
            console.log("Result JSON is: " + resultJson)
            _company.transformFromFileObj(resultJson)
            vm.company = _company.getModelInfo()
            _setComplete();
        };
        function _setApplTypeToAmend() {
            //TODO magic number
            vm.company.applicationType = 'AMEND';
        }

        //used on update
        vm.onUpdateAddressList = function (newList) {
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