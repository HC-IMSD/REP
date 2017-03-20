/**
 * Created by dkilty on 3/18/2017.
 */


(function () {
    'use strict';

    angular
        .module('errorSummaryModule', [])
})();

(function () {
    'use strict';

    angular
        .module('errorSummaryModule')
        .component('cmpErrorSummary', {
            templateUrl: 'app/scripts/components/error-summary/tpl-error-summary.html',
            controller: errorSummaryController,
            controllerAs: 'errSummaryCtrl',

            bindings: {
                formRef: '<',
                formTarget:'<',
                showErrors:'<',
                updateErrors:'<',
                nameSuffix:'@',
                formPreamble:'@'

            }
        });
    //errorSummaryController.$inject = [];

    function  errorSummaryController() {
        var vm = this;
        vm.parentRef=null;
        vm.targetFormRef=null;
        vm.errorArray=[];
        vm.uniqueErrorList={};
        vm.prevValue={};
        vm.isVisible=false;
        vm.nameAddendum="";
        vm.exclusions={
            "contactListCtrl.contactListForm":"true"
        };
        vm.headingPreamble="";

        vm.$onInit = function () {

        };

        /**
         *
         * @param changes
         */
        vm.$onChanges = function (changes) {

            if(changes.nameSuffix){
                vm.nameAddendum="-"+changes.nameSuffix.currentValue;
            }
            if(changes.formPreamble){
                vm.headingPreamble=changes.formPreamble.currentValue;
            }
            if(changes.formRef){
                console.log("there is a change")
                console.log(changes.formRef.currentValue);
                //vm.targetFormRef=angular.copy(changes.formErrors.currentValue);
                console.log(vm.targetFormRef);

                vm.getErrorsSumm(changes.formRef.currentValue.$error,changes.formRef.currentValue.$name);

            }
            if(changes.formTarget){
                vm.targetFormRef=changes.formTarget.currentValue;
            }
            if(changes.updateErrors){
                console.log("detect getErrors");
                if(vm.formRef) {
                   vm.getErrorsSumm(vm.formRef.$error,""+vm.formRef.$name);
                    console.log("ran getErrors")
                }
            }
            if(changes.showErrors){

                vm.isVisible=changes.showErrors.currentValue;
            }

        };
        /*vm.$doCheck=function(){
            console.log("running do check");
            console.log( vm.targetFormRef);
            console.log(vm.formErrors);
            if( vm.formErrors && vm.getErrors==true) {
                vm.getErrorsSumm( vm.formErrors.$error,""+ vm.formErrors.$name);
            }

        };*/
        vm.setIsVisible=function(){
            return(vm.isVisible &&(vm.errorArray && vm.errorArray.length>0))

        };

        vm.getErrorsSumm=function(myformErrors,name) {
            vm.errorArray=[];
            vm.uniqueErrorList={};
             _getErr(myformErrors,vm.uniqueErrorList,name);

                 var temp= Object.keys(vm.uniqueErrorList).map(function (k) {
                     return vm.uniqueErrorList[k]
                 });
            if(!angular.equals(vm.prevValue,temp)){
                console.log("not equal")
                vm.errorArray=temp;
            }

            console.log(vm.errorArray)

        };


        function _getErr(errorObj,resultsList,parent){
            var keys = Object.keys(errorObj);
            var newList={};
            console.log("Number of keys"+keys.length);
            for (var i = 0; i < keys.length; i++) {
                var record=errorObj[keys[i]];

                for(var j=0;j<record.length;j++)

                    if(record[j].$invalid===true && record[j].$name.indexOf('.')>0){

                       // contactListCtrl.contactListForm
                        if(vm.exclusions.hasOwnProperty(record[j].$name)){
                            var result={};
                            result[record[j].$name]={
                                name:record[j].$name,
                                type:keys[i],
                                parent:parent,
                                concat:parent+'.'+ record[j].$name,
                                isSummary:true
                            };
                            angular.merge(resultsList,result);

                        }else {
                            _getErr(record[j].$error, resultsList, record[j].$name);
                        }

                    }else if(record[j].$invalid===true && !resultsList.hasOwnProperty(record[j].$name) ){
                        var result={};
                        result[record[j].$name]={
                            name:record[j].$name,

                            type:keys[i],
                            parent:parent,
                            concat:parent+'.'+ record[j].$name,
                            isSummary:false
                        };


                        // result.name=record[j].$name;
                        //result.type=keys[i];
                        angular.merge(resultsList,result);
                        //resultsList.push(result);
                    }

            }

        }

    }




})();