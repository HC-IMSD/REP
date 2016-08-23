/**
 * Created by Abdessamad on 8/12/2016.
 */

(function () {
    'use strict';

    angular
        .module('refProductDetailsModule', ['expandingTable'])
})();

(function () {
    'use strict';

    angular
        .module('refProductDetailsModule')
        .component('cmpRefProductDetails', {
            templateUrl: './components/can-ref-products/tpl-ref-product-details.html',
            controller: refProductDetailsCtrl,
            bindings: {
                productRecord: '<',
                onUpdate: '&',
                onDelete: '&'
            }
        });

    function refProductDetailsCtrl(){
        var self = this;

        self.$onInit = function(){

            self.productModel = {
                brandName: "",
                medIngredient: "",
                dosageForm: "Other",
                dosageFormOther: "",
                strengths: "",
                companyName: ""
            };

            if (self.productRecord) {

                angular.extend(self.productModel, self.productRecord);
            }

        }
    }


})();