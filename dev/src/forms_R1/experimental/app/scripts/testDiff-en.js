/**
 * Created by dkilty on 8/26/2016.
 */
(function () {
    'use strict';
    angular
        .module('activityApp', [
            'pascalprecht.translate',
            'translations',
            'fileIO',
            'ui.tree',
            'diffModule'
        ])
})();

// https://github.com/angular-ui-tree/angular-ui-tree


(function () {
    'use strict';
    angular
        .module('activityApp')
        .controller('MainController', MainController);

    MainController.$inject = ['$translate', '$filter','$scope','diffEngine'];
    function MainController($translate, $filter,$scope,diffEngine) {
        var vm = this;
        vm.formType = 'EXT';
        vm.showContent = _loadFileContent;
        vm.showContent2 = _loadFileContent2;
        vm.content1 = {};
        vm.content2 = {};
        vm.diffList={};
        vm.listResults = null;
        vm.exclusions={
            "company_contact_details":"true",
            "company_address_details":"false",
            "toString":"true"
        };

        /***
         * Compares the two files
         */
        vm.compareFiles = function () {
            if (vm.content1 && vm.content2) {
                var diffList=diffEngine.compareJson(vm.content1, vm.content2);
                vm.diffList=diffList;
                vm.listResults=diffEngine.consolidateResults(diffList,  vm.exclusions);
            } else {
                console.error("One of the files does not have content")
            }
        };

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            vm.content1 = fileContent.jsonResult;
        }

        function _loadFileContent2(fileContent) {
            if (!fileContent)return;

            vm.content2 = fileContent.jsonResult;
        }

        vm.collapseAll = function () {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        vm.expandAll = function () {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };

    }
})();
//test
(function () {
    'use strict';
    angular
        .module('activityApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.directivePriority(1);
            $translateProvider.preferredLanguage('en');
            // $translateProvider.useLoader('customLoad');
            $translateProvider.useSanitizeValueStrategy(null);
            // $translateProvider.forceAsyncReload(true); //needed for the custom loader

        }]);
})();