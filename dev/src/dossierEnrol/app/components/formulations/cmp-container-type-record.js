/**
 * Created by Abdessamad on 9/25/2016.
 */

(function () {
    'use strict';

    angular
        .module('containerTypeRecordModule', ['numberFormat'])
})();

(function () {
    'use strict';

    angular
        .module('containerTypeRecordModule')
        .component('cmpContainerTypeRecord', {
            templateUrl: './components/formulations/tpl-container-type-record.html',
            controllerAs: 'ctrCtrl',
            controller: containerTypeRecCtrl,
            bindings: {
                deleteBtn: '<',
                record:'<',
                onAddIng: '&',
                onUpdate: '&',
                onDelete: '&',
                onCancel: '&',
                showErrors:'&'
            }

        });

    function containerTypeRecCtrl() {

        var self = this;

        self.$onInit = function () {

            self.ctModel = {};

            if(self.record){
                self.ctModel = self.record;
            }
        };

        self.save = function () {
            if (self.record) {
                // console.log('product details update product');
                self.onUpdate({ing:self.ctModel});
            }else{
                //  console.log('product details add product');
                self.onAddIng({ing:self.ctModel});
            }

        };

        self.discardChanges = function(){
            self.ctModel = {};
            //self.productDetailsForm.$setPristine();
            self.onCancel();
        }

        self.delete = function(){
            if (self.record) {
                //  console.log('product details delete product');
                self.onDelete();
            }else{

            }

        };
        /**
         * Manages visibility of error messages for an indvidual control
         * @param isInvalid
         * @param isTouched
         * @returns {*}
         */
        self.showError=function(isInvalid, isTouched){
            return((isInvalid && isTouched) /* TODO add showErrors||(isInvalid && self.showErrors())*/)
        }


    }

})();
