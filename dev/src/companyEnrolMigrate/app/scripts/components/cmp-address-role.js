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
                formName: '<',
                record: '<',
                onUpdate: '&',
                childShowError:'&',
                isContact:'<'
            }
        });

    addressRoleCtrl.$inject = ['$scope']
    function addressRoleCtrl($scope) {

        var vm = this;

        vm.$onInit = function () {
            vm.isReq=true;
            vm.roleModel = {
                manufacturer: false,
                mailing: false,
                billing: false,
                repPrimary: false,
                repSecondary: false
            };
           /* if (vm.record) {
                vm.roleModel = vm.record;
            }*/
        }
        vm.$onChanges=function(changes){

            if (changes.record.isFirstChange()){
                return
            }

           if(changes.record.currentValue){
              // angular.copy(vm.roleModel,changes.record.currentValue);
               angular.extend(vm.roleModel,changes.record.currentValue);
           }
        }

        vm.noneSelected = function () {
           /* var object = vm.roleModel;
            if (!object) return false;
            return (Object.keys(object).some(function (key) {
                console.log("result os "+object[key])
                return object[key];
            }));*/

            var obj=vm.roleModel;
            for (var key in obj){
                var attrName = key;
                var attrValue = obj[key];
                if(attrValue===true){
                    vm.formName.addressRole.$setValidity("required", true);
                    return false;
                }
            }
            vm.formName.addressRole.$setValidity("required", false);
            return true
        }

        vm.showError=function(){
            if((vm.childShowError() && vm.noneSelected()) || (vm.noneSelected() &&  vm.formName.addressRole.$touched) ){
                return true
            }
        }


        vm.updateRoleModel = function () {

            //fix role model
            var obj = {
                manufacturer: false,
                mailing: false,
                billing: false,
                repPrimary: false,
                repSecondary: false
            };

            for (var key in obj){
                var attrName = key;
               console.log("Key in roleModel "+key +(key in  vm.roleModel))
                if(!(key in vm.roleModel)|| vm.roleModel[key]==undefined ){
                    console.log(attrName+" Not found");
                   obj[key]=false;
                }else{
                    obj[key]=vm.roleModel[key]
                    console.log("Value from rolemodel "+vm.roleModel[key])
                }

            }
            console.log("Afterwareds "+JSON.stringify(obj))

           // vm.formName.addressRole.$valid=isSelected;
           /* if(isSelected) {
                vm.formName.addressRole.$error = "";
            }else{
                vm.formName.addressRole.$error={required:true}
            }*/
            vm.formName.addressRole.$setDirty()
            vm.formName.addressRole.$setTouched();
            vm.isReq=vm.noneSelected();
            vm.formName.addressRole.$validate()
            vm.onUpdate({$event: {roles: obj}});

        }

    }


})();