/**
 * Created by Abdessamad on 7/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('contactModule', [
            'addressRole',
            'dataLists'
        ])
})();

(function () {
    'use strict';

    angular
        .module('contactModule').
        component('cmpContactDetails',{
            templateUrl: 'app/views/tpl-contact-details.html',
            controller: contactCtrl,
            bindings: {
                contactRecord: '<',
                onUpdate: '&',
                isAmend: '&',
                showErrors:'&'
            }
    });

    contactCtrl.$inject = ['getContactLists']
    function contactCtrl( getContactLists) {
        var vm = this;
        vm.ngModelOptSetting = {updateOn: 'blur'}
        vm.salutationList = getContactLists.getSalutationList();
        vm.langCorrespondance = getContactLists.getLanguages();
        vm.contactModel = {
            isDetailValid: false,
            contactId: "",
            amendRecord: false,
            addressRole: {
                manufacturer: false,
                mailing: false,
                billing: false,
                importer: false
            },
            contactRole: "",
            salutation: "",
            givenName: "",
            surname: "",
            initials: "",
            title: "",
            phone: "",
            PhoneExt: "",
            fax: ""
        };
        vm.$onInit = function () {
            console.log("onInit contact details");
           if (vm.contactRecord) {
                //doesn't copy as this is a dumb component
                vm.contactModel = vm.contactRecord;
            }
        }
        //TODO rename
        vm.$onChanges=function(changes){
             console.log("changes details")
            if(changes.contactRecord){
                vm.contactModel = changes.contactRecord.currentValue;
                console.log("showErrors"+vm.showErrors())
            }

        }
        vm.showError=function(ctrl){
            if((ctrl.$invalid && ctrl.$touched) || (vm.showErrors()&&ctrl.$invalid )){
                return true
            }
            return false
        }

        /**
         * Updates the contact role
         * @param newRole
         */
       /* vm.onContactRoleUpdate = function (newRole) {
            var aRole={};
            console.log("Inside contact role update"+JSON.stringify(newRole))
            angular.extend(aRole,newRole)
            vm.contactModel.addressRole = aRole;
            console.log(JSON.stringify(vm.contactModel));
            vm.updateContactModel();
        }*/

        /**
         * @ngdoc method -determines if the fields should be readonly by default
         * @returns {boolean}
         */
        //TODO valildated this is needed by the parent
        vm.setNotEditable=function(){
            if(vm.isAmend() &&!vm.contactModel.amendRecord){
                return true;
            }
            return false
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('contactModule')
        .directive('testValid', testValid)

    /* @ngInject */
    function testValid() {
        var directive = {
            bindToController: true,
            controller: foo,
            controllerAs: 'vm',
            require: 'ngModel',
            link: link,
            restrict: 'A',
            scope: {
                testValid:'='
            }
        };
        return directive;

       function link (scope, elm, attrs, ctrl) {

            //new validation rule and name of the property
           ctrl.$validators.integer = function(modelValue, viewValue) {
                var INTEGER_REGEXP = /^\-?\d+$/;

                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                if (viewValue==theval) {
                    // it is valid
                    console.log("it is valid")
                    return true;
                }

                // it is invalid
               console.log("it is invalid")
               modelValue=viewValue
                return false;
            };
        }
    }

   // ControllerName.$inject = ['dependency'];

    /* @ngInject */
   function foo() {

    }

})();

