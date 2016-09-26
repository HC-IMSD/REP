/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('activeIngListModule', ['expandingTable','activeIngRecordModule'])
})();

(function () {
    'use strict';

    angular
        .module('activeIngListModule')
        .component('cmpActiveIngList', {
            templateUrl: './components/formulations/tpl-active-ing-list.html',
            controller: activeIngListCtrl,
            controllerAs: 'ailCtrl',
            bindings: {
                ingredients: '<',
                onUpdate: '&'
            }
        });

    function activeIngListCtrl(){

        var self = this;

        self.$onInit = function(){
            self.colNames = [
                {"label":"Active Ingredient Name", "binding":"ingName"},
                {"label":"CAS", "binding":"cas"},
                {"label":"Human/Animal Sourced ?", "binding":"humanAnimalSourced"}
            ];
            self.ingList = [
                {
                    "ingName": "ing1",
                    "cas": "Active",
                    "humanAnimalSourced": "No",
                    "standard": "A",
                    "strength": "A",
                    "per": "A",
                    "units": "A",
                    "calcAsBase": true,
                    "animalHumanSourced":true,
                    "nanoMaterial": "Yes",
                    "nanoMaterialOther": "A"
                },
                {
                    "ingName": "ing2",
                    "cas": "Active",
                    "humanAnimalSourced": "Yes",
                    "standard": "A",
                    "strength": "A",
                    "per": "A",
                    "units": "A",
                    "calcAsBase": true,
                    "animalHumanSourced":false,
                    "nanoMaterial": "Yes",
                    "nanoMaterialOther": "A"
                },
                {
                    "ingName": "ing3",
                    "cas": "Active",
                    "humanAnimalSourced": "Yes",
                    "standard": "A",
                    "strength": "A",
                    "per": "A",
                    "units": "A",
                    "calcAsBase": false,
                    "animalHumanSourced":true,
                    "nanoMaterial": "Other",
                    "nanoMaterialOther": "A"
                },

            ];
        }

    }
})();
