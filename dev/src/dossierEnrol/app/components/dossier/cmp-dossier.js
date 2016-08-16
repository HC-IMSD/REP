/**
 * Created by Abdessamad on 6/29/2016.
 */


(function () {
    'use strict';

    angular
        .module('dossierModule', ['expandingTable','tabsModule','contactList','refProductListModule','drugUseModule','therapeuticClassModule'])
})();

(function () {
    'use strict';
    angular.module('dossierModule').component('cmpDossier', {
        templateUrl: './components/dossier/tpl-dossier.html',
        controller: dossierCtrl,
        controllerAs: 'dos',
        bindings: {
            dossierRecordInput: '<',
            onUpdateDossier: '&',
            onDeleteDossier: '&'
            // selectedCountryChanged: '&'
        }
    });

    dossierCtrl.$inject = ['$scope'];


    function dossierCtrl($scope) {

        var self = this;



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
                dossierID:"569522",
                enrolmentVersion: "1.23",
                dateSaved: "1999-01-21",
                applicationType: "New",
                softwareVersion: "1.0",
                dataChecksum: "kjsakdjas",
                drugProduct:{
                    thirdPartySigned:false,
                    therapeutic: {//grid
                        listItems:[],
                        columnDef:[]
                    },
                    canRefProducts:{},//grid
                    formulations:{},//tab + grid +
                    appendixFour:{}//tab + grid +

                },
                contactList: { //grid
                    listItems:[],
                    columnDef:[]
                }

            };


        }
    }

})();


