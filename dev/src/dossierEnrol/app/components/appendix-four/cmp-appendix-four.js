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
        self.colNames = [
            {label: "INGRED_NAME", binding: "ingredientName", width: "98"}
        ];
        self.ingredientList=[];

        self.$onInit = function(){
            self.newFormShown = false;
            self.isDetailValid = true; //TODO needs to be managed in ADD and delete

            if(!self.ingredientList){
                console.log("init")
                self.ingredientList = [];
               // self.ingredientList = self.ingredients;
            }
        };

        self.$onChanges = function (changes) {

            if (changes.ingredients) {
                self.ingredientList = changes.ingredients.currentValue;
            }
        };


        self.addNew = function () {
            var newRecord = {
                "id":self.ingredientList.length + 1,
                "ingredientName": "tretd"
            };
            self.ingredientList.push(newRecord);
        };

        self.update = function (idx, ing) {
            console.log('apdx4 list update; ');
            //self.ingredientList[idx] = angular.copy(ing);
        };

        self.delete = function (idx) {
            //console.debug('frmList delete: ' + idx);
            if (self.ingredientList.splice(idx, 1))
                self.resetToCollapsed = true;

        }

    }
})();
