/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('formulationRecordModule', ['activeIngListModule', 'nonMedIngListModule', 'containerTypeListModule', 'materialIngListModule', 'roaModule'])
})();

(function () {
    'use strict';

    angular
        .module('formulationRecordModule')
        .component('cmpFormulationRecord', {
            templateUrl: './components/formulations/tpl-formulation-record.html',
            controllerAs: 'formulRecCtrl',
            controller: formulationRecCtrl,
            bindings: {
                deleteBtn: '<',
                record:'<',
                onAddNew: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&'
            }

        });

    function formulationRecCtrl() {

        var self = this;

        self.$onInit = function () {

            self.frmModel = {};


            if(self.record){
                self.frmModel = self.record;
            }
        };

        self.save = function () {
            if (self.record) {
                // console.log('product details update product');
                self.onUpdate({record:self.frmModel});
            }else{
                //  console.log('product details add product');
                self.onAddNew({record:self.frmModel});
            }

        };

        self.discardChanges = function(){
            self.frmModel = {};
            //self.productDetailsForm.$setPristine();
            self.onCancel();
        }

        self.delete = function(){
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            }

        };

    }
})();
