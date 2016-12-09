/**
 * Created by dkilty on 8/25/2016.
 */


(function () {
    'use strict';
    angular
        .module('dossierLoadModule', ['dataLists'])
})();

(function () {
    'use strict';
    angular
        .module('dossierLoadModule')
        .factory('customLoad', ['$http', '$q', 'getCountryAndProvinces', function ($http, $q, getCountryAndProvinces) {
            var result = {};
            return function (options) {
                var deferred = $q.defer();
                var baseUrl = "data/dossier-" + options.key + ".json";
                var countryUrl = "data/country-" + options.key + ".json";

                $http.get(baseUrl)
                    .then(function (response) {
                        angular.extend(result, response.data);
                        return $http.get(countryUrl);
                    })
                    .then(function (response) {
                        angular.extend(result, response.data);
                        getCountryAndProvinces.setVal("FDFDFD")
                        return (response.data);
                    }).then(function (result) {
                        //_createCountryList(result);
                        getCountryAndProvinces.setVal("FDFDFD")
                    })
                    .catch(function (error) {
                        // this catches errors from the $http calls as well as from the explicit throw
                        console.log("An error occurred: " + error);
                    })
                    .finally(function () {
                        deferred.resolve(result);
                    });
                return deferred.promise;
            };
        }]);

})();

/*
 save service
 pp.service('StoreService',function(){

 var data1={};
 var data2={};
 this.save=function(data1,data2){
 this.data1=data1;
 this.data2=data2;

 };

 this.getData1=function(){

 return data1;

 };

 this.getData2=function(){

 return data2;

 };
 });


 */

/*
 angular
 .module('globalLists')
 .provider('countryProvider', countryProvider);

 countryProvider.$inject = [];
 /!* @ngInject *!/
 function countryProvider() {
 var countries=null;
 /!* jshint validthis:true *!/
 this.$get = CountryHelper;


 //countryHelper.$inject = ['$state'];
 /!* @ngInject *!/
 function CountryHelper() {
 // var hasOtherwise = false;

 var service = {
 setCountries: configureCountries,
 getCountries: getCountries
 };

 return service;

 ///////////////

 function configureCountries(values) {
 countries=value;
 }

 function getStates() {
 return countries
 }
 }
 }
 }
 })();*/


