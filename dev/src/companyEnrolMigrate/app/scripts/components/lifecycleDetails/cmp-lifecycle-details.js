/**
 * Created by dkilty on 8/13/2016.
 */


(function () {
    'use strict';

    angular
        .module('lifecycleDetails', ['services'])
})();

(function () {
    'use strict';

    angular
        .module('lifecycleDetails')
        .component('cmpLifecycleDetalis', {
            templateUrl: 'app/scripts/components/lifecycleDetails/tpl-lifecycle-details.html',
            controller: lifecycleRecCtrl,
            controllerAs: 'lifecycleCtrl',

            bindings: {
                lifecycleRecord: '<',
                onUpdate: '&',
                showErrors: '&',
            }
        });
    lifecycleRecCtrl.$inject = ['TransactionLists']
    function lifecycleRecCtrl(TransactionLists) {
        var vm = this;
        vm.savePressed = false;
        vm.activityList = TransactionLists.getActivityTypes();
        vm.sequenceList = [];
        vm.descriptionList = [];

        vm.lifecycleModel = {
            sequence: '0001',
            dateFiled: '',
            controlNumber: '',
            activityType: '',
            descriptionValue: '',
            startDate: '',
            endDate: '',
            details: '',
            sequenceVersion: '',
            sequenceConcat: ''
            }

        vm.setSequenceList = function (value) {

            value = vm.lifecycleModel.activityType;
            /*
             "",
             "",
             "",
             "",
             "",
             "",
             "",
             "",
             "",
             "",
             "",
             "",
             "",
             "",
             "",
             "",
             "",
             "",
             " ",
             "",
             ""
             ]);
             */

            switch (value) {
                case ("PRESUB_MEETING"):
                    vm.descriptionList = TransactionLists.getPresubTypes();
                    break;
                case ("ANDS"):
                    vm.descriptionList = TransactionLists.getAndsType();
                    break;
                case ("DINA"):
                    vm.descriptionList = TransactionLists.getDinaType();
                    break;
                case ("DINB"):
                    vm.descriptionList = TransactionLists.getDinbType();
                    break;
                case ("EUNDS"):
                    vm.descriptionList = TransactionLists.getEundsType()
                    break;

                case ("EUSNDS"):
                    vm.descriptionList = TransactionLists.getEusndsType();
                    break;

                case ("LEVEL_3"):
                    vm.descriptionList = TransactionLists.getLevel3Type();
                    break;

                case ("NC_ACT"):
                    vm.descriptionList = TransactionLists.getNcType();
                    break;
                case ("NDS"):
                    vm.descriptionList = TransactionLists.getNdsType();
                    break;
                case ("PDC"):
                    vm.descriptionList = TransactionLists.getPdcType();
                    break;
                case ("PDC_B"):
                    vm.descriptionList = TransactionLists.getPdcBType();
                    break;
                case ("PSUR_C"):
                    vm.descriptionList = TransactionLists.getpSurCType();
                    break;
                case ("PSUR_PV"):
                    vm.descriptionList = TransactionLists.getpSurPvType();
                    break;
                case ("RMP_PV"):
                    vm.descriptionList = TransactionLists.getRmpPvType();
                    break;
                case ("SANDS"):
                    vm.descriptionList = TransactionLists.getSandsType();
                    break;
                case ("SNDS"):
                    vm.descriptionList = TransactionLists.getSndsType();
                    break;
                case ("SNDS_C"):
                    vm.descriptionList = TransactionLists.getSndsCArray();
                    break;
                /* case ("UD_PV"):
                 vm.descriptionList= TransactionLists.getud
                 break;*/
                /* case ("UDRA"):
                 vm.descriptionList= TransactionLists.getud
                 /*       break;*!/
                 case ("CONSULTATION"):
                 vm.descriptionList= TransactionLists.getconsult
                 break;*/

                case ("YBPR"):
                    vm.descriptionList = TransactionLists.getYBprType();
                    break;

            }

        };
        vm.setDetailsState = function () {
            var value = vm.lifecycleModel.descriptionValue
            if (!value) {
                vm.descriptionList = [];
                return;
            }
            switch (value) {

                case(value === 'ADMINISTRATIVE'):         /*FALLTHROUGH*/
                case(value === 'BENEFIT_RISK_ASSESS'):    /*FALLTHROUGH*/
                case(value === 'CANCEL_LETTER'):          /*FALLTHROUGH*/
                case(value === 'CHANGE_TO_DIN'):          /*FALLTHROUGH*/
                case(value === 'DIN_DISCONTINUED'):       /*FALLTHROUGH*/
                case(value === 'DRUG_NOTIF_FORM'):        /*FALLTHROUGH*/
                case(value === 'INITIAL'):                /*FALLTHROUGH*/
                case(value === 'NOTIFICATION_CHANGE'):    /*FALLTHROUGH*/
                case(value === 'PANDEMIC_APPL'):          /*FALLTHROUGH*/
                case(value === 'POST_CLEARANCE_DATA'):    /*FALLTHROUGH*/
                case(value === 'POST_MARKET_SURV'):       /*FALLTHROUGH*/
                case(value === 'POST_NOC_CHANGE'):        /*FALLTHROUGH*/
                case(value === 'POST_AUTH_DIV1_CHANGE'):  /*FALLTHROUGH*/
                case(value === 'PRESUB_MEETING_PKG'):     /*FALLTHROUGH*/
                case(value === 'PRIORITY_REVIEW_RQ'):     /*FALLTHROUGH*/
                case(value === 'PRISTINE_PM'):            /*FALLTHROUGH*/
                case(value === 'PRISTINE_PM_2LANG'):      /*FALLTHROUGH*/
                case(value === 'RISK_COMMUN_DOC'):        /*FALLTHROUGH*/
                case(value === 'SIGNAL_WORK_UP'):         /*FALLTHROUGH*/

                    //nothing visible
                    break;

                case(value === 'COMMENTS_NOC'):             /*FALLTHROUGH*/
                case(value === 'COMMENTS_SUMMARY_BASIS'):   /*FALLTHROUGH*/
                case(value === 'MEETING_MINUTES'):            /*FALLTHROUGH*/
                case(value === 'ADVISEMENT_LETTER_RESPONSE'):   /*FALLTHROUGH*/
                case(value === 'CLIN_CLARIF_RESPONSE'):         /*FALLTHROUGH*/
                case(value === 'EMAIL_RQ_RESPONSE'):            /*FALLTHROUGH*/
                case(value === 'LABEL_CLARIF_RESPONSE'):        /*FALLTHROUGH*/
                case(value === 'MHPG_RQ_RESPONSE'):             /*FALLTHROUGH*/
                case(value === 'NOC_RESPONSE'):                  /*FALLTHROUGH*/
                case(value === 'NOD_RESPONSE'):                  /*FALLTHROUGH*/
                case(value === 'NON_RESPONSE'):                 /*FALLTHROUGH*/
                case(value === 'PROCESSING_CLARIF_RESPONSE'):   /*FALLTHROUGH*/
                case(value === 'QUAL_CLIN_CLARIF_RESPONSE'):   /*FALLTHROUGH*/
                case(value === 'QUAL_CLARIF_RESPONSE'):         /*FALLTHROUGH*/
                case(value === 'SDN_RESPONSE'):                 /*FALLTHROUGH*/
                case(value === 'PHONE_RQ_RESPONSE'):         /*FALLTHROUGH*/
                case(value === 'BE_CLARIF_RESPONSE'):        /*FALLTHROUGH*/

                    //date start

                    break;
                case(value === 'RMP_VERSION_DATE'):
                    //version and date
                    break;

                case(value === 'FOR_PERIOD'):
                    //start and end date
                    break;

                case(value === 'UNSOLICITED_DATA'):
                case(value === 'YEAR_LIST_OF_CHANGE'):
                    //text
                    break;

                /*"ADMINISTRATIVE", //administrative
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
                 "BE_CLARIF_RESPONSE" //Response to BE clarification request dated..*/

                }


        }


        vm.$onInit = function () {

        };


        /**
         *
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.lifecycleRecord) {
                vm.lifecycleModel = changes.lifecycleRecord.currentValue;
            }
        };

        /**
         *  calls the delete function on the parent
         */
        vm.delete = function () {
            // vm.onDelete({contactId: vm.addressModel.contactId});
        };
        /* @ngdoc method -discards the changes and reverts to the model
         *
         */
        vm.discardChanges = function () {
            /* if (vm.addressRecForm.$pristine) return;
             var currRecord = vm.trackRecordCtrl.trackRecord();
             vm.addressModel = angular.copy(currRecord);
             vm.isDetailValid({state: vm.addressRecForm.$valid});
             vm.savePressed = false;*/
        };

        vm.onAddressRoleUpdate = function (newRole) {
            /* var aRole = {};
             angular.extend(aRole, newRole);
             vm.addressModel.addressRole = aRole;
             vm.updateAddressModel2();*/
        };
        /**
         * @ngdoc method -Updates the parent on whether this record is valid or not
         */
        vm.updateValid = function () {
            //vm.isDetailValid({state: (vm.addressRecForm.$valid && !vm.addressRecForm.$dirty)});
        };


        /**
         * Updates the contact model used by the save button
         */
        /* vm.updateAddressModel2 = function () {
         if (vm.addressRecForm.$valid) {
         if (vm.addressRecForm.$valid) {
         vm.isDetailValid({state: true});
         vm.addressRecForm.$setPristine();
         vm.onUpdate({rec: vm.addressModel});
         }
         vm.savePressed = true;
         }
         /!**
             * @ngdoc method toggles error state to make errors visible
             * @returns {boolean}
             *!/
         vm.showErrors = function () {

         return (vm.savePressed)
         };
         /!**
             * @ngdoc method used to determine if record should be editable. Used for amend
             * @returns {boolean}
             *!/
         vm.setNotEditable = function () {

         if (vm.isAmend() && !vm.addressModel.amendRecord) {
         return true;
         }
         return false;
         }

         }*/
    }

})();