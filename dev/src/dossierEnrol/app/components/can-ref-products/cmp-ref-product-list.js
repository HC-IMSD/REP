/**
 * Created by Abdessamad on 8/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('refProductListModule', ['expandingTable','refProductDetailsModule'])
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

           // if(self.products){
                //self.productList = self.products.listItems;
               // self.colNames = self.products.colNames;

                self.colNames = [
                    {"label":"Brand Name", "binding":"companyName"},
                    {"label":"Medicinal Ingredients", "binding":"medIngredient"}
                ];
                self.productList = [
                    {
                        "medIngredient": "A",
                        "dosageForm": "OTHER",
                        "dosageFormOther": "A",
                        "strengths": "A",
                        "companyName": "A"
                    },
                    {
                        "medIngredient": "B",
                        "dosageForm": "OTHER",
                        "dosageFormOther": "A",
                        "strengths": "A",
                        "companyName": "A"
                    },
                    {
                        "medIngredient": "C",
                        "dosageForm": "OTHER",
                        "dosageFormOther": "A",
                        "strengths": "A",
                        "companyName": "A"
                    }
                ];
            self.newProductFormShown = false;
           // }


        };

        self.addProduct = function(product){
            console.debug('productList addProduct: ' + product);
            self.productList.push(product);
        };

        self.updateProduct = function(idx, product){
            self.productList[idx] = angular.copy(product);
        };

        self.deleteProduct = function(idx){
           // console.debug('productList deleteProduct: ' + idx);
            self.productList.splice(idx,1);
        }

    }


})();