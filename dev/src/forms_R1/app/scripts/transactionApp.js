(function () {
    'use strict';
    angular
        .module('transactionApp', [
            'transactionMainModule',
            'pascalprecht.translate',
            'ngMessages',
            'ngAria',
            'ui.bootstrap',
            'translations',
            'ngSanitize'
        ])

})();

(function () {
    'use strict';
    angular
        .module('transactionApp')
        .controller('MainController', MainController);

    //  MainController.$inject = ['TransactionService','hpfbFileProcessing','$filter']

    function MainController() {

        var vm = this;
        vm.userType;
    }
})();

(function () {
    'use strict';
    angular
        .module('transactionApp')
        .config(['$translateProvider','$httpProvider','$locationProvider', function ($translateProvider,$httpProvider,$locationProvider) {
            $locationProvider.html5Mode(
                {enabled : true,
                    requireBase: false,
                    rewriteLinks : false});

            $translateProvider.directivePriority(1);
            $translateProvider.preferredLanguage('@@prefLang');
            $translateProvider.useLoader('customLoad');
            //this prevents conflicts with ngMessage
            $translateProvider.useSanitizeValueStrategy(null);
            $translateProvider.forceAsyncReload(true); //needed for the custom loader

            //this disables caching for all files including json. File timestamps no longer needed!
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            //disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
            // extra
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

        }]);
})();
