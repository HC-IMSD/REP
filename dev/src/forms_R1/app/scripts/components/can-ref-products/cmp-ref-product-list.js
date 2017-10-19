/**
 * Created by Abdessamad on 8/12/2016.
 */
(function () {
    'use strict';

    angular
        .module('refProductListModule', ['expandingTable', 'refProductDetailsModule'])
})();

(function () {
    'use strict';

    angular
        .module('refProductListModule')
        .component('cmpRefProductList', {
            templateUrl: 'app/scripts/components/can-ref-products/tpl-ref-product-list.html',
            controller: refProductListCtrl,
            controllerAs: 'crpl',
            bindings: {
                products: '<',
                onUpdate: '&',
                showErrorSummary:'<'
            }
        });

    function refProductListCtrl() {
        var vm = this;
        vm.isDetailValid = true;
        vm.selectRecord = -1;
        vm.resetToCollapsed = false;
        vm.newProductFormShown = false;
        vm.$onInit = function () {

            vm.newProductFormShown = false;
            vm.isDetailValid = true;
            vm.selectRecord = -1;

            vm.colNames = [
                {label: "BRAND_NAME", binding: "brandName", width: "50"},
                {label: "COMPANY_NAME", binding: "companyName", width: "50"}
            ];
            vm.productList = [];
            vm.newProductFormShown = false;

            if (vm.products) {
                vm.productList = vm.products;
            }
            // }


        };

        vm.$onChanges = function (changes) {

            if (changes.products) {
                vm.productList = changes.products.currentValue;
            }
            if(changes.showErrorSummary){

                vm.showSummmary=changes.showErrorSummary.currentValue;
            }
        };

        vm.addProduct = function (product) {
            vm.setValid(true);
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.productList.push(product);
            vm.newProductFormShown = false;
            vm.onUpdate({recs: vm.productList});
            setRecord(-1);
        };

        vm.updateProduct = function (idx, product) {
            vm.productList[idx] = angular.copy(product);
            vm.setValid(true);
            vm.onUpdate({recs: vm.productList});
        };

        vm.deleteProduct = function (idx) {
            // console.debug('productList deleteProduct: ' + idx);
            vm.productList.splice(idx, 1);
            vm.setValid(true);
            setRecord(-1);
            vm.onUpdate({recs: vm.productList});
            vm.resetToCollapsed = !vm.resetToCollapsed;
        };
        function setRecord(value){
            vm.selectRecord = value;
        }

        /**
         * Sets the UI state for the add new template
         */
        vm.addNewProductState=function(){
            vm.resetToCollapsed = !vm.resetToCollapsed;
            vm.newProductFormShown = true;
            vm.setValid(false);
            return(vm.newProductFormShown);
        };
        vm.addNewDisabled=function(){
            return ( vm.newProductFormShown || !vm.isDetailValid);
        };
        vm.setValid=function(value){
            vm.isDetailValid=value;
        };
        vm.onNewCancel=function(){
            vm.setValid(true);
            vm.newProductFormShown = false
        }



    }


})();