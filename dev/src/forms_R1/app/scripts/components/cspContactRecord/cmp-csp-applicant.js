/**
 * Created by dkilty on 03/04/2017.
 */


(function () {
    'use strict';

    angular
        .module('cspApplicant', [
            'contactModule',
            'addressModule'
        ]);

})();


(function () {
    'use strict';
    angular
        .module('cspApplicant')
        .component('cmpCspApplicant', {
            templateUrl: 'app/scripts/components/cspContactRecord/tpl-csp-applicant.html',
            controller: cspApplicantCtrl,
            controllerAs: 'cspApplCtrl',
            bindings: {
                record:'<'
            }
        });



   // cspApplicantCtrl.$inject = [];

    /* @ngInject */
    function cspApplicantCtrl() {
        var vm = this;
        vm.title = 'CspApplicantCtrl';
        vm.model=null;
        vm.$onInit=function(){


        };

        vm.$onChanges=function(changes){

           if(changes.record){
             vm.model=changes.record.currentValue;
           };

        }

        ////////////////

    }

})();

