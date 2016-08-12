/**
 * Created by dkilty on 12/08/2016.
 * @ngdoc module -gets the list of transaction activity tpyes
 */


(function () {
    'use strict';

    angular
        .module('dataLists')
        .factory('getTransactionSequences', getTransactionSeq);

    /* @ngInject */
    function getTransactionSeq() {
        var service = {
            getTransactionDescriptions: getTransactionDescriptionsArray,
            getActivityTypes: getActivityArray
        };
        return service;

        ////////////////

        //TODO make lists be activity.. yikes!

        function getTransactionDescriptionsArray() {
            return (
                [
                    "ADMINISTRATIVE",
                    "BENEFIT_RISK_ASSESS",
                    "CANCEL_LETTER",
                    "CHANGE_TO_DIN",
                    "COMMENTS_NOC",
                    "COMMENTS_SUMMARY_BASIS",
                    "DIN_DISCONTINUED",
                    "DRUG_NOTIF_FORM",
                    "FOR_PERIOD",
                    "INITIAL",
                    "MEETING_MINUTES",
                    "NOTIFICATION_CHANGE",
                    "PANDEMIC_APPL",
                    "POST_CLEARANCE_DATA",
                    "POST_MARKET_SURV",
                    "POST_NOC_CHANGE",
                    "POST_AUTH_DIV1_CHANGE",
                    "PRESUB_MEETING_PKG",
                    "PRIORITY_REVIEW_RQ",
                    "PRISTINE_PM",
                    "PRISTINE_PM_2LANG",
                    "ADVISEMENT_LETTER_RESPONSE",
                    "CLIN_CLARIF_RESPONSE",
                    "EMAIL_RQ_RESPONSE",
                    "LABEL_CLARIF_RESPONSE",
                    "MHPG_RQ_RESPONSE",
                    "NOC_RESPONSE",
                    "NOD_RESPONSE",
                    "NON_RESPONSE",
                    "PROCESSING_CLARIF_RESPONSE",
                    "QUAL_CLIN_CLARIF_RESPONSE",
                    "QUAL_CLARIF_RESPONSE",
                    "SCREENING_ACCEPT_RESPONSE",
                    "SCREENING_CLARIF_RESPONSE",
                    "SDN_RESPONSE",
                    "PHONE_RQ_RESPONSE",
                    "RISK_COMMUN_DOC",
                    "RMP_VERSION_DATE",
                    "SIGNAL_WORK_UP",
                    "UNSOLICITED_DATA",
                    "YEAR_LIST_OF_CHANGE"
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
            ])

        }

    }
})();
