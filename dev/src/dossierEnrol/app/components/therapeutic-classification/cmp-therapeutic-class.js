/**
 * Created by Abdessamad on 8/16/2016.
 */
(function () {
    'use strict';

    angular
        .module('therapeuticClassModule', [])
})();

(function () {
    'use strict';

    angular
        .module('therapeuticClassModule')
        .component('cmpTherapeuticClass', {
            templateUrl: './components/therapeutic-classification/tpl-therapeutic-class.html',
            controller: therapeuticClassCtrl,
            bindings: {
                listItems: '<',
                onUpdate: '&',
                onDelete: '&'
            }
        });


    function therapeuticClassCtrl(){
        var self = this;

        self.$onInit = function(){
            self.model={
                classifications : [
                    {"id":1, "name":"classification1"},
                    {"id":2, "name":"classification2"},
                    {"id":3, "name":"classification3"},
                    {"id":4, "name":"classification4"},
                    {"id":5, "name":"classification5"}
                ],
                selected:{}
            }
        }

        // gets the template to ng-include for a table row / item
        self.getTemplate = function (item) {
            if (item.id === self.model.selected.id) return 'edit';
            else return 'display';
        };

        self.editRecord = function (item) {
            self.model.selected = angular.copy(item);
        };

        self.saveRecord = function (idx) {
            console.log("Saving item");
            self.model.classifications[idx] = angular.copy(self.model.selected);
            self.reset();
        };

        self.reset = function () {
            self.model.selected = {};
        };
    }
})();