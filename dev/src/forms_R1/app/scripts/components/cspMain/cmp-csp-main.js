/**
 * Created by dkilty on 03/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspMain', [
            'hpfbConstants'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspMain')
        .component('cmpCspMain', {
            templateUrl: 'app/scripts/components/cspMain/tpl-csp-main.html',
            controller: cspMainCtrl,
            controllerAs: 'main',
            bindings: {
                formType: '@'
            }
        });

    cspMainCtrl.$inject = ['INTERNAL_TYPE', 'EXTERNAL_TYPE'];
    function cspMainCtrl(INTERNAL_TYPE, EXTERNAL_TYPE) {

        var vm = this;

    }
})();


