/**
 * Created by dkilty on 08/08/2016.
 */


(function () {
    'use strict';

    angular
        .module('hcValidation')
        .directive('rolesSelected', rolesSelected);

   // directiveName.$inject = ['dependency'];

    /* @ngInject */
    function rolesSelected() {
        var directive = {
            bindToController: true,
            controller: ControllerName,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            ngModel.$validators.required = function(modelValue) {
                //true or false based on required validation


            };

            ngModel.$validators.customdir= function(modelValue) {
                //true or false based on custome dir validation
            };
        }
    }

    ControllerName.$inject = ['dependency'];

    /* @ngInject */
    function ControllerName(dependency) {

    }

})();

