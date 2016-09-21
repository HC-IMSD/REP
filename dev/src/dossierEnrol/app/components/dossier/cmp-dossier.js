/**
 * Created by Abdessamad on 6/29/2016.
 */


(function () {
    'use strict';

    var dependencies = [
        'expandingTable'
        ,'tabsModule'
        ,'contactList'
        ,'refProductListModule'
        ,'drugUseModule'
        ,'therapeuticClassModule'
        ,'scheduleAModule',
        'dossierDataLists',
        'filterLists',
        'fileIO',
        'contactModule25',
        'contactModule26',
        'applicationInfoService',
        'applicationInfo'
    ];

    angular
        .module('dossierModule', dependencies);
})();

(function () {
    'use strict';
    angular
        .module('dossierModule')
        .component('cmpDossier', {
        templateUrl: './components/dossier/tpl-dossier.html',
        controller: dossierCtrl,
        controllerAs: 'dos',
        bindings: {
            dossierRecordInput: '<',
            onUpdateDossier: '&',
            onDeleteDossier: '&',
            formType:'@'
            // selectedCountryChanged: '&'
        }
    });

    dossierCtrl.$inject = ['$scope','hpfbFileProcessing', 'ApplicationInfoService'];


    function dossierCtrl($scope, hpfbFileProcessing,ApplicationInfoService) {

        var self = this;
        self.showContent = _loadFileContent; //binds the component to the function
        self.formUserType='EXT'; //set default to external type
        self.applicationInfoService = new ApplicationInfoService();
        self.configField = {
            "label": "DOSSIER_NUMBER",
            "fieldLength": "7",
            "tagName": "dossierID",
            "errorMsg": "MSG_LENGTH_7"
        };
        self.isIncomplete=true;

        /*

         "company_id": "A",
         "enrolment_version": "1.23",
         "date_saved": "1999-01-21",
         "application_type": "APPROVED",
         "software_version": "string",
         "data_checksum": "string",

         */

        self.$onInit = function(){
            self.dossierModel = {
                dossierID:"",
                enrolmentVersion: "1.23",
                dateSaved: "1999-01-21",
                applicationType: "New",
                softwareVersion: "1.0",
                dataChecksum: "kjsakdjas",
                drugProduct:{
                    thirdPartySigned:false,
                    humanDrugUse: false,
                    radiopharmDrugUse: false,
                    vetDrugUse: false,
                    disinfectantDrugUse: false,
                    isScheduleA: false,
                    scheduleAGroup:{

                    },
                    therapeutic: {//grid
                        listItems:[],
                        columnDef:[]
                    },
                    canRefProducts:{},//grid
                    formulations:{},//tab + grid +
                    appendixFour:{}//tab + grid +

                },
                contactInfo: { //grid
                    contactList:[],
                    columnDef:[]
                }

            };

        }
        /**
         * @ngdoc captures any change events from variable bindings
         * @param changes
         */
        self.$onChanges=function(changes){
            if(changes.formType){
                self.userFormType=changes.formType.currentValue;
            }
        }

        function _loadFileContent(fileContent) {
            if (!fileContent)return;
            var resultJson = fileContent.jsonResult;
            if (resultJson) {
             //process file load results
                //load into data model
            }
        }

        self.setApplicationType = function (value) {
            self.dossierModel.applicationType = value;
            self.formAmend= self.dossierModel.applicationType === self.applicationInfoService.getAmendType();
            disableXMLSave();
        };
        function _setComplete() {
            self.isIncomplete = !self.activityRoot.dossierID;
        }


        /**
         * @ngdoc disables the XML save button
         */
        function disableXMLSave(){


        }

    }

})();


