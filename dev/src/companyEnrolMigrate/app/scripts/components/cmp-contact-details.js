/**
 * Created by Abdessamad on 7/5/2016.
 */

(function () {
    'use strict';

    angular
        .module('contactModule', [
            'addressRole'
        ])
})();

(function () {
    'use strict';

    angular
        .module('contactModule').
        component('cmpContactDetails',{
            templateUrl: 'app/views/tpl-contact-details.html',
            controller: contactCtrl,

            bindings: {
                formName: '<',
                contactRecord: '<',
                onUpdate: '&',
                onDelete: '&'
            }
    });

 function contactCtrl(){

     var vm = this;
     vm.$onInit = function(){

         vm.contactModel = {
             contactId: "",
             amendRecord: false,
             addressRole: {
                 manufacturer: false,
                 mailing: false,
                 billing: false,
                 importer: false
             },
             contactRole: "",
             salutation: "",
             givenName: "",
             surname: "",
             initials: "",
             title: "",
             phone: "",
             PhoneExt: "",
             fax: ""
         };

         if (vm.contactRecord) {

             angular.extend(vm.contactModel, vm.contactRecord);
         }
     }



     vm.delete = function () {

         vm.onDelete({contactId: vm.contactModel.contactId});
     }


 }



})();