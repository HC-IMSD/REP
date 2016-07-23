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

    MainController.$inject = ['CompanyService']

    function MainController(CompanyService) {

        var vm = this;
        var url = "data/company-enrol.txt";

        var _company = new CompanyService(vm.company);
        var result2 = _company.transformToFileObj();
        console.log("ready to make file" + JSON.stringify(result2,null, 2));

        vm.company = _company.getModelInfo();
        //converts the address list into something usable
        //vm.company.addressList = _company.getAddressList(vm.company.addressList);\
        // console.log("Orignal list "+JSON.stringify(vm.company));
        console.log("-----------------");


        vm.showContent = function (fileContent) {
            alert("Calling the content callback")
            var resultJson = fileContent.jsonResult;
            console.log("Result JSON is: " + resultJson)
            _company.transformFromFileObj(resultJson.COMPANY_ENROL)
            vm.company = _company.getModelInfo()
        };

        /*_company.loadFromFile(url).then(function (result) {

         var companyInfo = _company.getCompanyInfo(result.data.COMPANY_ENROL)
         angular.extend(vm.company, companyInfo);

         vm.company.addressList = _company.getAddressList(result.data.COMPANY_ENROL.address_record);

         vm.company.contactList = _company.getContactList(result.data.COMPANY_ENROL.contact_record);
         //   angular.extend(vm.addressList, CompanyService.getAddressList(result.data.COMPANY_ENROL));

         //console.log('MainCtrl company: ' + JSON.stringify(vm.company));


         });*/

        //used on update
        vm.onUpdateAddressList = function (newList) {
            vm.company.addressList = newList;
        }

        vm.onUpdateContactList = function (newList) {
            vm.company.contactList = newList;
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