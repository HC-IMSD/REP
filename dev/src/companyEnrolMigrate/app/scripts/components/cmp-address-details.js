/**
 * Created by Abdessamad on 6/29/2016.
 */


(function () {
    'use strict';

    angular
        .module('addressModule', [
            'addressRole',
            'countrySelect',
            'dataLists'
        ])
})();

(function () {
    'use strict';
    angular.module('addressModule').component('cmpAddressDetails', {
        templateUrl: 'app/views/tpl-address-details.html',
        controller: addressCtrl,
        controllerAs: 'adr',
        bindings: {
            addressRecord: '<',
            selectedCountry: '<', // The current selected country
            onUpdate: '&',
            onDelete: '&'
        }
    });

    addressCtrl.$inject = ['$scope', 'getCountryAndProvinces', 'getCountriesISO3166'];

    function addressCtrl($scope, getCountryAndProvinces, getCountriesISO3166) {

        var vm = this;
        vm.onDeleteButtonClick = function () {

            console.log("delete button click: " + vm.addressModel.addressID);

            vm.onDelete({addressId: vm.addressModel.addressID});
        }

        vm.onDiscardButtonClick = function(){
            vm.addressModel = angular.extend({},vm.addressRecord);
            $scope.addressForm.$setPristine();
        }

        vm.$onInit = function () {

            vm.addressModel = {
                amendRecord: false,
                addressRole: {
                    manufacturer: false,
                    mailing: false,
                    billing: false,
                    importer: false
                },
                companyName: "",
                street: "",
                city: "",
                country: "",
                provState: "",
                postalCode: ""

            };

            vm.canadianPostalCodePattern = '^(?!.*[DFIOQU])[A-VXYa-vxy][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]$';

            vm.usaZipCode = '^[0-9]{5}(?:-[0-9]{4})?$';
            //"^([a-zA-Z]\d[a-zA-Z]( )?\d[a-zA-Z]\d)$"

            vm.hideProvinceText = false;
            if (vm.addressRecord) {

                vm.addressModel = angular.extend({},vm.addressRecord);
                //"addressID":"0001","companyName":"NoName1","amendRecord":true,"manufacturer":true,"mailing":false,"billing":false,"importer":false,"street":"123 Main St","city":"Ottawa","province":"ON","country":"CAN","postalCode":"K1A 3N1","$$hashKey":"object:10"}

             // console.log('$onInit vm.addressModel:' + JSON.stringify(vm.addressModel));

                vm.countries = getCountriesISO3166.getCountryList3Letter();
               // vm.addressModel.country = vm.addressRecord.company_address_details.country;
               // vm.amendRecord = vm.addressRecord.amend_record === 'Y' ? true : false;
                // vm.provinceTextState();
                vm.provListLabel = getProvinceListLabel();
                vm.postalLabel = getPostalLabel();
                vm.isPostalRequired = isPostalRequiredFn();
                vm.provinces = getProvinceStateList();
                vm.hideProvinceText = getProvinceTextState();
                vm.postalPattern = getPostalPattern();
                vm.hideProvinceDdl = !vm.hideProvinceText;

            }
        }


        this.$onChanges = function (changes) {
            // this.user = changes.user.currentValue;
         //   loadAddressModel();
          //  console.log('cmpAddressDetails $onChanges :' + JSON.stringify(vm.addressRecord));
        };
        vm.onSelectedCountryChange = function (newValue) {
            vm.addressModel.country = newValue;
            vm.updateAddressModel();
            //console.log("cmpAddress onSelectedCountryChange newValue: " + newValue);
            // setCountry(vm.addressModel.country);
            //vm.provinceTextState();
            vm.provListLabel = getProvinceListLabel();
            vm.postalLabel = getPostalLabel();
            vm.isPostalRequired = isPostalRequiredFn();
            vm.provinces = getProvinceStateList();
            vm.hideProvinceText = getProvinceTextState();
            vm.postalPattern = getPostalPattern();
            vm.hideProvinceDdl = !vm.hideProvinceText;
        }

        vm.onAddressRoleUpdate = function(newRole){

           // console.log('onAddressRoleUpdate: ' + JSON.stringify(newRole));

            vm.addressModel.addressRole = newRole;
            vm.updateAddressModel();
            
        }

        vm.updateAddressModel = function(){

          //  console.log('onAddressRoleUpdate: ' + vm.addressModel.companyName);
            if(!$scope.addressForm.$valid)
                vm.onUpdate({address:vm.addressModel});

        }



        var loadAddressModel = function(){

            return {
                amendRecord: vm.addressRecord.amendRecord,
                addressRole: {
                    manufacturer: vm.addressRecord.manufacturer,
                    mailing: vm.addressRecord.mailing,
                    billing: vm.addressRecord.billing,
                    importer: vm.addressRecord.manufacturer
                },
                companyName: vm.addressRecord.companyName,
                street: vm.addressRecord.street,
                city: vm.addressRecord.city,
                country: vm.addressRecord.country,
                provState: vm.addressRecord.province,
                postalCode: vm.addressRecord.postalCode

            };

        }


        var getProvinceTextState =  function() {

            var isCanOrUsa = isPostalRequiredFn();

            if (isCanOrUsa) {
                vm.addressModel.stateText = null;

            } else {
                vm.addressModel.stateList = null;
            }

            return isCanOrUsa;
        }

        var isPostalRequiredFn = function() {
            return (vm.addressModel.country ==='CAN' || vm.addressModel.country ==='USA');
        }


        var getProvinceStateList = function() {

            if (vm.addressModel.country === 'CAN') {
                return getCountryAndProvinces.getProvinces();

            }
            else if (vm.addressModel.country === 'USA') {
                return getCountryAndProvinces.getUSStates();
            }
        }

        var getProvinceListLabel = function() {

            var label = (vm.addressModel.country === 'USA') ? "STATE" : "PROVINCE";

            return label;
        }


        var  getPostalLabel = function() {

            var label = (vm.addressModel.country === 'USA') ? "ZIP" : "POSTAL";

            return label;
        }

        var getPostalPattern = function() {
            var postalPtrn = null;
            if (vm.addressModel.country === 'USA') {
                postalPtrn = /^[0-9]{5}(?:-[0-9]{4})?$/;
            } else if (vm.addressModel.country === 'CAN') {
                postalPtrn = /^(?!.*[DFIOQU])[A-VXYa-vxy][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]$/;
            }

            return postalPtrn;

        }


    }

})();


