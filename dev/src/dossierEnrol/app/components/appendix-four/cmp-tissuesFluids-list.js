/**
 * Created by dkilty on 04/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('tissuesFluidsList',['tissuesFluidsRecord'])
})();

(function () {
    'use strict';

    angular
        .module('tissuesFluidsList')
        .component('cmpTissuesFluidsList', {
            templateUrl: './components/appendix-four/tpl-tissuesFluids-list.html',
            bindings: {
                records: '<',
                showErrors: '&'
            },
            controller: tissuesFluidsListController,
            controllerAs: 'tissuesListSrcCtrl'
        });

    tissuesFluidsListController.$inject = ["$filter"];

    function tissuesFluidsListController($filter) {

        var vm = this;
        vm.selectRecord = -1; //the record to select, initially select non
        vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
        vm.resetToCollapsed = true;
        vm.oneRecord="";
        //define empty model
        vm.model={};
        vm.model.tissuesFluidsList=[];
        vm.columnDef = [
            {
                label: "SYSTEM_TYPE",
                binding: "sytsemType",
                width: "10"
            },
            {
                label: "SYSTEM_DETAILS",
                binding: "systemDetail",
                width: "50"
            },
            {
                label: "SYSTEM_other",
                binding: "otherDetail",
                width: "40"
            }
        ]

        vm.$onInit = function () {
            //init code here
            vm.isDetailValid = true; //used to track if details valid. If they are  not do not allow expander collapse
            vm.resetToCollapsed = true;
            vm.oneRecord="";
        }


        vm.$onChanges = function (changes) {

            if (changes.records) {
                vm.model.tissuesFluidsList=changes.records.currentValue;
            }
        }


        vm.setValid=function(value){
            vm.isDetailValid = value;
        }
        vm.addNew = function() {
            var maxID = getMaxID();
            var item = {"id": maxID + 1, "system": "",systemDetails:"",otherDetails:""}; //TODO call a service for this

            vm.model.tissuesFluidsList.push(item);
            vm.resetToCollapsed= !vm.resetToCollapsed;
            vm.selectRecord=(0);
            vm.selectRecord=(vm.model.tissuesFluidsList.length-1);
        };
        vm.deleteRecord=function(recId){

            var idx = vm.model.tissuesFluidsList.indexOf(
                $filter('filter')(vm.model.tissuesFluidsList, {id: recId}, true)[0]);
            vm.model.tissuesFluidsList.splice(idx, 1);
        }


        function getMaxID(){
            var id=0;
            for(var i=0;i<vm.model.tissuesFluidsList.length;i++){
                if(vm.model.tissuesFluidsList[i].id>id){
                    id=vm.model.tissuesFluidsList[i].id;
                }
            }
            return(id);
        }

    }
})();