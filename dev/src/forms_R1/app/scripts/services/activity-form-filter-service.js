"use strict";
/**
 * Created by dkilty on 10/03/2018.
 */
/**
 * @ngdoc Model for creating the three lists based the lead type
 */
(function () {
    angular
        .module('activityFormFilterModule', ['hpfbConstants']);

})();

(function () {
    angular
        .module('activityFormFilterModule')
        .factory('ActivityFormFilterService', getService);

    /* @ngInject */
    getService.inject = [];

    function getService() {
        var vm = this;

        var service = {
            getPharmaRAList: _getPharmaRAList,
            getBiolRAList: _getBiolRAList,
            getConsumHealthList: _getConsumHealthList,
            getPostMarketRAList: _getPostMarketRAList

        };
        return service;

        /**
         * Creates the pharmalist based on the incomining global list
         * @param raList - the full list of regulatory activity values
         * @returns {Array}
         * @private
         */
        function _getPharmaRAList(raList){
            var newList=[];
            for(var i=0; i<raList.length;i++) {
                switch(raList[i].id) {
                    case 'B02-20160301-001': //ANDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-031': //EU NDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-032': //EU SNDS
                        newList.push(raList[i]);
                        break;
                   case 'B02-20160301-038': //Level III
                       newList.push(raList[i]);
                        break;
                    case 'B02-20160301-046': //MPNC
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-047': //MPNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-049': //MPSNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-050': //NC
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-051': //NDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-067': //PAND
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-068': //PBRER-CS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-075': //PRNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-077': //PRSNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-078': //PSUR-C
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-082': //SANDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-084': //SNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-085': //SNDS-C
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-088': //UDRA
                        newList.push(raList[i]);
                        break;
                   /* case 'B02-20160301-089': //YBPR
                        newList.push(raList[i]);
                        break; */
                    case 'B02-20160301-028': //DSUR
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-018': //DINA
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-020': //DIND
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-021': //DINF
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-043': //MPDIN
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-070': //PDC
                        newList.push(raList[i]);
                        break;
                }
            }//for
            return newList;
        }

        /***
         * Creates the list if hte RA lead is biological
         * @param raList -the full list of values
         * @returns {Array}
         * @private
         */
        function _getBiolRAList(raList){
            var newList=[];
            for(var i=0; i<raList.length;i++) {
                switch(raList[i].id) {
                  /*  case 'B02-20160301-001': //ANDS
                        newList.push(raList[i]);
                        break; */
                    case 'B02-20160301-031': //EU NDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-032': //EU SNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-038': //Level III
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-046': //MPNC
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-047': //MPNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-049': //MPSNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-050': //NC
                        newList.push(raList[i]);
                       break;
                    case 'B02-20160301-051': //NDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-067': //PAND
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-068': //PBRER-CS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-075': //PRNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-077': //PRSNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-078': //PSUR-C
                        newList.push(raList[i]);
                        break;
                 /*   case 'B02-20160301-082': //SANDS
                        newList.push(raList[i]);
                        break; */
                    case 'B02-20160301-084': //SNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-085': //SNDS-C
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-088': //UDRA
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-089': //YBPR
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-028': //DSUR
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-019': //DINB
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-043': //MPDIN
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-071': //PDC-B
                        newList.push(raList[i]);
                        break;
                }
            }//for
            return newList;
        }

        /**
         * Activity Lead = postmarket  activity list
         * @param raList
         * @returns {Array}
         * @private
         */
        function _getPostMarketRAList(raList){
            var newList=[];
            for(var i=0; i<raList.length;i++) {
                switch(raList[i].id) {

                    case 'B02-20160301-069': //PBRER-PV
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-079': //PSUR-PV
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-080': //RMP-PV
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-087': //UD-PV
                        newList.push(raList[i]);
                        break;
                }
            }//for
            return newList;
        }
        /**
         * Creates the ConsumHealthList based on the incomining global list
         * @param raList - the full list of regulatory activity values
         * @returns {Array}
         * @private
         */
        function _getConsumHealthList(raList){
            var newList=[];
            for(var i=0; i<raList.length;i++) {
                switch(raList[i].id) {
                    case 'B02-20160301-001': //ANDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-031': //EU NDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-032': //EU SNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-038': //Level III
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-046': //MPNC
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-047': //MPNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-049': //MPSNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-050': //NC
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-051': //NDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-067': //PAND
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-068': //PBRER-CS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-075': //PRNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-077': //PRSNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-078': //PSUR-C
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-082': //SANDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-084': //SNDS
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-085': //SNDS-C
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-088': //UDRA
                        newList.push(raList[i]);
                        break;
                    /* case 'B02-20160301-089': //YBPR
                         newList.push(raList[i]);
                         break; */
                    case 'B02-20160301-028': //DSUR
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-018': //DINA
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-020': //DIND
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-021': //DINF
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-043': //MPDIN
                        newList.push(raList[i]);
                        break;
                    case 'B02-20160301-070': //PDC
                        newList.push(raList[i]);
                        break;
                }
            }//for
            return newList;
        }

    }//end service function
})();