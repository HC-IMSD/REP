/**
 * Created by dkilty on 12/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('transactionService', ['dataLists', 'services', 'hpfbConstants'])
})();


(function () {
    'use strict';
    angular
        .module('transactionService')
        .factory('TransactionService', TransactionService);

    TransactionService.$inject = ['$filter', 'getCountryAndProvinces', 'getContactLists', 'TransactionLists', 'YES', 'NO', 'HCSC'];

    //version 1.1 bug fix?
    //version 1.2 added Submission package/rq to MPNC, MPDNS
    //version 1.3 Chnage Lifecycle Rec associations of Sequence Clean-up and Notification of interruption of sale

    function TransactionService($filter, getCountryAndProvinces, getContactLists, TransactionLists, YES, NO, HCSC) {
        //var vm = this;
        this.baseRequesters = [];
        this.userList =[];
        this.isFinal = false;
        this.$onInit = function () {
            loadContactData();
            loadUserListData();
        };

        function TransactionService() {
            //construction logic
            var defaultTransactionData = _getEmptyTransactionModel();
            angular.extend(this._default, defaultTransactionData);
            this.rootTag = "TRANSACTION_ENROL";
            this.currSequence = 0;
            this.xslFileName = "REP_RT_2_0.xsl";
        }

        function loadContactData() {
            getContactLists.getInternalContacts()
                .then(function (data) {
                    this.baseRequesters = data;
                    return true;
                });
        }

        function loadUserListData() {
            getContactLists.getInternalContactsWithoutOther()
                .then(function (data) {
                    this.userList = data;
                    return true;
                });
        }

        TransactionService.prototype = {
            _default: {},
            isFinal: false,
            //TODO update
            getRootTag: function () {

                return ("TRANSACTION_ENROL")
            },
            getXSLFileName: function () {
                return this.xslFileName;
            },
            /**
             * ngDoc method- mapping from the transaction file json object to the internal representation
             * @param jsonObj the json object generated from the file
             */
            transformFromFileObj: function (jsonObj) {

                var transactionInfo = this.getTransactionInfo(jsonObj[this.rootTag]);
                this._default = {};
                this._default = transactionInfo;
            },
            //TODO transaction relevant
            /**
             * @ngdoc transforms the object model to the compatible file JSON objecct
             * @param jsonObj
             * @returns json object compatible with the xml schema
             * */
            transformToFileObj: function (jsonObj) {
                //transform back to needed
                var today = _getToday();
                var resultJson = {
                    TRANSACTION_ENROL: {
                        template_type: "PHARMA",
                        date_saved: today,
                        software_version: "2.0.0",
                        data_checksum: jsonObj.dataChecksum,
                        transaction_type: jsonObj.transactionType,
                        is_third_party: jsonObj.isThirdParty,
                        is_priority: jsonObj.isPriority,
                        is_noc: jsonObj.isNoc,
                        is_admin_sub: jsonObj.isAdminSub,
                        sub_type: jsonObj.subType
                       // is_ectd: jsonObj.isEctd
                    }
                };
                var ectd = this._transformEctdToFile(jsonObj.ectd);
                resultJson.TRANSACTION_ENROL.ectd = ectd;
                resultJson.TRANSACTION_ENROL.is_solicited = jsonObj.isSolicited;
                resultJson.TRANSACTION_ENROL.solicited_requester_record =
                    this._transformReqToFile(jsonObj.solicitedRequesterReord);
                resultJson.TRANSACTION_ENROL.regulatory_project_manager1 = jsonObj.projectManager1;
                resultJson.TRANSACTION_ENROL.regulatory_project_manager2 = jsonObj.projectManager2;
                resultJson.TRANSACTION_ENROL.is_fees = jsonObj.isFees;
                if (jsonObj.isFees===YES) {
                    resultJson.TRANSACTION_ENROL.fee_details = this._mapFeeDetailsToOutput(jsonObj.feeDetails, YES, NO, $filter);
                }
                resultJson.TRANSACTION_ENROL.is_activity_changes = jsonObj.isActivityChanges;
                resultJson.TRANSACTION_ENROL.company_name = jsonObj.companyName;
                resultJson.TRANSACTION_ENROL.regulatory_activity_address = _mapAddressToOutput(jsonObj.activityAddress);
                resultJson.TRANSACTION_ENROL.regulatory_activity_contact = _mapContactToOutput(jsonObj.activityContact);
                resultJson.TRANSACTION_ENROL.confirm_regulatory_contact = jsonObj.confirmContactValid === true ? 'Y' : 'N'; //this may no longer be needed
                return (resultJson);
            },

            /**
             *
             * @param jsonObj the json object to convert
             * @returns {{}}
             * @private
             */
            _transformReqToFile: function (jsonObj) {

                var requesters = [];
                if (!jsonObj) return requesters;
                if (!(jsonObj instanceof Array)) {
                    //make it an array, case there is only one record
                    jsonObj = [jsonObj]
                }

                for (var i = 0; i < jsonObj.length; i++) {
                    var record = _mapRequesterRecToOutput(jsonObj[i]);
                    if (jsonObj.length == 1) {
                        return (record);
                    }
                    requesters.push(record);
                }
                return (requesters);
            },
            _transformReqFromFile: function (model, jsonObj) {
                model.solicitedRequesterReord = [];
                if (model.isSolicited) {
                    if (!jsonObj) return model.solicitedRequesterReord;
                    if (!(jsonObj instanceof Array)) {
                        //make it an array, case there is only one record
                        jsonObj = [jsonObj];
                    }
                    for (var i = 0; i < jsonObj.length; i++) {
                        var record = {};
                        record.sequenceNumber = Number(jsonObj[i].solicited_requester_sequence);
                        record.solicitedRequester = jsonObj[i].solicited_requester;
                        model.solicitedRequesterReord.push(record);
                    }
                }
            },

            /**
             *
             * @param jsonObj the json object to convert
             * @returns {{}}
             * @private
             */
            _transformEctdToFile: function (jsonObj) {

                var ectd = {};
                ectd.company_id = jsonObj.companyId;
                ectd.dossier_id = jsonObj.dossierId;
                ectd.dossier_type = jsonObj.dossierType;
                ectd.product_name = jsonObj.productName;
                ectd.lifecycle_record = this._mapLifecycleListToOutput(jsonObj.lifecycleRecord);
                return (ectd);
            },

            _transformEctdFromFile: function (model, jsonObj) {
                model.ectd = _getEmptyEctdSection();
                model.ectd.companyId = jsonObj.company_id;
                model.ectd.dossierId = jsonObj.dossier_id;
                model.ectd.dossierType = jsonObj.dossier_type;
                model.ectd.productName = jsonObj.product_name;
                model.ectd.lifecycleRecord = this._mapLifecycleList(jsonObj.lifecycle_record);
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
                var model = _getEmptyTransactionModel();
                model.dateSaved = jsonObj.date_saved;

                model.dataChecksum = jsonObj.data_checksum;
              //  model.isEctd = jsonObj.is_ectd;

                model.transactionType = jsonObj.transaction_type;
                model.isThirdParty = jsonObj.is_third_party;
                model.isPriority = jsonObj.is_priority;
                model.isNoc = jsonObj.is_noc;
                model.isAdminSub = jsonObj.is_admin_sub;
                model.subType = jsonObj.sub_type;
                model.isSolicited = jsonObj.is_solicited;
                this._transformReqFromFile(model, jsonObj.solicited_requester_record);
                model.projectManager1 = jsonObj.regulatory_project_manager1;
                model.projectManager2 = jsonObj.regulatory_project_manager2;
                model.isFees = jsonObj.is_fees;
                model.feeDetails = null;
                if (model.isFees) {
                    model.feeDetails = this._mapFeeDetailsFromOutput(jsonObj.fee_details);
                }

                if(jsonObj.importFileType === HCSC ) {
                    this.isFinal = false;
                    model.confirmContactValid = false; //
                } else {
                    this.isFinal = true;
                    model.confirmContactValid = true;
                }
                model.isActivityChanges = jsonObj.is_activity_changes;
                //model.sameCompany = jsonObj.same_regulatory_company === 'Y';
                model.companyName = jsonObj.company_name;
                //model.sameAddress = jsonObj.same_regulatory_address === 'Y';
                //reg address
                model.activityContact = _transformContactFromFileObj(jsonObj.regulatory_activity_contact);
                //model.confirmContactValid = jsonObj.confirm_regulatory_contact === 'Y';

                model.activityAddress = _transformAddressFromFileObj($filter, getCountryAndProvinces, jsonObj.regulatory_activity_address);
                this._transformEctdFromFile(model, jsonObj.ectd);

                return model;
            },

            getNewTransaction: function (isEctd) {
                var model = _createLifeCycleModel();
                var sequenceNum = this.getNextSequenceNumber(); //always get it
                if (isEctd) {
                    model.sequence = sequenceNum;
                } else {
                    model.sequence = "";
                }
                return model;
            },

            getCurrentSequence:function(){

              return(this.currSequence);
            },
            setSequenceNumber: function (startVal) {
                if (startVal === null) return false;
                var converted = parseInt(startVal);
                if (isNaN(converted)) {
                    this.currSequence = 0;
                    return false;
                }
                this.currSequence = converted;
                var model = this.getModelInfo();

                if (model.ectd.lifecycleRecord && model.ectd.lifecycleRecord.length > 0) {
                    //number in reverse order
                    for (var i = (model.ectd.lifecycleRecord.length - 1); i >= 0; i--) {
                        var rec = model.ectd.lifecycleRecord[i];
                        rec.sequence = this.getNextSequenceNumber();
                    }
                }
                return true;

            },
            getNextSequenceNumber: function () {

                var seqText = "" + this.currSequence;
                var pad = 4 - seqText.length;
                var padText = "";
                for (var i = 0; i < pad; i++) {
                    padText = padText + "0";
                }
                seqText = padText + seqText;
                //starts at sequence zero so update after selection
                this.currSequence++;
                return (seqText);
            },
            deprecateSequenceNumber: function () {
                this.currSequence--;
            },
            _mapLifecycleList: function (jsonObj) {
                var result = [];
                this.currSequence=0; //reset the starting
                if (!jsonObj) return result;
                if (!(jsonObj instanceof Array)) {
                    //make it an array, case there is only one record
                    jsonObj = [jsonObj]
                }
                for (var i = 0; i < jsonObj.length; i++) {
                    var record = _transformLifecycleRecFromFileObj(jsonObj[i], $filter, TransactionLists);
                    //update the start value;
                    this._setNextSequenceOnLoad(parseInt(record.sequence));
                    result.push(record);
                }
                //this.setSequenceNumber(jsonObj.length);
                return result
            },
            _setNextSequenceOnLoad: function (sequence) {

                if(this.currSequence<0) {
                    this.currSequence=0;
                }
                if(isNaN(sequence)) return;
                if(sequence>=this.currSequence){
                    this.currSequence=sequence+1;
                }
            },


            _mapLifecycleListToOutput: function (jsonObj) {
                var result = [];
                if (!jsonObj) return result;
                if (!(jsonObj instanceof Array)) {
                    //make it an array, case there is only one record
                    jsonObj = [jsonObj]
                }


                for (var i = 0; i < jsonObj.length; i++) {
                    var record = _mapLifecycleRecToOutput(jsonObj[i]);
                    if (jsonObj.length === 1) {
                        return (record);
                    }
                    result.push(record);
                }
                return result
            },

            resetEctdSection: function () {

                if (this._default.hasOwnProperty('ectd')) {

                    this._default.ectd.companyId = "";
                    this._default.ectd.dossierId = "";
                    this._default.ectd.dossierType = "";
                    this._default.ectd.productName = "";

                    if (this._default.ectd.lifecycleRecord && this._default.ectd.lifecycleRecord > 0) {
                        this._default.ectd.lifecycleRecord = [this._default.ectd.lifecycleRecord[0]];
                    }
                    //this._default.ectd = _getEmptyEctdSection();
                }
            },
            createFeeDetails: function () {
                return _createFeeDetails(NO);
            }

        };
        TransactionService.prototype._mapFeeDetailsToOutput = function (feeObj) {
            /**
             * Maps the internal data model to the external data model
             * @param feeObj
             * @param YES
             * @param NO
             * @returns {json object}
             * @private
             */
                ///function _mapFeeDetailsToOutput(feeObj, YES, NO,$filter) {
            var result = _createEmptyFeeDetailsForOutput(NO);
            if (angular.isUndefined(feeObj)) return null;
            result.submission_class = "";

            if (feeObj.submissionClass && feeObj.submissionClass.id) {
                //gets rid of any hashkey serialize then deseriailize,
                result.submission_class = (angular.fromJson(angular.toJson(feeObj.submissionClass)))
            }
            //mitigation
            result.mitigation.mitigation_type = "";
            if (feeObj.mitigation.mitigationType && feeObj.mitigation.mitigationType.id) {
                result.mitigation.mitigation_type =  (angular.fromJson(angular.toJson(feeObj.mitigation.mitigationType)))
            }
           // result.mitigation.mitigation_type = feeObj.mitigation.mitigationType;
            result.mitigation.certify_organization = feeObj.mitigation.certifyOrganization   === true ? 'Y' : 'N';
            result.mitigation.small_business_fee_application = feeObj.mitigation.smallBusinessFeeApplication === true ? 'Y' : 'N';
            result.mitigation.first_submission = feeObj.mitigation.firstSubmission   === true ? YES : NO;
            result.mitigation.certify_goverment_organization = feeObj.mitigation.certifyGovermentOrganization  === true ? 'Y' : 'N';
            result.mitigation.certify_urgent_health_need = feeObj.mitigation.certifyUrgentHealthNeed   === true ? 'Y' : 'N';
            result.mitigation.certify_funded_health_institution = feeObj.mitigation.certifyFundedHealthInstitution   === true ? 'Y' : 'N';
            return result;
        };
        TransactionService.prototype._mapFeeDetailsFromOutput = function (feeObj) {
            /**
             * Maps the internal data model to the external data model
             * @param feeObj
             * @param YES
             * @param NO
             * @returns {json object}
             * @private
             */
            var result = _createFeeDetails(NO);
            if (angular.isUndefined(feeObj)) return null;
            // result.submission_class = feeObj.submissionClass;

            if (feeObj.submission_class && feeObj.submission_class.id) {
                result.submissionClass = $filter('findListItemById')(TransactionLists.getFeeList(), {id: feeObj.submission_class.id});
            }

            if (feeObj.mitigation.mitigation_type && feeObj.mitigation.mitigation_type.id) {
                result.mitigation.mitigationType = $filter('findListItemById')(TransactionLists.getMitigationList(), {id: feeObj.mitigation.mitigation_type.id});
            }
            result.mitigation.certifyOrganization = feeObj.mitigation.certify_organization === YES;
            result.mitigation.smallBusinessFeeApplication = feeObj.mitigation.small_business_fee_application === YES;
            result.mitigation.firstSubmission = feeObj.mitigation.first_submission === YES;
            result.mitigation.certifyGovermentOrganization = feeObj.mitigation.certify_goverment_organization === YES;
            result.mitigation.certifyUrgentHealthNeed = feeObj.mitigation.certify_urgent_health_need === YES;
            result.mitigation.certifyFundedHealthInstitution  = feeObj.mitigation.certify_funded_health_institution ===  YES;
            return result;
            //}
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


    /**
     * @ngdoc method Maps a lifecycle record file object to the internal data model
     * @param lifecycleObj- the json file object to map
     * @returns {jsonObj}
     * @private
     */
    function _transformLifecycleRecFromFileObj(lifecycleObj, $filter, TransactionLists) {
        var lifecycleRec = _createLifeCycleModel();
        // lifecycleRec.sequence = lifecycleObj.sequence_number;
        // lifecycleRec.dateFiled = lifecycleObj.date_filed;
        lifecycleRec.controlNumber = lifecycleObj.control_number;
        lifecycleRec.activityLead = lifecycleObj.sequence_activity_lead;

        lifecycleRec.activityType = "";
        if (lifecycleObj.sequence_activity_type) {
            lifecycleRec.activityType = $filter('filter')(TransactionLists.getActivityTypes(), {id: lifecycleObj.sequence_activity_type.__text})[0];
            lifecycleRec.activityTypeDisplay = lifecycleRec.activityType.id;
        }
        lifecycleRec.descriptionValue = lifecycleObj.sequence_description_value;
        lifecycleRec.startDate = lifecycleObj.sequence_from_date;
        lifecycleRec.endDate = lifecycleObj.sequence_to_date;
        lifecycleRec.details = lifecycleObj.sequence_details;
        lifecycleRec.sequenceVersion = lifecycleObj.sequence_version;
        lifecycleRec.year = lifecycleObj.sequence_year;
        lifecycleRec.sequenceConcat = lifecycleObj.sequence_concat;
        lifecycleRec.isSaved = true;
        return (lifecycleRec);
    }


    function _mapLifecycleRecToOutput(lifecycleObj) {
        var lifecycleRec = {};
       /**
        lifecycleRec.sequence_number = lifecycleObj.sequence;
        lifecycleRec.date_filed = lifecycleObj.dateFiled; **/
        lifecycleRec.control_number = lifecycleObj.controlNumber;
        lifecycleRec.sequence_activity_lead = lifecycleObj.activityLead;
        lifecycleRec.sequence_activity_type = "";
        if (lifecycleObj.activityType) {
            lifecycleRec.sequence_activity_type = {};
            _setActivityTypeValuesForOutput(lifecycleObj.activityType, lifecycleRec.sequence_activity_type);
        }
        lifecycleRec.sequence_description_value = lifecycleObj.descriptionValue;
        lifecycleRec.sequence_from_date = lifecycleObj.startDate;
        lifecycleRec.sequence_to_date = lifecycleObj.endDate;
        lifecycleRec.sequence_details = lifecycleObj.details;
        lifecycleRec.sequence_version = lifecycleObj.sequenceVersion;
        lifecycleRec.sequence_year = lifecycleObj.year;
        lifecycleRec.sequence_concat = lifecycleObj.sequenceConcat;
        return (lifecycleRec);
    }

    function _mapRequesterRecToOutput(requesterObj) {
        var requesterRec = {};
        if (requesterObj) {
            requesterRec = {
                solicited_requester_sequence: requesterObj.sequenceNumber,
                solicited_requester: requesterObj.solicitedRequester
            }
        }
        return (requesterRec);
    }

    /**
     * Truncates the label for activity type based on feedback of Jul 18, 2017
     * Removes the full name
     * @param srcActivityTypeRec
     * @param destActivityTypeRec
     * @private
     */
    function _setActivityTypeValuesForOutput(srcActivityTypeRec, destActivityTypeRec) {
        var stringIndex = srcActivityTypeRec.en.indexOf(" ("); //finc space and open bracket
        destActivityTypeRec.__text = srcActivityTypeRec.id;

        if (stringIndex > -1) {
            destActivityTypeRec._label_en = srcActivityTypeRec.en.substring(0, stringIndex)
        } else {
            destActivityTypeRec._label_en = srcActivityTypeRec.en;
        }
        stringIndex = srcActivityTypeRec.fr.indexOf('(');
        if (stringIndex > -1) {
            destActivityTypeRec._label_fr = srcActivityTypeRec.fr.substring(0, stringIndex - 1)
        } else {
            destActivityTypeRec._label_fr = srcActivityTypeRec.fr;
        }

    }


    function _getEmptyEctdSection() {
        var ectd = {};
        ectd.companyId = "";
        ectd.dossierId = "";
        ectd.dossierType = "";
        ectd.productName = "";
        ectd.lifecycleRecord = [];
        return ectd;
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
        address.country = "";
        if (addressObj.country) {
            address.country =
                {
                    _label_en: addressObj.country.en,
                    _label_fr: addressObj.country.fr,
                    __text: addressObj.country.id
                }
        }
        address.postal_code = addressObj.postalCode;
        return (address);
    }

    function _transformAddressFromFileObj($filter, getCountryAndProvinces, addressObj) {
        var address = {};
        address.street = addressObj.street_address;
        address.city = addressObj.city;
        address.stateList = addressObj.province_lov;
        address.stateText = addressObj.province_text;
        address.country = "";
        if (addressObj.country.__text) {
            address.country = $filter('filter')(getCountryAndProvinces.getCountries(), {id: addressObj.country.__text})[0];
            address.countryDisplay = addressObj.country.id;
        }

        address.postalCode = addressObj.postal_code;
        return (address);
    }

    function _createLifeCycleModel() {
        var defaultRecord = {
            "controlNumber": "",
            "activityLead": "",
            "activityType": "",
            "activityTypeDisplay": "",
            "descriptionValue": "",
            "startDate": "",
            "endDate": "",
            "details": "",
            "sequenceVersion": "",
            "sequenceConcat": "",
            "isSaved": false
        };
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
                countryDisplay: "",
                postalCode: ""
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

    function _getToday() {
        var d = new Date();
        var isoDate = d.getFullYear() + '-'
            + pad(d.getMonth() + 1) + '-'
            + pad(d.getDate());
        return (isoDate);

        function pad(n) {
            return n < 10 ? '0' + n : n
        }
    }

    //todo deprecated
    function _createRepContact() {

        var contact = _createContactModel();
        contact.repRole = "";
        return contact
    }

    function _getEmptyTransactionModel() {
        var defaultTransactionData = {
            dataChecksum: "",
            dateSaved: "",
            softwareVersion: "2.0.0",
            transactionType: "",
            isThirdParty: "",
            isPriority: "",
            isNoc: "",
            isAdminSub: "",
            subType: "",
            ectd: {
                companyId: "",
                dossierId: "",
                dossierType: "",
                productName: "",
                lifecycleRecord: []
            },
            isSolicited: "",
            solicitedRequesterReord: [],
            projectManager1: "",
            projectManager2: "",
            isFees: "",
            resetBtnClicked : false,
            feeDetails: null,
            isActivityChanges: "Y", //deprecated
            companyName: "",
            activityAddress: _createAddressModel(),
            confirmContactValid: false,
            activityContact: _createContactModel(),
        };

        return defaultTransactionData;
    }

    /**
     * Creates and empty Fee Details object
     * @returns {{feeType: string, deferralStatemnet: string}}
     * @private
     */
    function _createFeeDetails(NO) {
        var feeObj = {

            submissionClass: null,
            feeRemitNoPayment: null,
            mitigation: {
                mitigationType: "", //statement supporting the deferral request
                certifyOrganization: false,
                smallBusinessFeeApplication: false,
                firstSubmission: false,
                certifyGovermentOrganization:false,
                certifyUrgentHealthNeed: false,
                certifyFundedHealthInstitution: false
            }
        };
        return feeObj;
    }

    function _createEmptyFeeDetailsForOutput(NO) {
        var feeObj = {

            submission_class: null,
            mitigation: {
                mitigation_type : "",// mitigation measures
                certify_organization : NO, //number of employees less than 100 people
                small_business_fee_application : NO, //completed the Small Business Fee Mitigation Application and attached it
                first_submission : NO, //This is my first submission/application
                certify_goverment_organization : NO, // certify that our organization is a branch or agency of the Government of Canada or of a province or territory.
                certify_urgent_health_need: NO,
                certify_funded_health_institution: NO
            }
        }
        return feeObj;
    }

})();
