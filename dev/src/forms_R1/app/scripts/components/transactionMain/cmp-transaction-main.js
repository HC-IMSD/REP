(function () {
    'use strict';
    angular
        .module('transactionApp')
        .component('cmpTransactionMain', {
            templateUrl: 'app/scripts/components/transactionMain/tpl-transaction-main.html',
            controller: TransactionMainCtrl,
            controllerAs: 'main'
        });

    TransactionMainCtrl.$inject = ['TransactionService', 'hpfbFileProcessing', '$filter','$translate','ENGLISH'];

    function TransactionMainCtrl(TransactionService, hpfbFileProcessing, $filter, $translate, ENGLISH, EXTERNAL_TYPE) {

        var vm = this;
        vm.savePressed = false;
        vm.userType = EXTERNAL_TYPE;
        vm.transactionService = new TransactionService();
        vm.rootTag = vm.transactionService.getRootTag();
        vm.transaction = vm.transactionService.getModelInfo();
        vm.showContent = _loadFileContent;
        vm.alerts = [false, false];
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.sequenceUpdated=false;
        /**
         *
         * @ngdoc method Saves the model content in JSON format
         */
        vm.saveJson = function () {
            var writeResult = _transformFile();
            vm.rootTag = vm.transactionService.getRootTag();
            hpfbFileProcessing.writeAsJson(writeResult, _getFileName(), vm.rootTag);
            vm.savePressed = true;
        };
        /**
         * @ngdoc method - saves the data model as XML format
         */
        vm.saveXML = function () {
            var writeResult = _transformFile();
            hpfbFileProcessing.writeAsXml(writeResult, _getFileName(), vm.rootTag);
            vm.savePressed = true;
        };

        function _getFileName() {
            var date = new Date();
            var filename = "HCREPRT";
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var separator="-";

            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }


            filename = filename + separator + date.getFullYear() +separator + month + separator + day + separator + hours + minutes;
            return (filename.toLowerCase());
        }


        /**
         * @ngdcc method updates data and increments version before creating json
         */
        function _transformFile() {
            return vm.transactionService.transformToFileObj(vm.transaction);
        }

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            //vm.transactionService = new TransactionService();
            var resultJson = fileContent.jsonResult;

            if (resultJson) {
                vm.transactionService.transformFromFileObj(resultJson);
                vm.transaction = {};
                // angular.extend(vm.transaction, vm.transactionService.getModelInfo())
                vm.transaction = vm.transactionService.getModelInfo();
                //doing this as model won't update otherwise. Business wanted these values cleared on load
                //service currently populates them if they exist
                vm.transaction.projectManager1 = "";
                vm.transaction.projectManager2 = "";
                vm.transaction.isSolicited = "";
                vm.transaction.solicitedRequester = "";
                vm.transaction.sameContact = false;

            }
        }

        vm.getNewRepContact = function () {
            return vm.transactionService.createRepContact();
        };
        vm.setSequenceNumber=function(startVal){

            var result=vm.transactionService.setSequenceNumber(startVal);
            vm.sequenceUpdated=!vm.sequenceUpdated;

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

        vm.isExtern = function () {
            return vm.userType == EXTERNAL_TYPE;

        };
        vm.showErrors = function () {
            return (vm.transactionEnrolForm.$dirty && vm.transactionEnrolForm.$invalid && vm.savePressed)

        };
        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
        }


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
         * Determines if the language used is french
         * @returns {boolean}
         */
        vm.isFrench=function(){
            return(vm.lang!==ENGLISH);
        };

    }
})();

