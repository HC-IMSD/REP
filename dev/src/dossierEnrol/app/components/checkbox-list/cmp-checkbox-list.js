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
        .component('cmpCheckBoxList', {
            templateUrl: './components/checkbox-list/tpl-checkbox-list.html',
            controller: checkBoxListCtrl,
            controllerAs: 'chkl',
            bindings: {
                title: '@',
                listItems: '<' //array of objects
            }
        });


    function checkBoxListCtrl(){

        var self = this;

        self.$onInit = function(){

            var  object= {};

            for(var item in self.listItems){
                object[item.name] = item.value;
            }

            self.roleModel = JSON.stringify(object);

        }

        self.someSelected = function () {
            var object = self.roleModel;

            if (!object) return false;
            return Object.keys(object).some(function (key) {
                //console.log("cmpAddressRole someSelected: " + object[key]);
                return object[key];
            });
        }

        self.updateRoleModel = function () {

            self.formName.addressRole.$dirty =
                self.formName.addressRole.$touched = true;

            self.formName.addressRole.$pristine = !self.formName.addressRole.$dirty;
            self.formName.addressRole.$untouched = !self.formName.addressRole.$touched;

            self.onUpdate({$event: {roles: self.roleModel}});

        }

    }
})();


