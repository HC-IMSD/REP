/**
 * Created by dkilty on 8/26/2016.
 */
(function () {
    'use strict';
    angular
        .module('activityApp', [
            'pascalprecht.translate',
            'translations',
            'fileIO',
            'ui.tree'
        ])
})();

(function () {
        'use strict';
        angular
            .module('activityApp')
            .controller('MainController', MainController);

        MainController.$inject = ['$translate', '$filter'];
        function MainController($translate, $filter) {
            var vm = this;
            vm.formType = 'EXT';
            vm.showContent = _loadFileContent;
            vm.showContent2 = _loadFileContent2;
            vm.content1 = {};
            vm.content2 = {};

            var oldObj = {
                "ACTIVITY_ENROL": {
                    "template_type": "PHARMA",
                    "company_id": "",
                    "dsts_control_number": "",
                    "enrolment_version": "0.2",
                    "date_saved": "2017-02-04",
                    "application_type": "NEW",
                    "software_version": "1.0.0",
                    "data_checksum": "",
                    "dossier_id_prefix": "HC6-024-",
                    "dossier_id": "",
                    "dossier_id_concat": "",
                    "reg_activity_lead": "",
                    "reg_activity_type": {
                        "_label_en": "MPNC (Pre-NC Meeting)",
                        "_label_fr": "MPNC (Réunion préalable - PM)",
                        "__text": "B02-20160301-046"
                    },
                    "fee_class": "",
                    "reason_filing": "",
                    "is_third_party": "",
                    "is_admin_submission": "",
                    "notifiable_change_types": {
                        "text_label_change": "N",
                        "drug_substance_change": "N",
                        "formulation_change": "N",
                        "specification_change": "N",
                        "expiry_storage_change": "N",
                        "manufact_method_change": "N",
                        "manufact_site_change": "N",
                        "container_size_change": "N",
                        "packaging_spec_change": "N",
                        "packaging_materials_change": "N",
                        "other_change_details": ""
                    },
                    "rationale_types": {
                        "new_roa": "N",
                        "new_claims": "N",
                        "change_formulation": "N",
                        "change_drug_substance": "N",
                        "replace_sterility": "N",
                        "confirmitory_studies": "N",
                        "other_rationale": "N",
                        "other_rationale_details": ""
                    },
                    "contact_record": [{"foo": "bar"}]
                }
            };
            var newObj = {
                "ACTIVITY_ENROL": {
                    "template_type": "PHARMA",
                    "hhh": "hhhh",
                    "dsts_control_number": "",
                    "enrolment_version": "0.2",
                    "date_saved": "2017-02-04",
                    "application_type": "AMEND",
                    "software_version": "1.0.1",
                    "data_checksum": "",
                    "dossier_id_prefix": "HC6-024-",
                    "dossier_id": "",
                    "dossier_id_concat": "",
                    "reg_activity_lead": "",
                    "reg_activity_type": {
                        "_label_en": "MPNC (Pre-NC Meeting)",
                        "_label_fr": "MPNC (Réunion préalable - PM)",
                        "__text": "B02-20160301-047"
                    },
                    "fee_class": "",
                    "reason_filing": "",
                    "is_third_party": "",
                    "is_admin_submission": "",
                    "notifiable_change_types": {
                        "text_label_change": "N",
                        "drug_substance_change": "N",
                        "formulation_change": "N",
                        "specification_change": "N",
                        "expiry_storage_change": "N",
                        "manufact_method_change": "N",
                        "manufact_site_change": "N",
                        "container_size_change": "N",
                        "packaging_spec_change": "N",
                        "packaging_materials_change": "N",
                        "other_change_details": ""
                    },
                    "rationale_types": {
                        "new_roa": "N",
                        "new_claims": "N",
                        "change_formulation": "N",
                        "change_drug_substance": "N",
                        "replace_sterility": "N",
                        "confirmitory_studies": "N",
                        "other_rationale": "N",
                        "other_rationale_details": ""
                    },
                    "contact_record": [{"foo": "bar2"}]
                }
            }
            //"company_id":"",
            var oldObj2 = {
                "DOSSIER_ENROL": {
                    "company_id": "",
                    "dossier_id": "",
                    "related_dossier_id": "",
                    "enrolment_version": "0.1",
                    "date_saved": "2017-02-07",
                    "application_type": "NEW",
                    "software_version": "1.0.0",
                    "data_checksum": "",
                    "contact_record": [],
                    "dossier_type": "",
                    "brand_name": "",
                    "common_name": "",
                    "third_party_signed": "",
                    "is_ref_products": "",
                    "ref_product_list": {},
                    "human_drug_use": "N",
                    "radiopharm_drug_use": "N",
                    "vet_drug_use": "N",
                    "disinfectant_drug_use": "N",
                    "therapeutic_class_list": {},
                    "is_sched_a": "N",
                    "formulation_group": {"formulation_details": []}
                }
            };
            var newObj2 = {
                "DOSSIER_ENROL": {
                    "company_id": "",
                    "dossier_id": "",
                    "related_dossier_id": "",
                    "enrolment_version": "0.1",
                    "date_saved": "2017-02-07",
                    "application_type": "NEW",
                    "software_version": "1.0.0",
                    "data_checksum": "",
                    "contact_record": [],
                    "dossier_type": "",
                    "brand_name": "",
                    "common_name": "",
                    "third_party_signed": "",
                    "is_ref_products": "",
                    "ref_product_list": {},
                    "human_drug_use": "N",
                    "radiopharm_drug_use": "N",
                    "vet_drug_use": "N",
                    "disinfectant_drug_use": "N",
                    "therapeutic_class_list": {},
                    "is_sched_a": "N",
                    "formulation_group": {"formulation_details": []}
                }
            };
            var newObj3 = {
                "DOSSIER_ENROL": {
                    "company_id": "",
                    "dossier_id": "",
                    "related_dossier_id": "",
                    "enrolment_version": "0.1",
                    "date_saved": "2017-02-07",
                    "application_type": "NEW",
                    "software_version": "1.0.0",
                    "data_checksum": "",
                    "contact_record": [{
                        "amend_record": "N",
                        "rep_contact_role": "PRIMARY",
                        "rep_contact_details": {
                            "salutation": "SALUT_DR",
                            "given_name": "asdsadsa",
                            "initials": "",
                            "surname": "asdasa",
                            "job_title": "job title 1",
                            "language_correspondance": "en",
                            "phone_num": "111-111-1111",
                            "phone_ext": "",
                            "fax_num": "",
                            "email": "fsdfdfsd@asdsadas"
                        }
                    }],
                    "dossier_type": "",
                    "brand_name": "",
                    "common_name": "",
                    "third_party_signed": "",
                    "is_ref_products": "",
                    "ref_product_list": {},
                    "human_drug_use": "N",
                    "radiopharm_drug_use": "N",
                    "vet_drug_use": "N",
                    "disinfectant_drug_use": "N",
                    "therapeutic_class_list": {},
                    "is_sched_a": "N",
                    "formulation_group": {"formulation_details": []}
                }
            };
            var newObj4 = {
                "DOSSIER_ENROL": {
                    "company_id": "23242",
                    "dossier_id": "",
                    "related_dossier_id": "",
                    "enrolment_version": "0.1",
                    "date_saved": "2017-02-07",
                    "application_type": "NEW",
                    "software_version": "1.0.0",
                    "data_checksum": "",
                    "contact_record": [{
                        "amend_record": "N",
                        "rep_contact_role": "PRIMARY",
                        "rep_contact_details": {
                            "salutation": "SALUT_DR",
                            "given_name": "asdsadsa",
                            "initials": "",
                            "surname": "asdasa",
                            "job_title": "job title 2",
                            "language_correspondance": "fr",
                            "phone_num": "111-111-1111",
                            "phone_ext": "",
                            "fax_num": "",
                            "email": "fsdfdfsd@asdsadas"
                        }
                    }, {}],
                    "dossier_type": "",
                    "brand_name": "",
                    "common_name": "",
                    "third_party_signed": "",
                    "is_ref_products": "",
                    "ref_product_list": {},
                    "human_drug_use": "N",
                    "radiopharm_drug_use": "N",
                    "vet_drug_use": "N",
                    "disinfectant_drug_use": "N",
                    "therapeutic_class_list": {},
                    "is_sched_a": "N",
                    "formulation_group": {"formulation_details": []}
                }
            };
            var newObj5 = {
                "DOSSIER_ENROL": {
                    "company_id": "",
                    "dossier_id": "",
                    "related_dossier_id": "",
                    "enrolment_version": "0.1",
                    "date_saved": "2017-02-07",
                    "application_type": "NEW",
                    "software_version": "1.0.0",
                    "data_checksum": "",
                    "contact_record": [],
                    "dossier_type": "",
                    "brand_name": "",
                    "common_name": "",
                    "third_party_signed": "",
                    "is_ref_products": "",
                    "ref_product_list": {},
                    "human_drug_use": "N",
                    "radiopharm_drug_use": "N",
                    "vet_drug_use": "N",
                    "disinfectant_drug_use": "N",
                    "therapeutic_class_list": {},
                    "is_sched_a": "N",
                    "formulation_group": {
                        "formulation_details": [{
                            "formulation_name": "",
                            "formulation_id": 1,
                            "dosage_form_group": {"dosage_form_other": ""},
                            "roa_group": {},
                            "container_group": {},
                            "country_group": {
                                "country_manufacturer": [{
                                    "_label_en": "Aland Islands",
                                    "_label_fr": "Îles Åland",
                                    "__text": "ALA"
                                }]
                            },
                            "nonmedicinal_ingredient": [{
                                "ingredient_name": "asdadasdasd",
                                "cas_number": "asdasd",
                                "ingred_standard": "",
                                "is_human_animal_src": "N",
                                "variant_name": "",
                                "strength": 121232131,
                                "per": "",
                                "units": {"_label_en": "BLISTER", "_label_fr": "Plaquette", "__text": "80"},
                                "units_other": "",
                                "is_base_calc": "N",
                                "is_nanomaterial": {
                                    "_label_en": "METAL COLLOIDS",
                                    "_label_fr": "METAL COLLOIDS",
                                    "__text": "7"
                                },
                                "nanomaterial_details": ""
                            }]
                        }]
                    }
                }
            };
            var newObj6 = {
                "DOSSIER_ENROL": {
                    "company_id": "",
                    "dossier_id": "",
                    "related_dossier_id": "",
                    "enrolment_version": "0.3",
                    "date_saved": "2017-02-07",
                    "application_type": "NEW",
                    "software_version": "1.0.0",
                    "data_checksum": "",
                    "contact_record": [{
                        "amend_record": "N",
                        "rep_contact_role": "PRIMARY",
                        "rep_contact_details": {
                            "salutation": "SALUT_DR",
                            "given_name": "sdfsdf",
                            "initials": "",
                            "surname": "sdfsd",
                            "job_title": "sfsdfds",
                            "language_correspondance": "en",
                            "phone_num": "111-111-1111",
                            "phone_ext": "",
                            "fax_num": "",
                            "email": "assdasdasdas@addsad"
                        }
                    }],
                    "dossier_type": "",
                    "brand_name": "",
                    "common_name": "",
                    "third_party_signed": "",
                    "is_ref_products": "",
                    "ref_product_list": {},
                    "human_drug_use": "N",
                    "radiopharm_drug_use": "N",
                    "vet_drug_use": "N",
                    "disinfectant_drug_use": "N",
                    "therapeutic_class_list": {},
                    "is_sched_a": "N",
                    "appendix4_group": [{
                        "ingredient_id": 1,
                        "ingredient_name": "asdsadsa",
                        "animal_sourced": "Y",
                        "human_sourced": "Y",
                        "tissues_fluids_section": {
                            "cardio_system": {
                                "heart_pericardium": "Y",
                                "lung": "Y",
                                "nasal_fluid": "Y",
                                "trachea": "Y",
                                "other_cardio_respiratory": "N",
                                "other_cardio_respiratory_details": ""
                            }
                        },
                        "animal_sourced_section": {
                            "animal_src_record": [{
                                "animal_type": "AVIAN_TYPE",
                                "animal_detail": "asdsadsadsaasdsad"
                            }, {
                                "animal_type": "CERVIDAE_TYPE",
                                "animal_detail": "asdasdasdasds  sad asdsa dsadsad sad sad saasdasd das sadsa dsadasasdas sad asdsad asdsad dsa dsad s"
                            }],
                            "is_controlled_pop": "Y",
                            "is_biotech_derived": "Y",
                            "is_cell_line": "Y",
                            "animal_age": 3,
                            "country_origin_list": {
                                "country_origin": [{
                                    "country_with_unknown": {
                                        "_label_en": "Andorra",
                                        "_label_fr": "Andorre",
                                        "__text": "AND"
                                    }, "unknown_country_details": ""
                                }, {
                                    "country_with_unknown": {
                                        "_label_en": "American Samoa",
                                        "_label_fr": "Samoa Américaines",
                                        "__text": "ASM"
                                    }, "unknown_country_details": ""
                                }]
                            }
                        }
                    }],
                    "formulation_group": {
                        "formulation_details": [{
                            "formulation_name": "",
                            "formulation_id": 1,
                            "dosage_form_group": {"dosage_form_other": ""},
                            "roa_group": {},
                            "container_group": {},
                            "country_group": {},
                            "active_ingredient": [{
                                "ingredient_id": "(3-CHLOROALLYL)-3,5,7-TRIAZA-1-AZONIAADAMANTANE CHLORIDE",
                                "ingredient_name": "(3-CHLOROALLYL)-3,5,7-TRIAZA-1-AZONIAADAMANTANE CHLORIDE",
                                "cas_number": "",
                                "ingred_standard": "",
                                "is_human_animal_src": "Y",
                                "strength": 3413123,
                                "per": "",
                                "units": {"_label_en": "ACT", "_label_fr": "Déclenchement", "__text": "96"},
                                "is_base_calc": "Y",
                                "is_nanomaterial": {"_label_en": "DENDRIMER", "_label_fr": "DENDRIMER", "__text": "2"},
                                "nanomaterial_details": ""
                            }]
                        }]
                    }
                }
            };
            var orig1 = {
                "DOSSIER_ENROL": {
                    "company_id": "123412",
                    "dossier_id": "",
                    "related_dossier_id": "11232131",
                    "enrolment_version": "0.2",
                    "date_saved": "2017-02-08",
                    "application_type": "NEW",
                    "software_version": "1.0.0",
                    "data_checksum": "",
                    "contact_record": [{
                        "amend_record": "N",
                        "rep_contact_role": "PRIMARY",
                        "rep_contact_details": {
                            "salutation": "SALUT_MR",
                            "given_name": "adas",
                            "initials": "",
                            "surname": "aasdas",
                            "job_title": "sdasdas",
                            "language_correspondance": "fr",
                            "phone_num": "111-111-1111",
                            "phone_ext": "",
                            "fax_num": "",
                            "email": "asdadas@adadas"
                        }
                    }],
                    "dossier_type": "BIOLOGIC",
                    "brand_name": "312321313",
                    "common_name": "123213",
                    "third_party_signed": "Y",
                    "is_ref_products": "Y",
                    "ref_product_list": {
                        "cdn_ref_product": [{
                            "brand_name": "asdasdasd",
                            "ingredient_id": "",
                            "ingredient_name": "asdsa",
                            "dosage_form": {"_label_en": "AEROSOL", "_label_fr": "Aérosol", "__text": "2"},
                            "dosage_form_other": "",
                            "strengths": 1111,
                            "units": {"_label_en": "AMP", "_label_fr": "Ampoule", "__text": "92"},
                            "units_other": "",
                            "per": "",
                            "company_name": "eqwewqeqw"
                        }]
                    },
                    "human_drug_use": "Y",
                    "radiopharm_drug_use": "N",
                    "vet_drug_use": "N",
                    "disinfectant_drug_use": "N",
                    "therapeutic_class_list": {"therapeutic_class": ["1312321321213"]},
                    "is_sched_a": "Y",
                    "schedule_a_group": {
                        "din_number": "11111111",
                        "acute_alcohol": "Y",
                        "acute_anxiety": "N",
                        "acute_infectious": "N",
                        "acute_inflammatory": "N",
                        "acute_psychotic": "N",
                        "addiction": "N",
                        "ateriosclerosis": "N",
                        "appendicitis": "N",
                        "asthma": "N",
                        "cancer": "N",
                        "congest_heart_fail": "N",
                        "convulsions": "N",
                        "dementia": "N",
                        "depression": "N",
                        "diabetes": "N",
                        "gangrene": "N",
                        "glaucoma": "N",
                        "haematologic_bleeding": "N",
                        "hepatitis": "N",
                        "hypertension": "N",
                        "nausea_pregnancy": "N",
                        "obesity": "N",
                        "rheumatic_fever": "N",
                        "septicemia": "N",
                        "sex_transmit_disease": "N",
                        "strangulated_hernia": "N",
                        "thrombotic_embolic_disorder": "N",
                        "thyroid_disease": "N",
                        "ulcer_gastro": "N",
                        "sched_a_claims_ind_details": "qweqweqwqeqw"
                    },
                    "formulation_group": {
                        "formulation_details": [{
                            "formulation_name": "sfsfsd",
                            "formulation_id": 1,
                            "dosage_form_group": {
                                "dosage_form": {
                                    "_label_en": "AEROSOL",
                                    "_label_fr": "Aérosol",
                                    "__text": "2"
                                }, "dosage_form_other": ""
                            },
                            "roa_group": {
                                "roa_details": [{
                                    "roa": {
                                        "_label_en": "BLOCK/INFILTRATION",
                                        "_label_fr": "Bloc/Infiltration",
                                        "__text": "1"
                                    }, "roa_other": ""
                                }]
                            },
                            "container_group": {
                                "container_details": [{
                                    "container_type": "adad",
                                    "package_size": "adasd"
                                }]
                            },
                            "country_group": {
                                "country_manufacturer": [{
                                    "_label_en": "Albania",
                                    "_label_fr": "Albanie",
                                    "__text": "ALB"
                                }]
                            },
                            "active_ingredient": [{
                                "ingredient_id": "",
                                "ingredient_name": "sdfsdf",
                                "cas_number": "",
                                "ingred_standard": "",
                                "is_human_animal_src": "N",
                                "strength": 1111,
                                "per": "",
                                "units": {"_label_en": "ACT", "_label_fr": "Déclenchement", "__text": "96"},
                                "units_other": "",
                                "is_base_calc": "Y",
                                "is_nanomaterial": {"_label_en": "LIPOSOMES", "_label_fr": "LIPOSOMES", "__text": "3"},
                                "nanomaterial_details": ""
                            }],
                            "nonmedicinal_ingredient": [{
                                "ingredient_name": "ada",
                                "cas_number": "",
                                "ingred_standard": "",
                                "is_human_animal_src": "Y",
                                "variant_name": "",
                                "strength": 111,
                                "per": "adasd",
                                "units": {"_label_en": "ACT", "_label_fr": "Déclenchement", "__text": "96"},
                                "units_other": "",
                                "is_base_calc": "Y",
                                "is_nanomaterial": {"_label_en": "LIPOSOMES", "_label_fr": "LIPOSOMES", "__text": "3"},
                                "nanomaterial_details": ""
                            }]
                        }]
                    }
                }
            }
            var chg1 = {
                "DOSSIER_ENROL": {
                    "company_id": "123412",
                    "dossier_id": "",
                    "related_dossier_id": "11232131",
                    "enrolment_version": "0.3",
                    "date_saved": "2017-02-08",
                    "application_type": "NEW",
                    "software_version": "1.0.0",
                    "data_checksum": "",
                    "contact_record": [{
                        "amend_record": "N",
                        "rep_contact_role": "PRIMARY",
                        "rep_contact_details": {
                            "salutation": "SALUT_MR",
                            "given_name": "adas",
                            "initials": "",
                            "surname": "aasdas",
                            "job_title": "sdasdas",
                            "language_correspondance": "fr",
                            "phone_num": "111-111-1111",
                            "phone_ext": "",
                            "fax_num": "",
                            "email": "asdadas@adadas"
                        }
                    }],
                    "dossier_type": "BIOLOGIC",
                    "brand_name": "312321313",
                    "common_name": "123213",
                    "third_party_signed": "Y",
                    "is_ref_products": "Y",
                    "ref_product_list": {
                        "cdn_ref_product": [{
                            "brand_name": "asdasdasd",
                            "ingredient_id": "",
                            "ingredient_name": "asdsa",
                            "dosage_form": {"_label_en": "AEROSOL", "_label_fr": "Aérosol", "__text": "2"},
                            "dosage_form_other": "",
                            "strengths": 1111,
                            "units": {"_label_en": "AMP", "_label_fr": "Ampoule", "__text": "92"},
                            "units_other": "",
                            "per": "",
                            "company_name": "eqwewqeqw"
                        }]
                    },
                    "human_drug_use": "Y",
                    "radiopharm_drug_use": "N",
                    "vet_drug_use": "N",
                    "disinfectant_drug_use": "N",
                    "therapeutic_class_list": {"therapeutic_class": ["1312321321213"]},
                    "is_sched_a": "Y",
                    "schedule_a_group": {
                        "din_number": "11111111",
                        "acute_alcohol": "Y",
                        "acute_anxiety": "N",
                        "acute_infectious": "N",
                        "acute_inflammatory": "N",
                        "acute_psychotic": "N",
                        "addiction": "N",
                        "ateriosclerosis": "N",
                        "appendicitis": "N",
                        "asthma": "N",
                        "cancer": "N",
                        "congest_heart_fail": "N",
                        "convulsions": "N",
                        "dementia": "N",
                        "depression": "N",
                        "diabetes": "N",
                        "gangrene": "N",
                        "glaucoma": "N",
                        "haematologic_bleeding": "N",
                        "hepatitis": "N",
                        "hypertension": "N",
                        "nausea_pregnancy": "N",
                        "obesity": "N",
                        "rheumatic_fever": "N",
                        "septicemia": "N",
                        "sex_transmit_disease": "N",
                        "strangulated_hernia": "N",
                        "thrombotic_embolic_disorder": "N",
                        "thyroid_disease": "N",
                        "ulcer_gastro": "N",
                        "sched_a_claims_ind_details": "qweqweqwqeqw"
                    },
                    "formulation_group": {
                        "formulation_details": [{
                            "formulation_name": "sfsfsd",
                            "formulation_id": 1,
                            "dosage_form_group": {
                                "dosage_form": {
                                    "_label_en": "AEROSOL",
                                    "_label_fr": "Aérosol",
                                    "__text": "2"
                                }, "dosage_form_other": ""
                            },
                            "roa_group": {
                                "roa_details": [{
                                    "roa": {
                                        "_label_en": "BLOCK/INFILTRATION",
                                        "_label_fr": "Bloc/Infiltration",
                                        "__text": "1"
                                    }, "roa_other": ""
                                }]
                            },
                            "container_group": {
                                "container_details": [{
                                    "container_type": "adad",
                                    "package_size": "adasd"
                                }]
                            },
                            "country_group": {
                                "country_manufacturer": [{
                                    "_label_en": "Albania",
                                    "_label_fr": "Albanie",
                                    "__text": "ALB"
                                }]
                            },
                            "active_ingredient": [{
                                "ingredient_id": "",
                                "ingredient_name": "sdfsdf",
                                "cas_number": "",
                                "ingred_standard": "",
                                "is_human_animal_src": "N",
                                "strength": 1111,
                                "per": "",
                                "units": {"_label_en": "ACT", "_label_fr": "Déclenchement", "__text": "96"},
                                "units_other": "",
                                "is_base_calc": "Y",
                                "is_nanomaterial": {"_label_en": "LIPOSOMES", "_label_fr": "LIPOSOMES", "__text": "3"},
                                "nanomaterial_details": ""
                            }],
                            "nonmedicinal_ingredient": [{
                                "ingredient_name": "ada",
                                "cas_number": "",
                                "ingred_standard": "asdasdsad",
                                "is_human_animal_src": "Y",
                                "variant_name": "",
                                "strength": 111,
                                "per": "per new",
                                "units": {"_label_en": "BAR", "_label_fr": "Barre", "__text": "47"},
                                "units_other": "",
                                "is_base_calc": "Y",
                                "is_nanomaterial": {"_label_en": "LIPOSOMES", "_label_fr": "LIPOSOMES", "__text": "3"},
                                "nanomaterial_details": ""
                            }]
                        }]
                    }
                }
            }



            var simple3 = {
                "level1": [{

                    "key1": "value1",
                    "level2": {
                        "key2": "value2",
                        "level3": {
                            "key3": "value3"
                        }
                    }
                },
                    {
                        "key1": "value1b",
                        "level2": {
                            "key2": "value2b",
                            "level3": {
                                "key3": "value3b"
                            }
                        }
                    }
                ]
            };
            var simple4 = {
                "level1": [{

                    "key1": "value1",
                    "level2": {
                        "key2": "value2",
                        "level3": {
                            "key3": "value3_new",
                            "key4": "new"
                        }
                    }
                }
                ]
            };




           vm.listResults = null;

            /***
             * Compares the two files
             */
            vm.compareFiles=function(){
                if(vm.content1 &&  vm.content2) {
                    var diffList= DeepDiff(vm.content1, vm.content2);
                    console.log(diffList);
                  vm.listResults=_consolidateResults(diffList);
                  console.log(vm.listResults)
                }else{
                    console.error("Null file")
                }
            };

            function _loadFileContent(fileContent) {
                if (!fileContent)return;

                vm.content1 = fileContent.jsonResult;
                console.log(vm.content1)
            }

            function _loadFileContent2(fileContent) {
                if (!fileContent)return;

                vm.content2 = fileContent.jsonResult;
                console.log(vm.content2)
            }


            //  https://www.npmjs.com/package/deep-diff
            function _consolidateResults(diffList) {

                var resultList = [];

                //loop through each difference node and build a consolidated view
                for (var i = 0; i < diffList.length; i++) {
                    var record = diffList[i];
                    processNode(record, resultList);
                    //rec.path.length
                }
                console.log(resultList);
                return(resultList);
            }


            /***
             * For each difference node, process/ consolidate it in a tree
             * @param node
             * @param resultList
             */
            function processNode(node, resultList) {

                // if (node.path.length < 3) return;
                var record_index = 0;
                //check to see if it has index property. Indicates multiplicity
                if (node.hasOwnProperty("index")) {
                    record_index = node.index;
                }
                ;

                if (node.path.length === 1) {

                    //find existing record if it exists
                    existingRecord = $filter('filter')(resultList, {
                        recordName: node.path[0], index: record_index
                    });

                    if (existingRecord && existingRecord.length > 0) currentRecord = existingRecord[0];
                    //if no current record, make a new entery
                    if (!currentRecord) {
                        var leaf = _createLeafRecord2(node, node.path[0], record_index);
                        if (currentRecord) {
                            currentRecord.nodes.push(leaf);
                        } else {
                            resultList.push(leaf);
                            currentRecord = leaf;
                        }
                    }
                    return;
                }
                var currentRecord = null;
                for (var i = 0; i < node.path.length; i++) {
                    var existingRecord = null;
                    if (i < node.path.length - 2 && angular.isNumber(node.path[i + 1])) {
                        record_index = Number(node.path[i + 1]);
                    }
                    //else
                    if (!angular.isNumber(node.path[i])) {
                        if (!currentRecord) {
                            existingRecord = $filter('filter')(resultList, {
                                recordName: node.path[i], index: record_index
                            });
                            if (existingRecord && existingRecord.length > 0) currentRecord = existingRecord[0]
                        } else {
                            existingRecord = $filter('filter')(currentRecord.nodes, {
                                recordName: node.path[i]
                            });

                            if (existingRecord && existingRecord.length > 0) currentRecord = existingRecord[0]
                        }

                        //check if a leaf
                        if (i == node.path.length - 1) {
                            var leaf = _createLeafRecord2(node, node.path[i], record_index);

                            if (currentRecord) {
                                currentRecord.nodes.push(leaf);
                            } else {
                                resultList.push(leaf);
                                currentRecord = leaf;
                            }
                        }
                        else if (!existingRecord || existingRecord.length == 0) {

                            var leaf = createParentRecord(node.path[i], 0);

                            console.log("===== Created no leaf: " + leaf.recordName);
                            if (!currentRecord) {
                                currentRecord = leaf;
                                resultList.push(leaf);
                            } else {
                                console.log("===== no leaf is a child ");
                                currentRecord.nodes.push(leaf);
                                currentRecord = leaf;
                            }
                        }
                    }
                }

            }

            function createParentRecord(name, index) {
                var leaf = {};
                leaf.recordName = name;
                leaf.index = 0;
                leaf.isChange = false;
                leaf.nodes = [];
                return leaf;
            }


            /**
             * Create a leaf record
             * @param node -the difference node
             * @param name - The name to give this node
             * @param node_index - the index to give this node
             * @returns {{}} json object
             * @private
             */
            function _createLeafRecord2(node, name, node_index) {
                var leaf = {};
                leaf.recordName = name;

                leaf.isChange = true;
                leaf.index = node_index;
                leaf.type = node.kind;
                leaf.original = node.lhs;
                leaf.diff = node.rhs;


                /**
                 * kind - indicates the kind of change; will be one of the following:
                 N - indicates a newly added property/element
                 D - indicates a property/element was deleted
                 E - indicates a property/element was edited
                 A - indicates a change occurred within an array
                 */

                if (node.kind === 'A') {
                    leaf.type = node.item.kind;
                    leaf.original = node.item.lhs;
                    leaf.diff = node.item.rhs;
                }
                return leaf;
            }


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