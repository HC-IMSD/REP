/**
 * Created by Abdessamad on 8/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('refProductListModule', ['expandingTable'])
})();

(function () {
    'use strict';

    angular
        .module('refProductListModule')
        .component('cmpRefProductList', {
            templateUrl: './components/can-ref-products/tpl-ref-product-list.html',
            controller: refProductListCtrl,
            controllerAs: 'crpl',
            bindings: {
                products: '<',
                onUpdate: '&'
            }
        });

    function refProductListCtrl(){
        var self = this;

        self.$onInit = function(){

            if(self.products){
                self.productList = self.products.listItems;
                self.colNames = self.products.colNames;
            }


        }
    }


})();