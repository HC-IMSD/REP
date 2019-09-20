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

    TransactionService.$inject = ['$filter', '$translate', 'getCountryAndProvinces', 'getContactLists',
        'TransactionLists', 'YES', 'NO', 'HCSC', 'ENGLISH', 'FRENCH', 'XSL_PREFIX'];

    //version 1.1 bug fix?
    //version 1.2 added Submission package/rq to MPNC, MPDNS
    //version 1.3 Chnage Lifecycle Rec associations of Sequence Clean-up and Notification of interruption of sale

    function TransactionService($filter, $translate, getCountryAndProvinces, getContactLists, TransactionLists,
                                YES, NO, HCSC, ENGLISH, FRENCH, XSL_PREFIX) {
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
            // this.xslFileName = XSL_PREFIX + "REP_RT_2_2.xsl";
            this.xslFileName = "REP_RT_3_0.xsl";
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
                var subt = "";
                var currentLang = $translate.proposedLanguage() || $translate.use();
                if (jsonObj.isAdminSub) {
                    subt = {};
                    _setAdminSubTypeForOutput(jsonObj.subType, subt,
                        currentLang, ENGLISH, FRENCH);
                }
                var resultJson = {
                    TRANSACTION_ENROL: {
                        template_type: "PHARMA",
                        date_saved: today,
                        software_version: "3.0.1",
                        data_checksum: jsonObj.dataChecksum,
                       // transaction_type: jsonObj.transactionType,
                        is_third_party: jsonObj.isThirdParty,
                        is_priority: jsonObj.isPriority,
                        is_noc: jsonObj.isNoc,
                        is_admin_sub: jsonObj.isAdminSub,
                        sub_type: subt
                       // is_ectd: jsonObj.isEctd
                    }
                };
                var ectd = this._transformEctdToFile(jsonObj.ectd);
                resultJson.TRANSACTION_ENROL.ectd = ectd;
                //resultJson.TRANSACTION_ENROL.is_solicited = jsonObj.isSolicited;
              //  resultJson.TRANSACTION_ENROL.solicited_requester_record =
               //     this._transformReqToFile(jsonObj.solicitedRequesterReord);
                resultJson.TRANSACTION_ENROL.regulatory_project_manager1 = jsonObj.projectManager1;
                resultJson.TRANSACTION_ENROL.regulatory_project_manager2 = jsonObj.projectManager2;
                resultJson.TRANSACTION_ENROL.is_fees = jsonObj.isFees;
                if (jsonObj.isFees===YES) {
                    resultJson.TRANSACTION_ENROL.fee_details = this._mapFeeDetailsToOutput(jsonObj.feeDetails, YES, NO, $filter);
                }
                resultJson.TRANSACTION_ENROL.is_activity_changes = jsonObj.isActivityChanges;
                resultJson.TRANSACTION_ENROL.company_name = jsonObj.companyName;
                resultJson.TRANSACTION_ENROL.regulatory_activity_address = _mapAddressToOutput($translate, jsonObj.activityAddress);
                resultJson.TRANSACTION_ENROL.regulatory_activity_contact = _mapContactToOutput($translate, jsonObj.activityContact);
                resultJson.TRANSACTION_ENROL.confirm_regulatory_contact = jsonObj.confirmContactValid === true ? 'Y' : 'N'; //this may no longer be needed
                return (resultJson);
            },

            /**
             *
             * @param jsonObj the json object to convert
             * @returns {{}}
             * @private
             */
         /*
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
                        record.solicitedRequester = jsonObj[i].requester_of_solicited_information;
                        model.solicitedRequesterReord.push(record);
                    }
                }
            },
           */

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
                var currentLang = $translate.proposedLanguage() || $translate.use();
                var dt_text =  $translate.instant(jsonObj.dossierType, "", '', currentLang);
                ectd.dossier_type = {
                    _id: jsonObj.dossierType,
                    __text: dt_text
                };
                ectd.product_name = jsonObj.productName;
                ectd.lifecycle_record = this._mapLifecycleListToOutput(jsonObj.lifecycleRecord);
                return (ectd);
            },

            _transformEctdFromFile: function (model, jsonObj) {
                model.ectd = _getEmptyEctdSection();
                model.ectd.companyId = jsonObj.company_id;
                model.ectd.dossierId = jsonObj.dossier_id;
                model.ectd.dossierType = jsonObj.dossier_type._id;
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

              //  model.transactionType = jsonObj.transaction_type;
                model.isThirdParty = jsonObj.is_third_party;
                model.isPriority = jsonObj.is_priority;
                model.isNoc = jsonObj.is_noc;
                model.isAdminSub = jsonObj.is_admin_sub;
                model.subType = '';
                if (jsonObj.sub_type) {
                    model.subType = $filter('filter')(getContactLists.getAdminSubType(), {id: jsonObj.sub_type._id})[0];
                }
               // model.isSolicited = jsonObj.is_solicited;
               // this._transformReqFromFile(model, jsonObj.solicited_requester_record);
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

                model.activityAddress = _transformAddressFromFileObj($translate, $filter, getCountryAndProvinces, jsonObj.regulatory_activity_address);
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
                    if (jsonObj[i].isSaved) {
                        var record = _mapLifecycleRecToOutput($translate, jsonObj[i], ENGLISH, FRENCH);
                        if (jsonObj.length === 1) {
                            return (record);
                        }
                        result.push(record);
                    }
                }
                return result;
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
                var currentLang = $translate.proposedLanguage() || $translate.use();
                result.submission_class = _getSubmissionClassForOutput(feeObj.submissionClass, currentLang, ENGLISH, FRENCH);
                result.submission_description = _getSubDescription(feeObj.submissionClass, currentLang, ENGLISH, FRENCH);
                result.fee = feeObj.submissionClass.fee;
            }
            result.deferral_request = feeObj.deferralRequest;
            result.fee_remission = feeObj.feeRemission;
            result.gross_revenue = feeObj.grossRevenue;
            result.percent_gross = feeObj.percentGross;
            result.required_docs.deferral_statement = feeObj.requiredDocs.deferralStat === true ? YES : NO;
            result.required_docs.remission_certified = feeObj.requiredDocs.revStat === true ? YES : NO;
            result.required_docs.sales_history = feeObj.requiredDocs.salesHistory === true ? YES : NO;
            result.required_docs.avg_sale_price = feeObj.requiredDocs.avgSalePrice === true ? YES : NO;
            result.required_docs.est_market_share = feeObj.requiredDocs.estMarketShare === true ? YES : NO;
            result.required_docs.comparison_products = feeObj.requiredDocs.comparison === true ? YES : NO;
            result.required_docs.market_plan = feeObj.requiredDocs.marketPlan === true ? YES : NO;
            result.required_docs.other = feeObj.requiredDocs.other === true ? YES : NO;
            result.required_docs.other_details = feeObj.requiredDocs.otherDetails;
            result.payment_method.credit_card = feeObj.paymentMethod.creditCard === true ? YES : NO;
            result.payment_method.cheque = feeObj.paymentMethod.cheque === true ? YES : NO;
            result.payment_method.money_order = feeObj.paymentMethod.moneyOrder === true ? YES : NO;
            result.payment_method.bank_draft = feeObj.paymentMethod.bankDraft === true ? YES : NO;
            result.payment_method.existing_credit = feeObj.paymentMethod.existingCredit === true ? YES : NO;
            result.payment_method.bank_wire = feeObj.paymentMethod.bankWire === true ? YES : NO;
            result.payment_method.bill_payment = feeObj.paymentMethod.billPayment === true ? YES : NO;

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

            if (feeObj.submission_class && feeObj.submission_class._id) {
                result.submissionClass = $filter('findListItemById')(TransactionLists.getFeeList(), {id: feeObj.submission_class._id});
            }
            result.deferralRequest = feeObj.deferral_request;
            result.feeRemission = feeObj.fee_remission;
            result.grossRevenue = Number(feeObj.gross_revenue);
            result.percentGross = feeObj.percent_gross;
            result.requiredDocs.deferralStat = feeObj.required_docs.deferral_statement === YES;
            result.requiredDocs.revStat = feeObj.required_docs.remission_certified === YES;
            result.requiredDocs.salesHistory = feeObj.required_docs.sales_history === YES;
            result.requiredDocs.avgSalePrice = feeObj.required_docs.avg_sale_price === YES;
            result.requiredDocs.estMarketShare = feeObj.required_docs.est_market_share === YES;
            result.requiredDocs.comparison = feeObj.required_docs.comparison_products === YES;
            result.requiredDocs.marketPlan = feeObj.required_docs.market_plan === YES;
            result.requiredDocs.other = feeObj.required_docs.other === YES;
            result.requiredDocs.otherDetails = feeObj.required_docs.other_details;
            result.paymentMethod.creditCard = feeObj.payment_method.credit_card === YES;
            result.paymentMethod.cheque = feeObj.payment_method.cheque === YES;
            result.paymentMethod.moneyOrder = feeObj.payment_method.money_order === YES;
            result.paymentMethod.bankDraft = feeObj.payment_method.bank_draft === YES;
            result.paymentMethod.existingCredit = feeObj.payment_method.existing_credit === YES;
            result.paymentMethod.bankWire = feeObj.payment_method.bank_wire === YES;
            result.paymentMethod.billPayment = feeObj.payment_method.bill_payment === YES;

            return result;
            //}
        };


        // Return a reference to the object
        return TransactionService;
    }

    function _getSubmissionClassForOutput(subTypeRec, currentLang, ENGLISH, FRENCH) {
        var result = {};
        result._id = subTypeRec.id;
        result._label_en = subTypeRec.en;
        result._label_fr = subTypeRec.fr;
        if (currentLang === ENGLISH) {
            result.__text = subTypeRec.en;
        } else if (currentLang === FRENCH) {
            result.__text = subTypeRec.fr;
        }
        return result;
    }

    function _getSubDescription(subDescrRec, currentLang, ENGLISH, FRENCH) {
        var result = {};
        result._label_en = subDescrRec.description_en;
        result._label_fr = subDescrRec.description_fr;
        if (currentLang === ENGLISH) {
            result.__text = subDescrRec.description_en;
        } else if (currentLang === FRENCH) {
            result.__text = subDescrRec.description_fr;
        }
        return result;

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
        if (lifecycleObj.regulatory_activity_lead) {
            lifecycleRec.activityLead = lifecycleObj.regulatory_activity_lead._id;
        }

        lifecycleRec.activityType = "";
        if (lifecycleObj.regulatory_activity_type) {
            lifecycleRec.activityType = $filter('filter')(TransactionLists.getActivityTypes(), {id: lifecycleObj.regulatory_activity_type._id})[0];
            lifecycleRec.activityTypeDisplay = lifecycleRec.activityType.id;
        }
        if (lifecycleObj.sequence_description_value) {
            lifecycleRec.descriptionValue = lifecycleObj.sequence_description_value._id;
        }
        lifecycleRec.startDate = lifecycleObj.sequence_from_date;
        lifecycleRec.endDate = lifecycleObj.sequence_to_date;
        lifecycleRec.details = lifecycleObj.sequence_details;
        lifecycleRec.detailsChange = lifecycleObj.sequence_details_change;
        lifecycleRec.sequenceVersion = lifecycleObj.sequence_version;
        lifecycleRec.year = lifecycleObj.sequence_year;
        lifecycleRec.sequenceConcat = lifecycleObj.transaction_description;
        lifecycleRec.requesterName = lifecycleObj.requester_name ? (lifecycleObj.requester_name._id == ''? lifecycleObj.requester_name.__text : {"id": lifecycleObj.requester_name._id, "text": lifecycleObj.requester_name.__text}) : '';
        lifecycleRec.requesterName2 = lifecycleObj.requester_name2 ? (lifecycleObj.requester_name2._id == ''? lifecycleObj.requester_name2.__text : {"id": lifecycleObj.requester_name2._id, "text": lifecycleObj.requester_name2.__text}) : '';
        lifecycleRec.requesterName3 = lifecycleObj.requester_name3 ? (lifecycleObj.requester_name3._id == ''? lifecycleObj.requester_name3.__text : {"id": lifecycleObj.requester_name3._id, "text": lifecycleObj.requester_name3.__text}) : '';
        lifecycleRec.requesterNameTxt = lifecycleObj.requester_name ? lifecycleObj.requester_name.__text : '';
        lifecycleRec.requesterName2Txt = lifecycleObj.requester_name2 ? lifecycleObj.requester_name2.__text : '';
        lifecycleRec.requesterName3Txt = lifecycleObj.requester_name3 ? lifecycleObj.requester_name3.__text : '';
       // lifecycleRec.solicitedRequester = lifecycleObj.requester_of_solicited_information;
        lifecycleRec.isSaved = true;
        return (lifecycleRec);
    }


    function _mapLifecycleRecToOutput($translate, lifecycleObj, ENGLISH, FRENCH) {
        var lifecycleRec = {};
       /**
        lifecycleRec.sequence_number = lifecycleObj.sequence;
        lifecycleRec.date_filed = lifecycleObj.dateFiled; **/
        lifecycleRec.control_number = lifecycleObj.controlNumber;
        var currentLang = $translate.proposedLanguage() || $translate.use();
        lifecycleRec.regulatory_activity_lead = "";
        if (lifecycleObj.activityLead) {
            var ral_text = $translate.instant(lifecycleObj.activityLead, "", '', currentLang);
            lifecycleRec.regulatory_activity_lead = {
                _id: lifecycleObj.activityLead,
                __text: ral_text
            };
        }
        lifecycleRec.regulatory_activity_type = "";
        if (lifecycleObj.activityType) {
            lifecycleRec.regulatory_activity_type = {};
            _setActivityTypeValuesForOutput(lifecycleObj.activityType, lifecycleRec.regulatory_activity_type,
                currentLang, ENGLISH, FRENCH);
        }
        lifecycleRec.sequence_description_value = '';
        if (lifecycleObj.descriptionValue) {
            var sdv_text = $translate.instant(lifecycleObj.descriptionValue, "", '', currentLang);
            lifecycleRec.sequence_description_value = {
                _id: lifecycleObj.descriptionValue,
                __text: sdv_text
            };
        }
        lifecycleRec.sequence_from_date = angular.isDate(lifecycleObj.startDate)? lifecycleObj.startDate.toISOString().substr(0,10):lifecycleObj.startDate;
        lifecycleRec.sequence_to_date = angular.isDate(lifecycleObj.endDate)? lifecycleObj.endDate.toISOString().substr(0,10):lifecycleObj.endDate;
        lifecycleRec.sequence_details = lifecycleObj.details;
        lifecycleRec.sequence_details_change = lifecycleObj.detailsChange;
        lifecycleRec.sequence_version = lifecycleObj.sequenceVersion;
        lifecycleRec.sequence_year = lifecycleObj.year;
        lifecycleRec.transaction_description = lifecycleObj.sequenceConcat;
        var tempRequesterName = '';
        if (lifecycleObj.requesterName && lifecycleObj.requesterName.id) {
            tempRequesterName =  lifecycleObj.requesterName.id;
            lifecycleRec.requester_name = {
                _id: lifecycleObj.requesterName.id,
                __text: lifecycleObj.requesterName.text
            };
        }
        else {
            tempRequesterName =  lifecycleObj.requesterName;
            if(lifecycleObj.requesterName != ""){
                lifecycleRec.requester_name = {
                    _id: '',
                    __text: lifecycleObj.requesterName
                };
            } else {
                lifecycleRec.requester_name = {};
            }
        }
        if (lifecycleObj.requesterName2 && lifecycleObj.requesterName2.id) {
            tempRequesterName =  tempRequesterName + '\r\n' + lifecycleObj.requesterName2.id;
            lifecycleRec.requester_name2 = {
                _id: lifecycleObj.requesterName2.id,
                __text: lifecycleObj.requesterName2.text
            };
        }
        else {
            if(lifecycleObj.requesterName2 != ""){
                tempRequesterName =   tempRequesterName + '\r\n' + lifecycleObj.requesterName2;
                lifecycleRec.requester_name2 = {
                    _id: '',
                    __text: lifecycleObj.requesterName2
                };
            } else {
                lifecycleRec.requester_name2 = {};
            }
        }

        if (lifecycleObj.requesterName3 && lifecycleObj.requesterName3.id) {
            tempRequesterName =  tempRequesterName + '\r\n' + lifecycleObj.requesterName3.id;
            lifecycleRec.requester_name3 =  {
                _id: lifecycleObj.requesterName3.id,
                __text: lifecycleObj.requesterName3.text
            };
        }
        else {
            if(lifecycleObj.requesterName3 != "") {
                tempRequesterName = tempRequesterName + '\r\n' + lifecycleObj.requesterName3;
                lifecycleRec.requester_name3 = {
                    _id: '',
                    __text: lifecycleObj.requesterName3
                };
            } else {
                lifecycleRec.requester_name3 = {};
            }
        }
        lifecycleRec.requester_of_solicited_information = tempRequesterName;

        return (lifecycleRec);
    }
