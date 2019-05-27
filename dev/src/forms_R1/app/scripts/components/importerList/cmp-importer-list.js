/**
 * Created by SteveZhao on 5/25/2018.
 */
(function () {
    'use strict';

    angular
        .module('importerListModule', ['dataLists', 'importerRecordModule', 'ui.select', 'hpfbConstants'])
})();

(function () {
    'use strict';

    angular
        .module('importerListModule')
        .component('cmpImporterList', {
            templateUrl: 'app/scripts/components/importerList/tpl-importer-list.html',
            controller: importerListController,
            controllerAs: 'importerListCtrl',
            bindings: {
                listItems: '<',
                onUpdate: '&',
                onDelete: '&',
                showErrors:'<',
                updateErrorSummary:'&'
            }
        });

    importerListController.$inject = ['$filter','$scope'];

    function importerListController($filter, $scope) {
        var vm = this;
        vm.model = {};
        vm.isDetailValid = true;
        vm.resetToCollapsed = true;
        vm.showDetailErrors=false;
        vm.selectRecord = -1;
        vm.columnDef = [
            {
                label: "IMPORTERID",
                binding: "importerId",
                width: "20"
            },
            {
                label: "IMPORTER_COMPANY_NAME",
                binding: "importerName",
                width: "80"
            }
        ];

        vm.emptyModel = {"importerId": "", "importerName": ""};


        vm.$onInit = function () {
            _setIdNames();
            vm.showDetailErrors=false;
            if (angular.isUndefined(vm.model.list)) {
                vm.model.list = [];
            }
        };

        vm.$onChanges = function (changes) {
            if (changes.listItems) {
                vm.model.list = changes.listItems.currentValue;
            }

            if(changes.showErrors){
                vm.showDetailErrors=changes.showErrors.currentValue;
            }
        };

        vm.addNew = function () {
            var item = angular.copy(vm.emptyModel);
            (vm.model.list).push(item);
            setRecord(-1);
            vm.resetToCollapsed = !vm.resetToCollapsed;
            setRecord(vm.model.list.length - 1);
            //vm.editRecord(item);
            vm.onUpdate({list: vm.model.list});

        };

        function setRecord(value) {
            vm.selectRecord = value;

        }

        vm.deleteRecord = function (_id) {
            var idx = vm.model.list.indexOf(
                $filter('filter')(vm.model.list, {importerId: _id}, true)[0]
            );
            if (idx < 0) return;

            vm.model.list.splice(idx, 1);
             vm.onUpdate({list:vm.model.list});
        };

        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
        }

        vm.disableAddButton=function(){
            if(vm.model.list.length === 0) return false;
            return(vm.importerListForm.$invalid);
        };


        /*  $scope.$watch('countryListCtrl.countryListForm.$error', function () {
                    vm.updateErrorSummary();
                }, true);*/
    }
})();