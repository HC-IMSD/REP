(function () {
    'use strict';
    angular
        .module('transactionApp', [
            'pascalprecht.translate',
            'ngMessages',
            'ngAria',
            'fileIO'
        ])
})();

(function () {
    'use strict';
    angular
        .module('transactionApp')
        .controller('MainController', MainController);

    MainController.$inject = ['TransactionService','hpfbFileProcessing','$filter']

    function MainController(CompanyService,hpfbFileProcessing,$filter) {

        var vm = this;
        vm.isIncomplete = true;
        vm.userType;
       // vm.showContent = _loadFileContent;
        var _transaction= new TransactionService();
        vm.rootTag=_transaction.getRootTag();
       vm.transaction=_transaction.getTransactionInfo();

        /**
         * Set the form Type
         * @param id
         */
        vm.initUser=function(id){ //TODO needed?
            if(!id) id='EXT'
            vm.userType=id;
        }

        /**
         *
         * @ngdoc method Saves the model content in JSON format
         */
        vm.saveJson=function(){
            var writeResult=_transformFile()
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
            _transaction = new CompanyService();

           var resultJson = fileContent.jsonResult;

            if(resultJson) {
                _transaction.transformFromFileObj(resultJson)
                vm.transaction={}
                angular.extend(vm.transaction,_transaction.getModelInfo())
               // _setComplete();
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