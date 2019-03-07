/**
 * Created by steveZhao on 05/25/2018.
 */

(function () {
    'use strict';

    angular
        .module('importerRecordModule',
            [
                'hpfbConstants',
                'errorMessageModule'
            ])
})();

(function () {
    'use strict';

    angular
        .module('importerRecordModule')
        .component('cmpImporterRecord', {
            templateUrl: 'app/scripts/components/importerRecord/tpl-importer-record.html',
            controller: importerRecordController,
            controllerAs:'importerRecCtrl',
            bindings: {
                record: '<',
                onDelete: '&',
                showErrors: '<'
            }
        });

    importerRecordController.$inject = ['$scope'];
    function importerRecordController($scope) {
        var vm = this;

        vm.model = {"importerId": "", "importerName": ""};
        vm.showDetailErrors=false;
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.min5Error = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_MIN5"},
            {type: "pattern", displayAlias: "MSG_FORMAT_6DIGITS"}
        ];

        vm.$onInit = function(){
            vm.showDetailErrors=false;
            _setIdNames();
        };

        vm.$onChanges = function (changes) {
            if (changes.record && changes.record.currentValue) {
                vm.model = changes.record.currentValue;
            }
            if(changes.showErrors){
                vm.showDetailErrors=changes.showErrors.currentValue;
            }

        };

        vm.deleteRecord = function()  {
            vm.onDelete({id: vm.model.importerId})
        };

        vm.showError = function (ctrl) {
            if(!ctrl) return false;
            return ((ctrl.$invalid && ctrl.$touched) || (ctrl.$invalid && vm.showDetailErrors) )
        };

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.impId="importerid"+scopeId;
            vm.importerNameId="importer_company_name"+scopeId;
        }
    }
})();