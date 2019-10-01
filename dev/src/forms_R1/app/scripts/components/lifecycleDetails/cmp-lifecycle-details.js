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
                dossierType: '<',
                activityTypes:'<', //list of activity types
                sequenceUpdated:'<',
                errorSummaryUpdate:'<', //update the component error summary
                showErrorSummary:'<', //show the component error summary
                updateErrorSummary:'&' //update the parent error summary
            }
        });
    lifecycleRecCtrl.$inject = ['ActivityFormFilterService',  'TransactionLists', '$filter', '$translate','$scope'];

    function lifecycleRecCtrl(ActivityFormFilterService,  TransactionLists, $filter, $translate, $scope) {
        var vm = this;
        vm.activityList= TransactionLists.getActivityTypes();
        vm.selfLifeUnitsList = TransactionLists.getShelfLifeUnitsList();
        vm.activityTypeList=[];
        vm.pharmaList =[];
        vm.biolList = [];
        vm.postMarketList = [];
        vm.consumHealthList = [];
        vm.veterinaryList = [];
        vm.clinicalList = [];
        vm.sequenceList = [];
        vm.descriptionList = [];
        vm.requesterList =[];
        vm.lifecycleModel = vm.lifecycleRecord;
        vm.endDateVisible = false;
        vm.yearVisible = false;
        vm.yearChangeVisible = false;
        vm.requesterVisible = false;
       // vm.startDateVisible = false;
        vm.descriptionVisible = false;
        vm.fromTo = false;
        vm.descriptionChangeVisible = false;
        vm.versionVisible = false;
        vm.ectd = false;
        // vm.dossierType = '';
        vm.popOpened = false;
        vm.alerts = [false, false];
        vm.dateOptions = {
            showWeeks: false
        };
        vm.lang = $translate.proposedLanguage() || $translate.use();
       // vm.yearList = _createYearList();
        vm.descriptionObj=TransactionLists.getTransactionDescriptions();
        vm.leadList = [] ;
        vm.activityTypeMapping = {
            "B02-20160301-014": TransactionLists.getCtaType(),
            "B02-20160301-015": TransactionLists.getCta_aType(),
            "B02-20160301-072": TransactionLists.getPreCtaType()
        };
        vm.updateSummary=0; //message to update the summary component
        vm.showSummary=false; //show the errror summary object
        vm.focusSummary=0; //messaging to focus on the active ingredient summary

        vm.dateFormatError=[
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "date", displayAlias: "MSG_ERR_DATE_FORMAT"},
            {type: "min", displayAlias: "MSG_ERR_INVALID_END_DATE"}
        ];
        vm.minLength6Error=[
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "minlength", displayAlias: "MSG_LENGTH_6NUM"}
        ];
        vm.requiredOnly=[
            {type: "required", displayAlias: "MSG_ERR_MAND"}
        ];
        vm.numberError = [
            {type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "number", displayAlias: "TYPE_NUMBER"}
        ];
        //
        vm.$onInit = function () {
            _setIdNames();
            // loadContactData();
           // vm.selectActivityLeadList();
           // vm.selectActivityList();
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

            if (changes.dossierType) {
                vm.dossierType = changes.dossierType.currentValue;
                if( vm.dossierType == TransactionLists.getPharmaceuticalValue()) {
                    vm.leadList = TransactionLists.getActivityLeadListByD22();
                } else if (vm.dossierType == TransactionLists.getBiologicValue()) {
                    vm.leadList = TransactionLists.getActivityLeadListByD21();
                } else if(vm.dossierType == TransactionLists.getVeterinaryValue()){
                    vm.leadList = TransactionLists.getActivityLeadListByD24();
                } else if(vm.dossierType == TransactionLists.getClinicalValue()){
                    vm.leadList = TransactionLists.getActivityLeadListByD26();
                }else {
                    vm.leadList = [];
                }
            }
            if(changes.sequenceUpdated){
                if(!changes.lifecycleRecord && vm.lifecycleRecord) {
                    vm.lifecycleModel.sequence = vm.lifecycleRecord.sequence;
                    _updateLocalModel(vm.lifecycleRecord);
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

        vm.userChanged = function(e) {
            if('requesterName' == e){
                vm.lifecycleModel.requesterName = vm.retrieveUser(vm.lifecycleModel.requesterNameTxt);
            } else if('requesterName2' == e){
                vm.lifecycleModel.requesterName2 = vm.retrieveUser(vm.lifecycleModel.requesterName2Txt);
            } else if('requesterName3' == e){
                vm.lifecycleModel.requesterName3 = vm.retrieveUser(vm.lifecycleModel.requesterName3Txt);
            }

        };

        /**
         * Used as messaging to get the error summary to update itself
         */
        vm.updateErrorSummaryState = function () {
            vm.updateSummary = vm.updateSummary + 1;

        };

        // function loadContactData() {
        //     getContactLists.getInternalContacts()
        //         .then(function (data) {
        //             vm.requesterList = data;
        //             return true;
        //         });
        // }
        vm.retrieveUser = function(userName){
            for(var i=0; i< vm.requesterList.length; i++){
                var user = vm.requesterList[i];
                if(user['en'] == userName){
                    return user;
                }
            }
            return userName;
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
            vm.lifecycleModel = record; //angular.copy(record);
            convertToDate();
            vm.selectActivityLeadList();
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

        vm.selectActivityLeadList = function() {
            if(!vm.dossierType ){
                vm.leadList = [];
                return;
            }
            // if(! vm.activityList || vm.activityList.length() < 1 ){
            //     vm.activityList= TransactionLists.getActivityTypes();
            // }
            switch( vm.dossierType ) {
                case  TransactionLists.getPharmaceuticalValue():
                    vm.leadList = TransactionLists.getActivityLeadListByD22();
                    break;
                case  TransactionLists.getBiologicValue():
                    vm.leadList = TransactionLists.getActivityLeadListByD21();
                    break;
                case  TransactionLists.getVeterinaryValue():
                    vm.leadList = TransactionLists.getActivityLeadListByD24();
                    break;
                case  TransactionLists.getClinicalValue():
                    vm.leadList = TransactionLists.getActivityLeadListByD26();
                    break;
                default:
                    vm.leadList = [];
                    break;
            }
            // if( vm.lifecycleModel.activityLead) {
            //     var temp = $filter('filter')(vm.leadList, vm.lifecycleModel.activityLead);
            //     vm.lifecycleModel.activityLead = temp;
            // }
        };


        vm.selectActivityList = function(){
            if(!vm.lifecycleModel.activityLead ){
                vm.activityTypeList=[];
                return;
            }
            if(! vm.activityList || vm.activityList.length < 1){
                vm.activityList= TransactionLists.getActivityTypes();
            }
            switch(vm.lifecycleModel.activityLead){
                case  TransactionLists.getBiologicalLeadValue():

                    if(vm.biolList.length == 0){
                        vm.biolList = ActivityFormFilterService.getBiolRAList(vm.activityList);
                    }
                    vm.activityTypeList= vm.biolList;
                    break;
                case  TransactionLists.getPharmaLeadValue():
                    if(vm.pharmaList.length == 0){
                        vm.pharmaList = ActivityFormFilterService.getPharmaRAList(vm.activityList)
                    }
                    vm.activityTypeList= vm.pharmaList;
                    break;
                case  TransactionLists.getPostMarketLeadValue():
                    if(vm.postMarketList.length == 0){
                        vm.postMarketList = ActivityFormFilterService.getPostMarketRAList(vm.activityList);
                    }
                    vm.activityTypeList= vm.postMarketList;
                    break;
                case  TransactionLists.getConsumHealthLeadValue():
                        if(vm.consumHealthList.length == 0){
                            vm.consumHealthList = ActivityFormFilterService.getConsumHealthList(vm.activityList);
                        }
                    vm.activityTypeList= vm.consumHealthList;
                    break;
                case  TransactionLists.getVeterinaryLeadValue():
                    if(vm.veterinaryList.length == 0){
                        vm.veterinaryList = ActivityFormFilterService.getVeterinaryList(vm.activityList);
                    }
                    vm.activityTypeList= vm.veterinaryList;
                    break;
                case  TransactionLists.getClinicalBioLeadValue():
                    if(vm.clinicalList.length == 0){
                        vm.clinicalList = ActivityFormFilterService.getClinicalBioList(vm.activityList);
                    }
                    vm.activityTypeList= vm.clinicalList;
                    break;
                case  TransactionLists.getClinicalPhaLeadValue():
                    if(vm.clinicalList.length == 0){
                        vm.clinicalList = ActivityFormFilterService.getClinicalPhaList(vm.activityList);
                    }
                    vm.activityTypeList= vm.clinicalList;
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
            if(vm.lifecycleModel.activityType) {
                vm.setSequenceList();
            } else {
                vm.lifecycleModel.activityTypeDisplay="";
                vm.lifecycleModel.descriptionValue = "";
                vm.descriptionList = "";
                setDetailsAsNone();
                vm.setConcatDetails();
            }
            vm.updateErrorSummaryState(); // if error summary is visible update it
        };

        /**
         * @ngdoc Method -sets the lifecycle Sequence DescriptionValie
         * @param value
         */
        vm.setSequenceList = function () {
             if(!vm.lifecycleModel.activityType) {
                vm.lifecycleModel.activityTypeDisplay="";
                vm.lifecycleModel.descriptionValue = "";
                vm.descriptionList = "";
                setDetailsAsNone();
                vm.setConcatDetails();
                return;
            }

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
                    if(vm.lifecycleModel.activityLead == "B14-20160301-11") {
                        vm.descriptionList = TransactionLists.getV_AndsType();
                    } else {
                        vm.descriptionList = TransactionLists.getAndsType();
                    }
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
                    if(vm.lifecycleModel.activityLead == "B14-20160301-11"){
                        vm.descriptionList = TransactionLists.getV_Level3Type();
                    }else {
                        vm.descriptionList = TransactionLists.getLevel3Type();
                    }
                    break;

                case ("B02-20160301-046"): //	MPNC (Pre-NC Meeting)
                    if(vm.lifecycleModel.activityLead == "B14-20160301-11"){
                        vm.descriptionList = TransactionLists.getV_MpncType();
                    } else {
                        vm.descriptionList = TransactionLists.getMPNCType();
                    }
                    break;

                case ("B02-20160301-047"): //	MPNDS (Pre-NDS Meeting)
                    if(vm.lifecycleModel.activityLead == "B14-20160301-11") {
                        vm.descriptionList = TransactionLists.getV_MpndsType();
                    } else {
                        vm.descriptionList = TransactionLists.getMPNDSType();
                    }
                    break;
                case ("B02-20160301-049"): //	MPSNDS (Pre-SNDS Meeting)
                    if(vm.lifecycleModel.activityLead == "B14-20160301-11") {
                        vm.descriptionList = TransactionLists.getV_MpsndsType();
                    } else {
                        vm.descriptionList = TransactionLists.getMPSNDSType();
                    }
                    break;

                case ("B02-20160301-050"): //NC (Notifiable Change)
                    if(vm.lifecycleModel.activityLead == "B14-20160301-11") {
                        vm.descriptionList = TransactionLists.getV_NcType();
                    } else {
                        vm.descriptionList = TransactionLists.getNcType();
                    }
                    break;
                case ("B02-20160301-051"): //NDS (New Drug Submission)
                    if(vm.lifecycleModel.activityLead == "B14-20160301-11") {
                        vm.descriptionList = TransactionLists.getV_NdsType();
                    } else {
                        vm.descriptionList = TransactionLists.getNdsType();
                    }
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
                    if(vm.lifecycleModel.activityLead == "B14-20160301-11") {
                        vm.descriptionList = TransactionLists.getV_PsurPvType();
                    } else {
                        vm.descriptionList = TransactionLists.getpSurPvType();
                    }
                    break;
                case ("B02-20160301-080"): //RMP-PV (Risk Management Plan - Pharmacovigilance)
                    vm.descriptionList = TransactionLists.getRmpPvType();
                    break;
                case ("B02-20160301-082"): //SANDS (Supplement to an Abbreviated New Drug Submission)
                    if(vm.lifecycleModel.activityLead == "B14-20160301-11"){
                        vm.descriptionList = TransactionLists.getV_SandsType();
                    }else {
                        vm.descriptionList = TransactionLists.getSandsType();
                    }
                    break;
                case ("B02-20160301-084"): //SNDS (Supplement to a New Drug Submission)
                    if(vm.lifecycleModel.activityLead == "B14-20160301-11") {
                        vm.descriptionList = TransactionLists.getV_SndsType();
                    } else {
                        vm.descriptionList = TransactionLists.getSndsType();
                    }
                    break;
                case ("B02-20160301-085"): //SNDS-C (Supplement to a New Drug Submission - Conditional)
                    vm.descriptionList = TransactionLists.getSndsCType();
                    break;
                case ("B02-20160301-088"): //UDRA (Undefined Regulatory Activity)
                    if(vm.lifecycleModel.activityLead == "B14-20160301-11") {
                        vm.descriptionList = TransactionLists.getV_UdraType();
                    } else {
                        vm.descriptionList = TransactionLists.getUdraType();
                    }
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
                    if(vm.lifecycleModel.activityLead == "B14-20160301-11"){
                        vm.descriptionList = TransactionLists.getV_MpdinType();
                    } else {
                        vm.descriptionList = TransactionLists.getMPDINType();
                    }
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
                case ("B02-20190627-01"): //IRSRPV
                    vm.descriptionList = TransactionLists.getIRSRPVType();
                    break;
                case ("B02-20190627-02"): //PA-PV
                    vm.descriptionList = TransactionLists.getPAPVType();
                    break;
                case ("B02-20190627-03"): //PSA-PV
                    vm.descriptionList = TransactionLists.getPSAPVType();
                    break;
                case ("B02-20190627-04"): //RC-PV
                    vm.descriptionList = TransactionLists.getRCPVType();
                    break;
                case ("B02-20190627-05"): //REG-PV
                    vm.descriptionList = TransactionLists.getREGPVType();
                    break;
                case ("B02-20190627-06"): //SANDS-C
                    vm.descriptionList = TransactionLists.getSANDSCType();
                    break;
                case ("B02-20160819-01"): //Post-DIN
                    vm.descriptionList = TransactionLists.getPostDINType();
                    break;
                case ("B02-20190627-07"): //EUANDS
                    vm.descriptionList = TransactionLists.getEUANDSType();
                    break;
                case ("B02-20190627-08"): //EUSANDS
                    vm.descriptionList = TransactionLists.getEUSANDSType();
                    break;

                default:
                    try {
                        vm.descriptionList = vm.activityTypeMapping[value];
                    }catch(e) {
                        vm.descriptionList = "";
                    }
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
            if (!vm.lifecycleModel.activityType.id) {
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
                case(vm.descriptionObj.FOREIGN_SAFETY_NOTIFICATION):        /*FALLTHROUGH*/
                case(vm.descriptionObj.INITIAL):                /*FALLTHROUGH*/
                case(vm.descriptionObj.NOTIFICATION_CHANGE):    /*FALLTHROUGH*/
                case(vm.descriptionObj.NOTIFICATION_INTERRUPT_SALE): /*FALLTHROUGH July 17,2017 added*/
                case(vm.descriptionObj.PANDEMIC_APPL):          /*FALLTHROUGH*/
                case(vm.descriptionObj.POST_CLEARANCE_DATA):    /*FALLTHROUGH*/
                case(vm.descriptionObj.POST_MARKET_SURV):       /*FALLTHROUGH*/
                case(vm.descriptionObj.POST_AUTH_DIV1_CHANGE):  /*FALLTHROUGH*/
                case(vm.descriptionObj.PRESUB_MEETING_PKG):     /*FALLTHROUGH*/
                case(vm.descriptionObj.PRIORITY_REVIEW_RQ):     /*FALLTHROUGH*/
                case(vm.descriptionObj.PRISTINE_PM):            /*FALLTHROUGH*/
                case(vm.descriptionObj.PRISTINE_PM_2LANG):      /*FALLTHROUGH*/
                case(vm.descriptionObj.PUB_RELEASE_INFO):      /*FALLTHROUGH*/
                case(vm.descriptionObj.RESSESS_ORDER):      /*FALLTHROUGH*/
                case(vm.descriptionObj.WRITTEN_CONSULT_REQ):      /*FALLTHROUGH*/
                case(vm.descriptionObj.RECON_DECIS_LTR_INTENT):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.RECON_DECIS_RQ_RECON):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.RECON_DECIS_OTHER_INFO):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.LABEL_PREAPPROVAL_2LANG):  /*FALLTHROUGH Jul 17,2017 added*/
                // case(vm.descriptionObj.RISK_COMMUN_DOC):        /*FALLTHROUGH*/
                case(vm.descriptionObj.SIGNAL_WORK_UP):         /*FALLTHROUGH*/
                case(vm.descriptionObj.PRESUB_MEETING_RQ):      /*FALLTHROUGH*/
                case(vm.descriptionObj.CORR_PATENT_MED):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.ALLEGATION_NOTICE):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.FORM_IV):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.FORM_V):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.CONSENT_LTR):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.DATA_PROTECT_CORRESP):  /*FALLTHROUGH Jul 17,2017 added*/
                case(vm.descriptionObj.SEQUENCE_CLEANUP):     //FALLTHROUGHT FEB 16,2018
                case(vm.descriptionObj.TEST_STUDIES_ORDER):     //FALLTHROUGHT
                case(vm.descriptionObj.TERM_COND_COMM):     //FALLTHROUGHT
                    //nothing visible
                    setDetailsAsNone();
                    vm.setConcatDetails();
                    break;

                case(vm.descriptionObj.COMMENTS_NOC):             /*FALLTHROUGH*/
                case(vm.descriptionObj.COMMENTS_SUMMARY_BASIS):   /*FALLTHROUGH*/
                case(vm.descriptionObj.COMMENTS_REGULARTORY_DECISION):   /*FALLTHROUGH*/
                case(vm.descriptionObj.MEETING_MINUTES):            /*FALLTHROUGH*/
                case(vm.descriptionObj.ADVISEMENT_LETTER_RESPONSE):   /*FALLTHROUGH*/
                case(vm.descriptionObj.ADV_COMP_REQ):           /*FALLTHROUGH*/
                case(vm.descriptionObj.ISSUE_SAFETY_REQUEST):            /*FALLTHROUGH*/
               // case(vm.descriptionObj.LABEL_CLARIF_RESPONSE):        /*FALLTHROUGH*/
                case(vm.descriptionObj.MHPD_RQ_RESPONSE):             /*FALLTHROUGH*/
                case(vm.descriptionObj.NOC_RESPONSE):                  /*FALLTHROUGH*/
                case(vm.descriptionObj.NOD_RESPONSE):                  /*FALLTHROUGH*/
                case(vm.descriptionObj.NON_RESPONSE):                 /*FALLTHROUGH*/
                case(vm.descriptionObj.PATIENT_SAFETY_INFO):   /*FALLTHROUGH*/
              //  case(vm.descriptionObj.QUAL_CLIN_CLARIF_RESPONSE):   /*FALLTHROUGH*/
              //  case(vm.descriptionObj.QUAL_CLARIF_RESPONSE):         /*FALLTHROUGH*/
                case(vm.descriptionObj.SDN_RESPONSE):                 /*FALLTHROUGH*/
              //  case(vm.descriptionObj.PHONE_RQ_RESPONSE):         /*FALLTHROUGH*/
               // case(vm.descriptionObj.BE_CLARIF_RESPONSE):        /*FALLTHROUGH*/
                case(vm.descriptionObj.SCREENING_ACCEPT_RESPONSE):        /*FALLTHROUGH*/
               // case(vm.descriptionObj.SCREENING_CLARIF_RESPONSE):        /*FALLTHROUGH*/
                case(vm.descriptionObj.NOL_RESPONSE):        /*FALLTHROUGH*/
                case(vm.descriptionObj.CLARIF_RESPONSE):        /*FALLTHROUGH July 17,2017*/
              //  case(vm.descriptionObj.NONCLIN_CLARIF_RESPONSE):        /*FALLTHROUGH July 17,2017*/
                case(vm.descriptionObj.CTN_RESPONSE):
                case(vm.descriptionObj.CTN_SAFETY):
                    setAsStartDate();
                    vm.setConcatDetails();
                    break;
                case(vm.descriptionObj.RMP_VERSION_DATE):
                case(vm.descriptionObj.CSOtRMP):
                case(vm.descriptionObj.DISSEM_LIST):
                case(vm.descriptionObj.RISK_COMMUN_DOC):        /*FALLTHROUGH*/
                    setVersionAndDate();
                    vm.setConcatDetails();
                    break;

                case(vm.descriptionObj.FOR_PERIOD):
                    setAsDatePeriod();
                    vm.setConcatDetails();
                    break;

                case(vm.descriptionObj.UNSOLICITED_DATA):
                case(vm.descriptionObj.CTN_ADMINISTRATIVE):
                case(vm.descriptionObj.CTN_APPENDIX):
                case(vm.descriptionObj.CTN_NEW_MANUFACTURING):
                case(vm.descriptionObj.CTN_QOS):
                case(vm.descriptionObj.CTN_SOURCE):
                case(vm.descriptionObj.CTN_STUDY_DISC):
                    setAsDescription();
                    vm.setConcatDetails();
                    break;

                case(vm.descriptionObj.YEAR_LIST_OF_CHANGE):
                    setAsDescriptionYear();
                    vm.setConcatDetails();
                    break;
                case(vm.descriptionObj.BE_CLARIF_RESPONSE):
                case(vm.descriptionObj.CLIN_CLARIF_RESPONSE):
                case(vm.descriptionObj.EMAIL_RQ_RESPONSE):
                case(vm.descriptionObj.LABEL_CLARIF_RESPONSE):
                case(vm.descriptionObj.NONCLIN_CLARIF_RESPONSE):
                case(vm.descriptionObj.PROCESSING_CLARIF_RESPONSE):
                case(vm.descriptionObj.QUAL_CLIN_CLARIF_RESPONSE):
                case(vm.descriptionObj.QUAL_CLARIF_RESPONSE):
                case(vm.descriptionObj.SCREENING_CLARIF_RESPONSE):
                case(vm.descriptionObj.PHONE_RQ_RESPONSE):
                    setAsRequesterwithDate();
                    vm.setConcatDetails();
                    break;
                case(vm.descriptionObj.POST_NOC_CHANGE):

                    setAsDescriptionChange();
                    vm.setConcatDetails();
                    break;
                case(vm.descriptionObj.YEAR):
                    setAsYearOnly();
                    vm.setConcatDetails();
                    break;
                case(vm.descriptionObj.CTN_SHELF_PD):
                case(vm.descriptionObj.CTN_SHELF_DS):
                    setAsFromTo();
                    vm.setConcatDetails();
                    break;
                default:
                    //nothing visible
                    setDetailsAsNone();
                    vm.setConcatDetails();
                    // console.warn("Lifecycle Details activity not found: " + value);
                    break;
            }

        };

        /**
         * @ngdoc method -sets the details fields to all hidden
         */
        function setAsYearOnly() {
            vm.fromTo = false;
            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = false;
            vm.descriptionChangeVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = true;
            vm.yearChangeVisible = false;
            vm.requesterVisible = false;
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.sequenceVersion = "";
            vm.lifecycleModel.requesterName = "";
            vm.lifecycleModel.requesterName2 = "";
            vm.lifecycleModel.requesterName3 = "";
            vm.lifecycleModel.requesterNameTxt = "";
            vm.lifecycleModel.requesterName2Txt = "";
            vm.lifecycleModel.requesterName3Txt = "";
            vm.lifecycleModel.fromValue = "";
            vm.lifecycleModel.fromUnit = "";
            vm.lifecycleModel.toValue = "";
            vm.lifecycleModel.toUnit = "";
        }


        /**
         * @ngdoc method -sets the details fields to all hidden
         */
        function setAsDescriptionYear() {
            vm.fromTo = false;
            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = false;
            vm.descriptionChangeVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.yearChangeVisible = true;
            vm.requesterVisible = false;
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.sequenceVersion = "";
            vm.lifecycleModel.requesterName = "";
            vm.lifecycleModel.requesterName2 = "";
            vm.lifecycleModel.requesterName3 = "";
            vm.lifecycleModel.requesterNameTxt = "";
            vm.lifecycleModel.requesterName2Txt = "";
            vm.lifecycleModel.requesterName3Txt = "";
            vm.lifecycleModel.fromValue = "";
            vm.lifecycleModel.fromUnit = "";
            vm.lifecycleModel.toValue = "";
            vm.lifecycleModel.toUnit = "";
        }

        function setDetailsAsNone() {
            vm.fromTo = false;

            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = false;
            vm.descriptionChangeVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.yearChangeVisible = false;
            vm.requesterVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.sequenceVersion = "";
            vm.lifecycleModel.requesterName = "";
            vm.lifecycleModel.requesterName2 = "";
            vm.lifecycleModel.requesterName3 = "";
            vm.lifecycleModel.requesterNameTxt = "";
            vm.lifecycleModel.requesterName2Txt = "";
            vm.lifecycleModel.requesterName3Txt = "";
            vm.lifecycleModel.fromValue = "";
            vm.lifecycleModel.fromUnit = "";
            vm.lifecycleModel.toValue = "";
            vm.lifecycleModel.toUnit = "";
        }

        function setAsDescription() {
            vm.fromTo = false;
            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = true;
            vm.descriptionChangeVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.yearChangeVisible = false;
            vm.requesterVisible = false;
            vm.descriptionLabel = "BRIEF_DESC";
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.sequenceVersion = "";
            vm.lifecycleModel.requesterName = "";
            vm.lifecycleModel.requesterName2 = "";
            vm.lifecycleModel.requesterName3 = "";
            vm.lifecycleModel.requesterNameTxt = "";
            vm.lifecycleModel.requesterName2Txt = "";
            vm.lifecycleModel.requesterName3Txt = "";
            vm.lifecycleModel.fromValue = "";
            vm.lifecycleModel.fromUnit = "";
            vm.lifecycleModel.toValue = "";
            vm.lifecycleModel.toUnit = "";

        }

        function setAsStartDate() {
            vm.fromTo = false;
            vm.endDateVisible = false;
            vm.startDateVisible = true;
            //vm.startDateLabel = "DATED";
            vm.descriptionVisible = false;
            vm.descriptionChangeVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.yearChangeVisible = false;
            vm.requesterVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.sequenceVersion = "";
            vm.lifecycleModel.requesterName = "";
            vm.lifecycleModel.requesterName2 = "";
            vm.lifecycleModel.requesterName3 = "";
            vm.lifecycleModel.requesterNameTxt = "";
            vm.lifecycleModel.requesterName2Txt = "";
            vm.lifecycleModel.requesterName3Txt = "";
            vm.lifecycleModel.fromValue = "";
            vm.lifecycleModel.fromUnit = "";
            vm.lifecycleModel.toValue = "";
            vm.lifecycleModel.toUnit = "";
        }

        function setVersionAndDate() {
            vm.fromTo = false;
            vm.endDateVisible = false;
            vm.startDateVisible = true;
           // vm.startDateLabel = "DATED";
            vm.descriptionVisible = false;
            vm.descriptionChangeVisible = false;
            vm.versionVisible = true;
            vm.versionLabel = "VERSION_NO";
            vm.yearVisible = false;
            vm.yearChangeVisible = false;
            vm.requesterVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.requesterName = "";
            vm.lifecycleModel.requesterName2 = "";
            vm.lifecycleModel.requesterName3 = "";
            vm.lifecycleModel.requesterNameTxt = "";
            vm.lifecycleModel.requesterName2Txt = "";
            vm.lifecycleModel.requesterName3Txt = "";
            vm.lifecycleModel.fromValue = "";
            vm.lifecycleModel.fromUnit = "";
            vm.lifecycleModel.toValue = "";
            vm.lifecycleModel.toUnit = "";
        }

        function setAsDatePeriod() {

            vm.fromTo = false;
            vm.endDateVisible = true;
            vm.startDateVisible = true;
            //vm.startDateLabel = "START_DATE";
            vm.descriptionVisible = false;
            vm.descriptionChangeVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.yearChangeVisible = false;
            vm.requesterVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.sequenceVersion = "";
            vm.lifecycleModel.requesterName = "";
            vm.lifecycleModel.requesterName2 = "";
            vm.lifecycleModel.requesterName3 = "";
            vm.lifecycleModel.requesterNameTxt = "";
            vm.lifecycleModel.requesterName2Txt = "";
            vm.lifecycleModel.requesterName3Txt = "";
            vm.lifecycleModel.fromValue = "";
            vm.lifecycleModel.fromUnit = "";
            vm.lifecycleModel.toValue = "";
            vm.lifecycleModel.toUnit = "";
        }
        function setAsFromTo() {
            vm.fromTo = true;
            vm.endDateVisible = false;
            vm.startDateVisible = false;
            //vm.startDateLabel = "START_DATE";
            vm.descriptionVisible = false;
            vm.descriptionChangeVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.yearChangeVisible = false;
            vm.requesterVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.sequenceVersion = "";
            vm.lifecycleModel.requesterName = "";
            vm.lifecycleModel.requesterName2 = "";
            vm.lifecycleModel.requesterName3 = "";
            vm.lifecycleModel.requesterNameTxt = "";
            vm.lifecycleModel.requesterName2Txt = "";
            vm.lifecycleModel.requesterName3Txt = "";
        }

        function setAsVersionDescription() {
            vm.fromTo = false;
            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = true;
            vm.descriptionChangeVisible = false;
            vm.versionVisible = true;
            vm.versionLabel = "VERSION_NO";
            vm.yearVisible = false;
            vm.yearChangeVisible = false;
            vm.requesterVisible = false;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.requesterName = "";
            vm.lifecycleModel.requesterName2 = "";
            vm.lifecycleModel.requesterName3 = "";
            vm.lifecycleModel.requesterNameTxt = "";
            vm.lifecycleModel.requesterName2Txt = "";
            vm.lifecycleModel.requesterName3Txt = "";
            vm.lifecycleModel.fromValue = "";
            vm.lifecycleModel.fromUnit = "";
            vm.lifecycleModel.toValue = "";
            vm.lifecycleModel.toUnit = "";
        }

        function setAsRequesterwithDate() {
            vm.fromTo = false;
            vm.endDateVisible = false;
            vm.startDateVisible = true;
            vm.descriptionVisible = false; //
            vm.descriptionChangeVisible = false;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.yearChangeVisible = false;
            vm.requesterVisible = true;
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.sequenceVersion = "";
            vm.lifecycleModel.fromValue = "";
            vm.lifecycleModel.fromUnit = "";
            vm.lifecycleModel.toValue = "";
            vm.lifecycleModel.toUnit = "";
        }

        function setAsDescriptionChange() {
            vm.fromTo = false;
            vm.endDateVisible = false;
            vm.startDateVisible = false;
            vm.descriptionVisible = false;
            vm.descriptionChangeVisible = true;
            vm.versionVisible = false;
            vm.yearVisible = false;
            vm.yearChangeVisible = false;
            vm.requesterVisible = false;
            vm.lifecycleModel.startDate = "";
            vm.lifecycleModel.endDate = "";
            vm.lifecycleModel.year = "";
            vm.lifecycleModel.details = "";
            vm.lifecycleModel.sequenceVersion = "";
            vm.lifecycleModel.requesterName = "";
            vm.lifecycleModel.requesterName2 = "";
            vm.lifecycleModel.requesterName3 = "";
            vm.lifecycleModel.requesterNameTxt = "";
            vm.lifecycleModel.requesterName2Txt = "";
            vm.lifecycleModel.requesterName3Txt = "";
            vm.lifecycleModel.fromValue = "";
            vm.lifecycleModel.fromUnit = "";
            vm.lifecycleModel.toValue = "";
            vm.lifecycleModel.toUnit = "";
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
                concatText = enDescription + " " + startDate + " to " + endDate;
            }
            if (vm.descriptionVisible && !vm.yearChangeVisible) {

                concatText = enDescription + "\n" + vm.lifecycleModel.details;
            }
            if (vm.versionVisible) {
                concatText = enDescription +" version "+ vm.lifecycleModel.sequenceVersion + concatText;
            }
            if (vm.yearChangeVisible) {
                concatText = vm.lifecycleModel.year + ", " + vm.lifecycleModel.details;
            }
            if (vm.yearVisible) {
                concatText = vm.lifecycleModel.year;
            }
            if (vm.descriptionChangeVisible) {
                concatText = enDescription +  "\n" + vm.lifecycleModel.detailsChange;
            }
            if(vm.fromTo){
                concatText = enDescription + " From: (" + vm.lifecycleModel.fromValue + ") (" + vm.lifecycleModel.fromUnit.en + ") - To: (" +vm.lifecycleModel.toValue + ") (" + vm.lifecycleModel.toUnit.en + ")";
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
            var m_names = ["01", "02", "03",
                "04", "05", "06", "07", "08", "09",
                "10", "11", "12"];
            var d_names = ["", "01", "02", "03",
                "04", "05", "06", "07", "08", "09",
                "10", "11", "12", "13", "14", "15",
                "16", "17", "18", "19", "20", "21",
                "22", "23", "24","25", "26", "27",
                "28", "29", "30", "31"];
            var result = "";
            result = date.getFullYear() + "-" + m_names[date.getMonth()] + "-" + d_names[date.getDate()];
            // result = m_names[date.getMonth()] + ". " + date.getDate() + ", " + date.getFullYear();
            return result;
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
            if (vm.lifecycleModel && vm.lifecycleModel.dateFiled) {
                vm.lifecycleModel.dateFiled = _parseDate(vm.lifecycleModel.dateFiled)
            }
            if (vm.lifecycleModel && vm.lifecycleModel.startDate) {
                vm.lifecycleModel.startDate = _parseDate(vm.lifecycleModel.startDate)
            }
            if (vm.lifecycleModel && vm.lifecycleModel.endDate) {
                vm.lifecycleModel.endDate = _parseDate(vm.lifecycleModel.endDate);
            }
        }

        function _parseDate(value) {
            var dateArray = value.split('-');
            if (dateArray.length !== 3) {
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
/*
        function _createYearList() {
            var start = 1980;
            var end = (new Date()).getFullYear();
            var result = [];
            for (var i = start; i <= end; i++) {
                result.push("" + i)
            }
            return (result);
        } *

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
            vm.startDateId="start_date" + scopeId;
            vm.dateId= "dated" + scopeId;
            vm.endDateId="end_date"+scopeId;
            vm.yearId="year"+scopeId;
            vm.yearChangeId="year_change"+scopeId;
            vm.descriptId="brief_desc"+scopeId;
            vm.versionId="version_no"+scopeId;
            vm.activityLeadId = "activity_lead" + scopeId;
            vm.requesterNameId = "requester_name" + scopeId;
            vm.requesterNameId2 = "requester_name2" + scopeId;
            vm.requesterNameId3 = "requester_name3" + scopeId;
            vm.descriptChangeId = "brief_desc_change" +  scopeId;
            vm.fromValueId = "fromValue" + scopeId;
            vm.fromUnitId = "fromUnit" + scopeId;
            vm.toValueId = "toValue" +scopeId;
            vm.toUnitId = "toUnit" +scopeId;
        }
    }
})();