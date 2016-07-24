(function () {
    'use strict';
    angular
        .module('dossierApp', [
            'pascalprecht.translate',
            'ngMessages',
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
        vm.rootTag='COMPANY_ENROL'
        var _company = new CompanyService(vm.company);
        var result2 = _company.transformToFileObj();
        console.log("ready to make file" + JSON.stringify(result2,null, 2));

        vm.company = _company.getModelInfo();
        //converts the address list into something usable
        vm.saveJson=function(){
            updateDate();
            var writeResult=_company.transformToFileObj();
            hpfbFileProcessing.writeAsJson(writeResult, "test.json", vm.rootTag);
        }

        vm.showContent = function (fileContent) {
            alert("Calling the content callback")
            var resultJson = fileContent.jsonResult;
            console.log("Result JSON is: " + resultJson)
            _company.transformFromFileObj(resultJson)
            vm.company = _company.getModelInfo()
        };


        //used on update
        vm.onUpdateAddressList = function (newList) {
            vm.company.addressList = newList;
        }

        vm.onUpdateContactList = function (newList) {
            vm.company.contactList = newList;
        }
        function updateDate(){
            if(vm.company) {
                var d=new Date();
                //today.getDate()
            var isoDate=d.getUTCFullYear()+'-'
                + pad(d.getUTCMonth()+1)+'-'
                + pad(d.getUTCDate())
                vm.company.dateSaved=isoDate;

            }
            function pad(n) {return n<10 ? '0'+n : n}
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
                    /*  {
                     prefix: 'app/resources/company-',
                     suffix: '.json'
                     },*/
                    {
                        prefix: 'app/resources/stateProvinces-',
                        suffix: '.json'
                    },
                    {
                        prefix: 'app/resources/general-',
                        suffix: '.json'
                    },
                    /*      {
                     prefix: 'app/resources/fileIO-',
                     suffix: '.json'
                     }*/
                ]
            })
            $translateProvider.preferredLanguage('en');
        }]);
})();