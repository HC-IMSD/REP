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
                onDelete: '&',
                isAmend: '&',
                updateValid: '&',//tells parent that the details are valid/not valid
                checkRoles: '&'
            }
    });


    contactCtrl.$inject = ['$scope', 'getContactLists', 'getRoleLists']
    function contactCtrl($scope, getContactLists, getRoleLists) {
        var vm = this;

        vm.$onInit = function () {
            console.log("creating a contact "+vm.checkRoles({roleValue:'ff'}));
            vm.savePressed=false;
            vm.isContact=true; //used to control state of roles
            vm.disableRepRole=vm.checkRoles({roleValue:''})
            vm.ngModelOptSetting = {updateOn: 'blur'}
            vm.salutationList = getContactLists.getSalutationList();
            vm.contactRoleList = getRoleLists.getContactRoles();
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
            if (vm.contactRecord) {
                vm.contactModel = vm.contactRecord; //workaround
                //angular.extend(vm.contactModel, vm.contactRecord);
            }
        }
        //TODO rename
        vm.$onChanges=function(){
             console.log("changes details")
            vm.disableRepRole=vm.checkRoles({roleValue:''})
        }

        vm.delete = function () {
            vm.onDelete({contactId: vm.contactModel.contactId});
        }


        vm.onContactRoleUpdate = function (newRole) {
            var aRole={};
            console.log("Inside contact role update"+JSON.stringify(newRole))
            angular.extend(aRole,newRole)
            vm.contactModel.addressRole = aRole;

            vm.updateContactModel();
        }

        vm.updateContactModel = function () {
            $scope.contactForm.validate();
            console.info("Contact form is valid "+  $scope.contactForm.$valid);
         vm.contactModel.isDetailValid = $scope.contactForm.$valid;
            vm.updateValid({validState:vm.contactModel.isDetailValid});
         //vm.onUpdate({contact: vm.contactModel});
        }
        /**
         * @ngdoc method condition by which to show an error
         * @param control
         * @returns {boolean}
         */
        vm.showError = function (control) {
            if ((control.$invalid&& !control.$pristine) || (vm.savePressed&& control.$invalid)) {
                return true;
            }
        }
        /**
         * @ngdoc method passes whether to show an error for a child component. Should override the
         * defualt behaviour for error showing or hiding of the child
         * @param control
         * @returns {boolean}
         */
        vm.showChildError=function(){
            if(vm.savePressed) {
                return true
            }
            return false;
        }
        /**
         * @ngdoc method -determines if the fields should be readonly by default
         * @returns {boolean}
         */
        vm.setNotEditable=function(){
            if(vm.isAmend() &&!vm.contactModel.amendRecord){
                return true;
            }
            return false
        }
        vm.save=function(){
            vm.savePressed=true;
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
            scope: {}
        };
        return directive;

       function link (scope, elm, attrs, ctrl) {


            ctrl.$validators.integer = function(modelValue, viewValue) {
                var INTEGER_REGEXP = /^\-?\d+$/;
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                if (INTEGER_REGEXP.test(viewValue)) {
                    // it is valid
                    return true;
                }

                // it is invalid
                return false;
            };
        }
    }

   // ControllerName.$inject = ['dependency'];

    /* @ngInject */
   function foo() {

    }

})();

