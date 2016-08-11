/**
 * Created by Abdessamad on 8/10/2016.
 */


(function () {
    'use strict';

    angular
        .module('checkBoxListModule', [])
})();

(function () {
    'use strict';

    angular
        .module('checkBoxListModule')
        .component('cmpCheckBoxList', {
            templateUrl: './components/checkbox-list/tpl-checkbox-list.html',
            controller: checkBoxListCtrl,
            controllerAs: 'chkl',
            bindings: {
                title: '@',
                listItems: '<'
                //onUpdateDossier: '&',
               //onDeleteDossier: '&'
            }
        });


    function checkBoxListCtrl(){

    }
})();


