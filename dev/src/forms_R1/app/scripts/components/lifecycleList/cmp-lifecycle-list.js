/**
 * Created by Abdessamad on 7/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('lifecycleList', ['filterLists', 'lcDetailsModule', 'expandingTable'])
})();

(function () {
    'use strict';

    angular
        .module('lifecycleList')
        .component('cmpLifecycleList', {
            templateUrl: 'app/scripts/components/lifecycleList/tpl-lifecycle-list.html',
            bindings: {
                records: '<',
                onUpdate: '&',
                isAmend: '&',
                isFinal: '<',
                getNewTransaction: '&',
                setSequenceValue:'&',
                deprecateSequence: '&', //bit of a hack
                showErrorSummary: '<',
                isEctd: '<',
                parentDirty: '<',
                sequenceUpdated:'<',
                getCurrentSequence:'&'
            },
            controller: lifecycleListCtrl,
            controllerAs: 'lifeListCtrl'
        });

    lifecycleListCtrl.$inject = ['$filter', 'TransactionLists'];

    function lifecycleListCtrl($filter, TransactionLists) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailsValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.lifecycleList = [];
        vm.setCollapsed = 0;
        vm.deletableIndex = 0;
        vm.oneRecord = "";
        vm.ectdValue = false;
        vm.isParentDirty = false;
        vm.addFocused = false;
        vm.resetCollapsed = false;
        vm.activityTypes = [];
        vm.startingSequence = 0;
        vm.seqUpdated = false;
        vm.showSummary = false;
        vm.finalState = false;
        vm.finalRecNum = 0;

            vm.columnDef = [
            {
                label: "SEQUENCE_NUM",
                binding: "sequence",
                width: "8"
            },
            {
                label: "CONTROL_NUMBER",
                binding: "controlNumber",
                width: "8"
            },
            {
                label: "DATE_SUBMITTED",
                binding: "dateFiled",
                width: "12"
            },
            {
                label: "REG_ACTIVITY",
                binding: "activityTypeDisplay",
                width: "30"
            },
            {
                label: "SEQUENCE_TYPE",
                binding: "sequenceConcat",
                width: "48"
            }
        ];

        vm.$onInit = function () {
            //local var from binding
            vm.activityTypes= TransactionLists.getActivityTypes();
            vm.selectRecord = -1;
            vm.addFocused = false;
            vm.startingSequence=0;

        };


        vm.$onChanges = function (changes) {

            if (changes.records) {
                vm.lifecycleList = changes.records.currentValue;
                vm.isDetailsValid = true;
                vm.updateErrorState();
                vm.startingSequence=0;
            }
            if (changes.parentDirty) {
                vm.isParentDirty = changes.parentDirty.currentValue;
            }
            if (changes.isEctd) {
                vm.ectdValue = changes.isEctd.currentValue;
                //update the first record
                _checkFirstRecord();
            }
            if(changes.sequenceUpdated){
                vm.seqUpdated=changes.sequenceUpdated.currentValue;
                //vm.startingSequence=vm.getCurrentSequence();
            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
            }
            if(changes.isFinal){
                vm.finalState = changes.isFinal.currentValue;
                vm.finalRecNum = 0;
            }
        };


        vm.deleteRecord = function (aID) {
            var idx = vm.lifecycleList.indexOf(
                $filter('filter')(vm.lifecycleList, {sequence: aID}, true)[0]);
            vm.lifecycleList.splice(idx, 1);
            vm.onUpdate({newList: vm.lifecycleList});
            vm.selectRecord = -1;
            vm.isDetailsValid = true; //case that incomplete record is deleted
            vm.deprecateSequence();
            vm.updateErrorState();
            vm.resetCollapsed = !vm.resetCollapsed;
            vm.addFocused = false;
        };

        /**
         * @ngdoc Checks to see if first record complies to eCTD or not
         * @private
         */
        function _checkFirstRecord() {
            if (!vm.lifecycleList || vm.lifecycleList.length === 0 || vm.lifecycleList.length > 1) {
                return;
            }
            var record = angular.copy(vm.lifecycleList[0]);
            if (!vm.ectdValue) {
                record.sequence = "";
            } else {
               //TODO call service?
                var seqText = "" + vm.startingSequence;
                var pad = 4 - seqText.length;
                var padText = "";
                for (var i = 0; i < pad; i++) {
                    padText = padText + "0";
                }
                seqText = padText + seqText;
                record.sequence =  seqText;
            }
            vm.lifecycleList[0] = record;
        }


        /**
         * Usecd to determine if a record can be deleted. Only allowing the last record to be deleted
         * @returns {number}
         */
        vm.lastRecordSequence = function () {

            return vm.getCurrentSequence()-1;

        };
        vm.updateErrorState = function () {
            if (!vm.lifecycleList || vm.lifecycleList.length === 0) {
                vm.oneRecord = "";
            } else {
                for (var i = 0; i < vm.lifecycleList.length; i++ ) {
                    if (vm.lifecycleList[i].isSaved) {
                        vm.oneRecord = "is value";
                        return;
                    }
                }
                vm.oneRecord = "";
            }
        };

        vm.addTransaction = function () {
            var defaultTransaction = vm.getNewTransaction();
            vm.lifecycleList.unshift(defaultTransaction); //add to top
            vm.resetCollapsed = !vm.resetCollapsed;
            vm.selectRecord = 0; //need to generate a change
            if(vm.finalState) {
                vm.finalRecNum++;
            }
            vm.addFocused = false;
            vm.setValid(false);
            vm.updateErrorState();
        };
        vm.setStartingSequence=function(){
            if(isNaN(vm.startingSequence) ||vm.startingSequence === null){
                vm.startingSequence=0;
            }
            vm.setSequenceValue({start:vm.startingSequence});
        };

        vm.isSelectedRecord = function () {
            return (vm.selectRecord === 0 );

        };

        vm.isAddDisabled = function () {
            return (!vm.isDetailsValid ||
                (!vm.ectdValue && vm.lifecycleList.length > 0) ||
                (vm.finalState && vm.finalRecNum > 0));
        };

        vm.setValid = function (detailValid) {
            vm.isDetailsValid = detailValid;
        };

        vm.onUpdateLifecycleRecord = function (record) {
            var idx = vm.lifecycleList.indexOf(
                $filter('filter')(vm.lifecycleList, {sequence: record.sequence}, true)[0]
            );
            record.dateFiled = convertDate(record.dateFiled);
            record.startDate = convertDate(record.startDate);
            record.endDate = convertDate(record.endDate);
            record.isSaved = true;
            vm.lifecycleList[idx] = angular.copy(record);
            vm.setValid(true);
            vm.selectRecord = -1;
            vm.resetCollapsed = !vm.resetCollapsed;
            vm.addFocused = true;
            vm.updateErrorState();
        };
        /**
         * @ngdoc method determines the state of the list errors
         *
         * @returns {boolean}
         */
      /*  vm.showError = function (isTouched, isInvalid) {

            if ((vm.isParentDirty && isInvalid) || (vm.showErrors() && isInvalid)) {
                return true
            }
            return false
        };*/
        /**
         * Converts date to HC standard TOD0: replace with filter?
         * @param value
         * @returns {*}
         */
        function convertDate(value) {
            if (!value) return value;
            var aDate = new Date(value);
            var month = +(aDate.getMonth() + 1);
            if (month < 10) {
                month = '0' + month;
            }
            var day = aDate.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var result = aDate.getFullYear() + '-' + month + '-' + day;
            return result;
        }

    }
})();