/**
 * Created by dkilty on 10/31/2016.
 */

(function () {
    'use strict';

    angular
        .module('roaRecord',
            [
                'ui.select',
                'hpfbConstants',
                'errorMessageModule'
            ])

})();

(function () {
    'use strict';

    angular
        .module('roaRecord')
        .config(function (uiSelectConfig) {
            //choices: select2, bootstrap, selectize
            uiSelectConfig.theme = 'select2';
        })
        .component('cmpRoaRecord', {
            templateUrl: 'app/scripts/components/route-admin/tpl-roa-record.html',
            controller: roaRecordController,
            controllerAs:'roaRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                updateRecord: '&',
                resetMe: '&',
                showErrors: '<',
                isFocus: '<',
                cancelFocus: '&'
            }
        });

    roaRecordController.$inject=['DossierLists','$translate','$scope','ENGLISH'];

    function roaRecordController(DossierLists, $translate,$scope, ENGLISH){
        var vm = this;
        vm.roaList = DossierLists.getRoa();
        vm.model = {};
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.showDetailErrors=false;
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.roaFilter = "roaRecCtrl.model.display";
        vm.$onInit = function(){
            vm.lang = $translate.proposedLanguage() || $translate.use();
            if(!vm.lang){
            vm.lang=ENGLISH;
            }
            _setIdNames();
            vm.showDetailErrors=false;
        };

        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model=changes.record.currentValue;
                // vm.updateRecord();
            }
            if(changes.showErrors){

                vm.showDetailErrors=changes.showErrors.currentValue;
            }
        };

        /**
         * This is done strictly to update the summary table.
         * @param item
         * @param model
         */
        vm.saveRecord = function(){
            var found = false;
            for(var i = 0; i < vm.roaList.length; i++) {
                var option =vm.roaList[i];
                if(option[vm.lang] === vm.model.display) {
                    vm.model.roa = option;
                    found = true;
                    break;
                }
            }
            if( ! found ){
                for(var i = 0; i < vm.roaList.length; i++) {
                    var option =vm.roaList[i];
                    if(option['id'] === vm.model.display) {
                        vm.model.display = option[vm.lang];
                        found = true;
                        break;
                    }
                }
            }
            if(found){
                vm.clearFilter($scope);
                vm.updateRecord();
            } else {
                vm.model.display = "";
                vm.model.roa = "";
            }
        };

        vm.deleteRecord = function()  {
            vm.onDelete({id: vm.model.id});
        };

        vm.showError = function (ctrl) {
            if(!ctrl) return false;
            // if(vm.model.roa == ""){
            //     ctrl.$invalid = false;
            //     return true;
            // }
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid && vm.showDetailErrors) )
        };
        vm.isRoaOther = function () {
           if(vm.model.display === 'Other'){
               return true;
           }else{
               vm.model.otherRoaDetails="";
               return false;
           }
        };

        vm.clearFilter = function($scope){
            $scope.roaFilter = "";
        }
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.roaId="roa_lbl" + scopeId;
            vm.unknownRoaId="other_roa_details" + scopeId;
        }

    }
})();