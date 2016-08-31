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
        .factory('ActivityService', ActivityService);

    function ActivityService() {

        function ActivityService() {
            //construction logic
            var defaultActivityData = {
                "companyId": "",
                "dstsControlNumber": "",
                "enrolmentVersion": "",
                "dateSaved": "",
                "applicationType": "NEW",
                "softwareVersion": "",
                "dataChecksum": "",
                "dossierIdPrefix": "HC6-024-",
                "dossierId": "",
                "regActivityLead": "",
                "regActivityType": "",
                "feeClass": "",
                "notLasa": "",
                "reasonFiling": "",
                "isThirdParty": "",
                "relatedActivity":[]
            };

            angular.extend(this._default, defaultActivityData);
            this.rootTag = "ACTIVITY_ENROL";
            this.currSequence = 0;
        }

        ActivityService.prototype = {
            _default: {}
        };


        ActivityService.prototype.getRootTag = function () {
            return (this.rootTag)
        };

        /**
         * @ngdoc transforms the object model to the compatible file JSON objecct
         * @param jsonObj
         * @returns json object compatible with the xml schema
         * */
        ActivityService.prototype.transformToFileObj = function (jsonObj) {
            var activity = {
                ACTIVITY_ENROL: {
                    company_id: jsonObj.companyId,
                    dsts_control_number: jsonObj.dstsControlNumber,
                    enrolment_version: jsonObj.enrolmentVersion,
                    date_saved: jsonObj.dateSaved,
                    application_type: jsonObj.applicationType,
                    software_version: jsonObj.softwareVersion,
                    data_checksum: jsonObj.dataChecksum,
                    dossier_id_prefix: jsonObj.dossierIdPrefix,
                    dossier_id: jsonObj.dossierId,
                    reg_activity_lead: jsonObj.regActivityLead,
                    reg_activity_type: jsonObj.regActivityType,
                    fee_class: jsonObj.feeClass,
                    not_lasa: jsonObj.notLasa,
                    reason_filing: jsonObj.reasonFiling
                }
            };
            //do other stuff
            if (jsonObj.dossierId) {
                activity.ACTIVITY_ENROL.dossier_id_concat = (jsonObj.dossierIdPrefix + jsonObj.dossierId);
            } else {
                //if there is no id value just make this empty
                activity.ACTIVITY_ENROL.dossier_id_concat = "";
            }
            return activity;

        };
        ActivityService.prototype.getModelInfo = function () {
            return this._default;
        };
        /**
         * @ngdoc method- transforms the file json to a model object
         */
        ActivityService.prototype.getActivityInfo = function (jsonObj) {
            if (!jsonObj) {
                return this._default;
            }
            var model = this._default;
            model.companyId = jsonObj.company_id;
            model.dstsControlNumber = jsonObj.dsts_control_number;
            model.enrolmentVersion = jsonObj.enrolment_version;
            model.dateSaved = jsonObj.date_saved;
            model.applicationType = jsonObj.application_type;
            model.softwareVersion = jsonObj.software_version;
            model.dataChecksum = jsonObj.software_version;
            model.dossierIdPrefix = jsonObj.dossier_id_prefix;
            model.dossierId = json.dossier_id;
            model.regActivityLead = jsonObj.reg_activity_lead;
            model.regActivityType = jsonObj.reg_activity_type;
            model.feeClass = jsonObj.fee_class;
            model.notLasa = jsonObj.not_lasa;
            model.reasonFiling = jsonObj.reason_filing;
            model.isThirdParty = jsonObj.is_third_party;
            var relatedActivites = {relatedActivites: this.getRelatedActivityList(jsonObj[rootTag].related_activity)};
            return  angular.extend(model, relatedActivites);
        };

        ActivityService.prototype.getRelatedActivityList=function(activityList){
            var listResult = [];
            if (!activityList) return listResult;
            if (!(activityList instanceof Array)) {
                //make it an array, case there is only one
                activityList = [adrLactivityListist]
            }
            for(var i=0;i<activityList.length;i++){
                listResult.push(this._transformRelatedRegActivityFromFileObj(actvityList[i]));
            }
            return listResult;
        };

        /**
         * ngDoc method- mapping from the transaction file json object to the internal representation
         * @param jsonObj the json object generated from the file
         */
        ActivityService.prototype.transformFromFileObj = function (jsonObj) {
            var activityInfo = this.getActivityInfo(jsonObj[this.rootTag]);
            //get rid of previous default if it exists
            this._default = {};
            angular.extend(this._default, transactionInfo)
        };

        ActivityService.prototype.getNewActivity = function () {
            var activity= {
                activityId:"1",
                "regActivityType": "",
                "dateCleared": "",
                "controlNumber":"",
                "dossierId":"",
                "manufacturerName":"",
                "reasonFiling":"",
                "assocDins" : [

                ]
            };
            return activity;
        };

        ActivityService.prototype.getActivityLeadList = function (isPilot) {

            var leadList = ["BIOLOGIC",
                "CHP",
                "DMF",
                "PHARMA",
                "PMVIGILANCE"];
            if(!isPilot){
                leadList.push("MD","VET","UNASSIGNED");
            }
               return leadList;

        };


        ActivityService.prototype.getActivityTypeList=function(isPilot){

            var activityList=[
            "CTA",
            "CTAA",
            "NDS",
            "SNDS",
            "ANDS",
            "SANDS",
            "NC",
            "DIN",
            "PDC",
            "ADMIN"
            ];
            if(!isPilot){
                activityList.push(
                    "VIND",
                    "VINDAM",
                    "VNDS",
                    "VANDS",
                    "VSANDS",
                    "VNC",
                    "VDIN")
            }
            return activityList;
        };

        // Return a reference to the object
        return ActivityService;
    }//end of ActivityService Object definition

    /**
     *
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
            console.error("There is no contact object");
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

        var contact = _createContactModel();
        contact.repRole = "";
        return contact
    }

    function _createRationalTypes() {
        return {
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
    }

    function _createNotifiableChangeTypes() {
        return {
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
    }

    /**
     * @ngdoc converts notifable change data object to a file object
     * @param jsonObj - the data object to convert
     * @returns {jsonobj} representing the file object for a notifiable change
     * @private
     */
    function _mapNotifiableChangeTypesToOutput(jsonObj) {
        if (!jsonObj) return null;
        return {
            "text_label_change": jsonObj.textLabelChange,
            "drug_substance_change": jsonObj.drugSubstanceChange,
            "formulation_change": jsonObj.formulationChange,
            "specification_change": jsonObj.specificationChange,
            "expiry_storage_change": jsonObj.expiryStorageChange,
            "manufact_method_change": jsonObj.manufactMethodChange,
            "manufact_site_change": jsonObj.manufactSiteChange,
            "container_size_change": jsonObj.containerSizeChange,
            "packaging_spec_change": jsonObj.packagingSpecChange,
            "packaging_materials_change": jsonObj.packagingMaterialsChange,
            "other_change_details": jsonObj.otherChangeDetails
        };
    }

    /**
     * @ngdoc method transforms a file json object to a data object
     * @param jsonObj- the file json object to convert
     * @returns {json} converted json object
     * @private
     */
    function _transformNotifiableChangeTypeFromFileObj(jsonObj) {
        if (!jsonObj) return null;
        return {
            "textLabelChange": jsonObj.text_label_change,
            "drugSubstanceChange": jsonObj.drug_substance_change,
            "formulationChange": jsonObj.formulation_change,
            "specificationChange": jsonObj.specification_change,
            "expiryStorageChange": jsonObj.expiry_storage_change,
            "manufactMethodChange": jsonObj.manufact_method_change,
            "manufactSiteChange": jsonObj.manufact_site_change,
            "containerSizeChange": jsonObj.container_size_change,
            "packagingSpecChange": jsonObj.packaging_spec_change,
            "packagingMaterialsChange": jsonObj.packaging_materials_change,
            "otherChangeDetails": jsonObj.other_change_details
        };
    }


    function _transformRationaleTypeFromFileObj(jsonObj) {
        if (!jsonObj) return null;
        return {
            "newRoa": jsonObj.new_roa,
            "newClaims": jsonObj.new_claims,
            "changeFormulation": jsonObj.change_formulation,
            "changeDrugSubstance": jsonObj.change_drug_substance,
            "replaceSterility": jsonObj.replace_sterility,
            "confirmitoryStudies": jsonObj.confirmitory_studies,
            "otherRationale": jsonObj.other_rationale,
            "otherRationaleDetails": jsonObj.other_rationale_details
        };
    }

    function _mapRationaleTypeToOutput(jsonObj) {
        if (!jsonObj) return null;
        return {
            "new_roa": jsonObj.newRoa,
            "new_claims": jsonObj.newClaims,
            "change_formulation": jsonObj.changeFormulation,
            "change_drug_substance": jsonObj.changeDrugSubstance,
            "replace_sterility": jsonObj.replaceSterility,
            "confirmitory_studies": jsonObj.confirmitoryStudies,
            "other_rationale": jsonObj.otherRationale,
            "other_rationale_details": jsonObj.otherRationaleDetails
        };
    }

    function _mapRelatedRegActivityToOutput(jsonObj) {
        if (!jsonObj) return null;
        var regActivityType = {
            "reg_activity_type": jsonObj.regActivityType,
            "date_cleared": jsonObj.dateCleared,
            "control_number": jsonObj.controlNumber,
            "dossier_id": jsonObj.dossierId,
            "manufacturer_name": jsonObj.manufacturerName,
            "reason_filing": jsonObj.reasonFiling,
            "assoc_dins": {}
        };
        var dins = _mapRelatedDinsToOutput(jsonObj);
        if (dins) {
            regActivityType.assoc_dins.din_number = dins;
        }
        return regActivityType;
    }

    function _transformRelatedRegActivityFromFileObj(jsonObj) {
        if (!jsonObj) return null;
        var regActivityType = {
            "regActivityType": jsonObj.reg_activity_type,
            "dateCleared": jsonObj.date_cleared,
            "controlNumber": jsonObj.control_number,
            "dossierId": jsonObj.dossier_id,
            "manufacturerName": jsonObj.manufacturer_name,
            "reasonFiling": jsonObj.reason_filing
        };
        var dins = _transformRelatedDinsListFromFileObj(jsonObj);
        regActivityType.assocDins = {};
        regActivityType.assocDins.dinNumber = dins; //should always be an array
        return regActivityType;
    }



    function _transformRelatedDinsListFromFileObj(jsonObj) {
        var result = [];
        if (!jsonObj) return result;

        if (jsonObj.hasOwnProperty('din_number')) {
            angular.forEach(jsonObj.din_number, function (value, key) {
                this.push(value);
            }, result);
        }
        return result;
    }

    function _mapRelatedDinsToOutput(jsonObj) {
        var result = [];
        if (!jsonObj) return result;
        if (jsonObj.hasOwnProperty('dinNumber')) {
            angular.forEach(jsonObj.dinNumber, function (value, key) {
                this.push(value);
            }, result);
        }
        return result;
    }

})();