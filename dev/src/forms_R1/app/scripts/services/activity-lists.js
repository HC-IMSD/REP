/**
 * Created by dkilty on 16/01/2017.
 */
/**
 * @ngdoc module declaration for datalists
 */
(function () {
    'use strict';
    angular
        .module('activityLists', []);

})();

(function () {
    'use strict';

    angular
        .module('activityLists')
        .factory('ActivityListFactory', getService);

    /* @ngInject */
    //getService.inject = ['UNKNOWN'];
    function getService() {
        var vm = this;
        vm.feeClassArray = [];
        vm.raTypeArray=[];
        vm.BIOLOGICAL=  "B14-20160301-02"; //biological
        vm.NC_raType="B02-20160301-050";
        vm.SANDS_raType="B02-20160301-082";
        vm.SNDS_raType="B02-20160301-084";
        vm.DIN_raType="B02-20160301-090";
        var service = {
            getFeeClassList: _getfeeClassArray,
            createFeeClassList:_createfeeClassArray,
            getRaTypeList: _getRaTypeArray,
            createRaTypeList:_createRaTypeArray,
            getActivityLeadList:_getActivityLeadArray,
            getBiologicalLeadValue:_getBiologicalLead,
            getSANDSRaTypeValue:_getNC_raType,
            getSNDSTypeValue: _getSNDS_raType,
            getNCTypeValue:  _getNC_raType,
            getDINTypeValue:  _getDIN_raType
        };
        return service;

        function _getfeeClassArray(){

            return   vm.feeClassArray;
        }
        function _createfeeClassArray(value){
            vm.feeClassArray=value;
        }
        function _getRaTypeArray(){
            console.log( vm.raTypeArray)
            return  (vm.raTypeArray);
        }
        function _createRaTypeArray(value){

            vm.raTypeArray=value;
            console.log( vm.raTypeArray)
        }

        function _getActivityLeadArray(){
            return (
                [
                    "B14-20160301-09", //Pharmaceutical
                    vm.BIOLOGICAL, //Biological
                    "B14-20160301-10", //Post-Market Pharmacovigilance
                    "B14-20160301-07" //Drug Master File
                ]
            );
        }

        function _getBiologicalLead(){
            return vm.BIOLOGICAL;
        }

        function _getNC_raType(){
            return  vm.NC_raType;
        }
        function _getSANDS_raType(){
            return vm.SANDS_raType;
        }
        function _getSNDS_raType(){
            return vm.SNDS_raType;
        }
        function _getDIN_raType(){
            return vm.DIN_raType;
        }



    }//end service function
})();