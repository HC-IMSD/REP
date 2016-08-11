/**
 * Created by Abdessamad on 7/24/2016.
 */
(function () {
    'use strict';


    //TODO: Lazy load modules
    angular.module('tabsModule', []);
})();

(function () {
    'use strict';
    angular.module('tabsModule').component('cmpTabs', {
        templateUrl: './components/tabs/tpl-tabs.html',
        controller: tabsCtrl,
        controllerAs: 'tabs',
        bindings: {
        }
    });

    tabsCtrl.$inject = ['$scope'];


    function tabsCtrl($scope) {
    }

})();
