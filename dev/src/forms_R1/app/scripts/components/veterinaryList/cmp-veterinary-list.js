/**
 * Created by JangyoungYoo on 3/12/2019.
 */


(function () {
    'use strict';

    angular
        .module('veterinaryListModule', ['expandingTable', 'veterinaryRecordModule','dataLists', 'ui.select', 'hpfbConstants'])
})();


(function () {
    'use strict';

    angular
        .module('veterinaryListModule')
        .component('cmpVeterinaryList', {
            templateUrl: 'app/scripts/components/veterinaryList/tpl-veterinary-list.html',
            controller: veterinaryListCtrl,
            controllerAs: 'vetCtrl',
            bindings: {
                listItems: '<',
                onUpdate: '&',
                getNewVeterinary: '&',
                errorSummaryUpdate:'<',
                showErrorSummary:'<'
            }
        });
    veterinaryListCtrl.$inject = ['$scope'];

    function veterinaryListCtrl($scope) {

        var vm = this;
        vm.isDetailValid = true;
        vm.veterinaryList = [];
        vm.selectRecord = -1;
        vm.resetToCollapsed = false;

        vm.noveterinaryValues="";

        vm.$onInit = function () {
            vm.selectRecord = -1;
            vm.resetToCollapsed = false;
            vm.isDetailValid = true;

            _setIdNames();
            vm.columnDef = [
                {
                    label: "SPECIES_SUBTYPES",
                    binding: "speciesSubtypeUse",
                    width: "30",
                    isHtml: "true"
                },
                { label: "FOOD_PRODUCING_ANIMAL",
                    binding: "foodProcessingAnimaluse",
                    width: "30",
                    isHtml: "true"
                },
                { label: "WITHDRAWAL_TIME",
                    binding: "withdrawalTime",
                    width: "30",
                    isHtml: "true"
                }
            ];


           // if (vm.listItems) {
                vm.veterinaryList = vm.listItems;
           // }

        };

        vm.$onChanges = function (changes) {

            if (changes.listItems) {
                vm.veterinaryList = changes.listItems.currentValue;
                vm.noVeterinaryItem();
            }
        };


        vm.onUpdateVeterinaryRecord = function (record) {
            vm.veterinaryList[idx] = angular.copy(record);
            vm.onUpdate({list:vm.veterinaryList});
            vm.setValid(true);
            setRecord(-1);
            vm.noVeterinaryItem();
            vm.resetCollapsed = !vm.resetCollapsed;
            vm.addFocused = true;
        };


        vm.deleteRec = function (idx) {
            // console.debug('containerList deleteIng: ' + idx);
            vm.veterinaryList.splice(idx, 1);
            vm.onUpdate({list:vm.veterinaryList});
            vm.setValid(true);
            vm.noVeterinaryItem();
            setRecord(-1);
            vm.resetToCollapsed = !vm.resetToCollapsed;
        };
        /**
         * sets the record in the expanding table to select less than zero means none
         * @param value
         */
        function setRecord(value){
            vm.selectRecord = value;
        }

        /**
         * Flag set to indicate if the record details are in a valid state
         * @param value
         */
        vm.setValid=function(value){
            vm.isDetailValid=value;
        };
        /**
         * Controls the state of the add new ingredient button
         * @returns {*|boolean}
         */
        vm.addNewDisabled=function(){
            return ( !vm.isDetailValid);
        };

        /**
         * When a new record is cancelled, resets state;
         */
        vm.onNewCancel=function(){
            vm.setValid(true);
            vm.noVeterinaryItem();
        };

        /**
         * Checks if there is at least one veterinary item
         * @returns {boolean}
         */
        vm.noVeterinaryItem=function(){

            if(!vm.veterinaryList ||   vm.veterinaryList.length===0){
                vm.noVeterinaryValues="";
                return true;
            }
            vm.noVeterinaryValues="values";
            return false;
        };

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
        /**
        vm.addVeterinary = function () {
            var defaultVeterinary = vm.getNewVeterinary();
            vm.veterinaryList.unshift(defaultVeterinary); //add to top
            vm.resetCollapsed = !vm.resetCollapsed;
            vm.selectRecord = 0; //need to generate a change
            vm.addFocused = false;
            vm.setValid(false);
            vm.noVeterinaryItem();
        }; **/


        vm.addNew = function () {
            var defaultVeterinary = vm.getNewVeterinary();
            vm.veterinaryList.push(defaultVeterinary);
            vm.resetToCollapsed = !vm.resetToCollapsed;
            setRecord(vm.veterinaryList.length - 1);
            vm.isDetailsValid = false;
        };

        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.noVeterinaryId="no_veterinary"+scopeId;
        }

    }

})();
