/**
 * Created by Abdessamad on 7/6/2016.
 */

(function () {
    'use strict';
    angular
        .module('dossierModule')
        .factory('DossierService', DossierService)
    DossierService.$inject = ['$http', '$q'];
    function DossierService($http, $q) {
        // Define the DossierService function
        function DossierService(dossierData) {
            //construction logic

            angular.extend(this._default, dossierData);
        }

        DossierService.CanadianPostalCodePattern = function () {

        }

        DossierService.dossier = {
            dossierID: "569522",
            enrolmentVersion: "1.23",
            dateSaved: "1999-01-21",
            applicationType: "New",
            softwareVersion: "1.0",
            dataChecksum: "kjsakdjas",
            drugProduct: {
                thirdPartySigned: false,
                humanDrugUse: false,
                radiopharmDrugUse: false,
                vetDrugUse: false,
                disinfectantDrugUse: false,
                isScheduleA: false,
                scheduleAGroup: {},
                therapeutic: {//grid
                    listItems: [],
                    columnDef: []
                },
                canRefProducts: {},//grid
                formulations: {},//tab + grid +
                appendixFour: {}//tab + grid +

            },
            contactList: []

        };


        DossierService.prototype = {

            _default: {},

            loadFromFile: function (url) {
                var deferred = $q.defer();
                // Fetch the player from Dribbble
                // var url = 'http://api.dribbble.com/players/' + player + '?callback=JSON_CALLBACK';

                var dossierData = $http.get(url);
                var self = this;

                // When our $http promise resolves
                // Use angular.extend to extend 'this'
                // with the properties of the response
                dossierData.then(function successCallback(response) {
                    // console.log('DossierService success response: ' + JSON.stringify(response));
                    deferred.resolve(response);
                    // angular.extend(self.addressList, self.getAddressList(response.data));
                }, function errorCallback(response) {
                    deffered.reject('There was an error getting data');
                    console.log('DossierService error response: ' + JSON.stringify(response));
                });

                return deferred.promise;
            },

            getDossierInfo: function (info) {

                if (!info)
                    return this._default;
                //TODO translations
                return {
                    dossierID: info.dossier_id,
                    enrolmentVersion: info.enrolment_version,
                    dateSaved: info.date_saved,
                    applicationType: info.application_type.capitalize(),
                    softwareVersion: info.software_version,
                    dataChecksum: info.data_checksum,
                    drugProduct: {
                        thirdPartySigned: false,
                        drugUseList: [
                            {"name": "human", "label": "Human", "value": info.human_drug_use},
                            {
                                "name": "radio-pharmaceutical",
                                "label": "Radiopharmaceutical",
                                "value": info.radiopharm_drug_use
                            },
                            {"name": "veterinary", "label": "Veterinary", "value": info.vet_drug_use},
                            {"name": "disinfectant", "label": "Disinfectant", "value": info.disinfectant_drug_use}
                        ],
                        isScheduleA: info.is_sched_a,
                        scheduleAGroup: {

                            drugIdNumber: info.din_number,
                            scheduleAClaimsIndDetails: info.sched_a_claims_ind_details,
                            diseaseDisorderList: [

                                {name: "acute-alcohol", label: "Acute Alcohol", value: info.acute_alcohol},
                                {name: "acute-anxiety", label: "Acute Anxiety", value: info.acute_anxiety},
                                {name: "acute-infectious", label: "Acute Infectious", value: info.acute_infectious},
                                {
                                    name: "acute-inflammatory",
                                    label: "Acute Inflammatory",
                                    value: info.acute_inflammatory
                                },
                                {name: "acute-psychotic", label: "Acute Psychotic", value: info.acute_psychotic},
                                {name: "addiction", label: "Addiction", value: info.addiction},
                                {name: "ateriosclerosis", label: "Ateriosclerosis", value: info.ateriosclerosis},
                                {name: "appendicitis", label: "Appendicitis", value: info.appendicitis},
                                {name: "asthma", label: "Asthma", value: info.asthma},
                                {name: "cancer", label: "Cancer", value: info.cancer},
                                {
                                    name: "congest-heart-fail",
                                    label: "Congest Heart Fail",
                                    value: info.congest_heart_fail
                                },
                                {name: "convulsions", label: "Convulsions", value: info.convulsions},
                                {name: "dementia", label: "Dementia", value: info.dementia},
                                {name: "depression", label: "Depression", value: info.depression},
                                {name: "diabetes", label: "Diabetes", value: info.diabetes},
                                {name: "gangrene", label: "Gangrene", value: info.gangrene},
                                {name: "glaucoma", label: "Glaucoma", value: info.glaucoma},
                                {
                                    name: "haematologic-bleeding",
                                    label: "Haematologic Bleeding",
                                    value: info.haematologic_bleeding
                                },
                                {name: "hepatitis", label: "Hepatitis", value: info.hepatitis},
                                {name: "hypertension", label: "Hypertension", value: info.hypertension},
                                {name: "nausea-pregnancy", label: "Nausea Pregnancy", value: info.nausea_pregnancy},
                                {name: "obesity", label: "Obesity", value: info.obesity},
                                {name: "rheumatic-fever", label: "Rheumatic Fever", value: info.rheumatic_fever},
                                {name: "septicemia", label: "Septicemia", value: info.septicemia},
                                {
                                    name: "sex-transmit-disease",
                                    label: "Sex Transmit Disease",
                                    value: info.sex_transmit_disease
                                },
                                {
                                    name: "strangulated-hernia",
                                    label: "Strangulated Hernia",
                                    value: info.strangulated_hernia
                                },
                                {
                                    name: "thrombotic-embolic-disorder",
                                    label: "Thrombotic Embolic Disorder",
                                    value: info.thrombotic_embolic_disorder
                                },
                                {name: "thyroid-disease", label: "Thyroid Disease", value: info.thyroid_disease},
                                {name: "ulcer-gastro", label: "Ulcer Gastro", value: info.ulcer_gastro},
                                {name: "other", label: "Other", value: false, hasOtherDetails: true} //TODO val
                            ]

                        },
                        therapeutic: {//grid
                            classifications: [ //hardcoded cauz missing in the json file
                                {"id": 1, "name": "classification1"},
                                {"id": 2, "name": "classification2"},
                                {"id": 3, "name": "classification3"},
                                {"id": 4, "name": "classification4"},
                                {"id": 5, "name": "classification5"}
                            ]
                        },
                        canRefProducts: {
                            productList: getCanRefProductList(info.ref_product_list.cdn_ref_product)
                        },//grid
                        formulations: getFormulationList(info.formulation_group.formulation_details),//tab + grid +
                        appendixFour: {
                            ingredientList: getAppendix4IngredientList(info.appendix4_group)
                        }//tab + grid +

                    },
                    contactInfo: { //grid
                        contactList: [],
                        columnDef: []
                    }

                };


            },


            getContactList: function (contacts) {
                var list = [];

                if (contacts) {
                    for (var i = 0; i < contacts.length; i++) {
                        var contact = {};
                        contact.contactID = contacts[i].contact_id;
                        contact.amendRecord = contacts[i].amend_record;
                        contact.contactRole = contacts[i].dossier_contact_details.rep_contact_role;
                        contact.salutation = contacts[i].dossier_contact_details.salutation;
                        contact.givenName = contacts[i].dossier_contact_details.given_name;
                        contact.initials = contacts[i].dossier_contact_details.initials;
                        contact.surname = contacts[i].dossier_contact_details.surname;
                        contact.title = contacts[i].dossier_contact_details.job_title;
                        contact.language = contacts[i].dossier_contact_details.language_correspondance;
                        contact.phone = contacts[i].dossier_contact_details.phone_num;
                        contact.phoneExt = contacts[i].dossier_contact_details.phone_ext;
                        contact.fax = contacts[i].dossier_contact_details.fax_num;
                        contact.email = contacts[i].dossier_contact_details.email;

                        list.push(contact);
                    }
                }
                return list;
            }
        };


        /**
         * Determines if any of the appendices have a data error
         */
        DossierService.prototype.isAppendixesComplete = function () {
            var dossierModel = this.getDossierInfo();
            //error check the model
            if (!dossierModel || !dossierModel.drugProduct || !dosssierModel.drugProduct.appendixFour) {
                return false;
            }
            //iterate through the appendices. If one is error report the error.
            var appendixList = dossierModel.drugProduct.appendixFour.ingredientList;
            for (var i = 0; i < appendixList.length; i++) {
                var appendix = appendixList[i];

                if (!appendix.name) return (true);
                if (!appendix.sourceHuman && !appendix.sourceAnimal) return (true);
                if (appendix.tissuesFluidsOrigin) {
                    var tissuesArray = [
                        appendix.tissuesFluidsOrigin.nervousSystem,
                        appendix.tissuesFluidsOrigin.digestiveSystem,
                        appendix.tissuesFluidsOrigin.reproductiveSystem,
                        appendix.tissuesFluidsOrigin.immuneSystem,
                        appendix.tissuesFluidsOrigin.cardioSystem,
                        appendix.tissuesFluidsOrigin.musculoSkeletalSystem,
                        appendix.tissuesFluidsOrigin.otherTissues,
                        appendix.tissuesFluidsOrigin.skinGlandSystem
                    ];
                    var isSelected = false;
                    for (var m = 0; m < tissuesArray.length; m++) {
                        for (var j = 0; j < tissuesArray[m].list.length; j++) {
                            if (tissuesArray[m].list[j].value === true) {
                                //if has otherText property, check that it is filled in
                                if (tissuesArray[m].list[j].hasOwnProperty('otherText')) {
                                    if (!tissuesArray[m].list[j].otherText) {
                                        return (true);
                                    }
                                } else {
                                    isSelected = true;
                                }
                            }
                        }
                    }
                    if (!isSelected) return true; //none have been selected
                }
                if (appendix.sourceAnimalDetails) {
                    var oneTypeSelected = false;
                    for (var k = 0; k < appendix.sourceAnimalDetails; k++) {
                        //required : true, value
                        var animalRecord = appendix.sourceAnimalDetails[k];
                        if (animalRecord.required && !animalRecord.value) {
                            return true;
                        }
                        if (!animalRecord.required && animalRecord.value) {
                            oneTypeSelected = true;
                        }
                    }
                    if (!oneTypeSelected) return true;
                }
            }
            return false;
        }
        // Return a reference to the function
        return DossierService;
    }

    function getCanRefProductList(info) {
        var list = [];

        if (angular.isDefined(info)) {
            for (var i = 0; i < info.length; i++) {
                var product = {};
                product.medIngredient = info[i].medicinal_ingredient;
                product.dosageForm = info[i].dosage_form;
                product.dosageFormOther = info[i].dosage_form_other;
                product.strengths = info[i].strengths;
                product.companyName = info[i].company_name;

                list.push(product);
            }
        }
        return list;

    }

    function getAppendix4IngredientList(info) {
        var list = [];

        if (angular.isDefined(info)) {
            for (var i = 0; i < info.length; i++) {
                var ing = {};
                ing.id = info[i].ingredient_id;
                ing.name = info[i].ingredient_name;
                // ing.role = info[i].dosage_form;
                // ing.abstractNum = info[i].dosage_form_other;
                // ing.standard = info[i].strengths;
                ing.sourceHuman = info[i].human_sourced === 'Y' ? true : false;
                ing.sourceAnimal = info[i].animal_sourced === 'Y' ? true : false;
                var tissues = info[i].tissues_fluids_section;
                var srcAnimal = info[i].animal_sourced_section;
                //TODO fix the hasOtherDetials
                ing.tissuesFluidsOrigin = {
                    nervousSystem: {
                        title: "Nervous System", //the legend for checkbox list
                        groupName: "nervous-sys", // the group name for checkboxlist
                        list: [
                            {name: "brain", label: "Brain", value: tissues.brain === 'Y' ? true : false},
                            {name: "brain-stem", label: "Brain Stem", value: tissues.brain_stem === 'Y' ? true : false},
                            {name: "cerebellum", label: "Cerebellum", value: tissues.cerebellum === 'Y' ? true : false},
                            {
                                name: "cerebrospinal-fluid",
                                label: "Cerebrospinal Fluid",
                                value: tissues.cerebrospinal_fluid === 'Y' ? true : false
                            },
                            {
                                name: "dorsal-root-ganglia",
                                label: "Dorsal Root Ganglia",
                                value: tissues.dorsal_root_ganglia === 'Y' ? true : false
                            },
                            {name: "dura-mater", label: "Dura Mater", value: tissues.dura_mater === 'Y' ? true : false},
                            {
                                name: "hypothalmus",
                                label: "hypothalmus",
                                value: tissues.hypothalmus === 'Y' ? true : false
                            },
                            {
                                name: "retina-optic",
                                label: "Retina Optic",
                                value: tissues.retina_optic === 'Y' ? true : false
                            },
                            {
                                name: "spinal-cord",
                                label: "Spinal Cord",
                                value: tissues.spinal_cord === 'Y' ? true : false
                            },
                            {
                                name: "trigerminal-ganglia",
                                label: "Trigerminal Ganglia",
                                value: tissues.trigerminal_ganglia === 'Y' ? true : false
                            },
                            {
                                name: "other-nervous",
                                label: "Other Nervous",
                                value: tissues.other_nervous === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_nervous_details
                            }
                        ]
                    },
                    digestiveSystem: {
                        title: "Digestive System",
                        groupName: "digestive-sys",
                        list: [
                            {name: "appendix", label: "appendix", value: tissues.appendix === 'Y' ? true : false},
                            {name: "bile", label: "bile", value: tissues.bile === 'Y' ? true : false},
                            {
                                name: "distal-ileum",
                                label: "Distal Ileum",
                                value: tissues.distal_ileum === 'Y' ? true : false
                            },
                            {
                                name: "large-intestine",
                                label: "Large Intestine",
                                value: tissues.large_intestine === 'Y' ? true : false
                            },
                            {
                                name: "saliva-salivary",
                                label: "Saliva Salivary",
                                value: tissues.saliva_salivary === 'Y' ? true : false
                            },
                            {
                                name: "small-intestine",
                                label: "Small Intestine",
                                value: tissues.small_intestine === 'Y' ? true : false
                            },
                            {name: "stomach", label: "stomach", value: tissues.stomach === 'Y' ? true : false},
                            {
                                name: "other-digestive",
                                label: "Other Digestive",
                                value: tissues.other_digestive === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_digestive_details
                            }
                        ]
                    },
                    reproductiveSystem: {
                        title: "Reproductive System",
                        groupName: "reproductive-sys",
                        list: [
                            {
                                name: "milk-products",
                                label: "Milk Products",
                                value: tissues.milk_products === 'Y' ? true : false
                            },
                            {name: "kidney", label: "kidney", value: tissues.kidney === 'Y' ? true : false},
                            {name: "colostrum", label: "colostrum", value: tissues.colostrum === 'Y' ? true : false},
                            {
                                name: "mammary-glands",
                                label: "Mammary Glands",
                                value: tissues.mammary_glands === 'Y' ? true : false
                            },
                            {name: "ovaries", label: "ovaries", value: tissues.ovaries === 'Y' ? true : false},
                            {name: "placenta", label: "placenta", value: tissues.placenta === 'Y' ? true : false},
                            {
                                name: "placental-fluid",
                                label: "Placental Fluid",
                                value: tissues.placental_fluid === 'Y' ? true : false
                            },
                            {name: "semen", label: "semen", value: tissues.semen === 'Y' ? true : false},
                            {name: "testes", label: "testes", value: tissues.testes === 'Y' ? true : false},
                            {name: "urine", label: "urine", value: tissues.urine === 'Y' ? true : false},
                            {
                                name: "other-reproductive",
                                label: "Other Reproductive",
                                value: tissues.other_reproductive === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_reproductive_details
                            }
                        ]
                    },
                    cardioSystem: {
                        title: "Cardio System",
                        groupName: "cardio-sys",
                        list: [
                            {
                                name: "heart-pericardium",
                                label: "Heart Pericardium",
                                value: tissues.heart_pericardium === 'Y' ? true : false
                            },
                            {name: "lung", label: "lung", value: tissues.lung === 'Y' ? true : false},
                            {
                                name: "nasal-fluid",
                                label: "Nasal Fluid",
                                value: tissues.nasal_fluid === 'Y' ? true : false
                            },
                            {name: "trachea", label: "trachea", value: tissues.trachea === 'Y' ? true : false},
                            {
                                name: "other-cardio-respiratory",
                                label: "Other Cardio Respiratory",
                                value: tissues.other_cardio_respiratory === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_cardio_respiratory_details
                            }
                        ]
                    },
                    immuneSystem: {
                        title: "Immune System",
                        groupName: "immune-sys",
                        list: [
                            {
                                name: "lymph-nodes",
                                label: "Lymph Nodes",
                                value: tissues.lymph_nodes === 'Y' ? true : false
                            },
                            {name: "spleen", label: "spleen", value: tissues.spleen === 'Y' ? true : false},
                            {name: "thymus", label: "thymus", value: tissues.thymus === 'Y' ? true : false},
                            {name: "tonsils", label: "tonsils", value: tissues.tonsils === 'Y' ? true : false},
                            {
                                name: "other-immune",
                                label: "Other Immune",
                                value: tissues.other_immune === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_immune_details
                            }
                        ]
                    },
                    skinGlandSystem: {
                        title: "Skin Gland System",
                        groupName: "skin-gland-sys",
                        list: [
                            {
                                name: "adrenal-gland",
                                label: "Adrenal Gland",
                                value: tissues.adrenal_gland === 'Y' ? true : false
                            },
                            {
                                name: "hair-hooves-feathers",
                                label: "Hair Hooves Feathers",
                                value: tissues.hair_hooves_feathers === 'Y' ? true : false
                            },
                            {name: "liver", label: "liver", value: tissues.liver === 'Y' ? true : false},
                            {name: "pancreas", label: "pancreas", value: tissues.pancreas === 'Y' ? true : false},
                            {name: "pituitary", label: "pituitary", value: tissues.pituitary === 'Y' ? true : false},
                            {name: "skin-hides", label: "skinHides", value: tissues.skin_hides === 'Y' ? true : false},
                            {
                                name: "thyroid-parathyroid",
                                label: "Thyroid Parathyroid",
                                value: tissues.thyroid_parathyroid === 'Y' ? true : false
                            },
                            {
                                name: "other-skin-glandular",
                                label: "Other Skin Glandular",
                                value: tissues.other_skin_glandular === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_skin_glandular_details
                            }
                        ]
                    },
                    musculoSkeletalSystem: {
                        title: "Musculo Skeletal System",
                        groupName: "musculo-skeletal-sys",
                        list: [
                            {name: "abdomen", label: "abdomen", value: tissues.abdomen === 'Y' ? true : false},
                            {name: "skull", label: "skull", value: tissues.skull === 'Y' ? true : false},
                            {name: "bones", label: "bones", value: tissues.bones === 'Y' ? true : false},
                            {name: "collagen", label: "collagen", value: tissues.collagen === 'Y' ? true : false},
                            {
                                name: "tendons-ligaments",
                                label: "Tendons Ligaments",
                                value: tissues.tendons_ligaments === 'Y' ? true : false
                            },
                            {
                                name: "vertebral-column",
                                label: "Vertebral Column",
                                value: tissues.vertebral_column === 'Y' ? true : false
                            },
                            {name: "muscle", label: "muscle", value: tissues.muscle === 'Y' ? true : false},
                            {
                                name: "other-musculo-skeletal",
                                label: "Other Musculo Skeletal",
                                value: tissues.other_musculo_skeletal === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_musculo_skeletal_details
                            }
                        ]
                    },
                    otherTissues: {
                        title: "Other Tissues",
                        groupName: "other-tissues",
                        list: [
                            {name: "adipose", label: "adipose", value: tissues.adipose === 'Y' ? true : false},
                            {name: "ascites", label: "ascites", value: tissues.ascites === 'Y' ? true : false},
                            {
                                name: "antler-velvet",
                                label: "Antler Velvet",
                                value: tissues.antler_velvet === 'Y' ? true : false
                            },
                            {name: "serum", label: "serum", value: tissues.serum === 'Y' ? true : false},
                            {
                                name: "whole-blood",
                                label: "Whole Blood",
                                value: tissues.whole_blood === 'Y' ? true : false
                            },
                            {name: "plasma", label: "plasma", value: tissues.plasma === 'Y' ? true : false},
                            {
                                name: "embryonic-tissue",
                                label: "Embryonic Tissue",
                                value: tissues.embryonic_tissue === 'Y' ? true : false
                            },
                            {
                                name: "fetal-tissue",
                                label: "Fetal Tissue",
                                value: tissues.fetal_tissue === 'Y' ? true : false
                            },
                            {
                                name: "bone-marrow",
                                label: "Bone Marrow",
                                value: tissues.bone_marrow === 'Y' ? true : false
                            },
                            {
                                name: "eyes-cornea",
                                label: "Eyes Cornea",
                                value: tissues.eyes_cornea === 'Y' ? true : false
                            },
                            {
                                name: "gall-bladder",
                                label: "Gall Bladder",
                                value: tissues.gall_bladder === 'Y' ? true : false
                            },
                            {
                                name: "other-fluids-tissues",
                                label: "Other Fluids Tissues",
                                value: tissues.other_fluids_tissues === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_fluids_tissues_details
                            }
                        ]
                    }
                };
                ing.sourceAnimalDetails = {

                    primateTypeList: [
                        {
                            label: "NONHUMANPRIMATE",
                            type: "text",
                            name: "nhp-type",
                            required: false,
                            value: srcAnimal.nonhuman_primate_type
                        },
                        {
                            label: "AQUATICTYPE",
                            type: "text",
                            name: "aqua-type",
                            required: false,
                            value: srcAnimal.aquatic_type
                        },
                        {
                            label: "AVIANTYPE",
                            type: "text",
                            name: "avian-type",
                            required: false,
                            value: srcAnimal.avian_type
                        },
                        {
                            label: "BOVINETYPE",
                            type: "text",
                            name: "bovine-type",
                            required: false,
                            value: srcAnimal.bovine_type
                        },
                        {
                            label: "CANINETYPE",
                            type: "text",
                            name: "canine-type",
                            required: false,
                            value: srcAnimal.canine_type
                        },
                        {
                            label: "CAPRINETYPE",
                            type: "text",
                            name: "caprine-type",
                            required: false,
                            value: srcAnimal.caprine_type
                        },
                        {
                            label: "CERVIDAETYPE",
                            type: "text",
                            name: "cervidae-type",
                            required: false,
                            value: srcAnimal.cervidae_type
                        },
                        {
                            label: "EQUINETYPE",
                            type: "text",
                            name: "equine-type",
                            required: false,
                            value: srcAnimal.equine_type
                        },
                        {
                            label: "FELINETYPE",
                            type: "text",
                            name: "feline-type",
                            required: false,
                            value: srcAnimal.feline_type
                        },
                        {
                            label: "OVINETYPE",
                            type: "text",
                            name: "ovine-type",
                            required: false,
                            value: srcAnimal.ovine_type
                        },
                        {
                            label: "PORCINETYPE",
                            type: "text",
                            name: "porcine-type",
                            required: false,
                            value: srcAnimal.porcine_type
                        },
                        {
                            label: "RODENTTYPE",
                            type: "text",
                            name: "rodent-type",
                            required: false,
                            value: srcAnimal.rodent_type
                        },
                        {
                            label: "OTHERANIMALTYPE",
                            type: "text",
                            name: "other-animal-type",
                            required: false,
                            value: srcAnimal.other_type
                        },
                        {
                            label: "CONTROLLEDPOP",
                            type: "select",
                            name: "controlled-pop",
                            required: true,
                            value: srcAnimal.is_controlled_pop
                        },
                        {
                            label: "BIOTECHDERIVED",
                            type: "select",
                            name: "biotech-derived",
                            required: true,
                            value: srcAnimal.is_biotech_derived
                        },
                        {
                            label: "CELLLINE",
                            type: "select",
                            name: "cell-line",
                            required: true,
                            value: srcAnimal.is_cell_line
                        },
                        {
                            label: "AGEANIMALS",
                            type: "number",
                            name: "age-animals",
                            required: true,
                            value: srcAnimal.animal_age
                        }/*,
                         {label : "SPECIFY", type: "text", name : "specify", required : false, value : srcAnimal.nonhuman_primate_type}*/
                    ],

                    countryList: []
                };
                list.push(ing);
            }
        }


        return list;


    }


    function appendix4IngredientListToOutput(info){
        var list = [];

        if (angular.isDefined(info)) {
            for (var i = 0; i < info.length; i++) {
                var ing = {};
                ing.ingredient_id= info[i].id ;
                ing.ingredient_name = info[i].name;
                ing.human_sourced = info[i].sourceHuman === true ? 'Y' : 'N';
                ing.animal_sourced = info[i].sourceAnimal  === true ? 'Y' : 'N';

                if( info.tissuesFluidsOrigin){
                 ing.tissues_fluids_section={};
                 //TODO do a for loop
                    var tissuesArray = [
                        info.tissuesFluidsOrigin.nervousSystem,
                        info.tissuesFluidsOrigin.digestiveSystem,
                        info.tissuesFluidsOrigin.reproductiveSystem,
                        info.tissuesFluidsOrigin.immuneSystem,
                        info.tissuesFluidsOrigin.cardioSystem,
                        info.tissuesFluidsOrigin.musculoSkeletalSystem,
                        info.tissuesFluidsOrigin.otherTissues,
                        info.tissuesFluidsOrigin.skinGlandSystem
                    ];
                    for(var d=0;d<tissueArray.length; d++){
                        var oneRecord=tissueArray[d];
                        for(var g=0;g<oneRecord.list.length;g++){
                            switch(oneRecord.list[g].name){
                                case"brain":
                                    ing.tissues_fluids_section.brain=oneRecord.list[g].value===true ?'Y' :'N';
                                    break;
                                case"brain-stem":
                                    ing.tissues_fluids_section.brain_stem=oneRecord.list[g].value===true ?'Y' :'N';
                                    break;
                                //TODO complete
                            }


                        }

                    }

                   /// ing.tissues_fluids_section.brain_stem=info.tissuesFluidsOrigin.nervousSystem.list

                }
                //TODO fix the hasOtherDetials
             /*   ing.tissuesFluidsOrigin = {
                    nervousSystem: {
                        title: "Nervous System", //the legend for checkbox list
                        groupName: "nervous-sys", // the group name for checkboxlist
                        list: [
                            {name: "brain", label: "Brain", value: tissues.brain === 'Y' ? true : false},
                            {name: "brain-stem", label: "Brain Stem", value: tissues.brain_stem === 'Y' ? true : false},
                            {name: "cerebellum", label: "Cerebellum", value: tissues.cerebellum === 'Y' ? true : false},
                            {
                                name: "cerebrospinal-fluid",
                                label: "Cerebrospinal Fluid",
                                value: tissues.cerebrospinal_fluid === 'Y' ? true : false
                            },
                            {
                                name: "dorsal-root-ganglia",
                                label: "Dorsal Root Ganglia",
                                value: tissues.dorsal_root_ganglia === 'Y' ? true : false
                            },
                            {name: "dura-mater", label: "Dura Mater", value: tissues.dura_mater === 'Y' ? true : false},
                            {
                                name: "hypothalmus",
                                label: "hypothalmus",
                                value: tissues.hypothalmus === 'Y' ? true : false
                            },
                            {
                                name: "retina-optic",
                                label: "Retina Optic",
                                value: tissues.retina_optic === 'Y' ? true : false
                            },
                            {
                                name: "spinal-cord",
                                label: "Spinal Cord",
                                value: tissues.spinal_cord === 'Y' ? true : false
                            },
                            {
                                name: "trigerminal-ganglia",
                                label: "Trigerminal Ganglia",
                                value: tissues.trigerminal_ganglia === 'Y' ? true : false
                            },
                            {
                                name: "other-nervous",
                                label: "Other Nervous",
                                value: tissues.other_nervous === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_nervous_details
                            }
                        ]
                    },
                    digestiveSystem: {
                        title: "Digestive System",
                        groupName: "digestive-sys",
                        list: [
                            {name: "appendix", label: "appendix", value: tissues.appendix === 'Y' ? true : false},
                            {name: "bile", label: "bile", value: tissues.bile === 'Y' ? true : false},
                            {
                                name: "distal-ileum",
                                label: "Distal Ileum",
                                value: tissues.distal_ileum === 'Y' ? true : false
                            },
                            {
                                name: "large-intestine",
                                label: "Large Intestine",
                                value: tissues.large_intestine === 'Y' ? true : false
                            },
                            {
                                name: "saliva-salivary",
                                label: "Saliva Salivary",
                                value: tissues.saliva_salivary === 'Y' ? true : false
                            },
                            {
                                name: "small-intestine",
                                label: "Small Intestine",
                                value: tissues.small_intestine === 'Y' ? true : false
                            },
                            {name: "stomach", label: "stomach", value: tissues.stomach === 'Y' ? true : false},
                            {
                                name: "other-digestive",
                                label: "Other Digestive",
                                value: tissues.other_digestive === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_digestive_details
                            }
                        ]
                    },
                    reproductiveSystem: {
                        title: "Reproductive System",
                        groupName: "reproductive-sys",
                        list: [
                            {
                                name: "milk-products",
                                label: "Milk Products",
                                value: tissues.milk_products === 'Y' ? true : false
                            },
                            {name: "kidney", label: "kidney", value: tissues.kidney === 'Y' ? true : false},
                            {name: "colostrum", label: "colostrum", value: tissues.colostrum === 'Y' ? true : false},
                            {
                                name: "mammary-glands",
                                label: "Mammary Glands",
                                value: tissues.mammary_glands === 'Y' ? true : false
                            },
                            {name: "ovaries", label: "ovaries", value: tissues.ovaries === 'Y' ? true : false},
                            {name: "placenta", label: "placenta", value: tissues.placenta === 'Y' ? true : false},
                            {
                                name: "placental-fluid",
                                label: "Placental Fluid",
                                value: tissues.placental_fluid === 'Y' ? true : false
                            },
                            {name: "semen", label: "semen", value: tissues.semen === 'Y' ? true : false},
                            {name: "testes", label: "testes", value: tissues.testes === 'Y' ? true : false},
                            {name: "urine", label: "urine", value: tissues.urine === 'Y' ? true : false},
                            {
                                name: "other-reproductive",
                                label: "Other Reproductive",
                                value: tissues.other_reproductive === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_reproductive_details
                            }
                        ]
                    },
                    cardioSystem: {
                        title: "Cardio System",
                        groupName: "cardio-sys",
                        list: [
                            {
                                name: "heart-pericardium",
                                label: "Heart Pericardium",
                                value: tissues.heart_pericardium === 'Y' ? true : false
                            },
                            {name: "lung", label: "lung", value: tissues.lung === 'Y' ? true : false},
                            {
                                name: "nasal-fluid",
                                label: "Nasal Fluid",
                                value: tissues.nasal_fluid === 'Y' ? true : false
                            },
                            {name: "trachea", label: "trachea", value: tissues.trachea === 'Y' ? true : false},
                            {
                                name: "other-cardio-respiratory",
                                label: "Other Cardio Respiratory",
                                value: tissues.other_cardio_respiratory === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_cardio_respiratory_details
                            }
                        ]
                    },
                    immuneSystem: {
                        title: "Immune System",
                        groupName: "immune-sys",
                        list: [
                            {
                                name: "lymph-nodes",
                                label: "Lymph Nodes",
                                value: tissues.lymph_nodes === 'Y' ? true : false
                            },
                            {name: "spleen", label: "spleen", value: tissues.spleen === 'Y' ? true : false},
                            {name: "thymus", label: "thymus", value: tissues.thymus === 'Y' ? true : false},
                            {name: "tonsils", label: "tonsils", value: tissues.tonsils === 'Y' ? true : false},
                            {
                                name: "other-immune",
                                label: "Other Immune",
                                value: tissues.other_immune === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_immune_details
                            }
                        ]
                    },
                    skinGlandSystem: {
                        title: "Skin Gland System",
                        groupName: "skin-gland-sys",
                        list: [
                            {
                                name: "adrenal-gland",
                                label: "Adrenal Gland",
                                value: tissues.adrenal_gland === 'Y' ? true : false
                            },
                            {
                                name: "hair-hooves-feathers",
                                label: "Hair Hooves Feathers",
                                value: tissues.hair_hooves_feathers === 'Y' ? true : false
                            },
                            {name: "liver", label: "liver", value: tissues.liver === 'Y' ? true : false},
                            {name: "pancreas", label: "pancreas", value: tissues.pancreas === 'Y' ? true : false},
                            {name: "pituitary", label: "pituitary", value: tissues.pituitary === 'Y' ? true : false},
                            {name: "skin-hides", label: "skinHides", value: tissues.skin_hides === 'Y' ? true : false},
                            {
                                name: "thyroid-parathyroid",
                                label: "Thyroid Parathyroid",
                                value: tissues.thyroid_parathyroid === 'Y' ? true : false
                            },
                            {
                                name: "other-skin-glandular",
                                label: "Other Skin Glandular",
                                value: tissues.other_skin_glandular === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_skin_glandular_details
                            }
                        ]
                    },
                    musculoSkeletalSystem: {
                        title: "Musculo Skeletal System",
                        groupName: "musculo-skeletal-sys",
                        list: [
                            {name: "abdomen", label: "abdomen", value: tissues.abdomen === 'Y' ? true : false},
                            {name: "skull", label: "skull", value: tissues.skull === 'Y' ? true : false},
                            {name: "bones", label: "bones", value: tissues.bones === 'Y' ? true : false},
                            {name: "collagen", label: "collagen", value: tissues.collagen === 'Y' ? true : false},
                            {
                                name: "tendons-ligaments",
                                label: "Tendons Ligaments",
                                value: tissues.tendons_ligaments === 'Y' ? true : false
                            },
                            {
                                name: "vertebral-column",
                                label: "Vertebral Column",
                                value: tissues.vertebral_column === 'Y' ? true : false
                            },
                            {name: "muscle", label: "muscle", value: tissues.muscle === 'Y' ? true : false},
                            {
                                name: "other-musculo-skeletal",
                                label: "Other Musculo Skeletal",
                                value: tissues.other_musculo_skeletal === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_musculo_skeletal_details
                            }
                        ]
                    },
                    otherTissues: {
                        title: "Other Tissues",
                        groupName: "other-tissues",
                        list: [
                            {name: "adipose", label: "adipose", value: tissues.adipose === 'Y' ? true : false},
                            {name: "ascites", label: "ascites", value: tissues.ascites === 'Y' ? true : false},
                            {
                                name: "antler-velvet",
                                label: "Antler Velvet",
                                value: tissues.antler_velvet === 'Y' ? true : false
                            },
                            {name: "serum", label: "serum", value: tissues.serum === 'Y' ? true : false},
                            {
                                name: "whole-blood",
                                label: "Whole Blood",
                                value: tissues.whole_blood === 'Y' ? true : false
                            },
                            {name: "plasma", label: "plasma", value: tissues.plasma === 'Y' ? true : false},
                            {
                                name: "embryonic-tissue",
                                label: "Embryonic Tissue",
                                value: tissues.embryonic_tissue === 'Y' ? true : false
                            },
                            {
                                name: "fetal-tissue",
                                label: "Fetal Tissue",
                                value: tissues.fetal_tissue === 'Y' ? true : false
                            },
                            {
                                name: "bone-marrow",
                                label: "Bone Marrow",
                                value: tissues.bone_marrow === 'Y' ? true : false
                            },
                            {
                                name: "eyes-cornea",
                                label: "Eyes Cornea",
                                value: tissues.eyes_cornea === 'Y' ? true : false
                            },
                            {
                                name: "gall-bladder",
                                label: "Gall Bladder",
                                value: tissues.gall_bladder === 'Y' ? true : false
                            },
                            {
                                name: "other-fluids-tissues",
                                label: "Other Fluids Tissues",
                                value: tissues.other_fluids_tissues === 'Y' ? true : false,
                                hasOtherDetails: true,
                                otherText: tissues.other_fluids_tissues_details
                            }
                        ]
                    }
                };
                ing.sourceAnimalDetails = {

                    primateTypeList: [
                        {
                            label: "NONHUMANPRIMATE",
                            type: "text",
                            name: "nhp-type",
                            required: false,
                            value: srcAnimal.nonhuman_primate_type
                        },
                        {
                            label: "AQUATICTYPE",
                            type: "text",
                            name: "aqua-type",
                            required: false,
                            value: srcAnimal.aquatic_type
                        },
                        {
                            label: "AVIANTYPE",
                            type: "text",
                            name: "avian-type",
                            required: false,
                            value: srcAnimal.avian_type
                        },
                        {
                            label: "BOVINETYPE",
                            type: "text",
                            name: "bovine-type",
                            required: false,
                            value: srcAnimal.bovine_type
                        },
                        {
                            label: "CANINETYPE",
                            type: "text",
                            name: "canine-type",
                            required: false,
                            value: srcAnimal.canine_type
                        },
                        {
                            label: "CAPRINETYPE",
                            type: "text",
                            name: "caprine-type",
                            required: false,
                            value: srcAnimal.caprine_type
                        },
                        {
                            label: "CERVIDAETYPE",
                            type: "text",
                            name: "cervidae-type",
                            required: false,
                            value: srcAnimal.cervidae_type
                        },
                        {
                            label: "EQUINETYPE",
                            type: "text",
                            name: "equine-type",
                            required: false,
                            value: srcAnimal.equine_type
                        },
                        {
                            label: "FELINETYPE",
                            type: "text",
                            name: "feline-type",
                            required: false,
                            value: srcAnimal.feline_type
                        },
                        {
                            label: "OVINETYPE",
                            type: "text",
                            name: "ovine-type",
                            required: false,
                            value: srcAnimal.ovine_type
                        },
                        {
                            label: "PORCINETYPE",
                            type: "text",
                            name: "porcine-type",
                            required: false,
                            value: srcAnimal.porcine_type
                        },
                        {
                            label: "RODENTTYPE",
                            type: "text",
                            name: "rodent-type",
                            required: false,
                            value: srcAnimal.rodent_type
                        },
                        {
                            label: "OTHERANIMALTYPE",
                            type: "text",
                            name: "other-animal-type",
                            required: false,
                            value: srcAnimal.other_type
                        },
                        {
                            label: "CONTROLLEDPOP",
                            type: "select",
                            name: "controlled-pop",
                            required: true,
                            value: srcAnimal.is_controlled_pop
                        },
                        {
                            label: "BIOTECHDERIVED",
                            type: "select",
                            name: "biotech-derived",
                            required: true,
                            value: srcAnimal.is_biotech_derived
                        },
                        {
                            label: "CELLLINE",
                            type: "select",
                            name: "cell-line",
                            required: true,
                            value: srcAnimal.is_cell_line
                        },
                        {
                            label: "AGEANIMALS",
                            type: "number",
                            name: "age-animals",
                            required: true,
                            value: srcAnimal.animal_age
                        }/!*,
                         {label : "SPECIFY", type: "text", name : "specify", required : false, value : srcAnimal.nonhuman_primate_type}*!/
                    ],

                    countryList: []
                };*/
                list.push(ing);
            }
        }

        return list;

    }


    function getFormulationList(list) {

        var formulationList = [];
        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }
        angular.forEach(list, function (item) {

            var obj = {
                "formulation": item.formulation_id,
                "formulationName": item.formulation_name,
                "activeIngList": getActiveIngList(item.active_ingredient),
                "nMedIngList": getNonMedIngList(item.nonmedicinal_ingredient),
                "containerTypes": getContainerTypeList(item.container_group.container_details),
                "animalHumanMaterials": getMaterialList(item.material_ingredient),
                "routeAdmins": getRouteAdminList(item.roa_group.roa_details),
                "countryList": getFormulationCountryList(item.country_group.country_manufacturer)

            }

            formulationList.push(obj);


        });

        return formulationList;
    }

    /**
     * Creates the formulation list for output
     * @param list
     * @returns {Array}
     */
    function formulationListToOutput(list) {
        var formulationList = [];


        angular.forEach(list, function (item) {
            var obj = {
                "formulation_id": item.formulation,
                "formulation_name": item.formulationName,
                "active_ingredient": getActiveIngList(item.activeIngList),
                "nonmedicinal_ingredient": getNonMedIngList(item.nMedIngList),
                container_group: {
                    "container_details": getContainerTypeList(item.containerTypes)
                },
                "material_ingredient": getMaterialList(item.animalHumanMaterials),
                "roa_group": {
                    "roa_details": getRouteAdminList(item.routeAdmins)
                },
                "country_group":{
                    "country_manufacturer": getFormulationCountryList(item.countryList)
                }
            };
                formulationList.push(obj);
        });
        return formulationList;
    }


    function getActiveIngList(list) {

        var resultList = [];
        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }
        angular.forEach(list, function (item) {

            var obj = {
                "ingId": item.ingredient_id,
                "ingName": item.ingredient_name,
                "cas": item.cas_number,
                "humanAnimalSourced": item.is_human_animal_src,
                "standard": item.ingred_standard,
                "strength": item.strength,
                "per": item.per,
                "units": item.units,
                "calcAsBase": item.is_base_calc,
                "nanoMaterial": item.is_nanomaterial,
                "nanoMaterialOther": item.nanomaterial_details
            };

            resultList.push(obj);

        });

        return resultList;

    }

    /***
     * Maps the active ingredient list to the output Json
     * @param activeList
     */
    function activeListToOutput(activeList) {
        var resultList = [];

        angular.forEach(activeList, function (item) {

            var obj = {
                "ingredient_id": item.ingId,
                "ingredient_name": item.ingName,
                "cas_number": item.cas,
                "is_human_animal_src": item.humanAnimalSourced,
                "ingred_standard": item.standard,
                "strength": item.strength,
                "per": item.per,
                "units": item.units,
                "is_base_calc": item.calcAsBase,
                "calcAsBase": item.is_base_calc,
                "is_nanomaterial": item.nanoMaterial,
                "nanomaterial_details": item.nanoMaterialOther
            };

            resultList.push(obj);
        });

    }


    function getNonMedIngList(list) {

        var resultList = [];
        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }
        angular.forEach(list, function (item) {
            var obj = {
                "ingId": item.ingredient_id,
                "varId": item.variant_name,
                "ingName": item.ingredient_name,
                "cas": item.cas_number,
                "humanAnimalSourced": item.is_human_animal_src,
                "standard": item.ingred_standard,
                "strength": item.strength,
                "per": item.per,
                "units": item.units,
                "calcAsBase": item.is_base_calc,
                "nanoMaterial": item.is_nanomaterial,
                "nanoMaterialOther": item.nanomaterial_details
            };
            resultList.push(obj);
        });

        return resultList;
    }

    /**
     * Convertes nonMedicinal Ingredient to a the output json object
     * @param nonMedList
     * @returns {Array}
     */
    function nonMedIngListToOutput(nonMedList) {

        var resultList = [];

        angular.forEach(nonMedList, function (item) {

            var obj = {
                "ingredient_id": item.ingId,
                "variant_name": item.varId,
                "ingredient_name": item.ingName,
                "cas_number": item.cas,
                "is_human_animal_src": item.humanAnimalSourced,
                "ingred_standard": item.standard,
                "strength": item.strength,
                "per": item.per,
                "units": item.units,
                "is_base_calc": item.calcAsBase,
                "is_nanomaterial": item.nanoMaterial,
                "nanoMaterialOther": item.nanomaterial_details
            };
            array.push(obj);
        });
        return resultList;
    }


    function getContainerTypeList(list) {

        var resultList = [];
        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }

        angular.forEach(list, function (item) {

            var obj = {
                "containerType": item.container_type,
                "packageSize": item.package_size,
                "shelfLifeYears": item.shelf_life_years,
                "shelfLifeMonths": item.shelf_life_months,
                "tempMin": item.temperature_min,
                "tempMax": item.temperature_max
            };

            resultList.push(obj);

        });

        return resultList;
    }

    /**
     * Converts container type to output json
     * @param containerList
     * @returns {Array}
     */
    function containerTypeListToOutput(containerList) {
        var resultList = [];
        angular.forEach(containerList, function (item) {

            var obj = {
                "container_type": item.containerType,
                "package_size": item.packageSize,
                "shelf_life_years": item.shelfLifeYears,
                "shelf_life_months": item.shelfLifeMonths,
                "temperature_min": item.tempMin,
                "temperature_max": item.tempMax
            };

            resultList.push(obj);
        });
        return resultList
    }


    function getMaterialList(list) {

        var resultList = [];
        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }
        angular.forEach(list, function (item) {
            var obj = {
                "ingredientId": item.ingredient_id,
                "ingredientName": item.ingredient_name,
                "cas": item.cas_number,
                "ingredientStandard": item.ingred_standard,
                "inFinalContainer": item.in_final_container
            };
            resultList.push(obj);
        });
        return resultList;
    };
    /**
     * @ngdoc Maps material records to output json
     * @param list
     * @returns {Array}
     */
    function materialListToOutput(list) {
        var resultList = [];
        angular.forEach(list, function (item) {
            var obj = {
                "ingredient_id": item.ingredientId,
                "ingredient_name": item.ingredientName,
                "cas_number": item.cas,
                "ingred_standard": item.ingredientStandard,
                "in_final_container": item.inFinalContainer
            };
            resultList.push(obj);
        });
        return resultList;
    };


    function getRouteAdminList(list) {

        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }

        var resultList = [];

        var _id = 0;

        angular.forEach(list, function (item) {

            _id = _id + 1;
            var obj = {
                "id": _id,
                "roa": item.roa,
                "otherRoaDetails": item.roa_other
            };

            resultList.push(obj);

        });

        return resultList;
    }

    /**
     * converts route of admin to output json format
     * @param list
     * @returns {Array}
     */
    function routeAdminToOutput(list) {
        var resultList = [];
        angular.forEach(list, function (item) {
            var obj = {
                "roa": item.roa,
                "roa_other": item.otherRoaDetails
            };
            resultList.push(obj);

        });
        return resultList
    }

    function getFormulationCountryList(list) {

        var resultList = [];

        var _id = 0;

        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }

        angular.forEach(list, function (item) {

            _id = _id + 1;
            var obj = {
                "id": _id,
                "name": item.country_origin
            };

            resultList.push(obj);

        });

        return resultList;
    }

    /**
     * Country of origin list to output
     * @param list
     * @returns {Array}
     */
    function formulationCountryListToOutput(list) {

        var resultList = []
        angular.forEach(list, function (item) {

            var obj = {
                "country_origin": item.name
            };

            resultList.push(obj);
        });
        return resultList;
    }


    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
        //return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    };


})();
