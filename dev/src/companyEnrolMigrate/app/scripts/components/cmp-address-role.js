/**
 * Created by Abdessamad on 7/4/2016.
 */

(function () {
    'use strict';

    angular
        .module('addressRole', [])
})();

(function () {
    'use strict';

    angular
        .module('addressRole')
        .component('cmpAddressRole', {
            templateUrl: 'app/views/tpl-address-role.html',
            controller: addressRoleCtrl,
            controllerAs: 'ar',
            bindings: {
                //formName: '<',
                record: '<',
                onUpdate: '&',
                showErrors:'&',
                isContact:'<'
            }
        });

    addressRoleCtrl.$inject = ['$scope']
    function addressRoleCtrl($scope) {

        var vm = this;
        vm.isReq=true;
       // vm.noneSelected=true
        vm.roleModel = {
            manufacturer: false,
            mailing: false,
            billing: false,
            repPrimary: false,
            repSecondary: false
        };
        vm.$onInit = function () {
            //after init
            console.log("onInit role details");
            //vm.noneSelected=vm.isSelected();
            if (vm.record) {
                //doesn't copy as this is a dumb component
                console.log("from record role is "+JSON.stringify(vm.record));
                vm.roleModel = vm.record;

            }
        }
        vm.$onChanges=function(changes){
            console.log("role on changes event")
           if(changes.record){
               vm.roleModel=(changes.record.currentValue.addressRole);
           }
        }

        vm.isSelected = function () {
            var obj=vm.roleModel;
            for (var key in obj){
                var attrName = key;
                var attrValue = obj[key];
                if(attrValue===true){
                    return false;
                }
            }
            return true
        }

        vm.showError=function(){
            if((vm.roleForm.addressRole.$touched && vm.roleForm.addressRole.$invalid) || vm.showErrors()){
                return true
            }
            return false
        }


    }


})();