(function () {
    'use strict';


    //TODO: Lazy load modules
    angular.module('dossierApp', ['pascalprecht.translate', 'dossierModule'])
        .controller('MainController', MainController);

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['dossierApp']);
    })

    function MainController() {
        var vm = this;
        vm.formType = '@@SET_FORM';

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
            //  $translateProvider.useSanitizeValueStrategy('sanitize');
        }]);
})();