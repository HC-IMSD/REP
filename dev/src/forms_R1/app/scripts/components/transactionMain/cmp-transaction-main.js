(function () {
    'use strict';
    angular
        .module('transactionMainModule', [
            'transactionInfo',
            'transactionService',
            'transactionLoadService',
            'fileIO',
            'services',
            'dataLists',
            'filterLists',
            'numberFormat',
            'errorSummaryModule',
            'errorMessageModule'
        ])

})();


(function () {
    'use strict';
    angular
        .module('transactionMainModule')
        .component('cmpTransactionMain', {
            templateUrl: 'app/scripts/components/transactionMain/tpl-transaction-main.html',
            controller: TransactionMainCtrl,
            controllerAs: 'main'
        });

    TransactionMainCtrl.$inject = [
        'TransactionService',
        'hpfbFileProcessing',
        '$filter',
        '$translate',
        '$scope',
        'ENGLISH',
        'EXTERNAL_TYPE'
        ];

    function TransactionMainCtrl(TransactionService, hpfbFileProcessing, $filter, $translate, $scope, ENGLISH, EXTERNAL_TYPE) {

        var vm = this;
        vm.savePressed = false;
        vm.userType = EXTERNAL_TYPE;
        vm.transactionService = new TransactionService();
        vm.rootTag = vm.transactionService.getRootTag();
        vm.transaction = vm.transactionService.getModelInfo();
        vm.showContent = _loadFileContent;
        vm.alerts = [false, false];
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.sequenceUpdated = false;
        vm.isFinal = false;

        vm.updateSummary = 0; //increment to send message to error summaries

        vm.focusSummary = 0; //messaging to set focus on the error summary
        vm.exclusions = { // when error summary hit these, assumes there is a sub summary if type x.x
            "lifecycleCtrl.lifecycleDetailsForm":"true"
        };
        vm.transcludeList = {}; //specific to expanding table to tag records
        vm.alias = { // do something other than a simple hyperlink
            "saveLifeRec": {
                "type": "buttonSearch",
                "buttonName": "saveLifecycleRec"
            },
            "oneLifeRec": {
                "type": "buttonSearch",
                "buttonName": "addTransactionRec"
            },
            "one_payment_method": {
                "type": "fieldset",
                "parent": "fs_payment_methods"
            }

        };
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];

        vm.$onInit = function () {
            vm.updateSummary=vm.updateSummary+1;

            vm.updateSummary=vm.updateSummary+1;
            _setIdNames();
        };


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

            if(vm.transactionEnrolForm.$invalid) {

                vm.focusSummary++;
                vm.updateErrorSummaryState();
                vm.savePressed = true;
            }else {

                var writeResult = _transformFile();
                hpfbFileProcessing.writeAsXml(writeResult, _getFileName(), vm.rootTag,
                    vm.transactionService.getXSLFileName());
                vm.savePressed = false;
            }
        };

        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;
        };


        function _getFileName() {
            var date = new Date();
            var filename = "HCREPRT";
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var separator = "-";

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


            filename = filename + separator + date.getFullYear() + separator + month + separator + day + separator + hours + minutes;
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
                vm.isFinal = vm.transactionService.isFinal;
                //doing this as model won't update otherwise. Business wanted these values cleared on load
                //this process moved to service
                //vm.transaction.projectManager1 = "";
                //vm.transaction.projectManager2 = "";
                //vm.transaction.isSolicited = "";
                //vm.transaction.solicitedRequester = "";
                //vm.transaction.confirmContactValid = false;
                //console.log( "vm.isFinal_main " + vm.isFinal);
                if (vm.isFinal) {
                    vm.transaction.ectd.lifecycleRecord =[];
                }
            }
        }

        vm.getNewRepContact = function () {
            return vm.transactionService.createRepContact();
        };
        vm.setSequenceNumber = function (startVal) {

            var result = vm.transactionService.setSequenceNumber(startVal);
            vm.sequenceUpdated = !vm.sequenceUpdated;

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
        //vm.transactionEnrolForm.$dirty && vm.transactionEnrolForm.$invalid &&

            return ( vm.savePressed)

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
        vm.isFrench = function () {
            return (vm.lang !== ENGLISH);
        };

        function _setIdNames(){
            var scopeId = "_" + $scope.$id;
            vm.formId="transaction_form"+scopeId;

        }

    }
})();

