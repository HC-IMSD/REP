(function () {
    'use strict';
    angular
        .module('transactionApp', [
            'pascalprecht.translate',
            'ngMessages',
            'ngAria',
            'fileIO',
            'services',
            'transaction',
            'addressModule',
            'contactModule'

        ])
})();

(function () {
    'use strict';
    angular
        .module('transactionApp')
        .controller('MainController', MainController);

    MainController.$inject = ['TransactionService','hpfbFileProcessing','$filter']

    function MainController(TransactionService, hpfbFileProcessing, $filter) {

        var vm = this;
        vm.isIncomplete = true;
        vm.userType;
        var _transaction= new TransactionService();
        // vm.rootTag=_transaction.getRootTag();
        //vm.transaction=_transaction.getTransactionInfo();

        /**
         * Set the form Type
         * @param id
         */
        vm.initUser = function (id) {
            if(!id) id='EXT'
            vm.userType=id;
        }

        /**
         *
         * @ngdoc method Saves the model content in JSON format
         */
        vm.saveJson=function(){
            var writeResult=_transformFile()
            vm.rootTag = _transaction.getRootTag();
            hpfbFileProcessing.writeAsJson(writeResult, "transactionEnrol", vm.rootTag);
        }
        /**
         * @ngdoc method - saves the data model as XML format
         */
        vm.saveXML=function(){
            var writeResult=_transformFile()
            hpfbFileProcessing.writeAsXml(writeResult, "transactionEnrol", vm.rootTag);
        }
        /**
         * @ngdcc method updates data and increments version before creating json
         */
        function _transformFile(){
           /* updateDate();
            if(!vm.isExtern()) {
                incrementMajorVersion();
            }else {
                incrementMinorVersion();
            }*/
            var writeResult=_transaction.transformToFileObj(vm.transaction);
            return writeResult;
        }

        /*function _setComplete() {
            if (vm.company.companyId) {
                vm.isIncomplete = false;
            } else {
                vm.isIncomplete = true;
            }
        }*/
        function _loadFileContent(fileContent) {
            if(!fileContent)return;
            _transaction = new TransactionService();
           var resultJson = fileContent.jsonResult;

            if(resultJson) {
                _transaction.transformFromFileObj(resultJson)
                vm.transaction={}
                angular.extend(vm.transaction,_transaction.getModelInfo())
            }
        };




        vm.getNewAddress = function () {
            var result = _company.createAddressRecord();
            return result;
        }

        vm.getNewContact = function () {
            var result = _company.createContactRecord();
            return result;
        }

        //TODO remove?
        vm.updateAddressRecord=function(address){
            if(!address) return;
            var idx = vm.company.addressList.indexOf(
                $filter('filter')(vm.company.addressList, {addressID: address.addressID}, true)[0]
            );
            vm.company.addressList[idx] = address
            var temp=vm.company.addressList;
            vm.company.addressList=[];
            vm.company.addressList=temp;
        }



        vm.isExtern=function(){
            if(vm.userType=="EXT"){
                return true;
            }
            return false;
        }
    }
})();

(function () {
    'use strict';
    angular
        .module('transactionApp')
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

/*
 "date_saved": "1999-01-21",
 "application_type": "APPROVED",
 "software_version": "string",
 "data_checksum": "string",
 "is_ectd": "Y",
 "company_id": "A",
 "dossier_id": "A",
 "dossier_name": "A",

 "is_solicited": "Y",
 "solicited_requester": "A",
 "regulatory_project_manager1": "A",
 "regulatory_project_manager2": "A",
 "same_regulatory_company": "Y",
 "company_name": "A",
 "same_regulatory_address": "Y",
 "regulatory_activity_address": {
 "street_address": "A",
 "city": "A",
 "province_lov": "WY",
 "province_text": "A",
 "country": "ZWE",
 "postal_code": "A"
 },
 "same_regulatory_contact": "Y",
 "regulatory_activity_contact": {
 "salutation": "DR",
 "given_name": "A",
 "initials": "A",
 "surname": "A",
 "job_title": "A",
 "language_correspondance": "fr",
 "phone_num": "A",
 "phone_ext": "A",
 "fax_num": "A",
 "email": "A"
 },

 */