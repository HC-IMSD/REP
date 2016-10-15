/**
 * Created by Abdessamad on 8/22/2016.
 */

(function () {
    'use strict';

    angular
        .module('appendixFourModule', ['expandingTable','appendix4RecordModule'])
})();

(function () {
    'use strict';
    angular
        .module('appendixFourModule')
        .component('cmpAppendixFour',{
            templateUrl: './components/appendix-four/tpl-appendix-four.html',
            controller: appendixFourCtrl,
            controllerAs: 'ap4Ctrl',
            bindings: {

                ingredients : '<'

            }
        });

    function appendixFourCtrl(){

        var self=this;

        self.$onInit = function(){
            self.colNames = [
                {label: "INGRED_NAME", binding: "ingredientName", width: "98"}
            ];
            self.isDetailValid = true; //TODO needs to be managed in ADD and delete
            self.ingredientList = [];

            if(self.ingredients){
                self.ingredientList = self.ingredients;
            }
        };

        self.$onChanges = function (changes) {

            if (changes.ingredients) {
                self.ingredientList = changes.ingredients.currentValue;
            }
        };

    }
})();
