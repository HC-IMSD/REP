/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('activeIngRecordModule', ['dossierDataLists'])
})();

(function () {
    'use strict';

    angular
        .module('activeIngRecordModule')
        .component('cmpActiveIngRecord', {
            templateUrl: './components/formulations/tpl-active-ing-record.html',
            controllerAs: 'ingRecCtrl',
            controller: activeIngRecCtrl,
            bindings: {
                record: '<',
                showErrors:'&'
            }

        });
    activeIngRecCtrl.$inject = ['DossierLists'];
    function activeIngRecCtrl(DossierLists) {

        var self = this;
        self.nanoMaterialList=DossierLists.getNanoMaterials();
        self.$onInit = function () {

            self.ingModel = {
                ingId: "001",
                ingName: "",
                cas: "",
                standard: "",
                strength: "",
                units: "",
                per: "",
                calcAsBase: false,
                animalHumanSourced: false,
                nanoMaterial: "",
                nanoMaterialOther: ""
            };

            if (self.record) {
                self.ingModel = self.record;
            }
        }
        self.$onChanges=function(changes){
            if(changes.record){
                self.ingModel = self.record.currentValue;
            }
        }

        self.showError=function(isInvalid,isTouched){
            return((isInvalid &&isTouched)|| (isInvalid && self.showErrors()))
        }

        /**
         * Sets the state of the nanomaterial other field
         * @returns {boolean} true if other is the value
         */
        self.isNanoOther = function () {

            if (self.ingModel.nanoMaterial === DossierLists.getOtherValue()) {
                return true;
            } else {
                self.ingModel.nanoMaterialOther = "";
                return false;
            }
        }


    }

})();
