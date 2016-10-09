/**
 * Created by dkilty on 9/1/2016.
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
                var max = -1;
                if (attrs['onlyMax']) {
                    max = parseInt(attrs['onlyMax']);
                }
                var regexIntNeg = /[^0-9-]/g;
                var regexIntPos = /[^0-9]/g;
                var integerReg = /[^0-9]/g; //default
                var regexValue = integerReg;
                if (attrs['onlyDigits'] == 'intNeg') {
                    regexValue = regexIntNeg;
                } else if (attrs['onlyDigits'] === 'intPos') {
                    regexValue = regexIntPos;
                } else {
                    regexValue = integerReg
                }
                var transformedInput = inputValue.replace(regexValue, '');
                console.log(transformedInput);
                console.log(max)
                if (max > 0) {
                    transformedInput = transformedInput.substring(0, max);
                }
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    }

})();



