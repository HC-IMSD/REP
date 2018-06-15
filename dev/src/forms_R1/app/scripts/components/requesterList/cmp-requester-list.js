/**
 * Created by SteveZhao on 5/25/2018.
 */
(function () {
    'use strict';

    angular
        .module('requesterListModule', ['dataLists', 'requesterRecordModule', 'ui.select', 'hpfbConstants'])
})();

(function () {
    'use strict';

    angular
        .module('requesterListModule')
        .component('cmpRequesterList', {
            templateUrl: 'app/scripts/components/requesterList/tpl-requester-list.html',
            controller: requesterListController,
            controllerAs: 'requesterListCtrl',
            bindings: {
                listItems: '<',
                onUpdate: '&',
                onDelete: '&',
                showErrors:'<',
                updateErrorSummary:'&'
            }
        });

    requesterListController.$inject = ['$filter', 'getContactLists', '$scope'];

    function requesterListController($filter, getContactLists, $scope) {
        var vm = this;
        vm.baseRequesters = [];
        vm.model = {};
        vm.isDetailValid = true;
        vm.resetToCollapsed = true;
        vm.showDetailErrors=false;
        vm.selectRecord = -1;
        vm.columnDef = [
            {
                label: "Requester Name",
                binding: "solicitedRequester",
                width: "100"
            }
        ];

        vm.emptyModel = {"sequenceNumber": "", "solicitedRequester": "", "otherRequesterDetails":"", display: ""};


        vm.$onInit = function () {
            _setIdNames();
            vm.showDetailErrors=false;
            if (angular.isUndefined(vm.model.list)) {
                vm.model.list = [];
            }

            loadContactData();
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
            var maxID = getListMaxID();
            var item = angular.copy(vm.emptyModel);
            item.sequenceNumber = (getListMaxID() + 1);
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
                $filter('filter')(vm.model.list, {sequenceNumber: _id}, true)[0]
            );
            if (idx < 0) return;

            vm.model.list.splice(idx, 1);
             vm.onUpdate({list:vm.model.list});
        };

        function loadContactData() {
            getContactLists.getInternalContactsWithoutOther()
                .then(function (data) {
                    vm.baseRequesters = data;
                    return true;
                });
        }

        function getListMaxID() {

            var out = 0;
            var list = vm.model.list;
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].sequenceNumber > out) {
                        out = list[i].sequenceNumber;
                    }
                }
            }
            return out;

        }
        /**
         * sets the names of the fields. Use underscore as the separator for the scope id. Scope id must be at end
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
        }

        vm.disableAddButton=function(){
            if(vm.model.list.length === 0) return false;
            return(vm.requesterListForm.$invalid);
        };


        /*  $scope.$watch('countryListCtrl.countryListForm.$error', function () {
                    vm.updateErrorSummary();
                }, true);*/
    }
})();