/*
    function _mapRequesterRecToOutput(requesterObj) {
        var requesterRec = {};
        if (requesterObj) {
            requesterRec = {
                solicited_requester_sequence: requesterObj.sequenceNumber,
                requester_of_solicited_information: requesterObj.solicitedRequester
            }
        }
        return (requesterRec);
    } */

    /**
     * Truncates the label for activity type based on feedback of Jul 18, 2017
     * Removes the full name
     * @param srcActivityTypeRec
     * @param destActivityTypeRec
     * @private
     */
    function _setActivityTypeValuesForOutput(srcActivityTypeRec, destActivityTypeRec, currentLang, ENGLISH, FRENCH) {
        // var stringIndex = srcActivityTypeRec.en.indexOf(" ("); //finc space and open bracket
        destActivityTypeRec._id = srcActivityTypeRec.id;
        destActivityTypeRec._label_en = srcActivityTypeRec.en;
        destActivityTypeRec._label_fr = srcActivityTypeRec.fr;
        /*
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
        */
        if (currentLang === ENGLISH) {
            destActivityTypeRec.__text = destActivityTypeRec._label_en;
        } else if (currentLang === FRENCH) {
            destActivityTypeRec.__text = destActivityTypeRec._label_fr;
        }
        destActivityTypeRec._id = srcActivityTypeRec.id;

    }

    /**
     * Format the value of Reason for Administrative Submission
     *
     * @param srcAdminSubTypeRec
     * @param destAdminSubTypeRec
     * @param currentLang
     * @param ENGLISH
     * @param FRENCH
     * @private
     */
    function _setAdminSubTypeForOutput(srcAdminSubTypeRec, destAdminSubTypeRec, currentLang, ENGLISH, FRENCH) {
        destAdminSubTypeRec._id = srcAdminSubTypeRec.id;
        destAdminSubTypeRec._label_en = srcAdminSubTypeRec.en;
        destAdminSubTypeRec._label_fr = srcAdminSubTypeRec.fr;
        if (currentLang === ENGLISH) {
            destAdminSubTypeRec.__text = destAdminSubTypeRec._label_en;
        } else if (currentLang === FRENCH) {
            destAdminSubTypeRec.__text = destAdminSubTypeRec._label_fr;
        }
        destAdminSubTypeRec._id = srcAdminSubTypeRec.id;

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
    function _mapRepContactToOutput($translate, repObj) {
        var repContact = {};
        repContact.rep_submission_contact_role = repObj.repRole;
        //deflatten the object
        repContact.rep_submission_contact = _mapContactToOutput($translate, repObj);
        return repContact;
    }

    function _transformContactFromFileObj(contactObj) {
        var contact = {};
        if (!contactObj) {
            console.error("There is no contact object");
            return contact;
        }
        contact.givenName = contactObj.given_name;
        contact.initials = contactObj.initials;
        contact.surname = contactObj.surname;
        contact.title = contactObj.job_title;
        contact.language = contactObj.language_correspondance._id;
        contact.phone = contactObj.phone_num;
        contact.phoneExt = contactObj.phone_ext;
        contact.fax = contactObj.fax_num;
        contact.email = contactObj.email;
        return contact;
    }

    function _mapContactToOutput($translate, contactObj) {

        var contact = {};
        var currentLang = $translate.proposedLanguage() || $translate.use();
        contact.given_name = contactObj.givenName;
        contact.initials = contactObj.initials;
        contact.surname = contactObj.surname;
        contact.job_title = contactObj.title;
        contact.language_correspondance = {
            _id: contactObj.language,
            __text: $translate.instant(contactObj.language, "", '', currentLang)
        };
        contact.phone_num = contactObj.phone;
        contact.phone_ext = contactObj.phoneExt;
        contact.fax_num = contactObj.fax;
        contact.email = contactObj.email;
        return contact;
    }

    function _mapAddressToOutput($translate, addressObj) {

        var address = {};
        address.street_address = addressObj.street;
        address.city = addressObj.city;
        var currentLang = $translate.proposedLanguage() || $translate.use();
        if (addressObj.stateList) {
            address.province_lov = {
                _id: addressObj.stateList,
                __text: $translate.instant(addressObj.stateList, "", '', currentLang)
            };
        } else {
            address.province_lov = "";
        }
        address.province_text = addressObj.stateText;
        address.country = "";
        if (addressObj.country) {
            address.country =
                {
                    _id: addressObj.country.id,
                    _label_en: addressObj.country.en,
                    _label_fr: addressObj.country.fr,
                    __text: $translate.instant(addressObj.country.id, "", '', currentLang)
                }
        }
        address.postal_code = addressObj.postalCode;
        return (address);
    }

    function _transformAddressFromFileObj($translate, $filter, getCountryAndProvinces, addressObj) {
        var address = {};
        address.street = addressObj.street_address;
        address.city = addressObj.city;
        if (addressObj.province_lov) {
            address.stateList = addressObj.province_lov._id;
        } else {
            address.stateList = "";
        }
        address.stateText = addressObj.province_text;
        address.country = "";
        var currentLang = $translate.proposedLanguage() || $translate.use();
        if (addressObj.country._id) {
            address.country = $filter('filter')(getCountryAndProvinces.getCountries(), {id: addressObj.country._id})[0];
            address.countryHtml = $translate.instant(address.country.id, "", '', currentLang);
            address.countryDisplay = address.country.id;
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
            "detailsChange":"",
            "sequenceVersion": "",
            "sequenceConcat": "",
            "year":"",
            "requesterName":"",
            "requesterName2":"",
            "requesterName3":"",
            "requesterNameTxt":"",
            "requesterName2Txt":"",
            "requesterName3Txt":"",
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

       // contact.salutation = "";
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
            return n < 10 ? '0' + n : n;
        }
    }

    //todo deprecated
    function _createRepContact() {

        var contact = _createContactModel();
        contact.repRole = "";
        return contact;
    }

    function _getEmptyTransactionModel() {
        var defaultTransactionData = {
            dataChecksum: "",
            dateSaved: "",
            softwareVersion: "3.0.1",
           // transactionType: "",
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
          //  isSolicited: "",
          //  solicitedRequesterReord: [],
            projectManager1: "",
            projectManager2: "",
            isFees: "",
            resetBtnClicked : false,
            feeDetails: null,
            isActivityChanges: "Y", //deprecated
            companyName: "",
            activityAddress: _createAddressModel(),
            confirmContactValid: false,
            activityContact: _createContactModel()
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
            deferralRequest: '', //defer payment for two years
            feeRemission: "", //applying for fee remission
            grossRevenue: 0,
            percentGross: "",
            requiredDocs: {
                deferralStat: false, //statement supporting the deferral request
                revStat: false,
                salesHistory: false, //sales history
                avgSalePrice: false, //average sales price and demand
                estMarketShare: false, //estimated market share
                comparison: false, ///compariosn to similar products
                marketPlan: false, //marketing palne for the drug product
                other: false,   //other
                otherDetails: ""
            },
            paymentMethod: {
                creditCard: false,
                cheque: false,
                moneyOrder: false,
                bankDraft: false,
                existingCredit: false,
                bankWire: false,
                billPayment: false
            }
        };
        return feeObj;
    }

    function _createEmptyFeeDetailsForOutput(NO) {
        var feeObj = {
            submission_class: null,
            submission_description: null,
            fee: "",
            deferral_request: NO, //defer payment for two years
            fee_remission: "", //applying for fee remission
            gross_revenue: 0,
            percent_gross: "",
            required_docs: {
                deferral_statement: NO, //statement supporting the deferral request
                remission_certified: NO,
                sales_history: NO, //sales history
                avg_sale_price: NO, //average sales price and demand
                est_market_share: NO, //estimated market share
                comparison_products: NO, ///compariosn to similar products
                market_plan: NO, //marketing palne for the drug product
                other: NO,   //other
                other_details: ""
            },
            payment_method: {
                credit_card: NO,
                cheque: NO,
                money_order: NO,
                bank_draft: NO,
                existing_credit: NO,
                bank_wire: NO,
                bill_payment: NO
            }
        };
        return feeObj;
    }

})();
