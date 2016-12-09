(function () {
    'use strict';


    //TODO: Lazy load modules
    angular.module('dossierApp', ['pascalprecht.translate', 'dossierLoadModule', 'dossierModule', 'dataLists'])
        .controller('MainController', MainController)

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['dossierApp']);
    })
    MainController.$inject = ['$translate', 'getCountryAndProvinces']
    function MainController($translate, getCountryAndProvinces) {
        var vm = this;
        vm.formType = '@@SET_FORM';
        console.log(getCountryAndProvinces.getVal())
    }
})();

(function () {
    'use strict';
    angular
        .module('dossierApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.preferredLanguage('@@prefLang');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
            $translateProvider.useLoader('customLoad');
            $translateProvider.useSanitizeValueStrategy(null);

            console.log($translateProvider.translations());
        }]);
})();
