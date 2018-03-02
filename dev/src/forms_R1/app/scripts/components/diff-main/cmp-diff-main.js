/**
 * Created by dkilty on 8/26/2016.
 */
(function () {
    'use strict';
    angular
        .module('diffMain', [
            'fileIODiff',
            'ui.tree',
            'diffModule'
        ])
})();

// https://github.com/angular-ui-tree/angular-ui-tree


(function () {
    'use strict';
    angular
        .module('diffMain')
        .component('cmpDiffMain', {
            templateUrl: 'app/scripts/components/diff-main/tpl-diff-main.html',
            controller: MainController,
            controllerAs: 'ctrl',
            bindings: {
            }
        });

    MainController.$inject = ['$translate', '$filter','$scope','diffEngine'];
    function MainController($translate, $filter,$scope,diffEngine) {
        var vm = this;
        vm.version=0.2; //version number of the form

        vm.showContent = _loadFileContent;
        vm.showContent2 = _loadFileContent2;
        vm.content1 = null;
        vm.content2 = null;
        vm.diffList={};
        vm.listResults = null;
        vm.exceptionUrl = "data/xmlDiffExclusions.json";
        vm.exclusions = {};
        vm.twoFiles=true;
        vm.resetFilenames=0;
        vm.isRaw= false; // toggle to show or hide the


        vm.$onInit = function () {
            _loadExceptionData();
            vm.twoFiles=true;
        };
        vm.$onChanges = function (changes) {
            //if change events
        };

        /***
         * Compares the two files ff
         */
        vm.compareFiles = function () {
            if (vm.content1 && vm.content2) {
                vm.twoFiles=true;
                var diffList=diffEngine.compareJson(vm.content1, vm.content2);
                vm.diffList=diffList;
                vm.listResults=diffEngine.consolidateResults(diffList,  vm.exclusions);
            } else {
                console.error("One of the files does not have content");
                vm.twoFiles=false;
            }
        };

        vm.clear=function(){
            vm.content1=null;
            vm.content2=null;
            vm.listResults=null;
            vm.twoFiles=true;
            vm.resetFilenames++;
            console.log(vm.resetFilenames)
        }

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            vm.content1 = fileContent.jsonResult;
        }

        function _loadFileContent2(fileContent) {

            if (!fileContent)return;

            vm.content2 = fileContent.jsonResult;
        }

        vm.showRaw=function(){
          vm.isRaw=!vm.isRaw;

        };

        vm.collapseAll = function () {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        vm.expandAll = function () {
            $scope.$broadcast('angular-ui-tree:expand-all');
        };


        function _loadExceptionData() {
            diffEngine.loadExceptionList(vm.exceptionUrl)
                .then(function (data) {
                    vm.exclusions = data;
                    return true;
                });
        }
    }
})();
