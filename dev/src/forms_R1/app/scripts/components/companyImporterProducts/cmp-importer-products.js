/**
 * Created by dkilty on 25/01/2017.
 */

(function () {
    'use strict';

    angular
        .module('importerProducts', ['dossierIdDetails'])
})();

(function () {
    'use strict';
///test das asdsadsa
    angular
        .module('importerProducts')
        .component('cmpImporterProducts', {
            templateUrl: 'app/scripts/components/companyImporterProducts/tpl-importer-products.html',
            controller: importerProductsCtrl,
            controllerAs: 'impProdCtrl',
            bindings: {
                updateValid: '&',
                onDelete: '&',
                isAmend: '<',
                isDetailValid: '&',
                importerProducts: '<',
                onUpdate: '&'

            }
        });
    importerProductsCtrl.$inject = [];

    function importerProductsCtrl() {
        var vm = this;
        vm.savePressed = false;
        vm.formAmend = false;
        vm.recordReadOnly = false; //needed for din
        //vm.isNotEditable = false;

        vm.model = {
            productsImported: "",
            dossierIdList: []
        };

        vm.$onInit = function () {

        };

        /**
         * Due to binding with table expander this method does not get called
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.importerProducts && changes.importerProducts.currentValue) {
                vm.model = angular.copy(changes.importerProducts.currentValue);

            }
        };

        vm.addDossierId = function () {
            if (!(vm.model.dossierIdList instanceof Array)) {
                vm.model.dossierIdList = [];
            }
            vm.model.dossierIdList.push({dossierId: ""});
            ///form is invalid if adding a din
            vm.isDetailValid({state: false});

        };

        vm.deleteId = function (index) {
            //using index in
            if (index >  vm.model.dossierIdList.length - 1) {
                return;
            }
            vm.model.dossierIdList.splice(index, 1);
            vm.isDetailValid({state: true});
        };


        /**
         * @ngdoc method toggles error state to make errors visible
         * @returns {boolean}
         */
        vm.showErrors = function () {

            return (vm.savePressed)
        };
        vm.isIdInvalid = function (index) {
            return !( vm.model.dossierIdList[index].dossierId &&  vm.model.dossierIdList[index].dossierId.length === 8);
        };

        /**
         * Controls errors state of an individual UI control. Since cannot pass the control for some reason
         * pass the needed state variables... very annoying
         * @param isTouched
         * @param isInvalid
         * @returns {boolean}
         */
        vm.showError = function (isTouched, isInvalid) {

            return (isInvalid && isTouched) || (vm.showErrors() && isInvalid );
        };


        /**
         * @ngdoc method used to determine if record should be editable. Used for amend
         * @returns {boolean}
         */
        vm.setNotEditable = function () {
           // vm.recordReadOnly = vm.formAmend && !vm.activityModel.amendRecord;
           /// return (vm.recordReadOnly);
            return false;
        }

    }


})();