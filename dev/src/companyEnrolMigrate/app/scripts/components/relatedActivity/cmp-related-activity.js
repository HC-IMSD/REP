/**
 * Created by dkilty on 29/08/2016.
 */

(function () {
    'use strict';

    angular
        .module('activityRecord', ['dinModule'])
})();

(function () {
    'use strict';

    angular
        .module('activityRecord')
        .component('cmpActivityRecord', {
            templateUrl: 'app/scripts/components/relatedActivity/tpl-related-activity.html',
            controller: activityRecCtrl,
            controllerAs: 'activityCtrl',
            bindings: {
                activityRecord: '<',
                updateValid: '&',
                onDelete: '&',
                isAmend: '&',
                isDetailValid: '&',
            }
        });
    activityRecCtrl.$inject = ['$scope']

    function activityRecCtrl($scope) {
        var vm = this;
        vm.savePressed = false;

        vm.isNotEditable = false;
        //TODO get  model from a servide
        vm.activityModel={};

        vm.$onInit = function () {
           // vm.activityModel=vm.activityModel;
        };

        /**
         * Due to binding with table expander this method does not get called
         * @param changes
         */
        vm.$onChanges = function (changes) {
            //how this is currently wired, this will never fire!
            if (changes.activityRecord) {
                vm.activityModel = angular.copy(changes.activityRecord.currentValue);
                console.log("Activity model" + JSON.stringify( vm.activityModel))

            }
        };

        vm.addDin=function(){
            vm.activityModel.assocDins.push({dinNumber:""})

        };
        vm.deleteDin=function(index){
            //using index in
            if(index> vm.activityModel.assocDins.length-1){
                return;
            }
            vm.activityModel.assocDins.splice(index, 1);
        }


        /**
         *  calls the delete function on the parent
         */
        vm.delete = function () {
            vm.onDelete({addressId: vm.activityModel.addressID});
        };
        /* @ngdoc method -discards the changes and reverts to the model
         *
         */
        vm.discardChanges = function () {
            if (vm.addressRecForm.$pristine) return;
            var currRecord = vm.trackRecordCtrl.trackRecord();
            vm.activityModel = angular.copy(currRecord);
            vm.setNotEditable(); //case of amend
           // vm.addressRecForm.$setPristine();
            vm.isDetailValid({state: vm.addressRecForm.$valid});
            vm.savePressed = false;
        };

        /**
         * @ngdoc method -Updates the parent on whether this record is valid or not
         */
        vm.updateValid = function () {
           // vm.isDetailValid({state: (vm.addressRecForm.$valid && !vm.addressRecForm.$dirty)});
        };

      /*  $scope.$watch('addressRec.addressRecForm.$dirty', function () {
            if (vm.addressRecForm.$dirty) {
                vm.isDetailValid({state: false})
            }
        }, true);*/

        /**
         * Updates the contact model used by the save button
         */
        vm.updateActivityModel = function () {
            if (vm.addressRecForm.$valid) {
                vm.isDetailValid({state: true});
                vm.addressRecForm.$setPristine();
                vm.onUpdate({rec: vm.activityModel});
            }
            vm.savePressed = true;
        };
        /**
         * @ngdoc method toggles error state to make errors visible
         * @returns {boolean}
         */
        vm.showErrors = function () {

            return (vm.savePressed)
        };
        vm.isDinInvalid=function(index){
            console.log("in invalid "+index)
            if(vm.activityModel.assocDins[index].dinNumber){
                return false;
            }
            return true
        }

        /**
         * Controls errors state of an individual UI control. Since cannot pass the control for some reason
         * pass the needed state variables... very annoying
         * @param isTouched
         * @param isInvalid
         * @returns {boolean}
         */
        vm.showError = function (isTouched, isInvalid) {

            if ((isInvalid && isTouched) || (vm.showErrors() && isInvalid )) {
                return true
            }
            return false
        }


        /**
         * @ngdoc method used to determine if record should be editable. Used for amend
         * @returns {boolean}
         */
        vm.setNotEditable = function () {

            if (vm.isAmend() && !vm.activityModel.amendRecord) {
                vm.isNotEditable = true;
            } else {
                vm.isNotEditable = false
            }
        }

    }


})();