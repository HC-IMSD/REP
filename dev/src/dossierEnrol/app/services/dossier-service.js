/**
 * Created by Abdessamad on 7/6/2016.
 */

(function () {
    'use strict';
    angular
        .module('dossierModule')
        .factory('DossierService', DossierService)
    DossierService.$inject = ['$http', '$q'];
    function DossierService($http, $q) {
        // Define the DossierService function
        function DossierService(dossierData) {
            //construction logic

            angular.extend(this._default, dossierData);
        }

        DossierService.CanadianPostalCodePattern = function(){

        }

        DossierService.dossier = {
            dossierID:"569522",
            enrolmentVersion: "1.23",
            dateSaved: "1999-01-21",
            applicationType: "New",
            softwareVersion: "1.0",
            dataChecksum: "kjsakdjas",
            drugProduct:{
                thirdPartySigned:false,
                humanDrugUse: false,
                radiopharmDrugUse: false,
                vetDrugUse: false,
                disinfectantDrugUse: false,
                isScheduleA: false,
                scheduleAGroup:{

                },
                therapeutic: {//grid
                    listItems:[],
                    columnDef:[]
                },
                canRefProducts:{},//grid
                formulations:{},//tab + grid +
                appendixFour:{}//tab + grid +

            },
            contactList:[]

        };


        DossierService.prototype = {

            _default: {},

            loadFromFile: function (url) {
                var deferred = $q.defer();
                // Fetch the player from Dribbble
                // var url = 'http://api.dribbble.com/players/' + player + '?callback=JSON_CALLBACK';

                var dossierData = $http.get(url);
                var self = this;

                // When our $http promise resolves
                // Use angular.extend to extend 'this'
                // with the properties of the response
                dossierData.then(function successCallback(response) {
                    // console.log('DossierService success response: ' + JSON.stringify(response));
                    deferred.resolve(response);
                    // angular.extend(self.addressList, self.getAddressList(response.data));
                }, function errorCallback(response) {
                    deffered.reject('There was an error getting data');
                    console.log('DossierService error response: ' + JSON.stringify(response));
                });

                return deferred.promise;
            },

            getDossierInfo: function (info) {

                if (!info)
                    return this._default;

                return {
                    dataChecksum: info.data_checksum,
                    enrolmentVersion: info.enrolment_version,
                    dateSaved: info.date_saved,
                    applicationType: info.application_type.capitalize(),
                    softwareVersion: info.software_version,
                    dossierId: info.dossier_id,
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
                        address.dossierName = adrList[i].dossier_name;
                        address.amendRecord = adrList[i].amend_record === 'Y' ? true : false;
                        address.addressRole = {};
                        address.addressRole.manufacturer = adrList[i].manufacturer === 'Y' ? true : false;
                        address.addressRole.mailing = adrList[i].mailing === 'Y' ? true : false;
                        address.addressRole.billing = adrList[i].billing === 'Y' ? true : false;
                        address.addressRole.importer = adrList[i].importer === 'Y' ? true : false;
                        address.street = adrList[i].dossier_address_details.street_address;
                        address.city = adrList[i].dossier_address_details.city;
                        address.provState = adrList[i].dossier_address_details.province_lov;
                        address.country = adrList[i].dossier_address_details.country;
                        address.postalCode = adrList[i].dossier_address_details.postal_code;

                        list.push(address);
                    }
                }


                return list;

            },

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
                        contact.contactRole = contacts[i].dossier_contact_details.rep_contact_role;
                        contact.salutation = contacts[i].dossier_contact_details.salutation;
                        contact.givenName = contacts[i].dossier_contact_details.given_name;
                        contact.initials = contacts[i].dossier_contact_details.initials;
                        contact.surname = contacts[i].dossier_contact_details.surname;
                        contact.title = contacts[i].dossier_contact_details.job_title;
                        contact.language = contacts[i].dossier_contact_details.language_correspondance;
                        contact.phone = contacts[i].dossier_contact_details.phone_num;
                        contact.phoneExt = contacts[i].dossier_contact_details.phone_ext;
                        contact.fax = contacts[i].dossier_contact_details.fax_num;
                        contact.email = contacts[i].dossier_contact_details.email;

                        list.push(contact);
                    }
                }


                return list;

            }
        };

        // Return a reference to the function
        return DossierService;
    }

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
        //return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    };


})();
