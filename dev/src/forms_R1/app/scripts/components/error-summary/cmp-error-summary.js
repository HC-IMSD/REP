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
                formPreamble:'@',
                makeFocused:'<'

            }
        });
    errorSummaryController.$inject = ['$scope'];

    function  errorSummaryController($scope) {
        var vm = this;
        vm.parentRef=null;
        vm.targetFormRef=null;
        vm.errorArray=[];
        vm.uniqueErrorList={};
        vm.prevValue={};
        vm.isVisible=false;
        vm.nameAddendum="";
        vm.rootError="";
        vm.isFocusInput=0;
        vm.exclusions={
            "contactListCtrl.contactListForm":"true",
            "contactRec.contactRecForm":"true"
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
            };

         /*   <cmp-error-summary form-ref="main.companyEnrolForm" show-errors="true" form-preamble="Company Enrolment Form"
            update-errors="main.updateSummary" make-focused="main.updateSummary" name-suffix="main.companyEnrolForm"></cmp-error-summary>*/

            //the base form that this error summary is checking for
            if(changes.formRef){
                console.log("there is a change to the form ref")
                console.log(changes.formRef.currentValue);
                console.log(vm.targetFormRef);

                vm.getErrorsSumm(changes.formRef.currentValue.$error,changes.formRef.currentValue.$name);

            }

            //TODO remove form target
            if(changes.formTarget){
                vm.targetFormRef=changes.formTarget.currentValue;
            }

            if(changes.showErrors){

                vm.isVisible=changes.showErrors.currentValue;
            }


            if(changes.updateErrors){
                console.log("Calling update Errors in errorSummary");
                if(vm.formRef) {
                    //pass in the form name and the error object
                    console.log("==============" + "Start getErrors for form "+vm.formRef.$name);
                   vm.getErrorsSumm(vm.formRef.$error,vm.formRef.$name);

                    console.log("==============End getErrors for form "+vm.formRef.$name);

                }
            }
            if(changes.makeFocused){
                if(angular.isDefined(changes.makeFocused.currentValue)) {
                    vm.isFocusInput = vm.isFocusInput + 1;
                }
            }

        };
        /***
         * Determines if the summary is visible
         * @returns {boolean|*|Array}
         */
        vm.calcIsVisible=function(){
            var summaryIsVisible=_isErrorSummaryVisible();
            if(!summaryIsVisible){
                $scope.$emit('childErrorSummaryHide',+vm.nameAddendum);
            }
            return(summaryIsVisible);
        };

        function _isErrorSummaryVisible(){
           return (vm.isVisible &&(vm.errorArray && vm.errorArray.length>0));
        }

        $scope.$on('childErrorSummaryHide', function(event, data) {
           // $scope.mainData.logs = $scope.mainData.logs + '\nMainController - receive EVENT "' + event.name + '" with message = "' + data.message + '"';
            if(_isErrorSummaryVisible()) {
                var errorSummaryBroadcastName = data.message;
                for (var i = 0; i < vm.errorArray.length; i++) {
                    var errorRecord=errorArray[i];
                    if(errorRecord.isSummary && errorRecord.name===errorSummaryBroadcastName){
                        vm.errorArray.splice(i, 1);
                    }
                }
            }
        });

        vm.getErrorsSumm=function(myformErrors,name) {
            vm.errorArray=[];
            vm.uniqueErrorList={};
             _getErr(myformErrors,vm.uniqueErrorList,name);

                 var newErrors= Object.keys(vm.uniqueErrorList).map(function (k) {
                     return vm.uniqueErrorList[k]
                 });
            if(!angular.equals(vm.prevValue,newErrors)){
                angular.element(vm.rootError).trigger('focus');
                vm.errorArray=newErrors;
            }
        };

        //gets all the errors from error objects
        function _getErr(errorObj,resultsList,parent){
            var keys = Object.keys(errorObj);
            var newList={};
            for (var i = 0; i < keys.length; i++) {
                var record=errorObj[keys[i]];

                for(var j=0;j<record.length;j++)

                    if(record[j].$invalid===true && record[j].$name.indexOf('.')>0){

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
                            name:_scrubFieldName(record[j].$name),
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

        function _scrubFieldName(rawName){
            var separator='_';
            var index=rawName.lastIndexOf(separator);
            var cleanedName="";
            if(index>-1) {
                cleanedName = rawName.substring(0, index);
            }else{
                cleanedName=rawName;
            }
            return cleanedName;
        };


    }//end controller




})();