/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('activeIngListModule', ['expandingTable', 'activeIngRecordModule'])
})();

(function () {
    'use strict';

    angular
        .module('activeIngListModule')
        .component('cmpActiveIngList', {
            templateUrl: './components/formulations/tpl-active-ing-list.html',
            controller: activeIngListCtrl,
            controllerAs: 'ailCtrl',
            bindings: {
                ingredients: '<',
                onUpdate: '&'
            }
        });

    function activeIngListCtrl() {

        var self = this;
        self.noActives = "";
        self.selectRecord = -1;
        self.resetToCollapsed = false;
        self.isDetailValid = true;
        self.$onInit = function () {

            self.newIngFormShown = false;
            self.isDetailValid = true;
            self.selectRecord = -1;

            self.colNames = [
                {label: "MEDICINAL_INGREDIENT", binding: "ingName", width: "70"},
                {label: "CAS_NUM", "binding": "cas", width: "15"},
                {label: "HUMAN_ANIMAL_SOURCE", binding: "humanAnimalSourced", width: "15"}
            ];
            self.ingList = [];

            if (self.ingredients) {
                self.ingList = self.ingredients;
            }
            self.updateActiveError();
        };


        self.addIng = function (ing) {
            //console.debug('ingList addIng: ' + ing);
            self.setValid(true);
            console.log("add ingred")
            self.ingList.push(ing);
            self.newIngFormShown = false;
            console.log("rest")
            self.resetToCollapsed = !self.resetToCollapsed;
            self.updateActiveError();
            self.onUpdate({list:self.ingList});
            setRecord(-1);
        };

        self.updateIng = function (idx, ing) {
            self.ingList[idx] = angular.copy(ing);
            self.onUpdate({list:self.ingList});
            self.setValid(true);
        };

        self.deleteIng = function (idx) {
            // console.debug('ingList deleteIng: ' + idx);
            self.ingList.splice(idx, 1);
            self.updateActiveError();
            self.onUpdate({list:self.ingList});
            self.setValid(true);
            setRecord(-1);
            self.resetToCollapsed = !self.resetToCollapsed;
        }
        /**
         * Used for error messaging that there are no active ingredients
         * @returns {string} string is empty if not empty
         */
        self.updateActiveError = function () {
            if (self.ingList && self.ingList.length > 0) {
                self.noActives = self.ingList.length;
                return false;
            }
            self.noActives = "";
            return true;

        }
        /**
         * sets the record in the expanding table to select less than zero means none
         * @param value
         */
        function setRecord(value){
            self.selectRecord = value;
        }

        /**
         * Flag set to indicate if the record details are in a valid state
         * @param value
         */
        self.setValid=function(value){
            self.isDetailValid=value;
        }
        /**
         * Controls the state of the add new ingredient button
         * @returns {*|boolean}
         */
        self.addNewDisabled=function(){
            return (self.newIngFormShown || !self.isDetailValid);
        }
    }
})();
