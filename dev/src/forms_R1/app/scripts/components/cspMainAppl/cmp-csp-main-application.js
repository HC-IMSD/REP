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
                record:'<'
            }
        });

    mainApplicationController.$inject = ['NOC','GRANT','OWNER','OWNER_BEHALF'];
    function mainApplicationController(NOC,GRANT,OWNER,OWNER_BEHALF) {

        var vm = this;
        vm.model="";
        vm.nocValue=NOC;
        vm.grantValue=GRANT;
        vm.ownerValue=OWNER;
        vm.ownerBehalfValue=OWNER_BEHALF;

        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit=function(){

        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {
            if(changes.record){

                vm.model=changes.record.currentValue;
            }
        };

    }
})();