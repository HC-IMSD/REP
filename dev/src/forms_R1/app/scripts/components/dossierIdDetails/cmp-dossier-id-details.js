/**
 * Created by dkilty on 25/01/2017.
 */

(function () {
    'use strict';

    angular
        .module('dossierIdDetails', [  'errorMessageModule'])
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
                isAmend:'<',
                setReadonly: '&'
            }
        });
    dossierIdDetailsCtrl.$inject = ['$scope'];

    function  dossierIdDetailsCtrl($scope) {
        var vm = this;
        vm.record={dossierId:""};
        vm.detailsIndex=0;
        vm.isEditable=true;

        vm.min7Error = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_7NUM"}
        ];

        vm.$onInit = function () {
            _setIdNames();

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
            if (changes.isAmend) {
                vm.isEditable = changes.isAmend.currentValue;
            }
        };
        vm.delete=function(){
            vm.deleteId({dossierIndex:vm.detailsIndex})
        };
        vm.showError=function(ctrl){
            if(!ctrl) return false;

            if ((ctrl.$invalid && ctrl.$touched) || (vm.showErrors() && ctrl.$invalid )){
                return true
            }
            return false
        }


        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.dossierId="dossier_id" + scopeId;

        }



    }
})();