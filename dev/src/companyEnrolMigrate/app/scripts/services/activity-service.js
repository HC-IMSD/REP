/**
 * Created by dkilty on 8/25/2016.
 */
/**
 * Created by dkilty on 12/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('activityService', [])
})();


(function () {
    'use strict';
    angular
        .module('activityService')
        .factory('ActivityService', ActivityService)

    function ActivityService() {
        function ActivityService() {
            //construction logic
            var defaultTransactionData = {

                "companyId": "",
                "dstsControlNumber": "",
                "enrolmentVersion": "",
                "dateSaved": "",
                "applicationType": "NEW",
                "softwareVersion": "",
                "dataChecksum": "",
                "dossierIdPrefix": "",
                "dossierId": "",
                "regActivityLead": "",
                "regActivityType": "",
                "feeClass": "",
                "notLasa": "",
                "reasonFiling": "",
                "is_third_party": "Y",
                "notifiableChangeTypes": {
                    "textLabelChange": "Y",
                    "drugSubstanceChange": "Y",
                    "formulationChange": "Y",
                    "specificationChange": "Y",
                    "expiryStorageChange": "Y",
                    "manufactMethodChange": "Y",
                    "manufactSiteChange": "Y",
                    "containerSizeChange": "Y",
                    "packagingSpecChange": "Y",
                    "packagingMaterialsChange": "Y",
                    "otherChangeDetails": "A"
                },


                activityAddress: _createAddressModel(),
                activityContact: _createContactModel()
                // regulatorySubmissionContact: [],
            };
            angular.extend(this._default, defaultTransactionData);
            this.rootTag = "TRANSACTION_ENROL";
            this.currSequence = 0;
        }

        ActivityService.prototype = {
            _default: {},
            //TODO update

            getRootTag: function () {

                return ("TRANSACTION_ENROL")
            },
            /**
             * ngDoc method- mapping from the transaction file json object to the internal representation
             * @param jsonObj the json object generated from the file
             */
            transformFromFileObj: function (jsonObj) {

                var transactionInfo = this.getTransactionInfo(jsonObj[this.rootTag]);
                //get rid of previous default if it exists
                this._default = {};
                angular.extend(this._default, transactionInfo)
            },
            //TODO transaction relevant
            /**
             * @ngdoc transforms the object model to the compatible file JSON objecct
             * @param jsonObj
             * @returns json object compatible with the xml schema
             * */
            transformToFileObj: function (jsonObj) {
                //transform back to needed
                //var jsonObj = this._default
                var resultJson = {
                    TRANSACTION_ENROL: {
                        date_saved: jsonObj.dateSaved,
                        data_checksum: jsonObj.dataChecksum,
                        is_ectd: jsonObj.isEctd
                    }
                };
                if (jsonObj.isEctd == 'Y') {
                    var ectd = this._transformEctdToFile(jsonObj.ectd);
                    resultJson.TRANSACTION_ENROL.ectd = ectd;
                }
                resultJson.TRANSACTION_ENROL.is_solicited = jsonObj.isSolicited;
                resultJson.TRANSACTION_ENROL.solicited_requester = jsonObj.solicitedRequester;
                resultJson.TRANSACTION_ENROL.regulatory_project_manager1 = jsonObj.projectManager1;
                resultJson.TRANSACTION_ENROL.regulatory_project_manager2 = jsonObj.projectManager2;
                resultJson.TRANSACTION_ENROL.is_activity_changes = jsonObj.isActivityChanges;
                resultJson.TRANSACTION_ENROL.same_regulatory_company = jsonObj.sameCompany === true ? 'Y' : 'N';
                resultJson.TRANSACTION_ENROL.company_name = jsonObj.companyName;
                resultJson.TRANSACTION_ENROL.same_regulatory_address = jsonObj.sameAddress === true ? 'Y' : 'N'; //this may no longer be needed
                resultJson.TRANSACTION_ENROL.regulatory_activity_address = _mapAddressToOutput(jsonObj.activityAddress);
                resultJson.TRANSACTION_ENROL.same_regulatory_contact = jsonObj.sameCompany === true ? 'Y' : 'N'; //this may no longer be needed
                resultJson.TRANSACTION_ENROL.regulatory_activity_contact = _mapContactToOutput(jsonObj.activityContact);
                return (resultJson);
            },


            getModelInfo: function () {
                return this._default;
            },
            /**
             * @ngdoc method- transforms the file json to a model object
             */
            getTransactionInfo: function (jsonObj) {
                if (!jsonObj) {
                    return this._default;
                }
                var model = this._default;
                model.dateSaved = jsonObj.date_saved;

                model.dataChecksum = jsonObj.data_checksum;
                model.isEctd = jsonObj.is_ectd;
                model.isSolicited = jsonObj.is_solicited;
                model.solicitedRequester = jsonObj.solicited_requester;
                model.projectManager1 = jsonObj.regulatory_project_manager1;
                model.projectManager2 = jsonObj.regulatory_project_manager2;
                model.isActivityChanges = jsonObj.is_activity_changes;
                model.sameCompany = jsonObj.same_regulatory_company === 'Y';
                model.companyName = jsonObj.company_name;
                model.sameAddress = jsonObj.same_regulatory_address === 'Y';
                //reg address
                model.activityContact = _transformContactFromFileObj(jsonObj.regulatory_activity_contact);
                model.sameContact = jsonObj.same_regulatory_contact === 'Y';
                model.activityAddress = _transformAddressFromFileObj(jsonObj.regulatory_activity_address);
                // model.regulatorySubmissionContact = _mapRegulatoryContactList(jsonObj.rep_submission_contact_record);

                this._transformEctdFromFile(model, jsonObj.ectd);
                return model;
            },


        };
        // Return a reference to the object
        return TransactionService;
    }

    /**
     * TODO dprecated Maps the file json object to the internal data model of the REP contacts
     * @param jsonObj
     * @returns an array of contacts. Empty if there are none
     * @private
     */
    function _mapRegulatoryContactList(jsonObj) {
        var result = [];
        if (!jsonObj) return list;
        if (!(jsonObj instanceof Array)) {
            //make it an array, case there is only one
            jsonObj = [jsonObj]
        }

        for (var i = 0; i < jsonObj.length; i++) {
            result.push(_transformRepContactFromFileObj(jsonObj[i]));
        }
        return (result)
    }


    function _transformRepContactFromFileObj(repObj) {

        var repContact = _transformContactFromFileObj(repObj.rep_submission_contact);
        repContact.repRole = repObj.rep_submission_contact_role;
    }

    //TODO deprecated
    function _mapRepContactToOutput(repObj) {
        var repContact = {};
        repContact.rep_submission_contact_role = repObj.repRole;
        //deflatten the object
        repContact.rep_submission_contact = _mapContactToOutput(repObj);
        return repContact;
    }

    function _transformContactFromFileObj(contactObj) {
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

    function _mapAddressToOutput(addressObj) {

        var address = {};
        address.street_address = addressObj.street;
        address.city = addressObj.city;
        address.province_lov = addressObj.stateList;
        address.province_text = addressObj.stateText;
        address.country = addressObj.country;
        address.postal_code = addressObj.postalCode;
        return (address);
    }

    function _transformAddressFromFileObj(addressObj) {
        var address = {};
        address.street = addressObj.street_address;
        address.city = addressObj.city;
        address.stateList = addressObj.province_lov;
        address.stateText = addressObj.province_text;
        address.country = addressObj.country;
        address.postalCode = addressObj.postal_code;
        return (address);
    }


    //TODO make a standard service
    function _createAddressModel() {
        return (
        {
            street: "",
            city: "",
            stateList: "",
            stateText: "",
            country: "",
            "postalCode": ""
        }
        )
    }

    function _createContactModel() {
        var contact = {};

        contact.salutation = "";
        contact.givenName = "";
        contact.initials = "";
        contact.surname = "";
        contact.jobTitle = "";
        contact.languageCorrespondance = "";
        contact.phoneNum = "";
        contact.phoneExt = "";
        contact.fax = "";
        contact.email = "";
        return contact;
    }

    //todo deprecated
    function _createRepContact() {

        var contact = _createContactModel()
        contact.repRole = ""
        return contact
    }

    function _createRationalTypes() {
        var result = {
            "rationaleTypes": {
                "newRoa": "N",
                "newClaims": "N",
                "changeFormulation": "N",
                "changeDrugSubstance": "N",
                "replaceSterility": "N",
                "confirmitoryStudies": "N",
                "otherRationale": "N",
                "otherRationaleDetails": ""
            }
        };
        return result;
    }

    function _createNotifiableChangeTypes() {
        var result = {
            "notifiableChangeTypes": {
                "textLabelChange": "N",
                "drugSubstanceChange": "N",
                "formulationChange": "N",
                "specificationChange": "N",
                "expiryStorageChange": "N",
                "manufactMethodChange": "N",
                "manufactSiteChange": "N",
                "containerSizeChange": "N",
                "packagingSpecChange": "N",
                "packagingMaterialsChange": "N",
                "otherChangeDetails": ""
            }
        };
        return result;
    }

})();

