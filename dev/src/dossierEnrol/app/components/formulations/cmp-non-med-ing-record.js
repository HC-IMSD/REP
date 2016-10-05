/**
 * Created by Abdessamad on 9/25/2016.
 */

(function () {
    'use strict';

    angular
        .module('nonMedIngRecordModule', [])
})();

(function () {
    'use strict';

    angular
        .module('nonMedIngRecordModule')
        .component('cmpNonMedIngRecord', {
            templateUrl: './components/formulations/tpl-non-med-ing-record.html',
            controllerAs: 'nIngRecCtrl',
            controller: nonMedIngRecCtrl,
            bindings: {
                deleteBtn: '<',
                record: '<',
                onAddIng: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&'
            }

        });

    function nonMedIngRecCtrl() {

        var self = this;

        self.$onInit = function () {

            self.ingModel = {};

            if (self.record) {
                self.ingModel = self.record;
            }
        };

        self.saveIng = function () {
            // self.ingModel.animalHumanSourced = self.ingModel.animalHumanSourced == true ? "Yes" : "No";
            if (self.record) {
                // console.log('product details update product');
                self.onUpdate({ing: self.ingModel});
            } else {
                //  console.log('product details add product');
                self.onAddIng({ing: self.ingModel});
            }

        };

        self.discardChanges = function () {
            self.ingModel = {};
            //self.productDetailsForm.$setPristine();
            self.onCancel();
        };

        self.delete = function () {
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            } else {

            }
        }

    }

})();
