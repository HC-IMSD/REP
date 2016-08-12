/**
 * Created by dkilty on 12/08/2016.
 */

(function () {
    'use strict';
    angular
        .module('services', []);
})();


(function () {
    'use strict';
    angular
        .module('services')
        .factory('TransactionService', TransactionService)

    function TransactionService() {
        // Define the CompanyService function
        function transactionService() {
            //construction logic
            var defaultCompanyData = {
                dataChecksum: "",
                enrolmentVersion: "0.0",
                dateSaved: "",
                applicationType: "NEW",
                softwareVersion: "1.0.0",
                companyId: "",
                isEctd: "N",
                "dossierId": "",
                "dossierName": "",
                "is_solicited": "",
                "solicited_requester": "",
                "regulatory_project_manager1": "",
                "regulatory_project_manager2": "",
                "same_regulatory_company": "N",
                "company_name": "",
                "same_regulatory_address": "N", //this may no longer be needed
                "regulatory_activity_address": {
                    "street_address": "",
                    "city": "",
                    "province_lov": "",
                    "province_text": "",
                    "country": "",
                    "postal_code": ""
                },

                regulatorySubmissionContact: [],
                lifecycleRecord: []
            };

            /*
             date_saved: jsonObj.dateSaved,
             application_type: jsonObj.applicationType,
             software_version: jsonObj.softwareVersion,
             data_checksum: jsonObj.dataChecksum,
             is_ectd:jsonObj.isEctd,
             company_id: jsonObj.companyId,
             dossier_id:jsonObj.dossierId,
             dossier_name:jsonObj.dossierName

             */

            angular.extend(this._default, defaultCompanyData);
            this.contactId = 0;
            this.rootTag = "TRANSACTION_ENROL";
        }

        TransactionService.prototype = {
            _default: {},
            //TODO update
            createSubContactRecord: function () {

                var defaultContact = {
                    contactRole: "PRIMARY",
                    salutation: "",
                    givenName: "",
                    surname: "",
                    initials: "",
                    title: "",
                    language: "",
                    phone: "",
                    phoneExt: "",
                    fax: "",
                    email: ""
                };
                //defaultContact.contactId = this.getNextContactID();
                return (defaultContact);
            },
            createLifeCycleRecord: function () {
                var defaultRecord = {
                    "sequence_number": "0000",
                    "date_filed": "",
                    "control_number": "",
                    "sequence_activity_type": "",
                    "sequence_description_value": "",
                    "sequence_from_date": "1",
                    "sequence_to_date": "",
                    "sequence_details": "",
                    "sequence_version": "",
                    "sequence_concat": ""
                }
                //TODO get next sequence number
                return defaultRecord;
            },

            //TODO transaction relevant
            /**
             * ngDoc method- mapping from the transaction file json object to the internal representation
             * @param jsonObj
             */
            transformFromFileObj: function (jsonObj) {

                var transactionInfo = this.getTransactionInfo(jsonObj[this.rootTag]);
                // var addressInfo = {addressList: this.getAddressList(jsonObj[this.rootTag].address_record)};
                //var contactInfo = {contactList: this.getContactList(jsonObj[this.rootTag].contact_record)};
                //get rid of previous default if it exists
                this._default = {};

                angular.extend(this._default, companyInfo)
                console.log("This is the transform " + JSON.stringify(this._default))
            },
            //TODO transaction relevant
            transformToFileObj: function (jsonObj) {
                //transform back to needed
                //var jsonObj = this._default
                var resultJson = {
                    TRANSACTION_ENROL: {
                        date_saved: jsonObj.dateSaved,
                        application_type: jsonObj.applicationType,
                        software_version: jsonObj.softwareVersion,
                        data_checksum: jsonObj.dataChecksum,
                        is_ectd: jsonObj.isEctd,
                        company_id: jsonObj.companyId,
                        dossier_id: jsonObj.dossierId,
                        dossier_name: jsonObj.dossierName,
                        is_solicited: "",
                        solicited_requester: "",
                        regulatory_project_manager1: "",
                        regulatory_project_manager2: "",
                        same_regulatory_company: "N",
                        company_name: "",
                        same_regulatory_address: "N", //this may no longer be needed

                        regulatory_activity_address: _mapRegActivityAddressToOuput(jsonObj.activityAddress),

                    }
                }
                return (resultJson);
            },
            getModelInfo: function () {
                return this._default;
            },
            getTransactionInfo: function () {

            }
        };
        // Return a reference to the object
        return CompanyService;
    }

    function _transformRepContactFromFileObj(repObj) {

        var repContact = _transformAddressFromFileObj(repObj.rep_submission_contact);
        repContact.repRole = repObj.rep_submission_contact_role;
    }

    function _mapRepContactToOutput(repObj) {
        var repContact = {};
        repContact.rep_submission_contact_role = repOb.repRole;
        //deflatten the object
        repContact.rep_submission_contact = _mapContactToOutput(repObj);
        return repContact;
    }

    function _transformAddressFromFileObj(contactObj) {
        var contact = {};
        if (!contactObj) {
            console.error("There is no contact object")
            return contact;
        }
        contact.salutation = contactObj.salutation;
        contact.givenName = contactObj.given_name;
        contact.initials = contactObj.initials;
        contact.surname = contactObj.surname;
        contact.title = contactObj.job_title;
        contact.language = contactObj.language_correspondance;
        contact.phone = contactObj.phone_num;
        contact.phoneExt = contactObj.phone_ext;
        contact.fax = contactObj.fax_num;
        contact.email = contactObj.email;
        return contact;
    }

    function _mapContactToOutput(contactObj) {

        var contact = {};
        contact.salutation = contactObj.salutation;
        contact.given_name = contactObj.givenName;
        contact.initials = contactObj.initials;
        contact.surname = contactObj.surname;
        contact.job_title = contactObj.title;
        contact.language_correspondance = contactObj.language;
        contact.phone_num = contactObj.phone;
        contact.phone_ext = contactObj.phoneExt;
        contact.fax_num = contactObj.fax;
        contact.email = contactObj.email;
        return contact;
    }

    function _mapAddressToOuput(addressObj) {

        var address = {};
        address.street_address = addressObj.street;
        address.city = addressObj.city;
        address.province_lov = addressObj.stateList;
        address.province_text = address.stateText;
        address.country = address.country;
        address.postal_code = address.postalCode;
        return (address);
    }

    function _transformAddressFromFileObj(addressObj) {
        var address = {};
        address.street = addressObj.street_address;
        address.city = addressObj.city;
        address.stateList = addressObj.province_lov;
        address.stateText = address.province_text;
        address.country = address.country;
        address.postalCode = address.postal_code;
        return (address);
    }


})();
