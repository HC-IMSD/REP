/**
 * Created by dkilty on 06/04/2017.
 */

(function () {
    'use strict';

    angular
        .module('cspCertification', [
            'errorMessageModule'
        ]);

})();

(function () {
    'use strict';

    angular
        .module('cspCertification')
        .component('cmpCspCertification', {
            templateUrl: 'app/scripts/components/cspCertification/tpl-csp-certification.html',
            controller: cspCertificationController,
            controllerAs: 'cspCertCtrl',
            bindings: {
                record: '<',
                showErrors: '&'
            }
        });

    cspCertificationController.$inject = ['$scope'];
    function cspCertificationController($scope) {

        var vm = this;
        vm.model = null;

        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];
        vm.dateError = [{type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "date", displayAlias: "MSG_ERR_DATE_FORMAT"}];
        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {
            _setIDNames();
        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model = changes.record.currentValue;
            }

        };


        function _setIDNames() {
            var scopeId = "_" + $scope.$id;
            vm.firstNameId = "certFirstName" + scopeId;
            vm.lastNameId = "certLastName" + scopeId;
            vm.salutationId = "certSalut" + scopeId;
            vm.jobTitleId = "certJobTitle" + scopeId;
            vm.dateSignedId = "certDateSigned" + scopeId;
        }
    }
})();