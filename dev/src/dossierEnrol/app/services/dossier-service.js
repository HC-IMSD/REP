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
        function DossierService() {}

        function DossierService(dossierData) {
            //construction logic

            angular.extend(this._default, dossierData);
        }

        DossierService.CanadianPostalCodePattern = function () {

        }

        DossierService.dossierDefault = {
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

            _default: DossierService.dossierDefault,

           /* loadFromFile: function (url) {
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
            },*/

            loadFromFile: function (info) {

                if (!info)
                    return this._default;

                if(!info['DOSSIER_ENROL'])
                    return this._default;

                info = info['DOSSIER_ENROL'];

                return {
                    dossierID: info.dossier_id,
                    relatedDossierID: info.related_dossier_id,
                    enrolmentVersion: info.enrolment_version,
                    dateSaved: info.date_saved,
                    applicationType: info.application_type,
                    softwareVersion: info.software_version,
                    dataChecksum: info.data_checksum,
                    productName: info.brand_name,
                    properName: info.common_name,
                    drugProduct: {
                        thirdPartySigned: false,
                        drugUseList: [
                            {"name": "human", "label": "Human", "value": info.human_drug_use === 'Y' ? true:false },
                            {"name": "radio-pharmaceutical", "label": "Radiopharmaceutical", "value": info.radiopharm_drug_use === 'Y' ? true:false },
                            {"name": "veterinary", "label": "Veterinary", "value": info.vet_drug_use === 'Y' ? true:false },
                            {"name": "disinfectant", "label": "Disinfectant", "value": info.disinfectant_drug_use === 'Y' ? true:false }
                        ],
                        isScheduleA: info.is_sched_a === 'Y' ? true:false ,
                        scheduleAGroup: {

                            drugIdNumber: info.schedule_a_group.din_number,
                            scheduleAClaimsIndDetails: info.schedule_a_group.sched_a_claims_ind_details,
                            diseaseDisorderList: getDiseaseDisorderList(info.schedule_a_group)

                        },
                        therapeutic: info.therapeutic_class_list.therapeutic_class,
                        canRefProducts:  getCanRefProductList(info.ref_product_list.cdn_ref_product),//grid
                        formulations: getFormulationList(info.formulation_group.formulation_details),//tab + grid +
                        appendixFour: {
                            ingredientList : getAppendix4IngredientList(info.appendix4_group)
                        }//tab + grid +

                    },
                   contactList: getContactList(info.contact_record)

                };


            },

            getAddressList: function (adrList) {

                var list = [];

                if (adrList) {
                    for (var i = 0; i < adrList.length; i++) {
                        var address = {};
                        address.addressID = adrList[i].address_id;
                        address.dossierName = adrList[i].dossier_name;
                        address.amendRecord = adrList[i].amend_record === 'Y' ? true : false;
                        address.addressRole = {};
                        address.addressRole.manufacturer = adrList[i].manufacturer === 'Y' ? true : false;
                        address.addressRole.mailing = adrList[i].mailing === 'Y' ? true : false;
                        address.addressRole.billing = adrList[i].billing === 'Y' ? true : false;
                        address.addressRole.importer = adrList[i].importer === 'Y' ? true : false;
                        address.street = adrList[i].dossier_address_details.street_address;
                        address.city = adrList[i].dossier_address_details.city;
                        address.provState = adrList[i].dossier_address_details.province_lov;
                        address.country = adrList[i].dossier_address_details.country;
                        address.postalCode = adrList[i].dossier_address_details.postal_code;

                        list.push(address);
                    }
                }


                return list;

            }


        };

        /**
         * @ngdoc Main entry point for converting the internal data model to a compatible output for writing
         * @param jsonObj
         * @returns {*}
         */
        DossierService.prototype.dossierToOutput = function (jsonObj) {
            if (!jsonObj) return null;
            var baseDossier = {};
            //order is important!!! Must match schema
            baseDossier.company_id = jsonObj.companyId; //TODO missing from internal model
            baseDossier.dossier_id = jsonObj.dossierId; //TODO missing from  internal model and XML! Net New
            baseDossier.related_dossier_id = jsonObj.relatedDossierID; //TODO missing from nodel
            baseDossier.date_saved = jsonObj.dateSaved;
            baseDossier.application_type = jsonObj.applicationType;
            baseDossier.software_version = "1.0"; //TODO: hard code or make a function, should be centrally available
            baseDossier.data_checksum = "";
            if (jsonObj.contactList) { //TODO skip if empty list?
                baseDossier.is_sched_a = repContactToOutput(jsonObj.contactList);
            }
            baseDossier.brand_name = jsonObj.drugProduct.brandName; //TODO confirm model
            baseDossier.common_name = jsonObj.drugProduct.common_name;
            baseDossier.third_party_signed = jsonObj.drugProduct.thirdPartySigned;
            baseDossier.ref_product_list = {};
            baseDossier.ref_product_list.amend_record = "N" //TODO implement this functionality?
            if (jsonObj.canRefProducts && jsonObj.canRefProducts.productList) {
                baseDossier.ref_product_list.cdn_ref_product = canRefProductListToOutput(jsonObj.canRefProducts.productList)
            }
            baseDossier.human_drug_use = jsonObj.humanDrugUse;
            baseDossier.radiopharm_drug_use = jsonObj.radiopharmDrugUse;
            baseDossier.vet_drug_use = jsonObj.vetDrugUse;
            baseDossier.disinfectant_drug_use = jsonObj.disinfectantDrugUse;
            baseDossier.therapeutic_class_list = {};
            if (jsonObj.therapeutic) {
                baseDossier.therapeutic_class_list.classification = therapeuticClassToOutput(jsonObj.therapeutic.classifications);
            }
            baseDossier.is_sched_a = jsonObj.isScheduleA;
            //TODO schedule_a_group  (jsonObj.scheduleAGroup)
            if (jsonObj.isScheduleA) {
                baseDossier.schedule_a_group=scheduleAToOutput(jsonObj.scheduleAGroup);
            }
            if (jsonObj.drugProduct) {
                var appendix4 = appendix4IngredientListToOutput(jsonObj.drugProduct.appendixFour)
                if (appendix4) {
                    outDossier.appendix4_group = appendix4;
                }
                var formulations = formulationListToOutput(jsonObj.drugProduct.formulations)
                if (formulations) {
                    outDossier.formulation_group.formulation_details = formulations;
                }
            }
            return (baseDossier);
        }

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

    function getContactList(contacts){

        var list = [];

        if (angular.isDefined(contacts)) {

            for(var i = 0; i < contacts.length; i++){
                var contact = {};
                contact.amend = contacts[i].amend_record === 'Y' ? true:false;
                contact.repRole = contacts[i].rep_contact_role;
                contact.salutation = contacts[i].rep_contact_details.salutation;
                contact.givenName = contacts[i].rep_contact_details.given_name;
                contact.surname =  contacts[i].rep_contact_details.surname;
                contact.initials = contacts[i].rep_contact_details.initials;
                contact.title = contacts[i].rep_contact_details.job_title;
                contact.phone = contacts[i].rep_contact_details.phone_num;
                contact.PhoneExt = contacts[i].rep_contact_details.phone_ext;
                contact.fax = contacts[i].rep_contact_details.fax_num;
                contact.email = contacts[i].rep_contact_details.email;
                contact.language = contacts[i].rep_contact_details.language_correspondance;

                list.push(contact);

            }

        }

        return list;
    };

    function getDiseaseDisorderList(info){

        return [

            {name: "acute-alcohol", label: "Acute Alcohol", value: info.acute_alcohol === 'Y' ? true:false },
            {name: "acute-anxiety", label: "Acute Anxiety", value: info.acute_anxiety === 'Y' ? true:false },
            {name: "acute-infectious", label: "Acute Infectious", value: info.acute_infectious === 'Y' ? true:false },
            {name: "acute-inflammatory", label: "Acute Inflammatory", value: info.acute_inflammatory === 'Y' ? true:false },
            {name: "acute-psychotic", label: "Acute Psychotic", value: info.acute_psychotic === 'Y' ? true:false },
            {name: "addiction", label: "Addiction", value: info.addiction === 'Y' ? true:false },
            {name: "ateriosclerosis", label: "Ateriosclerosis", value: info.ateriosclerosis === 'Y' ? true:false },
            {name: "appendicitis", label: "Appendicitis", value: info.appendicitis === 'Y' ? true:false },
            {name: "asthma", label: "Asthma", value: info.asthma === 'Y' ? true:false },
            {name: "cancer", label: "Cancer", value: info.cancer === 'Y' ? true:false },
            {name: "congest-heart-fail", label: "Congest Heart Fail", value: info.congest_heart_fail === 'Y' ? true:false },
            {name: "convulsions", label: "Convulsions", value: info.convulsions === 'Y' ? true:false },
            {name: "dementia", label: "Dementia", value: info.dementia === 'Y' ? true:false },
            {name: "depression", label: "Depression", value: info.depression === 'Y' ? true:false },
            {name: "diabetes", label: "Diabetes", value: info.diabetes === 'Y' ? true:false },
            {name: "gangrene", label: "Gangrene", value: info.gangrene === 'Y' ? true:false },
            {name: "glaucoma", label: "Glaucoma", value: info.glaucoma === 'Y' ? true:false },
            {name: "haematologic-bleeding", label: "Haematologic Bleeding", value: info.haematologic_bleeding === 'Y' ? true:false },
            {name: "hepatitis", label: "Hepatitis", value: info.hepatitis === 'Y' ? true:false },
            {name: "hypertension", label: "Hypertension", value: info.hypertension === 'Y' ? true:false },
            {name: "nausea-pregnancy", label: "Nausea Pregnancy", value: info.nausea_pregnancy === 'Y' ? true:false },
            {name: "obesity", label: "Obesity", value: info.obesity === 'Y' ? true:false },
            {name: "rheumatic-fever", label: "Rheumatic Fever", value: info.rheumatic_fever === 'Y' ? true:false },
            {name: "septicemia", label: "Septicemia", value: info.septicemia === 'Y' ? true:false },
            {name: "sex-transmit-disease", label: "Sex Transmit Disease", value: info.sex_transmit_disease === 'Y' ? true:false },
            {name: "strangulated-hernia", label: "Strangulated Hernia", value: info.strangulated_hernia === 'Y' ? true:false },
            {name: "thrombotic-embolic-disorder", label: "Thrombotic Embolic Disorder", value: info.thrombotic_embolic_disorder === 'Y' ? true:false },
            {name: "thyroid-disease", label: "Thyroid Disease", value: info.thyroid_disease === 'Y' ? true:false },
            {name: "ulcer-gastro", label: "Ulcer Gastro", value: info.ulcer_gastro === 'Y' ? true:false },
            {name: "other", label: "Other", value: false, hasOtherDetails: true}
        ];

    }
















    //formulations section

    function getCanRefProductList(info) {
        var list = [];

        if (angular.isDefined(info)) {
            for (var i = 0; i < info.length; i++) {
                var product = {};
                product.brandName = info[i].brand_name;
                product.medIngredient = info[i].medicinal_ingredient;
                product.dosageForm = info[i].dosage_form;
                product.dosageFormOther = info[i].dosage_form_other;
                product.strengths = info[i].strengths;
                product.companyName = info[i].company_name;

                list.push(product);
            }
        }

       // console.log('getCanRefProductList : ' + JSON.stringify(list));


        return list;


    }



    function getAppendix4IngredientList (info){ //info = dossier.appendixFour.ingredientList
        var list = [];

        /*var getTissuesFluidsOriginList = function (data) {
            var array = [];
            for (var i = 0; i < data.length; i++){
                var record = {};

                record.name =  data[i].name;
                record.label = data[i].label;
                record.value = data[i].value;
                if(angular.isDefined(data[i].hasOtherDetails)){
                    record.hasOtherDetails = data[i].hasOtherDetails;
                    record.otherText = data[i].otherText;
                }

                array.push(record);

            }

            return array;

        };

        var getPrimateTypeList = function (data) {
            var array = [];
            for (var i = 0; i < data.length; i++){

                var record = {};
                record.name =  data[i].name;
                record.label = data[i].label;
                record.type = data[i].type;
                record.value = data[i].value;
                record.required = data[i].required;

                array.push(record);

            }

            return array;

        };*/


        var getCountries = function(input){
            var list = [];

            for(var i=0; i< input.length; i++){

                list.push({
                    "name":input[i].country_with_unknown,
                    "unknownCountryDetails":input[i].unknown_country_details
                });

            }
            return list;
        };

        if (angular.isDefined(info)) {
            for (var i = 0; i < info.length; i++) {
                var ing = {};
                ing.id = info[i].ingredient_id;
                ing.ingredientName = info[i].ingredient_name;
               // ing.role = info[i].dosage_form;
              // ing.abstractNum = info[i].dosage_form_other;
               // ing.standard = info[i].strengths;
                ing.humanSourced = info[i].human_sourced === 'Y' ? true:false;
                ing.animalSourced = info[i].animal_sourced === 'Y' ? true:false;
                var tissues = info[i].tissues_fluids_section;
                var srcAnimal = info[i].animal_sourced_section;
                //TODO fix the hasOtherDetials
                ing.tissuesFluidsOrigin = {
                    nervousSystem:{
                        title: "Nervous System", //the legend for checkbox list
                        groupName: "nervous-sys", // the group name for checkboxlist
                        list: [
                            {name: "brain", label: "Brain", value: tissues.brain === 'Y' ? true:false},
                            {name: "brain-stem", label: "Brain Stem", value:  tissues.brain_stem === 'Y' ? true:false},
                            {name: "cerebellum", label: "Cerebellum", value:  tissues.cerebellum === 'Y' ? true:false},
                            {name: "cerebrospinal-fluid", label: "Cerebrospinal Fluid", value:  tissues.cerebrospinal_fluid === 'Y' ? true:false},
                            {name: "dorsal-root-ganglia", label: "Dorsal Root Ganglia", value:  tissues.dorsal_root_ganglia === 'Y' ? true:false},
                            {name: "dura-mater", label: "Dura Mater", value:  tissues.dura_mater === 'Y' ? true:false},
                            {name: "hypothalmus", label: "hypothalmus", value:  tissues.hypothalmus === 'Y' ? true:false},
                            {name: "retina-optic", label: "Retina Optic", value:  tissues.retina_optic === 'Y' ? true:false},
                            {name: "spinal-cord", label: "Spinal Cord", value:  tissues.spinal_cord === 'Y' ? true:false},
                            {name: "trigerminal-ganglia", label: "Trigerminal Ganglia", value:  tissues.trigerminal_ganglia === 'Y' ? true:false},
                            {
                                name: "other-nervous",
                                label: "Other Nervous",
                                value:  tissues.other_nervous === 'Y' ? true:false,
                                hasOtherDetails: true,
                                otherText: tissues.other_nervous_details
                            }
                        ]
                    },
                    digestiveSystem:{
                        title: "Digestive System",
                        groupName: "digestive-sys",
                        list: [
                            {name: "appendix", label: "appendix", value: tissues.appendix === 'Y' ? true:false},
                            {name: "bile", label: "bile", value: tissues.bile === 'Y' ? true:false},
                            {name: "distal-ileum", label: "Distal Ileum", value: tissues.distal_ileum === 'Y' ? true:false},
                            {name: "large-intestine", label: "Large Intestine", value: tissues.large_intestine === 'Y' ? true:false},
                            {name: "saliva-salivary", label: "Saliva Salivary", value: tissues.saliva_salivary === 'Y' ? true:false},
                            {name: "small-intestine", label: "Small Intestine", value: tissues.small_intestine === 'Y' ? true:false},
                            {name: "stomach", label: "stomach", value: tissues.stomach === 'Y' ? true:false},
                            {
                                name: "other-digestive",
                                label: "Other Digestive",
                                value:  tissues.other_digestive === 'Y' ? true:false,
                                hasOtherDetails: true,
                                otherText: tissues.other_digestive_details
                            }
                        ]
                    },
                    reproductiveSystem:{
                        title: "Reproductive System",
                        groupName: "reproductive-sys",
                        list: [
                            {name: "milk-products", label: "Milk Products", value: tissues.milk_products === 'Y' ? true:false},
                            {name: "kidney", label: "kidney", value: tissues.kidney === 'Y' ? true:false},
                            {name: "colostrum", label: "colostrum", value: tissues.colostrum === 'Y' ? true:false},
                            {name: "mammary-glands", label: "Mammary Glands", value: tissues.mammary_glands === 'Y' ? true:false},
                            {name: "ovaries", label: "ovaries", value: tissues.ovaries === 'Y' ? true:false},
                            {name: "placenta", label: "placenta", value: tissues.placenta === 'Y' ? true:false},
                            {name: "placental-fluid", label: "Placental Fluid", value: tissues.placental_fluid === 'Y' ? true:false},
                            {name: "semen", label: "semen", value: tissues.semen === 'Y' ? true:false},
                            {name: "testes", label: "testes", value: tissues.testes === 'Y' ? true:false},
                            {name: "urine", label: "urine", value: tissues.urine === 'Y' ? true:false},
                            {
                                name: "other-reproductive",
                                label: "Other Reproductive",
                                value:  tissues.other_reproductive === 'Y' ? true:false,
                                hasOtherDetails: true,
                                otherText: tissues.other_reproductive_details
                            }
                        ]
                    },
                    cardioSystem:{
                        title: "Cardio System",
                        groupName: "cardio-sys",
                        list: [
                            {name: "heart-pericardium", label: "Heart Pericardium", value: tissues.heart_pericardium === 'Y' ? true:false},
                            {name: "lung", label: "lung", value: tissues.lung === 'Y' ? true:false},
                            {name: "nasal-fluid", label: "Nasal Fluid", value: tissues.nasal_fluid === 'Y' ? true:false},
                            {name: "trachea", label: "trachea", value: tissues.trachea === 'Y' ? true:false},
                            {
                                name: "other-cardio-respiratory",
                                label: "Other Cardio Respiratory",
                                value:  tissues.other_cardio_respiratory === 'Y' ? true:false,
                                hasOtherDetails: true,
                                otherText: tissues.other_cardio_respiratory_details
                            }
                        ]
                    },
                    immuneSystem:{
                        title: "Immune System",
                        groupName: "immune-sys",
                        list: [
                            {name: "lymph-nodes", label: "Lymph Nodes", value: tissues.lymph_nodes === 'Y' ? true:false},
                            {name: "spleen", label: "spleen", value: tissues.spleen === 'Y' ? true:false},
                            {name: "thymus", label: "thymus", value: tissues.thymus === 'Y' ? true:false},
                            {name: "tonsils", label: "tonsils", value: tissues.tonsils === 'Y' ? true:false},
                            {
                                name: "other-immune",
                                label: "Other Immune",
                                value:  tissues.other_immune === 'Y' ? true:false,
                                hasOtherDetails: true,
                                otherText: tissues.other_immune_details
                            }
                        ]
                    },
                    skinGlandSystem:{
                        title: "Skin Gland System",
                        groupName: "skin-gland-sys",
                        list: [
                            {name: "adrenal-gland", label: "Adrenal Gland", value: tissues.adrenal_gland === 'Y' ? true:false},
                            {name: "hair-hooves-feathers", label: "Hair Hooves Feathers", value: tissues.hair_hooves_feathers === 'Y' ? true:false},
                            {name: "liver", label: "liver", value: tissues.liver === 'Y' ? true:false},
                            {name: "pancreas", label: "pancreas", value: tissues.pancreas === 'Y' ? true:false},
                            {name: "pituitary", label: "pituitary", value: tissues.pituitary === 'Y' ? true:false},
                            {name: "skin-hides", label: "skinHides", value: tissues.skin_hides === 'Y' ? true:false},
                            {name: "thyroid-parathyroid", label: "Thyroid Parathyroid", value: tissues.thyroid_parathyroid === 'Y' ? true:false},
                            {
                                name: "other-skin-glandular",
                                label: "Other Skin Glandular",
                                value:  tissues.other_skin_glandular === 'Y' ? true:false,
                                hasOtherDetails: true,
                                otherText: tissues.other_skin_glandular_details
                            }
                        ]
                    },
                    musculoSkeletalSystem:{
                        title: "Musculo Skeletal System",
                        groupName: "musculo-skeletal-sys",
                        list: [
                            {name: "abdomen", label: "abdomen", value: tissues.abdomen === 'Y' ? true:false},
                            {name: "skull", label: "skull", value: tissues.skull === 'Y' ? true:false},
                            {name: "bones", label: "bones", value: tissues.bones === 'Y' ? true:false},
                            {name: "collagen", label: "collagen", value: tissues.collagen === 'Y' ? true:false},
                            {name: "tendons-ligaments", label: "Tendons Ligaments", value: tissues.tendons_ligaments === 'Y' ? true:false},
                            {name: "vertebral-column", label: "Vertebral Column", value: tissues.vertebral_column === 'Y' ? true:false},
                            {name: "muscle", label: "muscle", value: tissues.muscle === 'Y' ? true:false},
                            {
                                name: "other-musculo-skeletal",
                                label: "Other Musculo Skeletal",
                                value:  tissues.other_musculo_skeletal === 'Y' ? true:false,
                                hasOtherDetails: true,
                                otherText: tissues.other_musculo_skeletal_details
                            }
                        ]
                    },
                    otherTissues:{
                        title: "Other Tissues",
                        groupName: "other-tissues",
                        list: [
                            {name: "adipose", label: "adipose", value: tissues.adipose === 'Y' ? true:false},
                            {name: "ascites", label: "ascites", value: tissues.ascites === 'Y' ? true:false},
                            {name: "antler-velvet", label: "Antler Velvet", value: tissues.antler_velvet === 'Y' ? true:false},
                            {name: "serum", label: "serum", value: tissues.serum === 'Y' ? true:false},
                            {name: "whole-blood", label: "Whole Blood", value: tissues.whole_blood === 'Y' ? true:false},
                            {name: "plasma", label: "plasma", value: tissues.plasma === 'Y' ? true:false},
                            {name: "embryonic-tissue", label: "Embryonic Tissue", value: tissues.embryonic_tissue === 'Y' ? true:false},
                            {name: "fetal-tissue", label: "Fetal Tissue", value: tissues.fetal_tissue === 'Y' ? true:false},
                            {name: "bone-marrow", label: "Bone Marrow", value: tissues.bone_marrow === 'Y' ? true:false},
                            {name: "eyes-cornea", label: "Eyes Cornea", value: tissues.eyes_cornea === 'Y' ? true:false},
                            {name: "gall-bladder", label: "Gall Bladder", value: tissues.gall_bladder === 'Y' ? true:false},
                            {
                                name: "other-fluids-tissues",
                                label: "Other Fluids Tissues",
                                value:  tissues.other_fluids_tissues === 'Y' ? true:false,
                                hasOtherDetails: true,
                                otherText: tissues.other_fluids_tissues_details
                            }
                        ]
                    }
                };
                ing.sourceAnimalDetails = {

                    primateTypeList :  [
                        {label: "NONHUMANPRIMATE", type: "text", name: "nhp-type", required: false, value: srcAnimal.nonhuman_primate_type},
                        {label: "AQUATICTYPE", type: "text", name: "aqua-type", required: false, value: srcAnimal.aquatic_type},
                        {label: "AVIANTYPE", type: "text", name: "avian-type", required: false, value: srcAnimal.avian_type},
                        {label: "BOVINETYPE", type: "text", name: "bovine-type", required: false, value: srcAnimal.bovine_type},
                        {label: "CANINETYPE", type: "text", name: "canine-type", required: false, value: srcAnimal.canine_type},
                        {label: "CAPRINETYPE", type: "text", name: "caprine-type", required: false, value: srcAnimal.caprine_type},
                        {label: "CERVIDAETYPE", type: "text", name: "cervidae-type", required: false, value: srcAnimal.cervidae_type},
                        {label: "EQUINETYPE", type: "text", name: "equine-type", required: false, value: srcAnimal.equine_type},
                        {label: "FELINETYPE", type: "text", name: "feline-type", required: false, value: srcAnimal.feline_type},
                        {label: "OVINETYPE", type: "text", name: "ovine-type", required: false, value: srcAnimal.ovine_type},
                        {label: "PORCINETYPE", type: "text", name: "porcine-type", required: false, value: srcAnimal.porcine_type},
                        {label: "RODENTTYPE", type: "text", name: "rodent-type", required: false, value: srcAnimal.rodent_type},
                        {label: "OTHERANIMALTYPE", type: "text", name: "other-animal-type", required: false, value: srcAnimal.other_type},
                        {label: "CONTROLLEDPOP", type: "select", name: "controlled-pop", required: true, value: srcAnimal.is_controlled_pop},
                        {label: "BIOTECHDERIVED", type: "select", name: "biotech-derived", required: true, value: srcAnimal.is_biotech_derived},
                        {label: "CELLLINE", type: "select", name: "cell-line", required: true, value: srcAnimal.is_cell_line},
                        {label: "AGEANIMALS", type: "number", name: "age-animals", required: true, value: srcAnimal.animal_age}
                    ],
                countryList: getCountries(srcAnimal.country_origin_list.country_origin)

                };


                list.push(ing);
            }
        }


        return list;


    }

    function getFormulationList(list){

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

    function getActiveIngList(list){

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




    function getNonMedIngList(list){

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


    function getContainerTypeList(list){

        var resultList = [];
        if (!(list instanceof Array)) {
            //make it an array, case there is only one
            list = [list]
        }

        angular.forEach(list, function (item) {

            var obj = {
                "containerType": item.container_type,
                "packageSize": item.package_size,
                "shelfLifeYears": Number(item.shelf_life_years),
                "shelfLifeMonths": Number(item.shelf_life_months),
                "tempMin": Number(item.temperature_min),
                "tempMax": Number(item.temperature_max)
            };

            resultList.push(obj);

        });

        return resultList;
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
                "name": item
            };

            resultList.push(obj);

        });

        return resultList;
    }

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
        //return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    };

    function canRefProductListToOutput(info) {
        var resultList = [];

        if (angular.isDefined(info)) {
            for (var i = 0; i < info.length; i++) {
                var product = {};
                product.medicinal_ingredient = info[i].medIngredient;
                product.dosage_form = info[i].dosageForm;
                product.dosage_form_other = info[i].dosageFormOther;
                product.strengths = info[i].strengths;
                product.company_name = info[i].companyName;
                resultList.push(product);
            }
        }
        return resultList;
    }

    /**
     * Converts all the appendix 4 data to output
     * @param info
     * @returns {*}
     */
    function appendix4IngredientListToOutput(info) {
        var appendices = []; //TODO may need better error checking
        //Note order of elements must match schema for validation
        if (!angular.isDefined(info)) {
            return null;
        }
        for (var i = 0; i < info.length; i++) {
            var ing = {};
            ing.ingredient_id = info[i].id;
            ing.ingredient_name = info[i].name;
            ing.animal_sourced = info[i].sourceAnimal === true ? 'Y' : 'N';
            ing.human_sourced = info[i].sourceHuman === true ? 'Y' : 'N';

            if (info.tissuesFluidsOrigin) {
                ing.tissues_fluids_section = createEmptyTissuesFluidsForOutput();
                var oneRecord = info.tissuesFluidsOrigin.nervousSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {
                        case "brain":
                            ing.tissues_fluids_section.brain = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "brain-stem":
                            ing.tissues_fluids_section.brain_stem = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "cerebellum":
                            ing.tissues_fluids_section.cerebellum = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "cerebrospinal-fluid":
                            ing.tissues_fluids_section.cerebrospinal_fluid = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "dorsal-root-ganglia":
                            ing.dorsal_root_ganglia = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "dura-mater":
                            ing.dura_mater = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "hypothalmus":
                            ing.hypothalmus = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "retina-optic":
                            ing.retina_optic = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "spinal-cord":
                            ing.spinal_cord = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "trigerminal-ganglia":
                            ing.trigerminal_ganglia = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "other-nervous":
                            ing.other_nervous = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_nervous_details = oneRecord.list[g].otherText;
                            break;
                        //TODO complete
                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.digestiveSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {
                        case "appendix":
                            ing.appendix = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "bile":
                            ing.bile = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "distal-ileum":
                            ing.distal_ileum = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "large-intestine":
                            ing.large_intestine = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "saliva-salivary":
                            ing.saliva_salivary = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "stomach":
                            ing.small_intestine = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "stomach":
                            ing.stomach = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "other-digestive":
                            ing.other_digestive = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.tissues.other_digestive_details = oneRecord.list[g].otherText;
                            break;
                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.reproductiveSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {

                        case "milk-products":
                            ing.milk_products = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "kidney":
                            ing.kidney = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "colostrum":
                            ing.colostrum = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "mammary-glands":
                            ing.mammary_glands = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "ovaries":
                            ing.ovaries = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "placenta":
                            ing.placenta = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "placental-fluid":
                            ing.placental_fluid = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "semen":
                            ing.semen = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "testes":
                            ing.testes = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "urine":
                            ing.urine = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "other-reproductive":
                            ing.other_reproductive = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_reproductive_details = oneRecord.list[g].otherText;
                            break;

                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.cardioSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {

                        case "heart-pericardium":
                            ing.heart_pericardium = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "nasal-fluid":
                            ing.nasal_fluid = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "lung":
                            ing.lung = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "trachea":
                            ing.trachea = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "other-cardio-respiratory":
                            ing.other_cardio_respiratory = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_cardio_respiratory_details = oneRecord.list[g].otherText;
                            break;

                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.immuneSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {

                        case "lymph-nodes":
                            ing.lymph_nodes = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "spleen":
                            ing.spleen = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "thymus":
                            ing.thymus = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "tonsils":
                            ing.tonsils = oneRecord.list[g].value === true ? 'Y' : 'N';

                        case "other-immune":
                            ing.other_immune = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_immune_details = oneRecord.list[g].otherText;
                            break;
                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.skinGlandSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {

                        case "adrenal-gland":
                            ing.adrenal_gland = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "hair-hooves-feathers":
                            ing.hair_hooves_feathers = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "liver":
                            ing.liver = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "pancreas":
                            ing.pancreas = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "pituitary":
                            ing.pituitary = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "skin-hides":
                            ing.skin_hides = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "thyroid-parathyroid":
                            ing.thyroid_parathyroid = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "other-skin-glandular":
                            ing.other_skin_glandular = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_skin_glandular_details = oneRecord.list[g].otherText;
                            break;
                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.musculoSkeletalSystem;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {

                        case "abdomen":
                            ing.abdomen = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "skull":
                            ing.skull = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "bones":
                            ing.bones = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "collagen":
                            ing.collagen = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "tendons-ligaments":
                            ing.tendons_ligaments = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "vertebral-column":
                            ing.vertebral_column = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "muscle":
                            ing.muscle = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "other-musculo-skeletal":
                            ing.other_musculo_skeletal = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_musculo_skeletal_details = oneRecord.list[g].otherText;
                            break;
                    }
                }
                var oneRecord = info.tissuesFluidsOrigin.otherTissues;
                for (var g = 0; g < oneRecord.list.length; g++) {
                    switch (oneRecord.list[g].name) {

                        case "adipose":
                            ing.adipose = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "ascites":
                            ing.ascites = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "antler-velvet":
                            ing.antler_velvet = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "serum":
                            ing.serum = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "whole-blood":
                            ing.whole_blood = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "plasma":
                            ing.plasma = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "embryonic-tissue":
                            ing.embryonic_tissue = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "fetal-tissue":
                            ing.fetal_tissue = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "bone-marrow":
                            ing.bone_marrow = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "eyes-cornea":
                            ing.eyes_cornea = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;
                        case "gall-bladder":
                            ing.gall_bladder = oneRecord.list[g].value === true ? 'Y' : 'N';
                            break;

                        case "other-fluids-tissues":
                            ing.other_fluids_tissues = oneRecord.list[g].value === true ? 'Y' : 'N';
                            ing.other_fluids_tissues_details = oneRecord.list[g].otherText;
                            break;
                    }
                }

            }


            if (info.sourceAnimalDetails) {
                ing.animal_sourced_section = createEmptyAnimalSourceForOutput();
                var animalRecords = info.sourceAnimalDetails.primateTypeList;
                for (var j = 0; j < info.animalRecords.length; i++) {
                    switch (info.animalRecords[j].name) {
                        case "nhp-type":
                            ing.animal_sourced_section.nonhuman_primate_type = animalRecords.list[g].value;
                            break;
                        case "aqua-type":
                            ing.animal_sourced_section.aquatic_type = animalRecords.list[g].value;
                            break;
                        case "avian-type":
                            ing.animal_sourced_section.avian_type = animalRecords.list[g].value;
                            break;
                        case "bovine-type":
                            ing.animal_sourced_section.bovine_type = animalRecords.list[g].value;
                            break;
                        case "canine-type":
                            ing.animal_sourced_section.canine_type = animalRecords.list[g].value;
                            break;
                        case "caprine-type":
                            ing.animal_sourced_section.caprine_type = animalRecords.list[g].value;
                            break;
                        case "cervidae-type":
                            ing.animal_sourced_section.cervidae_type = animalRecords.list[g].value;
                            break;
                        case "equine-type":
                            ing.animal_sourced_section.equine_type = animalRecords.list[g].value;
                            break;
                        case "feline-type":
                            ing.animal_sourced_section.feline_type = animalRecords.list[g].value;
                            break;
                        case "ovine-type":
                            ing.animal_sourced_section.ovine_type = animalRecords.list[g].value;
                            break;
                        case "porcine-type":
                            ing.animal_sourced_section.porcine_type = animalRecords.list[g].value;
                            break;

                        case "rodent-type":
                            ing.animal_sourced_section.rodent_type = animalRecords.list[g].value;
                            break;

                        case "other-animal-type":
                            ing.animal_sourced_section.other_type = animalRecords.list[g].value;
                            break;
                        case "controlled-pop":
                            ing.animal_sourced_section.is_controlled_pop = animalRecords.list[g].value;
                            break;

                        case "biotech-derived":
                            ing.animal_sourced_section.is_biotech_derived = animalRecords.list[g].value;
                            break;

                        case "cell-line":
                            ing.animal_sourced_section.is_cell_line = animalRecords.list[g].value;
                            break;

                        case "age-animals":
                            ing.animal_sourced_section.animal_age = animalRecords.list[g].value;
                            break;

                    }
                }

                var countries = info.sourceAnimalDetails.countryList;
                for (var j = 0; j < countries.length; j++) {
                    ing.animal_sourced_section.country_origin_list.country_origin.push(countries[j]); //TODO is this data structure correct?
                }
            }

            appendices.push(ing);
        }


        return appendices;

    }

    /**
     * Creates an empty data structure for tissues and fluids XML
     */
    function createEmptyTissuesFluidsForOutput() {
        var tissues = {};
        var noValue = 'N'; //TODO should be part of  a service
        tissues.brain = noValue;
        tissues.brain_stem = noValue;
        tissues.cerebellum = noValue;
        tissues.cerebrospinal_fluid = noValue;
        tissues.dorsal_root_ganglia = noValue;
        tissues.dura_mater = noValue;
        tissues.hypothalmus = noValue;
        tissues.retina_optic = noValue;
        tissues.spinal_cord = noValue;
        tissues.trigerminal_ganglia = noValue;
        tissues.other_nervous = noValue;
        tissues.other_nervous_details = "";
        tissues.appendix = noValue;
        tissues.bile = noValue;
        tissues.distal_ileum = noValue;
        tissues.large_intestine = noValue;
        tissues.saliva_salivary = noValue;
        tissues.small_intestine = noValue;
        tissues.stomach = noValue;
        tissues.other_digestive = noValue;
        tissues.other_digestive_details = "";
        tissues.milk_products = noValue;
        tissues.kidney = noValue;
        tissues.colostrum = noValue;
        tissues.mammary_glands = noValue;
        tissues.ovaries = noValue;
        tissues.placenta = noValue;
        tissues.placental_fluid = noValue;
        tissues.semen = noValue;
        tissues.testes = noValue;
        tissues.urine = noValue;
        tissues.other_reproductive = noValue;
        tissues.other_reproductive_details = "";
        tissues.heart_pericardium = noValue;
        tissues.lung = noValue;
        tissues.nasal_fluid = noValue;
        tissues.trachea = noValue;
        tissues.other_cardio_respiratory = noValue;
        tissues.other_cardio_respiratory_details = "";
        tissues.lymph_nodes = noValue;
        tissues.spleen = noValue;
        tissues.thymus = noValue;
        tissues.tonsils = noValue;
        tissues.other_immune = noValue;
        tissues.other_immune_details = "";
        tissues.adrenal_gland = noValue;
        tissues.hair_hooves_feathers = noValue;
        tissues.liver = noValue;
        tissues.pancreas = noValue;
        tissues.pituitary = noValue;
        tissues.skin_hides = noValue;
        tissues.thyroid_parathyroid = noValue;
        tissues.other_skin_glandular = noValue;
        tissues.other_skin_glandular_details = "";
        tissues.abdomen = noValue;
        tissues.skull = noValue;
        tissues.bones = noValue;
        tissues.collagen = noValue;
        tissues.tendons_ligaments = noValue;
        tissues.vertebral_column = noValue;
        tissues.muscle = noValue;
        tissues.other_musculo_skeletal = noValue;
        tissues.other_musculo_skeletal_details = "";
        tissues.adipose = noValue;
        tissues.ascites = noValue;
        tissues.antler_velvet = noValue;
        tissues.serum = noValue;
        tissues.whole_blood = noValue;
        tissues.plasma = noValue;
        tissues.embryonic_tissue = noValue;
        tissues.fetal_tissue = noValue;
        tissues.bone_marrow = noValue;
        tissues.eyes_cornea = noValue;
        tissues.gall_bladder = noValue;
        tissues.other_fluids_tissues = noValue;
        tissues.other_fluids_tissues_details = "";
        return (tissues);
    }

    /**
     * Creates an empty structure for animals XML
     */
    function createEmptyAnimalSourceForOutput() {
        var animals = {};
        //Order is important
        animals.nonhuman_primate_type = "";
        animals.aquatic_type = "";
        animals.avian_type = "";
        animals.bovine_type = "";
        animals.canine_type = "";
        animals.caprine_type = "";
        animals.cervidae_type = "";
        animals.equine_type = "";
        animals.feline_type = "";
        animals.ovine_type = "";
        animals.porcine_type = "";
        animals.rodent_type = "";
        animals.other_type = "";
        animals.is_controlled_pop = "";
        animals.is_biotech_derived = "";
        animals.is_cell_line = "";
        animals.animal_age = "";
        animals.animal_age = "";
        animals.country_origin_list = {};
        animals.country_origin_list.country_origin = []; //TODO verify this is correct
        return (animals);
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
                //TODO optional
                "nonmedicinal_ingredient": getNonMedIngList(item.nMedIngList),
                container_group: {
                    "container_details": getContainerTypeList(item.containerTypes)
                },
                //TODO optional
                "material_ingredient": getMaterialList(item.animalHumanMaterials),
                //TODO optional
                "roa_group": {
                    "roa_details": getRouteAdminList(item.routeAdmins)
                },
                "country_group": {
                    "country_manufacturer": getFormulationCountryList(item.countryList)
                }
            };
            formulationList.push(obj);
        });
        return formulationList;
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

    function repContactToOutput(contactList) {
        var resultList = [];
        angular.forEach(contactList, function (item) {
            var obj = {};
            obj.amend = item.amend;
            obj.salutation = item.salutation;
            obj.rep_role = item.repRole; //TODO XML needs to be updated!
            obj.given_name = item.givenName;
            obj.initials = item.initials;
            obj.surname = item.surname;
            obj.job_title = item.jobTitle;
            obj.language_correspondance = item.languageCorrespondance;
            obj.phone_num = item.phoneNum;
            obj.phone_ext = item.phoneExt;
            obj.fax_num = item.fax;
            obj.email = item.email;
            resultList.push(obj);
        });
    }

    /***
     * Converts the therapeutic classification to output format
     * @param jsonObj
     * @returns {Array}
     */
    function therapeuticClassToOutput(jsonObj) {

        var resultList = [];

        for (var i = 0; i < jsonObj.length; i++) {
            //TODO save the ids??
            resultList.push(jsonObj[i].name);
        }
        return (resultList);
    };
    function scheduleAToOutput(jsonObj) {
        var result = createEmptyScheduleAForOutput();
        result.din_number = jsonObj.drugIdNumber;
        var disorderList = jsonObj.diseaseDisorderList
        for (var i = 0; i < disorderList.length; i++) {
            switch (disorderList[i].name) {
                case "acute-alcohol":
                    result.acute_alcohol = disorderList[i].value;
                    break;
                case "acute-anxiety":
                    result.acute_anxiety = disorderList[i].value;
                    break;
                case "acute-infectious":
                    result.acute_infectious = disorderList[i].value;
                    break;
                case "acute-inflammatory":
                    result.acute_inflammatory = disorderList[i].value;
                    break;
                case "acute-psychotic":
                    result.acute_psychotic = disorderList[i].value;
                    break;
                case "addiction":
                    result.addiction = disorderList[i].value;
                    break;
                case "ateriosclerosis":
                    result.ateriosclerosis = disorderList[i].value;
                    break;
                case "appendicitis":
                    result.appendicitis = disorderList[i].value;
                    break;
                case "asthma":
                    result.asthma = disorderList[i].value;
                    break;
                case "cancer":
                    result.cancer = disorderList[i].value;
                    break;
                case "congest-heart-fail":
                    result.congest_heart_fail = disorderList[i].value;
                    break;
                case "convulsions":
                    result.convulsions = disorderList[i].value;
                    break;
                case "dementia":
                    result.dementia = disorderList[i].value;
                    break;
                case "depression":
                    result.depression = disorderList[i].value;
                    break;
                case "diabetes":
                    result.diabetes = disorderList[i].value;
                    break;

                case "gangrene":
                    result.gangrene = disorderList[i].value;
                    break;
                case "glaucoma":
                    result.glaucoma = disorderList[i].value;
                    break;

                case "haematologic-bleeding":
                    result.haematologic_bleeding = disorderList[i].value;
                    break;

                case "hepatitis":
                    result.hepatitis = disorderList[i].value;
                    break;

                case "hypertension":
                    result.hypertension = disorderList[i].value;
                    break;

                case "nausea-pregnancy":
                    result.nausea_pregnancy = disorderList[i].value;
                    break;

                case "obesity":
                    result.obesity = disorderList[i].value;
                    break;

                case "rheumatic-fever":
                    result.rheumatic_fever = disorderList[i].value;
                    break;

                case "septicemia":
                    result.septicemia = disorderList[i].value;
                    break;

                case "sex-transmit-disease":
                    result.sex_transmit_disease = disorderList[i].value;
                    break;

                case "strangulated-hernia":
                    result.strangulated_hernia = disorderList[i].value;
                    break;

                case "thrombotic-embolic-disorder":
                    result.thrombotic_embolic_disorder = disorderList[i].value;
                    break;
                case "thyroid-disease":
                    result.thyroid_disease = disorderList[i].value;
                    break;

                case "ulcer-gastro":
                    result.ulcer_gastro = disorderList[i].value;
                    break;

            }
        }

        result.sched_a_claims_ind_details = jsonObj.scheduleAClaimsIndDetails;

    }

    /**
     * Creates the empty output data structure for schedule A
     * @returns json Object
     */
    function createEmptyScheduleAForOutput() {
        var result = {};
        //enforcing order for output
        result.din_number = "";
        result.acute_alcohol = 'N';
        result.acute_anxiety = 'N';
        result.acute_infectious = 'N';
        result.acute_inflammatory = 'N';
        result.acute_psychotic = 'N';
        result.addiction = 'N';
        result.ateriosclerosis = 'N';
        result.appendicitis = 'N';
        result.asthma = 'N';
        result.cancer = 'N';
        result.congest_heart_fail = 'N';
        result.convulsions = 'N';
        result.dementia = 'N';
        result.depression = 'N';
        result.diabetes = 'N';
        result.gangrene = 'N';
        result.glaucoma = 'N';
        result.haematologic_bleeding = 'N';
        result.hepatitis = 'N';
        result.hypertension = 'N';
        result.nausea_pregnancy = 'N';
        result.obesity = 'N';
        result.rheumatic_fever = 'N';
        result.septicemia = 'N';
        result.sex_transmit_disease = 'N';
        result.strangulated_hernia = 'N';
        result.thrombotic_embolic_disorder = 'N';
        result.thyroid_disease = 'N';
        result.ulcer_gastro = 'N';
        result.sched_a_claims_ind_details = "";
        return (result);
    }

})();
