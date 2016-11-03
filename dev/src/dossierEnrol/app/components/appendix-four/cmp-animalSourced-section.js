/**
 * Created by dkilty on 02/11/2016.
 */

(function () {
    'use strict';

    angular
        .module('animalSourcedSection',['animalSourcedList'])
})();

(function () {
    'use strict';

    angular
        .module('animalSourcedSection')
        .component('cmpAnimalSourcedSection', {
            templateUrl: './components/appendix-four/tpl-animalSourced-section.html',
            bindings: {
                records: '<',
                showErrors: '&'
            },
            controller: animalSourcedSectionController,
            controllerAs: 'animalSectCtrl'
        });

    animalSourcedSectionController.$inject = ["$filter",'DossierLists'];

    function animalSourcedSectionController($filter,DossierLists) {

        var vm = this;
        vm.yesNoUnknownList=DossierLists.getYesNoUnknownList();
        vm.model={};
        vm.model.animalSrcSection=[];


        vm.$onInit = function () {
            //init code here
        }


        vm.$onChanges = function (changes) {

            if (changes.records) {
                vm.model=changes.records.currentValue;
            }
        }

        /*var emptyAnimalSource={
            "animalSrcList":[],
            "isCellLine":"",
            "isBiotechDerived":"",
            "isControlledPop":"",
            "ageAnimals":"",
            countryList: []
        }*/

        /**
         * @ngdoc method determines the state of the list errors
         *
         * @returns {boolean}
         */
        vm.showError = function (ctrl) {
            if(!ctrl){
                console.warn("No control animalSourced-section")
                return false;
            }
           return((ctrl.$invalid && ctrl.$touched)||(ctrl.$invalid && vm.showErrors()))
        };

        self.updateCountryList = function(list){

            self.model.countryList = list;
           // self.onUpdate({model:self.model});

        };


    }
})();