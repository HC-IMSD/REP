/**
 * Created by Abdessamad on 8/24/2016.
 */

(function () {
    'use strict';

    angular
        .module('sourceAnimalModule', ['countryListModule'])
})();

(function () {
    'use strict';

    angular
        .module('sourceAnimalModule')
        .component('cmpSourceAnimal', {
            templateUrl: "./components/appendix-four/tpl-source-animal.html",
            controller: sourceAnimalCtrl,
            controllerAs: 'saCtrl',
            bindings: {
                primateTypes : '<',
                countries : '<'
            }
        });

    function sourceAnimalCtrl() {
        var self = this;
        self.animalType = "";
        self.model = {
            primateTypeList: [],

            countryList: []
        };
        self.$onInit = function () {

            if(self.primateTypes){
                self.model.primateTypeList = self.primateTypes.primateTypeList;
                self.model.countryList = self.primateTypes.countryList;
            }
        };

        self.$onChanges=function(changes){
            if(changes.primateTypes){
                self.model.primateTypeList = changes.primateTypes.currentValue.primateTypeList;
                self.model.countryList = changes.primateTypes.currentValue.countryList;
            }
        };
        /**
         * Determines if at least one of the
         * @returns {boolean}
         */
        function _oneAnimalTypeSelected() {
            if(angular.isUndefined(self.model.primateTypeList))
            return false;

            for (var i = 0; i < self.model.primateTypeList.length; i++) {
                //only test the text boxes
                if (self.model.primateTypeList[i].type === "text") {
                    if (self.model.primateTypeList[i].value) {
                        self.animalType = true;
                        return true;
                    }
                }
            }
            self.animalType = "";
            return false
        };
        self.showAnimalError = function () {
            return (!_oneAnimalTypeSelected());
        };

        self.showListError = function (isInvalid, isTouched, isRequired) {
            if (isRequired === true) {

                if (isInvalid && isTouched) {
                    return true;
                }
            }
            return false;
        }

    }
})();
