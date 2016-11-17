/**
 * Created by dkilty on 17/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('nervousModule', [])
})();


(function () {
    'use strict';

    angular
        .module('nervousModule')
        .component('cmpNervousSystem', {
            templateUrl: './components/appendix-four/tpl-nervous.html',
            controllerAs: 'sysCtrl',
            controller: nervousSystemController,
            bindings: {
                record: '<'
            }

        });
    function nervousSystemController() {
        var vm = this;
        vm.model = {}
        vm.$onInit = function () {

        };
        vm.$onChanges = function (changes) {
            if (changes.record) {
                vm.model = (changes.record.currentValue);
            }
        };
    }
})();
