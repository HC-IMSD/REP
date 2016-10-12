/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('formulationsModule', ['expandingTable','formulationRecordModule'])
})();

(function () {
    'use strict';

    angular
        .module('formulationsModule')
        .component('cmpFormulations',{
            templateUrl: './components/formulations/tpl-formulation-list.html',
            controller: formulationsCtrl,
            controllerAs: 'formulCtrl',
            bindings: {
                formulations : '<'
            }
        });

    function formulationsCtrl(){

        var self=this;
        self.isDetailValid = true //TODO this must be managed
        self.$onInit = function() {

            self.newFormShown = false;

            self.colNames = [
                {label: "Formulation", binding: "formulation", width: "15"},
                {label: "Formulation Name", binding: "formulationName", width: "85"}
            ];
            self.formulationList = [
                {
                    "formulation": "1",
                    "formulationName": "Main Formulation",
                    "activeIngList": [],
                    "nMedIngList": [],
                    "containerTypes": [],
                    "animalHumanMaterials": [],
                    "routeAdmins": [],
                    "countryList": []

                },
                {
                    "formulation": "2",
                    "formulationName": "Alternate 1",
                    "activeIngList": [],
                    "nMedIngList": [],
                    "containerTypes": [],
                    "animalHumanMaterials": [],
                    "routeAdmins": [],
                    "countryList": []

                },
                {
                    "formulation": "3",
                    "formulationName": "Alternate 2",
                    "activeIngList": [],
                    "nMedIngList": [],
                    "containerTypes": [],
                    "animalHumanMaterials": [],
                    "routeAdmins": [],
                    "countryList": []

                }

            ];

            if(self.formulations){
                self.formulationList = self.formulations;
            }
        };



        self.addNew = function(frm){
            //console.debug('frmList addIng: ' + frm);
            self.formulationList.push(frm);
            self.newFormShown = false;
        };

        self.update = function(idx, frm){
            self.formulationList[idx] = angular.copy(frm);
        };

        self.delete = function(idx){
            // console.debug('frmList deleteIng: ' + idx);
            self.formulationList.splice(idx,1);
        }


    }

})();

