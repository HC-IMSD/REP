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
                            {"name": "radio-pharmaceutical", "label": "Radiopharmaceutical", "value": info.radiopharm_drug_use},
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
                                {name: "acute-inflammatory", label: "Acute Inflammatory", value: info.acute_inflammatory},
                                {name: "acute-psychotic", label: "Acute Psychotic", value: info.acute_psychotic},
                                {name: "addiction", label: "Addiction", value: info.addiction},
                                {name: "ateriosclerosis", label: "Ateriosclerosis", value: info.ateriosclerosis},
                                {name: "appendicitis", label: "Appendicitis", value: info.appendicitis},
                                {name: "asthma", label: "Asthma", value: info.asthma},
                                {name: "cancer", label: "Cancer", value: info.cancer},
                                {name: "congest-heart-fail", label: "Congest Heart Fail", value: info.congest_heart_fail},
                                {name: "convulsions", label: "Convulsions", value: info.convulsions},
                                {name: "dementia", label: "Dementia", value: info.dementia},
                                {name: "depression", label: "Depression", value: info.depression},
                                {name: "diabetes", label: "Diabetes", value: info.diabetes},
                                {name: "gangrene", label: "Gangrene", value: info.gangrene},
                                {name: "glaucoma", label: "Glaucoma", value: info.glaucoma},
                                {name: "haematologic-bleeding", label: "Haematologic Bleeding", value: info.haematologic_bleeding},
                                {name: "hepatitis", label: "Hepatitis", value: info.hepatitis},
                                {name: "hypertension", label: "Hypertension", value: info.hypertension},
                                {name: "nausea-pregnancy", label: "Nausea Pregnancy", value: info.nausea_pregnancy},
                                {name: "obesity", label: "Obesity", value: info.obesity},
                                {name: "rheumatic-fever", label: "Rheumatic Fever", value: info.rheumatic_fever},
                                {name: "septicemia", label: "Septicemia", value: info.septicemia},
                                {name: "sex-transmit-disease", label: "Sex Transmit Disease", value: info.sex_transmit_disease},
                                {name: "strangulated-hernia", label: "Strangulated Hernia", value: info.strangulated_hernia},
                                {name: "thrombotic-embolic-disorder", label: "Thrombotic Embolic Disorder", value: info.thrombotic_embolic_disorder},
                                {name: "thyroid-disease", label: "Thyroid Disease", value: info.thyroid_disease},
                                {name: "ulcer-gastro", label: "Ulcer Gastro", value: info.ulcer_gastro},
                                {name: "other", label: "Other", value: false, hasOtherDetails: true}
                            ]

                        },
                        therapeutic: {//grid
                            classifications : [ //hardcoded cauz missing in the json file
                                {"id":1, "name":"classification1"},
                                {"id":2, "name":"classification2"},
                                {"id":3, "name":"classification3"},
                                {"id":4, "name":"classification4"},
                                {"id":5, "name":"classification5"}
                            ]
                        },
                        canRefProducts: {
                            productList : getCanRefProductList(info.ref_product_list.cdn_ref_product)
                        },//grid
                        formulations: {},//tab + grid +
                        appendixFour: {
                            ingredientList : getAppendix4IngredientList(info.appendix4_group)
                        }//tab + grid +

                    },
                    contactInfo: { //grid
                        contactList: [],
                        columnDef: []
                    }

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

            },

            getContactList: function (contacts) {
                var list = [];

                if (contacts) {
                    for (var i = 0; i < contacts.length; i++) {
                        var contact = {};
                        contact.contactID = contacts[i].contact_id;
                        contact.amendRecord = contacts[i].amend_record;
                        contact.manufacturer = contacts[i].manufacturer;
                        contact.mailing = contacts[i].mailing;
                        contact.billing = contacts[i].billing;
                        contact.importer = contacts[i].importer;
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

        // Return a reference to the function
        return DossierService;
    }

    function getCanRefProductList (info){
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

    function getAppendix4IngredientList (info){
        var list = [];

        if (angular.isDefined(info)) {
            for (var i = 0; i < info.length; i++) {
                var ing = {};
                ing.id = info[i].ingredient_id;
                ing.name = info[i].ingredient_name;
               // ing.role = info[i].dosage_form;
              // ing.abstractNum = info[i].dosage_form_other;
               // ing.standard = info[i].strengths;
                ing.sourceHuman = info[i].human_sourced === 'Y' ? true:false;
                ing.sourceAnimal = info[i].animal_sourced === 'Y' ? true:false;
                ing.tissuesFluidsOrigin = {};
                ing.sourceAnimalDetails = {};
                list.push(ing);
            }
        }


        return list;


    }

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
        //return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    };


})();
