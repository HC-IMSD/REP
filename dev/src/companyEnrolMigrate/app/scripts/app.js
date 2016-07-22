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

    MainController.$inject = ['$scope', 'CompanyService']

    function MainController($scope, CompanyService) {

       // var vm = $scope;
        var vm=this;
        var url = "data/company-enrol.txt";

        vm.company = {
            dataChecksum: "",
            enrolmentVersion: "0.1",
            dateSaved: "",
            applicationType: "NEW",
            softwareVersion: "1.0.0",
            companyId: "",
            addressList: [
                {
                    "address_id": "0001",
                    "company_name": "Test",
                    "amend_record": "N",
                    "manufacturer": "N",
                    "mailing": "N",
                    "billing": "N",
                    "importer": "N",
                    "company_address_details": {
                        "street_address": "",
                        "city": "",
                        "province_lov": "",
                        "province_text": "",
                        "country": "",
                        "postal_code": ""
                    }
                }
            ],
            contactList: []
        };

        /*{
         "COMPANY_ENROL": {
         "data_checksum": "1cd5552a98c94878d5c71ce7f6de3c3dca9e1026e42ee74a55518bb22495e842",
         "enrolment_version": "1.23",
         "date_saved": "1999-01-21",
         "application_type": "APPROVED",
         "software_version": "string",
         "company_id": "string"
         }
         }*/

       function  _initModel(){
           alert("init")
           var resultJson=fileContent.jsonResult;
           var companyInfo=_company.getCompanyInfo(resultJson.COMPANY_ENROL);
           angular.extend(vm.company, companyInfo);
           vm.company.addressList = _company.getAddressList(resultJson.COMPANY_ENROL.address_record);
           vm.company.contactList = _company.getContactList(resultJson.COMPANY_ENROL.contact_record);
        }

        var _company = new CompanyService(vm.company);
       // _company.getCompanyInfo(company);


        vm.showContent = function (fileContent) {
            alert("Calling the content callback")
            var resultJson=fileContent.jsonResult;
            var companyInfo=_company.getCompanyInfo(resultJson.COMPANY_ENROL);
            angular.extend(vm.company, companyInfo);
            vm.company.addressList = _company.getAddressList(resultJson.COMPANY_ENROL.address_record);
            vm.company.contactList = _company.getContactList(resultJson.COMPANY_ENROL.contact_record);
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
        vm.onUpdateAddressList = function(newList){
            vm.company.addressList = newList;
        }

        vm.onUpdateContactList = function(newList){
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