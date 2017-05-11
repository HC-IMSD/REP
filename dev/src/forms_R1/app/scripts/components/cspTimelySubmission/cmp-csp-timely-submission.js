/**
 * Created by dkilty   on 06/04/2017.
 */
(function () {
    'use strict';

    angular
        .module('cspTimelySubmission', ['cspConstants','hpfbConstants']);

})();

(function () {
    'use strict';

    angular
        .module('cspTimelySubmission')
        .component('cmpCspTimelySubmission', {
            templateUrl: 'app/scripts/components/cspTimelySubmission/tpl-csp-timely-submission.html',
            controller: timelySubmissionController,
            controllerAs: 'timelySubCtrl',
            bindings: {
                record: '<',
                countryList: '<',
                showErrors: '&',
                updateErrorSummary: '&',
                language:'<'
            }
        });

    timelySubmissionController.$inject = ['FRENCH','EUOTHER', 'NO_APPLICATION', 'APPLICATION', '$scope','$translate'];
    function timelySubmissionController(FRENCH, EUOTHER, NO_APPLICATION, APPLICATION, $scope,$translate) {

        var vm = this;
        vm.model = {};
        vm.countries = [];
        vm.noAppValue = NO_APPLICATION;
        vm.appValue = APPLICATION;


        var noApplication_en = "No application for a marketing approval equivalent to an authorization for sale with "+
            "respect to the medicinal ingredient or combination of medicinal ingredients set out in this CSP "+
            "application has been submitted in the United States, the European Union or any country that is a member"+
            " of the European Union, Australia, Switzerland or Japan, before the application for the authorization for"+
            " sale referred to in paragraph 106(1)(c) of the <i>Patent Act</i> (above noted NDS) was filed with the Minister of Health.";
        var application_en="If an application for a marketing approval equivalent to an authorization for sale with"+
            " respect to the medicinal ingredient or combination of medicinal ingredients set out in this CSP"+
            " application has been submitted in the United States, the European Union or any country that is a member"+
            " of the European Union, Australia, Switzerland or Japan, the application for the authorization for sale"+
            " referred to in paragraph 106(1)(c) of the <i>Patent Act</i> (above noted NDS) was filed with the Minister"+
            " of Health before the end of a period of one year that begins on the day on which the first such"+
            " application for a marketing approval was submitted. Details of the first application for marketing"+
            " approval are as follows:";
        var noApplication_fr="Lorsque la demande d’autorisation de mise en marché visée à l’alinéa 106 (1) (c) de la"+
            " <i>Loi sur les brevets</i> (PDN susmentionnée) a été déposée auprès du ministre de la Santé, aucune demande"+
            " d’autorisation de vente, équivalente à une autorisation de mise en marché relative à l’ingrédient"+
            " médicinal ou à une combinaison d’ingrédients médicinaux, selon le cas, faisant l’objet de cette demande"+
            " de CPS n’a été soumise dans l’Union européenne ou tout pays membre de l’Union européenne,"+
            " les États-Unis d’Amérique, l’Australie, la Suisse ou le Japon.";
        var application_fr="Si une ou plusieurs demandes d’autorisation de vente, équivalente à une autorisation de"+
            " mise en marché, relative à l’ingrédient médicinal ou à une combinaison d’ingrédients médicinaux, selon le"+
            " cas, faisant l’objet de cette demande de CPS ont été soumises dans l’Union européenne ou tout pays membre"+
            " de l’Union européenne, les États-Unis d’Amérique, l’Australie, la Suisse ou le Japon, la demande"+
            " d’autorisation de mise en marché visée à l’alinéa 106 (1) (c) de la <i>Loi sur les brevets</i>"+
            " (PDN susmentionnée) a été déposée auprès du ministre de la Santé avant la fin de la période de 18 mois"+
            " commençant à la date de dépôt de la première de ces demandes d’autorisation de vente.  Les détails de la"+
            " première de ces demandes d’autorisation de vente sont les suivants :";
        vm.noApplication=noApplication_en;
        vm.application=application_en;
        // "STATE_NO_APPLICATION": "No application for a marketing approval equivalent to an authorization for sale with respect to the medicinal ingredient or combination of medicinal ingredients set out in this CSP application has been submitted in the United States, the European Union or any country that is a member of the European Union, Australia, Switzerland or Japan, before the application for the authorization for sale referred to in paragraph 106(1)(c) of the Patent Act (above noted NDS) was filed with the Minister of Health",
        //"STATE_APPLICATION": "If an application for a marketing approval equivalent to an authorization for sale with respect to the medicinal ingredient or combination of medicinal ingredients set out in this CSP application has been submitted in the United States, the European Union or any country that is a member of the European Union, Australia, Switzerland or Japan, the application for the authorization for sale referred to in paragraph 106(1)(c) of the Patent Act (above noted NDS) was filed with the Minister of Health before the end of a period of one year that begins on the day on which the first such application for a marketing approval was submitted. Details of the first application for marketing approval are as follows:",


        vm.dateError = [{type: "required", displayAlias: "MSG_ERR_MAND"},
            {type: "date", displayAlias: "MSG_ERR_DATE_FORMAT"}];

        vm.requiredOnly = [{type: "required", displayAlias: "MSG_ERR_MAND"}];


        /**
         * Called after onChanges evnet, initializes
         */
        vm.$onInit = function () {
            _setIdNames();
            vm.noApplication = $translate.instant('NOAPPLICATION'); //NEW LINE
        };

        /**
         * Called on binding changes
         */
        vm.$onChanges = function (changes) {

            if (changes.record) {
                vm.model = changes.record.currentValue;
            }
            if (changes.countryList) {
                vm.countries = changes.countryList.currentValue;
            }
            if(changes.language){
                if(changes.language.currentValue===FRENCH){
                    vm.noApplication=noApplication_fr;
                    vm.application=application_fr;
                }else{
                    vm.noApplication=noApplication_en;
                    vm.application=application_en;
                }
            }
        };

        vm.isEuOther = function () {
            vm.model.country
            if (vm.model.country === EUOTHER) {
                return true;

            } else {
                vm.model.otherCountry = "";
            }
            return false;

        };
        vm.isApplicationMarketing = function () {

            if (!vm.model) return false;

            if (vm.model.submissionStatement === APPLICATION) {
                return true;
            } else {
                vm.model.approvalDate = "";
                vm.model.country = "";
                vm.model.otherCountry = "";
                return false;
            }
        };


        /**
         * sets the ids of the controls
         * If use the same name as label, don't need a separate definition!
         * @private
         */
        function _setIdNames() {
            var scopeId = "_" + $scope.$id;
            vm.timelyId = "statements_timely" + scopeId;
            vm.dateId = "timelyDate" + scopeId;
            vm.countryId = "timelyCountry" + scopeId;
            vm.otherCountryId = "other_eu_country" + scopeId;
        }

        $scope.$watch('timelySubCtrl.timelySubForm.$error', function () {
            vm.updateErrorSummary();
        }, true);

    }
})();

