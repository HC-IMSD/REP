/**
 * Created by Abdessamad on 7/24/2016.
 */
(function () {
    'use strict';


    //TODO: Lazy load modules
    angular.module('tabsModule', ['appendixFourModule']);
})();

(function () {
    'use strict';
    angular.module('tabsModule').component('cmpTabs', {
        templateUrl: './components/tabs/tpl-tabs.html',
        controller: tabsCtrl,
        controllerAs: 'tabsCtrl',
        bindings: {
        }
    });

    tabsCtrl.$inject = ['$scope'];


    function tabsCtrl($scope) {

        var self = this;

        self.$onInit = function(){
           self.tabs = [
               {
                   label:"Formulations",
                   selected:false
               },
               {
                   label:"Appendix 4",
                   selected:true
               }
           ];
        }

        self.selectTab = function(idx){

            angular.forEach(self.tabs, function(tab){
              //  console.log('tabsModule item: ' + tab.toSource());
                tab.selected = false;
            });

           /* for(var item in self.tabs){

                console.log('tabsModule item: ' + item);

              //  item.selected = false;
            }*/

            self.tabs[idx].selected = true;

        }
    }

})();
