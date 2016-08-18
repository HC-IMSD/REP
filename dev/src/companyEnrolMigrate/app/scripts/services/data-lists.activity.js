/**
 * Created by dkilty on 12/08/2016.
 * @ngdoc module -gets the list of transaction activity tpyes
 */


(function () {
    'use strict';

    angular
        .module('dataLists')
        .factory('TransactionLists', getTransactionSeq);

    /* @ngInject */
    function getTransactionSeq() {
        var service = {
            getTransactionDescriptions: getTransactionDescriptionsArray,
            getActivityTypes: getActivityArray
        };
        return service;

        ////////////////

        //TODO make lists be activity.. yikes!

        //returns a list of all the unique description values
        function getTransactionDescriptionsArray() {
            return (
                [
                    "ADMINISTRATIVE", //administrative
                    "BENEFIT_RISK_ASSESS", //benefit risk assessment
                    "CANCEL_LETTER", //cancellation letter
                    "CHANGE_TO_DIN", //changes to din
                    "COMMENTS_NOC", // comments on notice of decision
                    "COMMENTS_SUMMARY_BASIS", //commments on summary basis
                    "DIN_DISCONTINUED", // din discontinued
                    "DRUG_NOTIF_FORM", // drug notification form
                    "FOR_PERIOD", //for period of ....
                    "INITIAL", //Initial
                    "MEETING_MINUTES", //minutes of meeting dated
                    "NOTIFICATION_CHANGE", //notificaiton of change in benefit profile
                    "PANDEMIC_APPL", //pandemic applicaiton
                    "POST_CLEARANCE_DATA", //post clearance data
                    "POST_MARKET_SURV", // post marketing surveillance
                    "POST_NOC_CHANGE", //Post NOC change
                    "POST_AUTH_DIV1_CHANGE", // Post autorization Division 1 change
                    "PRESUB_MEETING_PKG", // presubmission meeting package
                    "PRIORITY_REVIEW_RQ", // Priority rewiew request
                    "PRISTINE_PM", // Pristine PM
                    "PRISTINE_PM_2LANG", // pristine PM second language
                    "ADVISEMENT_LETTER_RESPONSE", //REspose to Advisement Letter dated
                    "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                    "EMAIL_RQ_RESPONSE",// response to email request
                    "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                    "MHPG_RQ_RESPONSE", //Response to MHPD requests
                    "NOC_RESPONSE", //response to NOC/ c-Qn
                    "NOD_RESPONSE", //Response to NOD
                    "NOL_RESPONSE", //Response to NOL dated
                    "NON_RESPONSE", //Response to NON
                    "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                    "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                    "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                    "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                    "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                    "SDN_RESPONSE", //response to SDN
                    "PHONE_RQ_RESPONSE", //Response to telephone Request
                    "RISK_COMMUN_DOC", //Risk communication document
                    "RMP_VERSION_DATE", //RMP verison
                    "SIGNAL_WORK_UP", //Signal Work up
                    "UNSOLICITED_DATA", //Unsolicited Data
                    "YEAR_LIST_OF_CHANGE", //Year, list of change number,
                    "BE_CLARIF_RESPONSE" //Response to BE clarification request dated..
                ]);
        }

        function getActivityArray() {
            return ([
                "PRESUB_MEETING",
                "ANDS",
                "DINA",
                "DINB",
                "EUNDS",
                "EUSNDS",
                "LEVEL_3",
                "NC",
                "NDS",
                "PDC",
                "PDC_B",
                "PSUR_C",
                "PSUR_PV",
                "RMP_PV",
                "SANDS",
                "SNDS",
                "SNDS_C",
                "UD_PV",
                "UDRA",
                "CONSULTATION",
                "YBPR"
            ]);
        }

        function getPresubArray() {
            return ([
                "CANCEL_LETTER",
                "MEETING_MINUTES",
                "EMAIL_RQ_RESPONSE",
                "PROCESSING_CLARIF_RESPONSE",
                "PHONE_RQ_RESPONSE"
            ]);
        }

        function getANDSArray() {
            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "DRUG_NOTIF_FORM", // drug notification form
                "INITIAL", //Initial
                "POST_CLEARANCE_DATA", //post clearance data
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "BE_CLARIF_RESPONSE",
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing  Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ]);
        }

        function getDINAArray() {

            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "DRUG_NOTIF_FORM", // drug notification form
                "INITIAL", //Initial
                "POST_CLEARANCE_DATA", //post clearance data
                "PRESUB_MEETING_PKG", // presubmission meeting package
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);


        }

        //note DINB is the same as DINA
        function getDINBArray() {
            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "DRUG_NOTIF_FORM", // drug notification form
                "INITIAL", //Initial
                "POST_CLEARANCE_DATA", //post clearance data
                "PRESUB_MEETING_PKG", // presubmission meeting package
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);

        }

        function getEUNDSArray() {
            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "COMMENTS_SUMMARY_BASIS", //commments on summary basis
                "DRUG_NOTIF_FORM", // drug notification form
                "INITIAL", //Initial
                "POST_CLEARANCE_DATA", //post clearance data
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);

        }

        function getEUSNDSArray() {

            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "COMMENTS_SUMMARY_BASIS", //commments on summary basis
                "DRUG_NOTIF_FORM", // drug notification form
                "POST_CLEARANCE_DATA", //post clearance data
                "POST_NOC_CHANGE", //Post NOC change
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);

        }

        function getLevel3Array() {

            return ([
                "CANCEL_LETTER", //cancellation letter
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "YEAR_LIST_OF_CHANGE", //Year, list of change number,
            ]);
        }

        function getNCArray() {
            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "COMMENTS_SUMMARY_BASIS", //commments on summary basis
                "DRUG_NOTIF_FORM", // drug notification form
                "POST_CLEARANCE_DATA", //post clearance data
                "POST_NOC_CHANGE", //Post NOC change
                "PRESUB_MEETING_PKG", // presubmission meeting package
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOL_RESPONSE", //Response to NOL dated
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);
        }

        function getNDSArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "COMMENTS_NOC", // comments on notice of decision
                "COMMENTS_SUMMARY_BASIS", //commments on summary basis
                "DRUG_NOTIF_FORM", // drug notification form
                "INITIAL", //Initial
                "POST_CLEARANCE_DATA", //post clearance data
                "PRESUB_MEETING_PKG", // presubmission meeting package
                "PRIORITY_REVIEW_RQ", // Priority rewiew request
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "BE_CLARIF_RESPONSE", //Response to BE clarification request dated..
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ])
        }

        function getPDCArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "POST_AUTH_DIV1_CHANGE", // Post autorization Division 1 change
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ])
        }

        //PDC and PDCB have the same content currently
        function getPDCBArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "POST_AUTH_DIV1_CHANGE", // Post autorization Division 1 change
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ])
        }

        function getPSURCArray() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "FOR_PERIOD", //for period of ....
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ]);
        }

        function getPSURPV() {

            return ([
                "CANCEL_LETTER", //cancellation letter
                "FOR_PERIOD", //for period of ....
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE" //Response to telephone Request
            ]);
        }

        function getRMPPV() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "RMP_VERSION_DATE" //RMP verison
            ]);
        }

        function getSANDS() {
            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "DRUG_NOTIF_FORM", // drug notification form
                "POST_CLEARANCE_DATA", //post clearance data
                "POST_NOC_CHANGE", //Post NOC change
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "BE_CLARIF_RESPONSE", //Response to BE clarification request dated..
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);
        }

        function getSNDS() {
            return ([
                "ADMINISTRATIVE", //administrative
                "CANCEL_LETTER", //cancellation letter
                "COMMENTS_SUMMARY_BASIS", //commments on summary basis
                "DRUG_NOTIF_FORM", // drug notification form
                "POST_CLEARANCE_DATA", //post clearance data
                "POST_NOC_CHANGE", //Post NOC change
                "PRESUB_MEETING_PKG", // presubmission meeting package
                "PRIORITY_REVIEW_RQ", // Priority rewiew request
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "BE_CLARIF_RESPONSE", //Response to BE clarification request dated..
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "QUAL_CLIN_CLARIF_RESPONSE", //Response to quality and Clinical clarification REquest
                "QUAL_CLARIF_RESPONSE", //Response to Quality Clarification request
                "SCREENING_ACCEPT_RESPONSE", //response to screening acceptance letter
                "SCREENING_CLARIF_RESPONSE", // response to screening clarification request
                "SDN_RESPONSE", //response to SDN
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ]);
        }

        function getSNDSC() {
            return ([

                "CANCEL_LETTER", //cancellation letter
                "POST_NOC_CHANGE", //Post NOC change
                "PRISTINE_PM", // Pristine PM
                "PRISTINE_PM_2LANG", // pristine PM second language
                "CLIN_CLARIF_RESPONSE", //Response to clinical clarifiaction request
                "EMAIL_RQ_RESPONSE",// response to email request
                "LABEL_CLARIF_RESPONSE", //Response to labelling clarification request
                "NOC_RESPONSE", //response to NOC/ c-Qn
                "NOD_RESPONSE", //Response to NOD
                "NON_RESPONSE", //Response to NON
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "RISK_COMMUN_DOC", //Risk communication document
                "SIGNAL_WORK_UP", //Signal Work up
            ]);

        }

        function getUPPV() {

            return ([
                "CANCEL_LETTER", //cancellation letter
                "DIN_DISCONTINUED", // din discontinued
                "ADVISEMENT_LETTER_RESPONSE", //REspose to Advisement Letter dated
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
                "UNSOLICITED_DATA" //Unsolicited Data
            ])

        }

        function getConsult() {

            return ([
                "PANDEMIC_APPL" //pandemic applicaiton,
            ])

        }

        function getYBPR() {
            return ([
                "CANCEL_LETTER", //cancellation letter
                "FOR_PERIOD", //for period of ....
                "EMAIL_RQ_RESPONSE",// response to email request
                "PROCESSING_CLARIF_RESPONSE", //Response to processing Clarification Request
                "PHONE_RQ_RESPONSE", //Response to telephone Request
            ]);
        }


    }
})();
