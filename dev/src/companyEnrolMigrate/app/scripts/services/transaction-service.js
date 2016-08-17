/**
 * Created by dkilty on 12/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('services', [])
})();


(function () {
    'use strict';
    angular
        .module('services')
        .factory('TransactionService', TransactionService)

    function TransactionService() {
        function TransactionService() {
            //construction logic
            var defaultTransactionData = {
                dataChecksum: "",
                enrolmentVersion: "0.0",
                dateSaved: "",
                applicationType: "NEW",
                softwareVersion: "1.0.0",
                companyId: "",
                isEctd: "N",
                dossierId: "",
                dossierName: "",
                isSolicited: "",
                solicitedRequester: "",
                projectManager1: "",
                projectManager2: "",
                sameCompany: "N",
                companyName: "",
                sameAddress: "N", //this may no longer be needed
                activityAddress: _createAddressModel(),
                sameContact: "N",
                activityContact: _createContactModel(),
                regulatorySubmissionContact: [],
                lifecycleRecord: []
            };
            angular.extend(this._default, defaultTransactionData);
            this.rootTag = "TRANSACTION_ENROL";
        }

        TransactionService.prototype = {
            _default: {},
            //TODO update

             getRootTag:function(){

                 return("TRANSACTION_ENROL")
             } ,
            /**
             * ngDoc method- mapping from the transaction file json object to the internal representation
             * @param jsonObj the json object generated from the file
             */
            transformFromFileObj: function (jsonObj) {

                var transactionInfo = this.getTransactionInfo(jsonObj[this.rootTag]);
                //get rid of previous default if it exists
                this._default = {};
                angular.extend(this._default, transactionInfo)
                console.log("This is the transform " + JSON.stringify(this._default))
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
                        application_type: jsonObj.applicationType,
                        software_version: jsonObj.softwareVersion,
                        data_checksum: jsonObj.dataChecksum,
                        is_ectd: jsonObj.isEctd,
                        company_id: jsonObj.companyId,
                        dossier_id: jsonObj.dossierId,
                        dossier_name: jsonObj.dossierName,
                        //lifecycle record here
                        is_solicited: jsonObj.isSolicited,
                        solicited_requester: jsonObj.requester,
                        regulatory_project_manager1: jsonObj.projectManager1,
                        regulatory_project_manager2: jsonObj.projectManager2,
                        same_regulatory_company: jsonObj.sameCompany,
                        company_name: jsonObj.companyName,
                        same_regulatory_address: jsonObj.sameAddress, //this may no longer be needed
                        regulatory_activity_address: _mapAddressToOuput(jsonObj.activityAddress),
                        same_regulatory_contact: jsonObj.sameCompany, //this may no longer be needed
                        regulatory_activity_contact: _mapContactToOutput(jsonObj.activityContact)
                    }
                }
                return (resultJson);
            },
            getModelInfo: function () {
                return this._default;
            },
            /**
             * @ngdoc method- transforms the file json to a model object
             */
            getTransactionInfo: function (jsonObj) {
                if (!jsonObj)
                    return this._default;

                var model = this.default;
                model.dateSaved = jsonObj.date_saved;
                model.applicationType = jsonObj.application_type;
                model.softwareVersion = jsonObj.software_version;
                model.dataChecksum = jsonObj.data_checksum;
                model.isEctd = jsonObj.is_ectd;
                model.companyId = jsonObj.company_id;
                model.dossierId = jsonObj.dossier_id;
                model.dossierName = jsonObj.dossier_name;
                model.isSolicited = jsonObj.is_solicited;
                model.solicitedRequester = jsonObj.solicited_requester;
                model.projectManager1 = jsonObj.regulatory_project_manager1;
                model.projectManager2 = jsonObj.regulatory_project_manager2;

                model.sameCompany = jsonObj.same_regulatory_company;
                model.companyName = jsonObj.company_name;
                model.sameAddress = jsonObj.same_regulatory_address;
                //reg address
                model.activityAddress = _transformContactFromFileObj(jsonObj.regulatory_activity_contact);
                model.sameContact = jsonObj.same_regulatory_contact;
                model.activityContact= _transformAddressFromFileObj(jsonObj.regulatory_activity_address);
                model.regulatorySubmissionContact = _mapRegulatoryContactList(jsonObj.rep_submission_contact_record);
                model.lifecycleRecord = _mapLifecycleList(jsonObj.lifecycle_record);
            }
        };
        // Return a reference to the object
        return TransactionService;
    }

    /**
     * Maps the file json object to the internal data model of the REP contacts
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

    function _mapLifecycleList(jsonObj){
        var result=[];
        if (!jsonObj) return list;
        if (!(jsonObj instanceof Array)) {
            //make it an array, case there is only one record
            jsonObj = [jsonObj]
        }
        for (var i = 0; i < jsonObj.length; i++) {
            result.push(_transformLifecycleRecFromFileObj(jsonObj[i]));
        }
        return result
    }

    /**
     * @ngdoc method Maps a lifecycle record file object to the internal data model
     * @param lifecycleObj- the json file object to map
     * @returns {jsonObj}
     * @private
     */
    function _transformLifecycleRecFromFileObj(lifecycleObj) {
        var lifecycleRec = _createLifeCycleModel();

        lifecycleRec.sequence = lifecycleObj.sequence_number;
        lifecycleRec.dateFiled = lifecycleObj.date_filed;
        lifecycleRec.controlNumber = lifecycleObj.control_number;
        lifecycleRec.activityType = lifecycleObj.sequence_activity_type;
        lifecycleRec.descriptionValue = lifecycleObj.sequence_description_value;
        lifecycleRec.startDate = lifecycleObj.sequence_from_date;
        lifecycleRec.endDate = lifecycleObj.sequence_to_date;
        lifecycleRec.details = lifecycleObj.sequence_details;
        lifecycleRec.version = lifecycleObj.sequence_version;
        lifecycleRec.sequenceConcat = lifecycleObj.sequence_concat;
        return (lifecycleRec);
    }

    function _mapLifecycleRecToOutput(lifecycleObj) {
        var lifecycleRec = {};

        lifecycleRec.sequence_number = lifecycleObj.sequence;
        lifecycleRec.date_filed = lifecycleObj.dateFiled;
        lifecycleRec.control_number = lifecycleObj.controlNumber;
        lifecycleRec.sequence_activity_type = lifecycleObj.activityType;
        lifecycleRec.sequence_description_value = lifecycleObj.descriptionValue;
        lifecycleRec.sequence_from_dates = lifecycleObj.startDate;
        lifecycleRec.sequence_to_date = lifecycleObj.endDate;
        lifecycleRec.sequence_details = lifecycleObj.details;
        lifecycleRec.sequence_version = lifecycleObj.version;
        lifecycleRec.sequence_concat = lifecycleObj.sequenceConcat;
        return (lifecycleRec);
    }

    function _transformRepContactFromFileObj(repObj) {

        var repContact = _transformContactFromFileObj(repObj.rep_submission_contact);
        repContact.repRole = repObj.rep_submission_contact_role;
    }

    function _mapRepContactToOutput(repObj) {
        var repContact = {};
        repContact.rep_submission_contact_role = repOb.repRole;
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

    function _createLifeCycleModel() {
        var defaultRecord = {
            "sequence": "0000",
            "dateFiled": "",
            "controlNumber": "",
            "activityType": "",
            "descriptionValue": "",
            "startDate": "1",
            "endDate": "",
            "details": "",
            "version": "",
            "sequenceConcat": ""
        }
        //TODO get next sequence number
        return defaultRecord;
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
        contact.given_name = "";
        contact.initials = "";
        contact.surname = "";
        contact.job_title = "";
        contact.language_correspondance = "";
        contact.phone_num = "";
        contact.phone_ext = "";
        contact.fax_num = "";
        contact.email = "";
        return contact;
    }


})();
