/**
 * Created by Abdessamad on 7/24/2016.
 */
(function () {
    'use strict';


    //TODO: Lazy load modules
    angular.module('tabsModule', ['formulationsModule', 'appendixFourModule']);
})();

(function () {
    'use strict';
    angular.module('tabsModule').component('cmpTabs', {
        templateUrl: 'app/scripts/components/tabs/tpl-tabs.html',
        controller: tabsCtrl,
        controllerAs: 'tabsCtrl',
        bindings: {
            formulationList : '<',
            appendix4List : '<',
            recordChanged: '&',
            service: '<',
            errorSummaryUpdate:'<',
            showErrorSummary:'<',
            updateErrorSummary:'&'
        }
    });

    tabsCtrl.$inject = ['$scope'];


    function tabsCtrl($scope) {

        var vm = this;
        vm.showSummary=false;
        vm.updateSummary=0;
        vm.tabs = [
            {
                label: "FORMULATIONS",
                selected: true,
                disabled: false,
                errors: true,
                form: {}
            },
            {
                label: "APPENDIX4",
                selected: false,
                disabled: false,
                errors: false,
                form: {}
            }
        ];
        vm.$onInit = function () {

        };
        vm.$onChanges=function(changes){
            if(changes.errorSummaryUpdate){
                console.log("Changes in tab")
                vm.updateSummary=changes.errorSummaryUpdate.currentValue;

            }
            if(changes.showErrorSummary){
                vm.showSummary=changes.showErrorSummary.currentValue;
            }

        }
        vm.selectTab = function (idx) {

            /*  angular.forEach(vm.tabs, function (tab) {
                    tab.selected = false;
             tab.errors=tab.form.$invalid;
             });*/

            for (var i = 0; i < vm.tabs.length; i++) {
                vm.tabs[i].selected = false;
                if (idx !== i) {
                    vm.tabs[i].errors = vm.tabs[i].form.$invalid;
                }
            }

                vm.tabs[idx].selected = true;
            //vm.tabs[idx].errors= vm.tabs[idx].form.$invalid
        };
    }

})();
