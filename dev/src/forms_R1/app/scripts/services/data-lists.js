/**
 * Created by dkilty on 6/4/2016.
 */

/**
 * @ngdoc module declaration for datalists
 */
(function () {
    'use strict';

    angular
        .module('dataLists', ['hpfbConstants']);

})();

/**
 * getCountryAndProvinces services
 * Returns Canada or US condes, canada provinces, us states
 */
(function () {
    'use strict';

    angular
        .module('dataLists')
        .factory('getCountryAndProvinces', getService);

    /* @ngInject */
    getService.inject=['UNKNOWN'];
    function getService(UNKNOWN) {
        var vm = this;
        vm.countryList = [];
        var service = {
            getCountries: getCountryValuesArray,
            getProvinces: getProvinceValuesArray,
            getUSStates: getUSStatesValueArray,
            createCountryList: _createCountryArray,
            getUnknownCountryRecord:_getUnknownCountryRec
        };
        return service;

        ////////////////


        function _createCountryArray(translateJson) {
            vm.countryList = translateJson;
        }

        function _getUnknownCountryRec(){

            return(
                {
                    "id":UNKNOWN,
                    "en":"Unknown",
                    "fr":"Inconnu"
                }
            )
        }

        //todo why is this listed twice?
        function getCountryValuesArray() {
            return vm.countryList;
        }


        function getProvinceValuesArray() {
            return (
                [
                    'AB',
                    'BC',
                    'MB',
                    'NB',
                    'NL',
                    'NT',
                    'NS',
                    'NU',
                    'ON',
                    'PE',
                    'QC',
                    'SK',
                    'YT'
                ]
            );
        }

        function getUSStatesValueArray() {
            return (
                [
                    'AL',
                    'AK',
                    'AZ',
                    'AR',
                    'CA',
                    'CO',
                    'CT',
                    'DE',
                    'DC',
                    'FL',
                    'GA',
                    'HI',
                    'ID',
                    'IL',
                    'IN',
                    'IA',
                    'KS',
                    'KY',
                    'LA',
                    'ME',
                    'MD',
                    'MA',
                    'MI',
                    'MN',
                    'MS',
                    'MO',
                    'MT',
                    'NE',
                    'NV',
                    'NH',
                    'NJ',
                    'NM',
                    'NY',
                    'NC',
                    'ND',
                    'OH',
                    'OK',
                    'OR',
                    'PA',
                    'RI',
                    'SC',
                    'SD',
                    'TN',
                    'TX',
                    'UT',
                    'VT',
                    'VA',
                    'WA',
                    'WV',
                    'WI',
                    'WY'
                ]);

        }

    }

})();

(function () {
    'use strict';

    angular
        .module('dataLists')
        .factory('getContactLists', getSalService); //todo rename service

    /* @ngInject */
    function getSalService() {
        var vm = this;
        vm.internalContacts=[];
        var service = {
            getSalutationList: getSalValuesArray,
            getLanguages: getLanguagesValuesArray, //TODO make constants
            createInternalContacts: _createInternalContacts,
            getInternalContacts: _getInternalContacts

        };
        return service;

        ////////////////

        function getSalValuesArray() {
            return (
                [
                    'SALUT_DR',
                    'SALUT_MR',
                    'SALUT_MRS',
                    'SALUT_MS'
                ]);
        }

        function getLanguagesValuesArray() {
            return (
                [
                    "en",
                    "fr"
                ]);
        }

        function _createInternalContacts(values){
            vm.internalContacts=values;
        }
        function _getInternalContacts(){
            return(vm.internalContacts);
        }

    }
})();



/**
 * Contact role list service
 */
(function () {
    'use strict';

    angular
        .module('dataLists')
        .factory('getRoleLists', getRolesService);

    /* @ngInject */
    function getRolesService() {
        var _biologic = 'BIOLOGIC';
        var _pharma = 'PHARMACEUTICAL';
        /*'DRUG_MASTER_FILE',
         'MEDICAL_DEVICE'*/
        var service = {
            getContactRoles: getRoleValuesArray,
            getFormTypes: _getFormTypes,
            getBiologicType: _getBiologic,
            getPharmaType: _getPharmaceutical
        };
        return service;

        ////////////////

        function getRoleValuesArray() {
            return (
                [
                    '',
                    'ROLE_PRIMARY',
                    'ROLE_SECONDARY'
                ]);
        }

        function _getFormTypes() {
            return (
                [
                    _biologic,
                    _pharma
                ]);
        }

        function _getBiologic() {
            return _biologic;
        }

        function _getPharmaceutical() {

            return _pharma;
        }

    }

})();
