/**
 * Created by dkilty on 8/13/2016.
 */


(function () {
    'use strict';

    angular
        .module('lcDetailsModule', [
            'ui.bootstrap',
            'activityFormFilterModule',
            'errorSummaryModule',
            'errorMessageModule'
        ]);
})();

(function () {
    'use strict';

    angular
        .module('lcDetailsModule')
        .component('cmpLifecycleDetails', {
            templateUrl: 'app/scripts/components/lifecycleDetails/tpl-lifecycle-details.html',
            controller: lifecycleRecCtrl,
            controllerAs: 'lifecycleCtrl',

            bindings: {
                lifecycleRecord: '<',
                onUpdate: '&',
                isDetailValid: '&',
                onDelete: '&',
                enableDeleteIndex: '&',
                isEctd: '<',
                activityTypes:'<', //list of activity types
                sequenceUpdated:'<',
                errorSummaryUpdate:'<', //update the component error summary
               showErrorSummary:'<', //show the component error summary
                updateErrorSummary:'&' //update the parent error summary
            }
        });
    lifecycleRecCtrl.$inject = ['ActivityFormFilterService', 'TransactionLists', '$filter', '$translate','$scope'];

    function lifecycleRecCtrl(ActivityFormFilterService, TransactionLists, $filter, $translate, $scope) {
        var vm = this;
       //s vm.savePressed = false;

        vm.activityList=[];
        vm.activityTypeList=[];
        vm.pharmaList =[];
        vm.biolList = [];
        vm.postMarketList = [];
        vm.consumHealthList = [];
        vm.sequenceList = [];
        vm.descriptionList = [];

        vm.lifecycleModel = {};
        vm.endDateVisible = false;
        vm.yearVisible = false;
        vm.startDateVisible = false;
        vm.descriptionVisible = false;
        vm.versionVisible = false;
        vm.ectd = false;
        vm.popOpened = false;
        vm.alerts = [false, false];
        vm.dateOptions = {
            showWeeks: false
        };
        vm.lang = $translate.proposedLanguage() || $translate.use();
        vm.yearList = _createYearList();
        vm.descriptionObj=TransactionLists.getTransactionDescriptions();
        vm.leadList = TransactionLists.getActivityLeadList();

        vm.updateSummary=0; //message to update the summary component
        vm.showSummary=false; //show the errror summary object
        vm.focusSummary=0; //messaging to focus on the active ingredient summary

        vm.dateFormatError=[
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "date", displayAlias: "MSG_ERR_DATE_FORMAT"}
        ];
        vm.minLength6Error=[
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_6NUM"}
        ];
        vm.requiredOnly=[
            {type: "required", displayAlias: "MSG_ERR_MAND"}
        ];

        //
        vm.$onInit = function () {
            _setIdNames();
            //lazy load of year lust
            if (!vm.yearList || vm.yearList.length === 0) {
                vm.yearList = _createYearList();
            }
            vm.selectActivityList();
            //vm.descriptionObj=TransactionLists.getTransactionDescriptions();
        };

        /**
         *
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if(changes.activityTypes){
                vm.activityList=changes.activityTypes.currentValue;
                if(vm.activityList) {
                    vm.pharmaList = ActivityFormFilterService.getPharmaRAList(vm.activityList);
                    vm.biolList = ActivityFormFilterService.getBiolRAList(vm.activityList);
                    vm.postMarketList = ActivityFormFilterService.getPostMarketRAList(vm.activityList);
                    vm.consumHealthList = ActivityFormFilterService.getConsumHealthList(vm.activityList);
                }
            }
            if (changes.lifecycleRecord) {
                _updateLocalModel(changes.lifecycleRecord.currentValue);
            }
            if (changes.isEctd) {
                vm.ectd = changes.isEctd.currentValue;
            }
            if(changes.sequenceUpdated){
                if(!changes.lifecycleRecord && vm.lifecycleRecord) {
                    vm.lifecycleModel.sequence=vm.lifecycleRecord.sequence;
                    //_updateLocalModel(vm.lifecycleRecord);
                }
            }
            if(changes.showErrorSummary){

                vm.showSummary=changes.showErrorSummary.currentValue;
                vm.updateErrorSummaryState();
            }
            if(changes.errorSummaryUpdate){
                vm.updateErrorSummaryState();
            }
        };

        /**
         * If the form is dirty always set that it is not valid
         */
        $scope.$watch('lifecycleCtrl.lifecycleDetailsForm.$dirty', function() {
            if(vm.lifecycleDetailsForm.$dirty) {
                vm.isDetailValid({state:false})
            }
        }, true);

        $scope.$watch('lifecycleCtrl.lifecycleDetailsForm.$error', function () {
            vm.updateErrorSummaryState();
            vm.updateErrorSummary();
        }, true);

        /**
         * Used as messaging to get the error summary to update itself
         */
        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;

        };

        //sets the start date calendar state
        vm.openStartDate = function () {
            vm.startDateOpen = true;
        };
        vm.openEndDate = function () {
            vm.endDateOpen = true;
        };
        vm.openFiledDate = function () {
            vm.filedDateOpen = true;
        };

        function _updateLocalModel(record) {
            vm.lifecycleModel = angular.copy(record);
            convertToDate();
            vm.setSequenceList();
            vm.setDetailsState();
            vm.selectActivityList();
        }

        vm.disableDeleteState = function () {
            //this is noEctd case
            if (!vm.ectd) {
                return true;
            }
            var value = parseInt(vm.lifecycleModel.sequence);
            if (value == vm.enableDeleteIndex()) {
                return false;
            }
            return true;
        };

        //TODO move this logic to a service.

        /**
         * Selects the appropriate activity list based on the activity lead selection
         * The activity lead  question calls this function
         */
        vm.selectActivityList = function(){
            if(!vm.lifecycleModel.activityLead){
                vm.activityTypeList=[];
                return;
            }
            switch(vm.lifecycleModel.activityLead){
                case  TransactionLists.getBiologicalLeadValue():
                    vm.activityTypeList= vm.biolList;
                    break;
                case  TransactionLists.getPharmaLeadValue():
                    vm.activityTypeList= vm.pharmaList;
                    break;
                case  TransactionLists.getPostMarketLeadValue():
                    vm.activityTypeList= vm.postMarketList;
                    break;
                case  TransactionLists.getConsumHealthLeadValue():
                    vm.activityTypeList= vm.consumHealthList;
                    break;
                default:
                    if(vm.lifecycleModel.activityLead) console.warn("Not a valid lead choice");
                    vm.activityTypeList=[];
                    break;

            }
            //if the value exists in the list set it to the value
            if(vm.lifecycleModel.activityType) {
                var temp = $filter('filter')(vm.activityTypeList, {id: vm.lifecycleModel.activityType.id})[0];
                vm.lifecycleModel.activityType = temp;
                //vm.updateActivityType(); no need???
            }
            vm.updateErrorSummaryState(); // if error summary is visible update it
        };

        /**
         * @ngdoc Method -sets the lifecycle Sequence DescriptionValie
         * @param value
         */
        vm.setSequenceList = function () {

            var value = vm.lifecycleModel.activityType.id;
            var temp = vm.lifecycleModel.descriptionValue;
            vm.lifecycleModel.activityTypeDisplay=vm.lifecycleModel.activityType.id;
            vm.lifecycleModel.descriptionValue = "";
            switch (value) {
                //commented out values not in list as of Jan 23,2017
               /* case ("PRESUB_MEETING"):
                    vm.descriptionList = TransactionLists.getPresubTypes();
                    break;*/
                case ("B02-20160301-001"): //ANDS
                    vm.descriptionList = TransactionLists.getAndsType();
                    break;
                case ("B02-20160301-018"):
                    vm.descriptionList = TransactionLists.getDinaType();
                    break;
              case ("B02-20160301-019"):
                    vm.descriptionList = TransactionLists.getDinbType();
                    break;
                case ("B02-20160301-031"): //EU NDS (Extraordinary Use New Drug Submission)
                    vm.descriptionList = TransactionLists.getEundsType();
                    break;

                case ("B02-20160301-032"): //EUSNDS (Extraordinary Use Supplement to a New Drug Submission)
                    vm.descriptionList = TransactionLists.getEusndsType();
                    break;
                case ("B02-20160301-038"): //Level 3 - Notice of Change (Post-Notice of Compliance Changes - Level III)
                    vm.descriptionList = TransactionLists.getLevel3Type();
                    break;

                case ("B02-20160301-046"): //	MPNC (Pre-NC Meeting)
                    vm.descriptionList = TransactionLists.getMPNCType();
                    break;

                case ("B02-20160301-047"): //	MPNDS (Pre-NDS Meeting)
                    vm.descriptionList = TransactionLists.getMPNDSType();
                    break;
                case ("B02-20160301-049"): //	MPSNDS (Pre-SNDS Meeting)
                    vm.descriptionList = TransactionLists.getMPSNDSType();
                    break;

                case ("B02-20160301-050"): //NC (Notifiable Change)
                    vm.descriptionList = TransactionLists.getNcType();
                    break;
                case ("B02-20160301-051"): //NDS (New Drug Submission)
                    vm.descriptionList = TransactionLists.getNdsType();
                    break;
               case ("B02-20160301-070"):
                    vm.descriptionList = TransactionLists.getPdcType();
                    break;
             case ("B02-20160301-071"):
                    vm.descriptionList = TransactionLists.getPdcBType();
                    break;
                case ("B02-20160301-067"): //PAND (Pandemic Application)
                    vm.descriptionList = TransactionLists.getPANDType();
                    break;
                case ("B02-20160301-068"): //PBRER-C
                    vm.descriptionList = TransactionLists.getPBRERCType();
                    break;
                case ("B02-20160301-069"): //PBRER-PV
                    vm.descriptionList = TransactionLists.getPBRERPVType();
                    break;

                case ("B02-20160301-075"): //PRNDS (Priority Request NDS)
                    vm.descriptionList = TransactionLists.getPRNDSType();
                    break;

                case ("B02-20160301-077"): //PRSNDS (Priority Request SNDS)
                    vm.descriptionList = TransactionLists.getPRSNDSType();
                    break;

                case ("B02-20160301-078"): //PSUR-C (Periodic Safety Update Report - Conditional)
                    vm.descriptionList = TransactionLists.getpSurCType();
                    break;
                case ("B02-20160301-079"): //PSUR-PV (Periodic Safety Update Report - Pharmacovigilance)
                    vm.descriptionList = TransactionLists.getpSurPvType();
                    break;
                case ("B02-20160301-080"): //RMP-PV (Risk Management Plan - Pharmacovigilance)
                    vm.descriptionList = TransactionLists.getRmpPvType();
                    break;
                case ("B02-20160301-082"): //SANDS (Supplement to an Abbreviated New Drug Submission)
                    vm.descriptionList = TransactionLists.getSandsType();
                    break;
                case ("B02-20160301-084"): //SNDS (Supplement to a New Drug Submission)
                    vm.descriptionList = TransactionLists.getSndsType();
                    break;
                case ("B02-20160301-085"): //SNDS-C (Supplement to a New Drug Submission - Conditional)
                    vm.descriptionList = TransactionLists.getSndsCArray();
                    break;
                case ("B02-20160301-087"): //UD-PV (Undefined Data Pharmacovigilance)
                    vm.descriptionList = TransactionLists.getUdpvType();
                    break;
                case ("B02-20160301-088"): //UDRA (Undefined Regulatory Activity)
                    vm.descriptionList = TransactionLists.getUdraType();
                    break;
               /* case ("CONSULTATION"):
                    vm.descriptionList = TransactionLists.getConsultType();
                    break;*/
                case ("B02-20160301-089"): //YBPR (Yearly Biologic Product Report)
                    vm.descriptionList = TransactionLists.getYbprType();
                    break;
                case ("B02-20160301-028"): //DSUR (Development Safety Update Report)
                    vm.descriptionList = TransactionLists.getDSurType();
                    break;
                case ("B02-20160301-043"):
                    vm.descriptionList = TransactionLists.getMPDINType();
                    break;
                case ("B02-20160301-070"):
                    vm.descriptionList = TransactionLists.getPdcType();
                    break;
                case ("B02-20160301-071"):
                    vm.descriptionList = TransactionLists.getPdcBType();
                    break;
                case ("B02-20160301-020"):
                    vm.descriptionList = TransactionLists.getDindType();
                    break;
                case ("B02-20160301-021"):
                    vm.descriptionList = TransactionLists.getDinfType();
                    break;


                default:
                    vm.descriptionList = "";
                    break;

            }
            ///find if the value is in the list
            if (temp && vm.descriptionList.indexOf(temp) !== -1) {
                vm.lifecycleModel.descriptionValue = temp;
            }else{
                setDetailsAsNone();
            }

        };
        /**
         * @ngdoc method sets the state of the details field based on
         * @ngdoc method sets the state of the details field based on
         * what was selected for the details description
         */
        vm.setDetailsState = function () {
            var value = vm.lifecycleModel.descriptionValue;
            if (!value) {
                vm.descriptionList = [];
                return;
            }
            switch (value) {
                case(vm.descriptionObj.ADMINISTRATIVE):         /*FALLTHROUGH*/
                case(vm.descriptionObj.BENEFIT_RISK_ASSESS):    /*FALLTHROUGH*/
                case(vm.descriptionObj.CANCEL_LETTER):          /*FALLTHROUGH*/
                case(vm.descriptionObj.CHANGE_TO_DIN):          /*FALLTHROUGH*/
                case(vm.descriptionObj.DIN_DISCONTINUED):       /*FALLTHROUGH*/
                case(vm.descriptionObj.DRUG_NOTIF_FORM):        /*FALLTHROUGH*/
                case(vm.descriptionObj.INITIAL):                /*FALLTHROUGH*/
                case(vm.descriptionObj.NOTIFICATION_CHANGE):    /*FALLTHROUGH*/
                case(vm.descriptionObj.NOTIFICATION_INTERRUPT_SALE): /*FALLTHROUGH July 17,2017 added*/
                case(vm.descriptionObj.PANDEMIC_APPL):          /*FALLTHROUGH*/
                case(vm.descriptionObj.POST_CLEARANCE_DATA):    /*FALLTHROUGH*/
                case(vm.descriptionObj.POST_MARKET_SURV):       /*FALLTHROUGH*/
                case(vm.descriptionObj.POST_NOC_CHANGE):        /*FALLTHROUGH*/
                case(vm.descriptionObj.POST_AUTH_DIV1_CHANGE):  /*FALLTHROUGH*/
                case(vm.descriptionObj.PRESUB_MEETING_PKG):     /*FALLTHROUGH*/
                case(vm.descriptionObj.PRIORITY_REVIEW_RQ):     /*FALLTHROUGH*/
                case(vm.descriptionObj.PRISTINE_PM):            /*FALLTHROUGH*/
                case(vm.descriptionObj.PRISTINE_PM_2LANG):      /*FALLTHROUGH*/
                case(vm.descriptionObj.RECON_DECIS_LTR_INTENT):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.RECON_DECIS_RQ_RECON):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.RECON_DECIS_OTHER_INFO):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.LABEL_PREAPPROVAL_2LANG):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.RISK_COMMUN_DOC):        /*FALLTHROUGH*/
                case(vm.descriptionObj.SIGNAL_WORK_UP):         /*FALLTHROUGH*/
                case(vm.descriptionObj.PRESUB_MEETING_RQ):      /*FALLTHROUGH*/
                case(vm.descriptionObj.CORR_PATENT_MED):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.ALLEGATION_NOTICE):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.FORM_IV):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.FORM_V):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.CONSENT_LTR):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.DATA_PROTECT_CORRESP):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.SEQUENCE_CLEANUP):     //FALLTHROUGHT FEB 16,2018
                    //nothing visible
                    setDetailsAsNone();
                    vm.setConcatDetails();
                    break;

                case(vm.descriptionObj.COMMENTS_NOC):             /*FALLTHROUGH*/
                case(vm.descriptionObj.COMMENTS_SUMMARY_BASIS):   /*FALLTHROUGH*/
                case(vm.descriptionObj.COMMENTS_REGULARTORY_DECISION):   /*FALLTHROUGH*/
                case(vm.descriptionObj.MEETING_MINUTES):            /*FALLTHROUGH*/
                case(vm.descriptionObj.ADVISEMENT_LETTER_RESPONSE):   /*FALLTHROUGH*/
                case(vm.descriptionObj.CLIN_CLARIF_RESPONSE):         /*FALLTHROUGH*/
                case(vm.descriptionObj.EMAIL_RQ_RESPONSE):            /*FALLTHROUGH*/
                case(vm.descriptionObj.LABEL_CLARIF_RESPONSE):        /*FALLTHROUGH*/
                case(vm.descriptionObj.MHPD_RQ_RESPONSE):             /*FALLTHROUGH*/
                case(vm.descriptionObj.NOC_RESPONSE):                  /*FALLTHROUGH*/
                case(vm.descriptionObj.NOD_RESPONSE):                  /*FALLTHROUGH*/
                case(vm.descriptionObj.NON_RESPONSE):                 /*FALLTHROUGH*/
                case(vm.descriptionObj.PROCESSING_CLARIF_RESPONSE):   /*FALLTHROUGH*/
                case(vm.descriptionObj.QUAL_CLIN_CLARIF_RESPONSE):   /*FALLTHROUGH*/
                case(vm.descriptionObj.QUAL_CLARIF_RESPONSE):         /*FALLTHROUGH*/
                case(vm.descriptionObj.SDN_RESPONSE):                 /*FALLTHROUGH*/
                case(vm.descriptionObj.PHONE_RQ_RESPONSE):         /*FALLTHROUGH*/
                case(vm.descriptionObj.BE_CLARIF_RESPONSE):        /*FALLTHROUGH*/
                case(vm.descriptionObj.SCREENING_ACCEPT_RESPONSE):        /*FALLTHROUGH*/
                case(vm.descriptionObj.SCREENING_CLARIF_RESPONSE):        /*FALLTHROUGH*/
                case(vm.descriptionObj.NOL_RESPONSE):        /*FALLTHROUGH*/
                case(vm.descriptionObj.CLARIF_RESPONSE):        /*FALLTHROUGH July 17,2017*/
                case(vm.descriptionObj.NONCLIN_CLARIF_RESPONSE):        /*FALLTHROUGH July 17,2017*/

                    setAsStartDate();
                    vm.setConcatDetails();
                    break;
                case(vm.descriptionObj.RMP_VERSION_DATE):
                    setVersionAndDate();
                    vm.setConcatDetails();
                    break;

                case(vm.descriptionObj.FOR_PERIOD):
                    setAsDatePeriod();
                    vm.setConcatDetails();
                    break;

                case(vm.descriptionObj.UNSOLICITED_DATA):

                    setAsDescription();
                    vm.setConcatDetails();
                    break;

                case(vm.descriptionObj.YEAR_LIST_OF_CHANGE):
                    setAsDescriptionYear();
                    vm.setConcatDetails();
                    break;

                default:
                    console.warn("Lifecycle Details activity not found: " + value);
                    break;
            }

        };



        /**
         * @ngdoc method -sets the details fields to all hidden
         */
        function setAsDescriptionYear() {
            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = true;
            vm.versionVisible = false;
            vm.yearVisible = true;
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.sequenceVersion = "";
            vm.descriptionLabel = "LIST_DESCRIPT";
        }

        function setDetailsAsNone() {

            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.sequenceVersion = "";
        }

        function setAsDescription() {
            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = true;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.descriptionLabel = "BRIEF_DESC";
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.sequenceVersion = "";

        }

        function setAsStartDate() {
            vm.endDateVisible = false;
            vm.startDateVisible = true;
            vm.startDateLabel = "DATED";
            vm.descriptionVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.sequenceVersion = "";
        }

        function setVersionAndDate() {
            vm.endDateVisible = false;
            vm.startDateVisible = true;
            vm.startDateLabel = "DATED";
            vm.descriptionVisible = false;
            vm.versionVisible = true;
            vm.yearVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.details = "";
        }

        function setAsDatePeriod() {

            vm.endDateVisible = true;
            vm.startDateVisible = true;
            vm.startDateLabel = "START_DATE";
            vm.descriptionVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.sequenceVersion = "";
        }

        function setAsVersionDescription() {
            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = true;
            vm.versionVisible = true;
            vm.yearVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
        }

        vm.setConcatDetails = function () {
            var startDate = "";
            var endDate = "";
            var concatText = "";
            //translate value to english
           var enDescription = translateToEnglish(vm.lifecycleModel.descriptionValue);
            if (vm.startDateVisible) {
                startDate = convertDate(vm.lifecycleModel.startDate);
                if (vm.versionVisible){
                    concatText = " dated " + startDate;
                }else {
                    concatText = enDescription + " dated " + startDate;
                }
            }
            if (vm.endDateVisible) {

                endDate = convertDate(vm.lifecycleModel.endDate);
                concatText = enDescription + " of " + startDate + " to " + endDate;
            }
            if (vm.descriptionVisible && !vm.yearVisible) {

                concatText = enDescription + "\n" + vm.lifecycleModel.details;
            }
            if (vm.versionVisible) {
                concatText = enDescription +" "+ vm.lifecycleModel.sequenceVersion + concatText;
            }
            if (vm.yearVisible) {
                concatText = vm.lifecycleModel.year + ", " + vm.lifecycleModel.details;
            }
            if (!concatText) concatText = enDescription;
            vm.lifecycleModel.sequenceConcat = concatText;
        };
        function translateToEnglish(key) {
            var translateText = "";
            //note this is done whether loaded or not should be OK
            translateText = $translate.instant(key, "", '', 'en');
            return translateText;
        }

        function convertDate(value) {

            if (!value) return "";
            var date = new Date(value);
            var m_names = ["Jan", "Feb", "Mar",
                "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                "Oct", "Nov", "Dec"];
            var result = "";
            result = m_names[date.getMonth()] + ". " + date.getDate() + ", " + date.getFullYear();
            return result
        }
        /**
         *  calls the delete function on the parent
         */
        vm.delete = function () {
            vm.onDelete({id: vm.lifecycleModel.sequence});
        };
        /* @ngdoc method -discards the changes and reverts to the model
         *
         */
        vm.discardChanges = function () {
            if (vm.lifecycleDetailsForm.$pristine) return;
            _updateLocalModel(vm.lifecycleRecord);
            vm.lifecycleDetailsForm.$setPristine();
            vm.isDetailValid({state: vm.lifecycleDetailsForm.$valid});
           // vm.savePressed = false;

        };

        /**
         * @ngdoc method -Updates the parent on whether this record is valid or not deprecated
         */
        vm.updateValid = function () {
            vm.isDetailValid({state: (vm.lifecycleDetailsForm.$valid && !vm.lifecycleDetailsForm.$dirty)});
        };


        /**
         * Updates the contact model used by the save button
         */
        vm.updateLivecycleModel = function () {

            if (vm.lifecycleDetailsForm.$valid) {
                vm.isDetailValid({state: true});
                vm.lifecycleDetailsForm.$setPristine();
                vm.onUpdate({record: vm.lifecycleModel});
            }else {
                vm.showSummary=true;
                vm.makeFocused();
                vm.updateErrorSummaryState();
            }

            //vm.savePressed = true;
        };

        vm.makeFocused=function(){
            vm.focusSummary=vm.focusSummary+1;
        };
        function convertToDate() {
            //TODO parse string and convert
            if (vm.lifecycleModel.dateFiled) {
                vm.lifecycleModel.dateFiled = _parseDate(vm.lifecycleModel.dateFiled)
            }
            if (vm.lifecycleModel.startDate) {
                vm.lifecycleModel.startDate = _parseDate(vm.lifecycleModel.startDate)
            }
            if (vm.lifecycleModel.endDate) {
                vm.lifecycleModel.endDate = _parseDate(vm.lifecycleModel.endDate);
            }
        }

        function _parseDate(value) {
            var dateArray = value.split('-');
            if (dateArray.length != 3) {
                console.error(("_parseDate error not 3 parts"))
            }
            var aDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
            return aDate;
        }

        /**
         * @ngdoc method toggles error state to make errors visible
         * @returns {boolean}
         */
        vm.showError = function (ctrl) {
            if(!ctrl) return false;

            if ((ctrl.$invalid &&ctrl.$touched) || (vm.showSummary && ctrl.$invalid )) {
                return true
            }
            return (false);
        };

        function _createYearList() {
            var start = 1980;
            var end = (new Date()).getFullYear();
            var result = [];
            for (var i = start; i <= end; i++) {
                result.push("" + i)
            }
            return (result);
        }

        /**
         * Open the instruction alerts
         * @param value
         */
        vm.addInstruct = function (value) {

            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = true;
            }
        };

        /**
         * Close the instruction alerts
         * @param value
         */
        vm.closeAlert = function (value) {
            if (angular.isUndefined(value)) return;
            if (value < vm.alerts.length) {
                vm.alerts[value] = false;
            }
        };

        function _setIdNames(){
            var scopeId = "_" + $scope.$id;
            vm.lifecycleDetailsFormId="life_detail_form" + scopeId;
            vm.dateSubId="date_submitted"+scopeId;
            vm.controlNumId="control_num"+scopeId;
            vm.regActivityId="reg_activity_type"+scopeId;
            vm.seqDescriptId="sequence_type"+scopeId;
            vm.startDateId="start_date"+scopeId;
            vm.endDateId="end_date"+scopeId;
            vm.yearId="year_change"+scopeId;
            vm.descriptId="brief_desc"+scopeId;
            vm.versionId="version_no"+scopeId;
            vm.activityLeadId = "activity_lead" + scopeId;
        }

    }
})();