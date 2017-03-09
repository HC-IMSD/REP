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
            'ui.tree'
        ])
})();

// https://github.com/angular-ui-tree/angular-ui-tree


(function () {
    'use strict';
    angular
        .module('activityApp')
        .controller('MainController', MainController);

    MainController.$inject = ['$translate', '$filter','$scope'];
    function MainController($translate, $filter,$scope) {
        var vm = this;
        vm.formType = 'EXT';
        vm.showContent = _loadFileContent;
        vm.showContent2 = _loadFileContent2;
        vm.content1 = {};
        vm.content2 = {};
        vm.listResults = null;

        /***
         * Compares the two files
         */
        vm.compareFiles = function () {
            if (vm.content1 && vm.content2) {
                var diffList = DeepDiff(vm.content1, vm.content2);
                console.log(diffList);
                vm.listResults = _consolidateResults(diffList);
                console.log(vm.listResults)
            } else {
                console.error("Null file")
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


        //  https://www.npmjs.com/package/deep-diff
        function _consolidateResults(diffList) {

            var resultList = [];
            if (!diffList) return resultList;
            //loop through each difference node and build a consolidated view
            for (var i = 0; i < diffList.length; i++) {
                var record = diffList[i];
                processNode(record, resultList);
                //rec.path.length
            }
            console.log(resultList);
            return (resultList);
        }


        /***
         * For each difference node, process/ consolidate it in a tree
         * @param node
         * @param resultList
         */
        function processNode(node, resultList, currentNode) {

            var _index = 0;
            var currentRecord = null;
            var existingRecord = null;
            var searchList = resultList;

            if (currentNode) {
                currentRecord = currentNode;
                searchList = currentNode.nodes;
            }
            //check to see if it has index property. Indicates multiplicity
            if (node.hasOwnProperty("index")) {
                _index = node.index;
            }

            //specia; case: node paths are one
            if (node.path && node.path.length === 1) {

                //find existing record if it exists
                existingRecord = $filter('filter')(resultList, {
                    recordName: node.path[0], index: _index
                });

                if (existingRecord && existingRecord.length > 0) {
                    currentRecord = existingRecord[0];
                    //update the values
                    _updateNodeRecord(node, currentRecord, true);
                }
                //if no current record, make a new entery
                else if (!currentRecord) {
                    var newNode = _createNodeRecord(node, node.path[0], _index, true);
                    resultList.push(newNode);
                    currentRecord = newNode;
                }
                return;
            }

            for (var i = 0; i < node.path.length; i++) {
                var record_found = null;
                if (angular.isNumber(node.path[i])) {
                    continue; //skip number nodes
                }

                //if not at end and is a num
                if (i < node.path.length - 2 && angular.isNumber(node.path[i + 1])) {
                    _index = Number(node.path[i + 1]);
                } else {
                    _index = 0; //is this always true?
                }
                record_found = $filter('filter')(searchList, {recordName: node.path[i], index: _index});
                if (record_found && record_found.length > 0) {
                    existingRecord = record_found[0];
                    searchList = existingRecord.nodes;
                } else {
                    //new create it
                    var isLeaf = i === node.path.length - 1;
                    //checking for the case where one file has a single record and another file has an array of the same
                    //records. This needs to be specially handled
                    if (((node.lhs instanceof Array) && (!(node.rhs instanceof Array) && (node.rhs instanceof Object))) ||
                        ((node.rhs instanceof Array) && (!(node.lhs instanceof Array) && (node.lhs instanceof Object)))) {
                        console.warn("This is a special case");
                        var specialResults = _processSpecialCase(node, node.path[i], _index);

                        console.log("=============Special case results================");
                        console.log(specialResults);
                        var target=null;
                        if (!existingRecord) {
                            //existingRecord = specialResults;
                            target=resultList;
                        }else{
                           target= existingRecord.nodes;
                        }
                        for(var k=0;k<specialResults.length;k++){
                            target.push(specialResults[k]);
                        }

                    } else {
                        var newNode = _createNodeRecord(node, node.path[i], _index, isLeaf);
                        searchList = newNode.nodes;
                        if (!existingRecord) {
                            existingRecord = newNode;
                            resultList.push(newNode);
                        } else {

                            if (isLeaf) {
                                existingRecord.value.push(newNode);
                            } else {
                                existingRecord.nodes.push(newNode);
                            }
                            existingRecord = newNode;
                        }
                    }
                }
            }
        }

        function _processSpecialCase(node, nodeName, index) {
            //since a special case need to make a group of node results
            console.log("Special case node name is: " + nodeName)
            var result = [];
            var isAdd = true;
            var base={};
            var compare ={};
            base[nodeName]=[];
            compare[nodeName]=[];
            if (node.rhs instanceof Array) {
                isAdd = true;
                base[nodeName] = [node.lhs];
                compare[nodeName]=node.rhs;
            } else if (node.lhs instanceof Array) {
                isAdd = false;
                compare[nodeName] = [node.rhs];
                base[nodeName] = node.lhs;
            } else if ((node.lhs instanceof Array) && (node.rhs instanceof Array)) {
                console.error("_processSpecialCase::both are arrays");
            } else {
                console.error("_processSpecialCase::neither are arrays");
            }
            console.log(base);
            console.log(compare);
            var diffList = DeepDiff(base, compare);
            console.log("===============result===============")
            console.log(diffList);
            var newNode = _createNodeRecord(null, nodeName, 0, false); //there is at least one record
            result.push(newNode);
            for (var i = 0; i < diffList.length; i++) {
                var diffNode = diffList[i];
                if (!diffNode.path) {
                    result.push(_createNodeRecord(diffNode, nodeName, 0, true));
                } else {
                    processNode(diffNode, result);
                }
            }
            return result;


        }


        function _createNodeRecord(node, name, node_index, isLeaf) {
            var leaf = {};
            leaf.recordName = name;
            leaf.nodes = [];
            leaf.isChange = isLeaf;
            leaf.index = node_index;
            leaf.type = null;
            leaf.original = null;
            leaf.value = [];
            /**
             * kind - indicates the kind of change; will be one of the following:
             N - indicates a newly added property/element
             D - indicates a property/element was deleted
             E - indicates a property/element was edited
             A - indicates a change occurred within an array
             */
            if (isLeaf) {
                if (node.kind === 'A') {
                    leaf.type = node.item.kind;
                    leaf.original = node.item.lhs;
                    leaf.diff = node.item.rhs;
                    leaf.index = node.index;
                } else {
                    leaf.type = node.kind;
                    leaf.original = node.lhs;
                    leaf.diff = node.rhs;
                }
            }
            return leaf;
        }

        function _updateNodeRecord(node, leaf, isLeaf) {

            leaf.isChange = isLeaf;

            /**
             * kind - indicates the kind of change; will be one of the following:
             N - indicates a newly added property/element
             D - indicates a property/element was deleted
             E - indicates a property/element was edited
             A - indicates a change occurred within an array
             */
            if (isLeaf) {
                if (node.kind === 'A') {
                    leaf.type = node.item.kind;
                    leaf.original = node.item.lhs;
                    leaf.diff = node.item.rhs;
                } else {
                    leaf.type = node.kind;
                    leaf.original = node.lhs;
                    leaf.diff = node.rhs;
                }
            }
            return leaf;
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