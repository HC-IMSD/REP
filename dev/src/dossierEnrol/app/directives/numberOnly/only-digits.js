/**
 * Created by dkilty on 9/1/2016.
 */


/**
 * Created by hcuser on 20/05/2016.
 */


(function () {
    'use strict';

    angular
        .module('numberFormat', []);

})();

(function () {
    'use strict';

    angular
        .module('numberFormat')
        .directive('onlyDigits', digitsCtrl);


    function digitsCtrl() {
        var directive = {

            link: link,
            restrict: 'A',
            require: '?ngModel'
        };
        return directive;


        function link(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var regexDecimalNeg = /^-?[0-9]\d*(\.\d+)?$/;
                var regexDecimalPos = /^?[0-9]\d*(\.\d+)?$/;
                var integerReg = /[^0-9]/g; //default
                var regexValue = '';
                //attrs.username;
                if (attrs['onlyDigits'] == 'decNeg') {
                    regexValue = regexDecimalNeg;
                } else if (attrs.onlyDigits === "decPos") {
                    regexValue = regexDecimalPos;
                } else {
                    regexValue = integerReg
                }
                var transformedInput = inputValue.replace(regexValue, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
                }
    }

})();



