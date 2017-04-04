/**
 * Created by dkilty on 04/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspHCOnly', []);

})();

(function () {
    'use strict';

    angular
        .module('cspHCOnly')
        .component('cmpCspHcOnly', {
            templateUrl: 'app/scripts/components/folder-name/tpl-name.html',
            controller: hcOnlyController,
            controllerAs: 'hcOnlyCtrl',
            bindings: {}
        });

   // hcOnlyController.$inject = [];
    function hcOnlyController() {

        var vm = this;
        vm.model = null;

        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {

        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {

        };

    }
})();