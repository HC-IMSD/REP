/**
 * Created by dkilty on 05/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspMainApplication', [
            'cspConstants'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspMainApplication')
        .component('cmpCspMainApplication', {
            templateUrl: 'app/scripts/components/cspMainAppl/tpl-csp-main-application.html',
            controller: mainApplicationController,
            controllerAs: 'cspMainApplCtrl',
            bindings: {
                record: '<',
                drugUses: '<'
            }
        });

    mainApplicationController.$inject = ['NOC', 'GRANT', 'OWNER', 'OWNER_BEHALF', '$scope'];
    function mainApplicationController(NOC, GRANT, OWNER, OWNER_BEHALF, $scope) {

        var vm = this;
        vm.model="";
        vm.nocValue=NOC;
        vm.grantValue=GRANT;
        vm.ownerValue=OWNER;
        vm.ownerBehalfValue=OWNER_BEHALF;
        vm.drugUseList = [];
        vm.ngModelOptSetting = {updateOn: 'blur'};
        vm.requiredOnlyError = [{type: "required", displayAlias: "MSG_ERR_MAND"}];

        vm.numberError = [{type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_6NUM"}
        ]; //used for control number



        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit=function(){
            _setIDNames();
        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {
            if(changes.record){

                vm.model=changes.record.currentValue;
            }
            if (changes.drugUses) {
                vm.drugUseList = changes.drugUses.currentValue;
            }
        };


        function _setIDNames() {
            var scopeId = "_" + $scope.$id;
            vm.controlNumberId = "controlNumber" + scopeId;
            vm.drugUseId = "drugUse" + scopeId;
            vm.applApplyId = "time120" + scopeId;
        }
    }
})();