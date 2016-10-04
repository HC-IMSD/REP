/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('activeIngRecordModule', [])
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
                deleteBtn: '<',
                record:'<',
                onAddIng: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&'
            }

        });

    function activeIngRecCtrl() {

        var self = this;

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
        };

        self.saveIng = function () {
            if (self.record) {
                // console.log('product details update product');
                self.onUpdate({ing:self.ingModel});
            }else{
                //  console.log('product details add product');
                self.onAddIng({ing:self.ingModel});
            }

        };

        self.discardChanges = function(){
            self.ingModel = {};
            //self.productDetailsForm.$setPristine();
            self.onCancel();
        }

        self.delete = function(){
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            }else{
                //TODO
            }

        };

    }

})();
