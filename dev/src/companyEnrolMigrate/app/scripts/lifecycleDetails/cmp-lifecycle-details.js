/**
 * Created by dkilty on 8/13/2016.
 */


(function () {
    'use strict';

    angular
        .module('lifecycleDetails',[])
})();

(function () {
    'use strict';

    angular
        .module('lifecycleDetails')
        .component('cmpLifecycleDetalis', {
            templateUrl: 'app/scripts/lifecycleDetails/tpl-lifecycle-details.html',
            controller: lifecycleRecCtrl,
            controllerAs: 'lifecycleRec',

            bindings: {
                lifecycleRecord: '<',
                onUpdate: '&',
                showErrors: '&',
            }
        });
    //addressRecCtrl.$inject=['$scope']
    function lifecycleRecCtrl() {
        var vm = this;
        vm.savePressed = false;

        vm.lifecycleModel={};


        vm.$onInit = function () {

        };


        /**
         * D
         * @param changes
         */
        vm.$onChanges = function (changes) {
            if (changes.lifecycleRecord) {
                vm.lifecycleModel = changes.lifecycleRecord.currentValue;
            }
        };

        /**
         *  calls the delete function on the parent
         */
        vm.delete = function () {
           // vm.onDelete({contactId: vm.addressModel.contactId});
        };
        /* @ngdoc method -discards the changes and reverts to the model
         *
         */
        vm.discardChanges = function () {
           /* if (vm.addressRecForm.$pristine) return;
            var currRecord = vm.trackRecordCtrl.trackRecord();
            vm.addressModel = angular.copy(currRecord);
            vm.isDetailValid({state: vm.addressRecForm.$valid});
            vm.savePressed = false;*/
        };

        vm.onAddressRoleUpdate = function (newRole) {
           /* var aRole = {};
            angular.extend(aRole, newRole);
            vm.addressModel.addressRole = aRole;
            vm.updateAddressModel2();*/
        };
        /**
         * @ngdoc method -Updates the parent on whether this record is valid or not
         */
        vm.updateValid = function () {
            //vm.isDetailValid({state: (vm.addressRecForm.$valid && !vm.addressRecForm.$dirty)});
        };


        /**
         * Updates the contact model used by the save button
         */
       /* vm.updateAddressModel2 = function () {
            if (vm.addressRecForm.$valid) {
                if (vm.addressRecForm.$valid) {
                    vm.isDetailValid({state: true});
                    vm.addressRecForm.$setPristine();
                    vm.onUpdate({rec: vm.addressModel});
                }
                vm.savePressed = true;
            }
            /!**
             * @ngdoc method toggles error state to make errors visible
             * @returns {boolean}
             *!/
            vm.showErrors = function () {

                return (vm.savePressed)
            };
            /!**
             * @ngdoc method used to determine if record should be editable. Used for amend
             * @returns {boolean}
             *!/
            vm.setNotEditable = function () {

                if (vm.isAmend() && !vm.addressModel.amendRecord) {
                    return true;
                }
                return false;
            }

        }*/
    }

})();