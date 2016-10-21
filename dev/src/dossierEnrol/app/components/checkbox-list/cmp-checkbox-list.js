/**
 * Created by Abdessamad on 8/10/2016.
 */


(function () {
    'use strict';

    angular
        .module('checkBoxListModule', [])
})();

(function () {
    'use strict';

    angular
        .module('checkBoxListModule')
        .component('cmpCheckboxList', {
            templateUrl: './components/checkbox-list/tpl-checkbox-list.html',
            controller: checkBoxListCtrl,
            controllerAs: 'chkl',
            bindings: {
                title: '@',
                commonName: '@',
                listItems: '<', //array of objects
                onUpdate:'&'
            }
        });

    function checkBoxListCtrl() {

        var self = this;
        self.$onInit = function () {
            //init items after change
            //temp as not hooked up
            self.currentModel = self.listItems
        }
        self.$onChanges = function (changes) {

            if (changes.listItems) {
                self.currentModel = changes.listItems.currentValue;
            }
        };


        /*self.$doCheck = function () {
            if (!angular.equals(self.currentModel, self.listItems)) {
                console.log('checkboxlist currentModel: ' + self.currentModel.title);
            }
        }*/

        //TODO remove?
        self.someSelected = function () {
            var object = self.roleModel;

            if (!object) return false;
            return Object.keys(object).some(function (key) {
                //console.log("cmpAddressRole someSelected: " + object[key]);
                return object[key];
            });
        }
        //TODO remove?
        self.updateRoleModel = function () {

            self.formName.addressRole.$dirty =
                self.formName.addressRole.$touched = true;

            self.formName.addressRole.$pristine = !self.formName.addressRole.$dirty;
            self.formName.addressRole.$untouched = !self.formName.addressRole.$touched;

            //self.onUpdate({$event: {roles: self.roleModel}});

        }
        /**
         * Manages the state of the other field
         * @param item
         */
        self.updateState = function (item) {
            if (!item.value) {

                item.value = false; //explicit false value

                if(item.hasOtherDetails){
                    item.otherText = "";
                }
            }

           self.onUpdate({list:self.currentModel});
        }

    }
})();


