(function () {
    'use strict';
    angular
        .module('companyApp', [
            'companyMain',
            'translations'
        ])
})();
//TODO replace with service for incrememnting version
(function () {
    'use strict';
    angular
        .module('companyApp')
        .controller('MainController', MainController);

    //MainController.$inject = ['CompanyService', 'hpfbFileProcessing', '$filter', '$scope']

    function MainController() {

        var vm = this;
        vm.formType = '@@SET_FORM';

    }
})();

(function () {
    'use strict';
    angular
        .module('companyApp')
        .config(['$translateProvider', function ($translateProvider) {

            $translateProvider.preferredLanguage('@@prefLang');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
            $translateProvider.useSanitizeValueStrategy(null);
        }]);
})();