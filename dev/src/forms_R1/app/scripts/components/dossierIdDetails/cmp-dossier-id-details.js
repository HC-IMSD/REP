/**
 * Created by dkilty on 25/01/2017.
 */

(function () {
    'use strict';

    angular
        .module('dossierIdDetails', [])
})();

(function () {
    'use strict';

    angular
        .module('dossierIdDetails')
        .component('cmpDossierIdDetails', {
            templateUrl: 'app/scripts/components/dossierIdDetails/tpl-dossier-id-details.html',
            controller: dossierIdDetailsCtrl,
            controllerAs: 'dosIdCtrl',

            bindings: {
                dossierRecord: '<',
                idIndex:'<',
                deleteId:'&',
                showErrors: '&',
                setReadonly: '&'
            }
        });
    //dossierIdDetailsCtrl.$inject = [];

    function  dossierIdDetailsCtrl() {
        var vm = this;
        vm.record={dossierId:""};
        vm.detailsIndex=0;
        vm.$onInit = function () {
        };

        /**
         *
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.dossierRecord) {
                vm.record=changes.dossierRecord.currentValue
            }
            if(changes.idIndex){
                vm.detailsIndex=changes.idIndex.currentValue;
            }
        };
        vm.delete=function(){
            vm.deleteId({dossierIndex:vm.detailsIndex})
        };
        vm.showError=function(isTouched,isInvalid){
            if ((isInvalid && isTouched) || (vm.showErrors() && isInvalid )){
                return true
            }
            return false
        }
    }
})();