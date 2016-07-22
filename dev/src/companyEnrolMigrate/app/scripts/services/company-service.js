/**
 * Created by Abdessamad on 7/6/2016.
 */

(function () {
    'use strict';
    angular
        .module('dossierApp')
        .factory('CompanyService', CompanyService)
    CompanyService.$inject = ['$http', '$q'];
    function CompanyService($http, $q) {
        // Define the CompanyService function
        function CompanyService(companyData) {
            //construction logic
            angular.extend(this._default, companyData);
        }

        CompanyService.CanadianPostalCodePattern = function(){

        }

        CompanyService.company = {
            dataChecksum: "",
            enrolmentVersion: "0.1",
            dateSaved: "",
            applicationType: "NEW",
            softwareVersion: "1.0.0",
            companyId: "",
            addressList: [],
            contactList: []
        };

        CompanyService.prototype = {

            _default: {},

       /* dan    loadFromFile: function (url) {
                var deferred = $q.defer();
                // Fetch the player from Dribbble
                // var url = 'http://api.dribbble.com/players/' + player + '?callback=JSON_CALLBACK';

                var companyData = $http.get(url);
                var self = this;

                // When our $http promise resolves
                // Use angular.extend to extend 'this'
                // with the properties of the response
                companyData.then(function successCallback(response) {
                    // console.log('CompanyService success response: ' + JSON.stringify(response));
                    deferred.resolve(response);
                    // angular.extend(self.addressList, self.getAddressList(response.data));
                }, function errorCallback(response) {
                    deferred.reject('There was an error getting data');
                    console.log('CompanyService error response: ' + JSON.stringify(response));
                });

                return deferred.promise;
            },
*/
            getCompanyInfo: function (info) {

                if (!info)
                    return this._default;

                return {
                    dataChecksum: info.data_checksum,
                    enrolmentVersion: info.enrolment_version,
                    dateSaved: info.date_saved,
                    applicationType: info.application_type.capitalize(),
                    softwareVersion: info.software_version,
                    companyId: info.company_id,
                    addressList: [],
                    contactList: []
                }

            },

            getAddressList: function (adrList) {

                var list = [];

                if (adrList) {
                    for (var i = 0; i < adrList.length; i++) {
                        var address = {};
                        address.addressID = adrList[i].address_id;
                        address.companyName = adrList[i].company_name;
                        address.amendRecord = adrList[i].amend_record === 'Y' ? true : false;
                        address.addressRole = {};
                        address.addressRole.manufacturer = adrList[i].manufacturer === 'Y' ? true : false;
                        address.addressRole.mailing = adrList[i].mailing === 'Y' ? true : false;
                        address.addressRole.billing = adrList[i].billing === 'Y' ? true : false;
                        address.addressRole.importer = adrList[i].importer === 'Y' ? true : false;
                        address.street = adrList[i].company_address_details.street_address;
                        address.city = adrList[i].company_address_details.city;
                        address.provState = adrList[i].company_address_details.province_lov;
                        address.country = adrList[i].company_address_details.country;
                        address.postalCode = adrList[i].company_address_details.postal_code;

                        list.push(address);
                    }
                }


                return list;

            },
            //right side is original json left side is translation
            getContactList: function (contacts) {
                var list = [];

                if (contacts) {
                    for (var i = 0; i < contacts.length; i++) {
                        var contact = {};
                        contact.contactID = contacts[i].contact_id;
                        contact.amendRecord = contacts[i].amend_record;
                        contact.manufacturer = contacts[i].manufacturer;
                        contact.mailing = contacts[i].mailing;
                        contact.billing = contacts[i].billing;
                        contact.importer = contacts[i].importer;
                        contact.contactRole = contacts[i].company_contact_details.rep_contact_role;
                        contact.salutation = contacts[i].company_contact_details.salutation;
                        contact.givenName = contacts[i].company_contact_details.given_name;
                        contact.initials = contacts[i].company_contact_details.initials;
                        contact.surname = contacts[i].company_contact_details.surname;
                        contact.title = contacts[i].company_contact_details.job_title;
                        contact.language = contacts[i].company_contact_details.language_correspondance;
                        contact.phone = contacts[i].company_contact_details.phone_num;
                        contact.phoneExt = contacts[i].company_contact_details.phone_ext;
                        contact.fax = contacts[i].company_contact_details.fax_num;
                        contact.email = contacts[i].company_contact_details.email;

                        list.push(contact);
                    }
                }


                return list;

            }
        };

        // Return a reference to the function
        return CompanyService;
    }

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
        //return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    };


})();
