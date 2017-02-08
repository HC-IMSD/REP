/**
 * Created by dkilty on 8/26/2016.
 */
(function () {
    'use strict';
    angular
        .module('activityApp', [
            'pascalprecht.translate'
        ])
})();

(function () {
    'use strict';
    angular
        .module('activityApp')
        .controller('MainController', MainController);

    MainController.$inject=['$translate'];
    function MainController($translate) {
        var vm = this;
        vm.formType = 'EXT';

        var oldObj={"ACTIVITY_ENROL":{"template_type":"PHARMA","company_id":"","dsts_control_number":"","enrolment_version":"0.2","date_saved":"2017-02-04","application_type":"NEW","software_version":"1.0.0","data_checksum":"","dossier_id_prefix":"HC6-024-","dossier_id":"","dossier_id_concat":"","reg_activity_lead":"","reg_activity_type":{"_label_en":"MPNC (Pre-NC Meeting)","_label_fr":"MPNC (Réunion préalable - PM)","__text":"B02-20160301-046"},"fee_class":"","reason_filing":"","is_third_party":"","is_admin_submission":"","notifiable_change_types":{"text_label_change":"N","drug_substance_change":"N","formulation_change":"N","specification_change":"N","expiry_storage_change":"N","manufact_method_change":"N","manufact_site_change":"N","container_size_change":"N","packaging_spec_change":"N","packaging_materials_change":"N","other_change_details":""},"rationale_types":{"new_roa":"N","new_claims":"N","change_formulation":"N","change_drug_substance":"N","replace_sterility":"N","confirmitory_studies":"N","other_rationale":"N","other_rationale_details":""},"contact_record":[{"foo":"bar"}]}};
        var newObj={"ACTIVITY_ENROL":{"template_type":"PHARMA","hhh":"hhhh","dsts_control_number":"","enrolment_version":"0.2","date_saved":"2017-02-04","application_type":"AMEND","software_version":"1.0.1","data_checksum":"","dossier_id_prefix":"HC6-024-","dossier_id":"","dossier_id_concat":"","reg_activity_lead":"","reg_activity_type":{"_label_en":"MPNC (Pre-NC Meeting)","_label_fr":"MPNC (Réunion préalable - PM)","__text":"B02-20160301-047"},"fee_class":"","reason_filing":"","is_third_party":"","is_admin_submission":"","notifiable_change_types":{"text_label_change":"N","drug_substance_change":"N","formulation_change":"N","specification_change":"N","expiry_storage_change":"N","manufact_method_change":"N","manufact_site_change":"N","container_size_change":"N","packaging_spec_change":"N","packaging_materials_change":"N","other_change_details":""},"rationale_types":{"new_roa":"N","new_claims":"N","change_formulation":"N","change_drug_substance":"N","replace_sterility":"N","confirmitory_studies":"N","other_rationale":"N","other_rationale_details":""},"contact_record":[{"foo":"bar2"}]}}
        //"company_id":"",
        var oldObj2={"DOSSIER_ENROL":{"company_id":"","dossier_id":"","related_dossier_id":"","enrolment_version":"0.1","date_saved":"2017-02-07","application_type":"NEW","software_version":"1.0.0","data_checksum":"","contact_record":[],"dossier_type":"","brand_name":"","common_name":"","third_party_signed":"","is_ref_products":"","ref_product_list":{},"human_drug_use":"N","radiopharm_drug_use":"N","vet_drug_use":"N","disinfectant_drug_use":"N","therapeutic_class_list":{},"is_sched_a":"N","formulation_group":{"formulation_details":[]}}};
        var newObj2={"DOSSIER_ENROL":{"company_id":"","dossier_id":"","related_dossier_id":"","enrolment_version":"0.1","date_saved":"2017-02-07","application_type":"NEW","software_version":"1.0.0","data_checksum":"","contact_record":[],"dossier_type":"","brand_name":"","common_name":"","third_party_signed":"","is_ref_products":"","ref_product_list":{},"human_drug_use":"N","radiopharm_drug_use":"N","vet_drug_use":"N","disinfectant_drug_use":"N","therapeutic_class_list":{},"is_sched_a":"N","formulation_group":{"formulation_details":[]}}};
        var newObj3={"DOSSIER_ENROL":{"company_id":"","dossier_id":"","related_dossier_id":"","enrolment_version":"0.1","date_saved":"2017-02-07","application_type":"NEW","software_version":"1.0.0","data_checksum":"","contact_record":[{"amend_record":"N","rep_contact_role":"PRIMARY","rep_contact_details":{"salutation":"SALUT_DR","given_name":"asdsadsa","initials":"","surname":"asdasa","job_title":"job title 1","language_correspondance":"en","phone_num":"111-111-1111","phone_ext":"","fax_num":"","email":"fsdfdfsd@asdsadas"}}],"dossier_type":"","brand_name":"","common_name":"","third_party_signed":"","is_ref_products":"","ref_product_list":{},"human_drug_use":"N","radiopharm_drug_use":"N","vet_drug_use":"N","disinfectant_drug_use":"N","therapeutic_class_list":{},"is_sched_a":"N","formulation_group":{"formulation_details":[]}}};
        var newObj4={"DOSSIER_ENROL":{"company_id":"","dossier_id":"","related_dossier_id":"","enrolment_version":"0.1","date_saved":"2017-02-07","application_type":"NEW","software_version":"1.0.0","data_checksum":"","contact_record":[{"amend_record":"N","rep_contact_role":"PRIMARY","rep_contact_details":{"salutation":"SALUT_DR","given_name":"asdsadsa","initials":"","surname":"asdasa","job_title":"job title 2","language_correspondance":"fr","phone_num":"111-111-1111","phone_ext":"","fax_num":"","email":"fsdfdfsd@asdsadas"}},{}],"dossier_type":"","brand_name":"","common_name":"","third_party_signed":"","is_ref_products":"","ref_product_list":{},"human_drug_use":"N","radiopharm_drug_use":"N","vet_drug_use":"N","disinfectant_drug_use":"N","therapeutic_class_list":{},"is_sched_a":"N","formulation_group":{"formulation_details":[]}}};

        var result4=DeepDiff(newObj4,newObj3);
        console.log(result4);
        vm.resultDiff=result4;
        vm.listResults=[];

        for(var g=0;g<result4.length;g++){
            var rec=result4[g];
            console.log("Type of change "+rec.kind);
            if(rec.kind==='E') {
                console.log("change of a single element");
                var pathString="";
                for(var i=0;i<rec.path.length;i++){
                    console.log("apth "+ rec.path[i])
                }
                $translate('DOSSIER_ENROL').then(function (translation) {
                    console.log("Transllation"+translation);
                    pathString=pathString+" "+translation;
                });
                console.log("Element "+pathString)
                console.log("Original value: "+rec.lhs);
                console.log("Changed value: "+rec.rhs);
                var temp={};
                temp.tag=pathString;
                temp.original=rec.lhs;
                temp.change=rec.rhs;
                vm.listResults.push(temp)
            }
            if(rec.kind==='A') {
                console.log("Change element "+rec.path[rec.path.length-1]);
                console.log("Type of change " + JSON.stringify(rec.item.kind));
                console.log("Original " + JSON.stringify(rec.item.lhs));
                console.log("Updated " + JSON.stringify(rec.item.rhs));
            }
        }

            //Path rules- always ignore the first element, it is the root
            //if there are more than 2 elements, complex object
            //if number is part of the path, it is an array of objects
            //if it is a number, skip to the last element (leaf)
            //



    }
})();
//test
(function () {
    'use strict';
    angular
        .module('activityApp')
        .config(['$translateProvider', function ($translateProvider) {
            $translateProvider.directivePriority(1);
            $translateProvider.preferredLanguage('en');
           // $translateProvider.useLoader('customLoad');
            $translateProvider.useSanitizeValueStrategy(null);
           // $translateProvider.forceAsyncReload(true); //needed for the custom loader

        }]);
})();