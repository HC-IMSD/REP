/**
 * Created by dkilty on 8/26/2016.
 */
(function () {
    'use strict';
    angular
        .module('activityApp', [
            'pascalprecht.translate',
            'activityLoadService',
            'activityLists',
            'activityMain',
            'translations'
        ])
})();

(function () {
    'use strict';
    angular
        .module('activityApp')
        .controller('MainController', MainController);

    function MainController() {
        var vm = this;
        vm.formType = '@@SET_FORM';
    }
})();
//test
(function () {
    'use strict';
    angular
        .module('activityApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.preferredLanguage('@@prefLang');
            $translateProvider.useLoader('customLoad');
            //this prevents conflicts with ngMessage
            $translateProvider.directivePriority(1);
            $translateProvider.useSanitizeValueStrategy(null);
            $translateProvider.forceAsyncReload(true); //needed for the custom loader
        }]);
})();