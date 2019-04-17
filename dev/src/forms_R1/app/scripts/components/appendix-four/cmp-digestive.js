/**
 * Created by dkilty on 17/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('digestiveModule', ['errorMessageModule'])
})();


(function () {
    'use strict';

    angular
        .module('digestiveModule')
        .component('cmpDigestiveSystem', {
            templateUrl: 'app/scripts/components/appendix-four/tpl-digestive.html',
            controllerAs: 'sysCtrl',
            controller: digestiveSystemController,
            bindings: {
                record: '<',
                isFileLoaded: '<',
                otherUpdate: '&',
                concatUpdate: '&',
                showErrors:'&',
                addBtn: '<'
            }
        });

    digestiveSystemController.$inject=['$scope']
    function digestiveSystemController($scope) {
        var vm = this;
        vm.model = {};
        vm.isSelected = "";
        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];

        vm.$onInit = function () {
            vm.isSelected = vm.isFileLoaded == true ? "selected" : "";
            _setIdNames()
        };
        vm.$onChanges = function (changes) {
            if (changes.record) {
                vm.model = (changes.record.currentValue);
                // vm.updateErrorState();
            }
            if (changes.addBtn && changes.addBtn.currentValue > 1){
                vm.isSelected = 'selected';
            }
        };

        vm.detailsChanged = function (alias, value) {

            vm.concatUpdate({'alias': alias, 'value': value});
            // vm.updateErrorState();
        };

        vm.updateErrorState = function () {
            var keys = Object.keys(vm.model);
            for (var i = 0; i < keys.length; i++) {
                var val = vm.model[keys[i]];
                if (val) {
                    if (keys[i] === 'otherDigestive') {
                        if (!vm.model.otherDetails) {
                            vm.isSelected = "";
                            return
                        }
                        vm.isSelected = "selected";
                        return;
                    } else {
                        vm.isSelected = "selected";
                        return;
                    }
                }
            }
            vm.isSelected = ""
        };

        vm.otherChanged = function () {
            var state = false;
            if (vm.model.otherDigestive) {
                state = true;
            } else {
                state = false;
                vm.model.otherDetails = "";
            }
            vm.otherUpdate();
            // vm.updateErrorState();
            return state;
        }

       /* vm.showErrorMissing=function(){

            return (vm.digestForm.$dirty && vm.digestForm.$invalid);
        }*/

        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.roleMissingId = "roleMissing" + scopeId;
            vm.systemRoleId = "system_role" + scopeId;
            vm.otherDetailsId = "digestive_details" + scopeId;
        }


    }
})();
