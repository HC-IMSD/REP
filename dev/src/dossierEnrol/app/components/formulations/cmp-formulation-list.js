/**
 * Created by Abdessamad on 9/21/2016.
 */

(function () {
    'use strict';

    angular
        .module('formulationsModule', ['expandingTable','formulationRecordModule'])
})();

(function () {
    'use strict';

    angular
        .module('formulationsModule')
        .component('cmpFormulations',{
            templateUrl: './components/formulations/tpl-formulation-list.html',
            controller: formulationsCtrl,
            controllerAs: 'formulCtrl',
            bindings: {
                formulations : '<'
            }
        });

    function formulationsCtrl(){

        var self=this;
        self.isDetailValid = true //TODO this must be managed
        self.$onInit = function() {

            self.newFormShown = false;

            self.colNames = [
                {label: "Formulation", binding: "formulationId", width: "15"},
                {label: "Formulation Name", binding: "formulationName", width: "85"}
            ];
            self.formulationList = [];

            if(self.formulations){
                self.formulationList = self.formulations;
            }
        };



        self.addNew = function(frm){
            //console.debug('frmList add new: ' + frm);
            self.formulationList.push(frm);
            self.newFormShown = false;
            self.resetToCollapsed = true;
        };

        self.update = function(idx, frm){
            self.formulationList[idx] = angular.copy(frm);
        };

        self.delete = function(idx){
            //console.debug('frmList delete: ' + idx);
            if(self.formulationList.splice(idx,1))
                self.resetToCollapsed = true;

        }


    }

})();

