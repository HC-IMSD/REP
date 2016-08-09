/**
 * Created by dkilty on 8/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('contactRecord', [])
})();

(function () {
    'use strict';

    angular
        .module('contactRecord')
        .component('cmpContactRecord', {
            templateUrl: 'app/scripts/components/contactRecord/tpl-contact-record.html',
            controller: addressRecCtrl,
            controllerAs: 'contactRec',
            require: {
                trackRecordCtrl:    '^trackRecord'
            },
            bindings: {
                contactRecord: '<',
                onUpdate: '&',
                updateValid:'&',
                checkRoles:'&',
                onDelete:'&',
                isAmend:'&',
                isDetailValid:'&',
                isRoleSelected:'&'
            }
        });
        addressRecCtrl.$inject=['$scope']
    function addressRecCtrl($scope) {
        var vm = this;
        vm.savePressed=false;
        vm.isContact=true; //used to set the state of the role
       //TODO get role model from a servide
        vm.roleModel = {
            manufacturer: false,
            mailing: false,
            billing: false,
            repPrimary: false,
            repSecondary: false
        };
        vm.contactModel={
                roleConcat:"",
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
        vm.isOneSelected=function(type){
            return(vm.isRoleSelected({roleName:type,id:vm.contactModel.contactId}));
        }
        vm.$onInit = function () {
            //after init do not initialise variables here onchanges is called first
                var rec=vm.trackRecordCtrl.trackRecord();
                console.log("init record is there a record"+rec)
                //only bind if there is a record. Should never happen
                if(rec) {
                    console.log("contactRec init" +JSON.stringify(rec))
                    vm.contactModel = angular.copy(rec);
                    vm.contactModel.roleConcat=_getRolesConcat();
                }
        }

        function _getRolesConcat(){
            var addressRoles=vm.contactModel.addressRole;
            var result="";

            if(addressRoles.manufacturer){
                result= result+" MAN"
            }
            if(addressRoles.billing){
                result= result+" BILL"
            }
            if(addressRoles.mailing){
                result= result+" MAIL"
            }
            if(addressRoles.repPrimary){
                result= result+" REP 1"
            }
            if(addressRoles.repSecondary){
                result= result+" REP 2"
            }
            return result
        }

        /**
         * Due to binding with table expander this method does not get called
         * @param changes
         */
        vm.$onChanges=function(changes){
            console.log("There are changes to contactRecord")
            //how this is currently wire, this will never fire!
            if(changes.contactRecord.currentValue) {
               // console.log("There are changes to contactRecord")
                vm.contactModel = angular.copy(changes.contactRecord.currentValue);

            }

        }



        /**
         *  calls the delete function on the parent
         */
        vm.delete = function () {
            vm.onDelete({contactId: vm.contactModel.contactId});
        }
        /* @ngdoc method -discards the changes and reverts to the model
        *
         */
        vm.discardChanges=function(){
            console.log("discarding the changes")
            if(vm.contactRecForm.$pristine) return;
            var currRecord=vm.trackRecordCtrl.trackRecord()
            vm.contactModel =angular.copy(currRecord);
            //vm.contactRecForm.$setPristine();
            //vm.contactRecForm.$setUntouched();
            vm.isDetailValid({state:vm.contactRecForm.$valid});
            vm.savePressed=false;
        }

        vm.onContactRoleUpdate = function (newRole) {
            var aRole={};
            console.log("Inside contact role update"+JSON.stringify(newRole))
            angular.extend(aRole,newRole)
            vm.contactModel.addressRole = aRole;
            vm.updateContactModel2();
        }

        vm.updateValid=function(){
            console.log("updating valid")
           // vm.contactModel.isDetailValid=vm.contactRecForm.$valid && !vm.contactRecForm.$dirty ;
            vm.isDetailValid({state:(vm.contactRecForm.$valid && !vm.contactRecForm.$dirty) });
        }

        $scope.$watch('contactRec.contactRecForm.$dirty', function() {
            if(vm.contactRecForm.$dirty) {
                console.log("@@@@@@@@@@@@Form is dirty")
                //vm.contactModel.isDetailValid = false;
                vm.isDetailValid({state:false})
            }
        }, true);

        /**
         * Updates the contact model used by the save button
         */
        vm.updateContactModel2 = function () {
            console.log("updating Contact model ::contactRecord")
            console.log("Is it valid"+ vm.contactRecForm.$valid)
           // vm.contactModel.isDetailValid=vm.contactRecForm.$valid && !vm.contactRecForm.$dirty ;
            vm.contactModel.roleConcat=_getRolesConcat();
            console.log("concat "+vm.contactModel.roleConcat)
          if(vm.contactRecForm.$valid) {
             // vm.contactModel.isDetailValid=true;
              vm.isDetailValid({state:true})
              vm.contactRecForm.$setPristine() ;
                vm.onUpdate({rec: vm.contactModel});

              console.log("@@@@@@@@@@@@Setting form to valid")

            }
            vm.savePressed=true;
        }
        /**
         * @ngdoc method toggles error state to make errors visible
         * @returns {boolean}
         */
        vm.showErrors=function(){

            return(vm.savePressed)
        }
        /**
         * @ngdoc method used to determine if record should be editable. Used for amend
         * @returns {boolean}
         */
        vm.setNotEditable=function(){

            if(vm.isAmend() &&!vm.contactModel.amendRecord){
                return true;
            }
            return false
        }

    }


})();