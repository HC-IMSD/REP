/**
 * Created by dkilty on 05/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspPatent', [

        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspPatent')
        .component('cmpCspPatent', {
            templateUrl: 'app/scripts/components/cspPatent/tpl-csp-patent.html',
            controller: cspPatentController,
            controllerAs: 'cspPatentCtrl',
            bindings: {
                record:'<'
            }
        });

   // cspPatentController.$inject = [];
    function cspPatentController() {

        var vm = this;
        vm.model="";


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