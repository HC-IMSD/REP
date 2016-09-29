/**
 * Created by Abdessamad on 8/22/2016.
 */

(function () {
    'use strict';

    angular
        .module('appendix4RecordModule', ['tissuesFluidsOriginModule', 'sourceAnimalModule'])
})();

(function () {
    'use strict';

    angular
        .module('appendix4RecordModule')
        .component('cmpAppendixFourRecord', {
            templateUrl: './components/appendix-four/tpl-appendix-four-record.html',
            controllerAs: 'ap4RecCtrl',
            controller: app4RecCtrl,
            bindings: {
                record: '<',
                showListErrors: '&'
            }

        });

    function app4RecCtrl(){

        var self = this;

        self.$onInit = function(){

            self.model = {
                ingredientName : "zcdcsdc",
                humanSourced : false,
                animalSourced : false,

                tissuesFluidsOrigin : {},

                animalSourcedInfo : {}
            }
        }
        self.$onChanges = function (changes) {
            if (changes.record) {
                self.model = angular.copy(changes.record.currentValue);
            }

        }
        self.isSourcedSelected = function () {
            return (self.model.humanSourced || self.model.animalSourced)

        }

        self.noSelectionError = function () {
            return ((self.appendix4RecForm.$dirty && !self.isSourcedSelected() ) || (self.showListErrors() && !self.isSourcedSelected()));
        }

    }
})();