/*
 {
 "ACTIVITY_ENROL": {
 "company_id": "A",
 "dsts_control_number": "A",
 "enrolment_version": "1.23",
 "date_saved": "1999-01-21",
 "application_type": "APPROVED",
 "software_version": "string",
 "data_checksum": "string",
 "dossier_id_prefix": "string by default",
 "dossier_id": "A",
 "reg_activity_lead": "UNASSIGNED",
 "reg_activity_type": "VDIN",
 "fee_class": "string by default",
 "not_lasa": "Y",
 "reason_filing": "A",
 "related_activity": [
 {
 "reg_activity_type": "VDIN",
 "date_cleared": "1999-01-21",
 "control_number": "000000",
 "dossier_id": "A",
 "manufacturer_name": "A",
 "reason_filing": "A",
 "assoc_dins": {
 "din_number": [
 "00000000",
 "00000000",
 "00000000"
 ]
 }
 },
 {
 "reg_activity_type": "VDIN",
 "date_cleared": "1999-01-21",
 "control_number": "000000",
 "dossier_id": "A",
 "manufacturer_name": "A",
 "reason_filing": "A",
 "assoc_dins": {
 "din_number": [
 "00000000",
 "00000000",
 "00000000"
 ]
 }
 },
 {
 "reg_activity_type": "VDIN",
 "date_cleared": "1999-01-21",
 "control_number": "000000",
 "dossier_id": "A",
 "manufacturer_name": "A",
 "reason_filing": "A",
 "assoc_dins": {
 "din_number": [
 "00000000",
 "00000000",
 "00000000"
 ]
 }
 }
 ],
 "is_third_party": "Y",
 "notifiable_change_types": {
 "text_label_change": "Y",
 "drug_substance_change": "Y",
 "formulation_change": "Y",
 "specification_change": "Y",
 "expiry_storage_change": "Y",
 "manufact_method_change": "Y",
 "manufact_site_change": "Y",
 "container_size_change": "Y",
 "packaging_spec_change": "Y",
 "packaging_materials_change": "Y",
 "other_change_details": "A"
 },
 "rationale_types": {
 "new_roa": "Y",
 "new_claims": "Y",
 "change_formulation": "Y",
 "change_drug_substance": "Y",
 "replace_sterility": "Y",
 "confirmitory_studies": "Y",
 "other_rationale": "Y",
 "other_rationale_details": "A"
 },
 "contact_record": [
 {
 "amend_record": "Y",
 "rep_contact_role": "SECONDARY",
 "rep_contact_details": {
 "salutation": "DR",
 "given_name": "A",
 "initials": "A",
 "surname": "A",
 "job_title": "A",
 "language_correspondance": "fr",
 "phone_num": "A",
 "phone_ext": "A",
 "fax_num": "A",
 "email": "A"
 }
 },
 {
 "amend_record": "Y",
 "rep_contact_role": "SECONDARY",
 "rep_contact_details": {
 "salutation": "DR",
 "given_name": "A",
 "initials": "A",
 "surname": "A",
 "job_title": "A",
 "language_correspondance": "fr",
 "phone_num": "A",
 "phone_ext": "A",
 "fax_num": "A",
 "email": "A"
 }
 }
 ]
 }
 }

 {
 "ACTIVITYENROL": {
 "-xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
 "-xsi:noNamespaceSchemaLocation": "file:///d:/repositories/REP/xml_schema/activity_enrol.xsd",
 "companyId": "A",
 "dstsControlNumber": "A",
 "enrolmentVersion": "1.23",
 "dateSaved": "1999-01-21",
 "applicationType": "APPROVED",
 "softwareVersion": "string",
 "dataChecksum": "string",
 "dossierIdPrefix": "string by default",
 "dossierId": "A",
 "regActivityLead": "UNASSIGNED",
 "regActivityType": "VDIN",
 "feeClass": "string by default",
 "notLasa": "Y",
 "reasonFiling": "A",
 "relatedActivity": [
 {
 "regActivityType": "VDIN",
 "dateCleared": "1999-01-21",
 "controlNumber": "000000",
 "dossierId": "A",
 "manufacturerName": "A",
 "reasonFiling": "A",
 "assocDins": {
 "dinNumber": [
 "00000000",
 "00000000",
 "00000000"
 ]
 }
 },
 {
 "regActivityType": "VDIN",
 "dateCleared": "1999-01-21",
 "controlNumber": "000000",
 "dossierId": "A",
 "manufacturerName": "A",
 "reasonFiling": "A",
 "assocDins": {
 "dinNumber": [
 "00000000",
 "00000000",
 "00000000"
 ]
 }
 },
 {
 "regActivityType": "VDIN",
 "dateCleared": "1999-01-21",
 "controlNumber": "000000",
 "dossierId": "A",
 "manufacturerName": "A",
 "reasonFiling": "A",
 "assocDins": {
 "dinNumber": [
 "00000000",
 "00000000",
 "00000000"
 ]
 }
 }
 ],
 "isThirdParty": "Y",
 "notifiableChangeTypes": {
 "textLabelChange": "Y",
 "drugSubstanceChange": "Y",
 "formulationChange": "Y",
 "specificationChange": "Y",
 "expiryStorageChange": "Y",
 "manufactMethodChange": "Y",
 "manufactSiteChange": "Y",
 "containerSizeChange": "Y",
 "packagingSpecChange": "Y",
 "packagingMaterialsChange": "Y",
 "otherChangeDetails": "A"
 },
 "rationaleTypes": {
 "newRoa": "Y",
 "newClaims": "Y",
 "changeFormulation": "Y",
 "changeDrugSubstance": "Y",
 "replaceSterility": "Y",
 "confirmitoryStudies": "Y",
 "otherRationale": "Y",
 "otherRationaleDetails": "A"
 },
 "contactRecord": [
 {
 "amendRecord": "Y",
 "repContactRole": "SECONDARY",
 "repContactDetails": {
 "salutation": "DR",
 "givenName": "A",
 "initials": "A",
 "surname": "A",
 "jobTitle": "A",
 "languageCorrespondance": "fr",
 "phoneNum": "A",
 "phoneExt": "A",
 "faxNum": "A",
 "email": "A"
 }
 },
 {
 "amendRecord": "Y",
 "repContactRole": "SECONDARY",
 "repContactDetails": {
 "salutation": "DR",
 "givenName": "A",
 "initials": "A",
 "surname": "A",
 "jobTitle": "A",
 "languageCorrespondance": "fr",
 "phoneNum": "A",
 "phoneExt": "A",
 "faxNum": "A",
 "email": "A"
 }
 }
 ]
 }
 }


 */