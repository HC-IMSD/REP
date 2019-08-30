/**
 * Created by Abdessamad on 7/6/2016.
 */

(function () {
    'use strict';

    angular
        .module('piConverterService', [
            'dossierDataLists',
            'hpfbConstants',
            'dataLists'
        ]);
})();


(function () {
    'use strict';
    angular
        .module('piConverterService')
        .factory('PiConverterService', PiConverterService);
    PiConverterService.$inject = ['DossierLists', '$translate', '$filter', 'getCountryAndProvinces', 'OTHER', 'UNKNOWN', 'YES', 'NO', 'XSL_PREFIX', 'CANADA'];

    function PiConverterService(DossierLists, $translate, $filter, getCountryAndProvinces, OTHER, UNKNOWN, YES, NO, XSL_PREFIX, CANADA) {
        var yesValue = YES;
        var noValue = NO;
        // var xslName = XSL_PREFIX + "REP_PI_2_2.xsl";
        var xslName = "REP_PI_3_0.xsl";

        // Define the PiConverterService object
        function PiConverterService() {
        }

        function PiConverterService(formData) {
            //construction logic

            angular.extend(this._default, formData);
        }


        PiConverterService.prototype = {

            _default: {
                dossierID: "",
                companyID: "",
                dossierType: "",
                productName: "",
                properName: "",
                manu: false,
                mailling: false,
                thisActivity: false,
                importer: false,
                importerRecord: [],
                //relatedDossierID: "",
                enrolmentVersion: "0.00",
                dateSaved: "",
                //applicationType: "NEW",
                softwareVersion: "3.0.1",
                xslFileName: xslName,
                dataChecksum: "",
                privacyStat:"",
                drugProduct: {
                    //thirdPartySigned: "",
                    drugUse: "",
                    disinfectantType: {
                        hospital: false,
                        foodProcessing: false,
                        medicalInstruments: false,
                        domestic: false,
                        barn: false,
                        institutionalIndustrial: false
                    },
                    isScheduleC: false,
                    isScheduleD: false,
                    isPrescriptionDrugList: false,
                    isRegulatedCDSA: false,
                    isNonPrescriptionDrug: false,
                    isScheduleA: false,
                    scheduleAGroup: getDefaultSchedA(),
                   // therapeutic: [],
                  //  canRefProducts: [],//grid
                    propIndication: "",
                    formulations: [],//tab + grid +
                    appendixFourList: []/*{
                     ingredientList:[]
                     }//tab + grid +*/

                }
                //contactList: []

            },

            getDefaultObject: function () {

                return this._default;

            },
            getXSLFileName: function () {
                return this._default.xslFileName;
            },
            loadFromFile: function (info) {
                var rootTag=this.getRootTagName();
                if (!info)
                    return this._default;

                if (!info[rootTag])
                    return this._default;

                info = info[rootTag];
                var drugUseValue ="";
                if(info.drug_use) {
                    drugUseValue = info.drug_use.__text;
                }
                var formModel = {
                    companyID: info.company_id,
                    dossierID: info.dossier_id, //.substring(8,15),
                    dossierType: '',
                    productName: info.product_name,
                    properName: info.proper_name,
                    manu: info.manufacturer === 'Y',
                    mailling: info.mailing === 'Y',
                    thisActivity: info.this_activity === 'Y',
                    importer: info.importer === 'Y',
                    importerRecord: transformImpFromFile(info.importer_record),
                    enrolmentVersion: info.enrolment_version,
                    dateSaved: info.date_saved,
                    softwareVersion: info.software_version,
                    dataChecksum: info.data_checksum,
                    drugProduct: {
                        drugUse: $filter('findListItemById')(DossierLists.getDrugUseList(), {id: drugUseValue}),
                        disinfectantType: {
                            hospital: info.disinfectant_type.hospital === 'Y',
                            foodProcessing: info.disinfectant_type.food_processing === 'Y',
                            medicalInstruments: info.disinfectant_type.medical_instruments === 'Y',
                            domestic: info.disinfectant_type.domestic === 'Y',
                            barn: info.disinfectant_type.barn === 'Y',
                            institutionalIndustrial: info.disinfectant_type.institutional_industrial === 'Y'
                        },
                        isScheduleC: info.is_sched_c === 'Y',
                        isScheduleD: info.is_sched_d === 'Y',
                        isPrescriptionDrugList: info.is_prescription_drug_list === 'Y',
                        isRegulatedCDSA: info.is_regulated_cdsa === 'Y',
                        isNonPrescriptionDrug: info.is_non_prescription_drug === 'Y',
                        isScheduleA: info.is_sched_a === 'Y',
                       // therapeutic: [],
                       // canRefProducts: getCanRefProductList(info.ref_product_list.cdn_ref_product),//grid
                        propIndication: info.proposed_indication,
                        formulations: getFormulationList(info.formulation_group.formulation_details),//tab + grid +
                        appendixFourList: getAppendix4IngredientList(info.appendix4_group)


                    }
                    //contactList: getContactList(info.contact_record)

                };
               /* if (info.therapeutic_class_list.therapeutic_class) {
                    dossierModel.drugProduct.therapeutic = getTherapeuticList(info.therapeutic_class_list.therapeutic_class)
                }*/
                formModel.drugProduct.scheduleAGroup = getDefaultSchedA();//always create the default for the forms
               // formModel.drugProduct.drugUseList=loadDrugUseValues(info);

                if (info.schedule_a_group) {
                    formModel.drugProduct.scheduleAGroup.drugIdNumber = info.schedule_a_group.din_number;
                    formModel.drugProduct.scheduleAGroup.scheduleAClaimsIndDetails = info.schedule_a_group.sched_a_claims_ind_details;
                    getDiseaseDisorderList(info.schedule_a_group, formModel.drugProduct.scheduleAGroup.diseaseDisorderList);
                }

                return formModel;

            },
            checkSelectedValues: function(obj, systemRole) {
                var keys = Object.keys(obj);
                var other = 'other' + systemRole;
                var otherDetails = 'otherDetailes';
                if(obj[other] == true && obj[otherDetails] == ""){
                    return false;
                }
                for( var i = 0; i < keys.length; i++){
                    if(obj[keys[i]] == true){
                        return true;
                    }
                }
                return false;
            }

        };

        /**
         * @ngdoc Main entry point for converting the internal data model to a compatible output for writing
         * @param jsonObj
         * @returns {*}
         */
        PiConverterService.prototype.formDataToOutput = function (jsonObj) {
            if (!jsonObj) return null;
            var rootTag=this.getRootTagName();
            var baseModel = {};
            //order is important!!! Must match schema
            baseModel.enrolment_version = jsonObj.enrolmentVersion;
            baseModel.date_saved = jsonObj.dateSaved;
            // baseModel.application_type = jsonObj.applicationType;
            baseModel.software_version = "3.0.1"; //TODO: hard code or make a function, should be centrally available
            baseModel.data_checksum = "";

            baseModel.company_id = jsonObj.companyID;
            baseModel.dossier_id = jsonObj.dossierID; //"HC6-024-" + jsonObj.dossierID;
            var currentLang = $translate.proposedLanguage() || $translate.use();
            var dt_text =  $translate.instant(jsonObj.dossierType, "", '', currentLang);
            baseModel.dossier_type = {
                _id: jsonObj.dossierType,
                __text: dt_text
            };
            baseModel.product_name = jsonObj.productName;
            baseModel.proper_name = jsonObj.properName;
            baseModel.manufacturer = jsonObj.manu === true ? 'Y' : 'N';
            baseModel.mailing = jsonObj.mailling === true ? 'Y' : 'N';
            baseModel.this_activity = jsonObj.thisActivity === true ? 'Y' : 'N';
            baseModel.importer = jsonObj.importer === true ? 'Y' : 'N';
            baseModel.importer_record =
                transformImpToFile(jsonObj.importerRecord);

            if(jsonObj.drugProduct.drugUse) {
                baseModel.drug_use = {
                    _id: jsonObj.drugProduct.drugUse.id,
                    _label_en: jsonObj.drugProduct.drugUse.en,
                    _label_fr: jsonObj.drugProduct.drugUse.fr,
                    __text: jsonObj.drugProduct.drugUse[currentLang]
                };
            }else{
                baseModel.drug_use="";
            }
            baseModel.disinfectant_type = {
                hospital: jsonObj.drugProduct.disinfectantType.hospital === true ? 'Y' : 'N',
                food_processing: jsonObj.drugProduct.disinfectantType.foodProcessing === true ? 'Y' : 'N',
                medical_instruments: jsonObj.drugProduct.disinfectantType.medicalInstruments === true ? 'Y' : 'N',
                domestic: jsonObj.drugProduct.disinfectantType.domestic === true ? 'Y' : 'N',
                barn: jsonObj.drugProduct.disinfectantType.barn === true ? 'Y' : 'N',
                institutional_industrial: jsonObj.drugProduct.disinfectantType.institutionalIndustrial === true ? 'Y' : 'N'
            };
            baseModel.is_sched_c = jsonObj.drugProduct.isScheduleC === true ? 'Y' : 'N';
            baseModel.is_sched_d = jsonObj.drugProduct.isScheduleD === true ? 'Y' : 'N';
            baseModel.is_prescription_drug_list = jsonObj.drugProduct.isPrescriptionDrugList === true ? 'Y' : 'N';
            baseModel.is_regulated_cdsa = jsonObj.drugProduct.isRegulatedCDSA === true ? 'Y' : 'N';
            baseModel.is_non_prescription_drug = jsonObj.drugProduct.isNonPrescriptionDrug === true ? 'Y' : 'N';
            baseModel.is_sched_a = jsonObj.drugProduct.isScheduleA === true ? 'Y' : 'N';

            baseModel.proposed_indication = jsonObj.drugProduct.propIndication;

            if (jsonObj.drugProduct.isScheduleA) {
                baseModel.schedule_a_group = scheduleAToOutput(jsonObj.drugProduct.scheduleAGroup);
                console.log( baseModel.schedule_a_group)
            }
            if (jsonObj.drugProduct) {
                var appendix4 = appendix4IngredientListToOutput(jsonObj.drugProduct.appendixFourList);
                if (appendix4 && appendix4.length > 0) {
                    baseModel.appendix4_group = appendix4;
                }
                var formulations = formulationListToOutput(jsonObj.drugProduct.formulations);
                baseModel.formulation_group = {};
                if (formulations) {
                    baseModel.formulation_group.formulation_details = formulations;
                }
            }
            //cant seem to use a variable for the key
            return {"DRUG_PRODUCT_ENROL": baseModel};

        };


        PiConverterService.prototype.getMissingAppendix4 = function (dossierModel) {
            var missingAppendices = [];
            var extraAppendices = [];
            var results = {};

            if (!dossierModel || !dossierModel.drugProduct) {
                return missingAppendices;
            }
            // Step 1 Get all the appendices that exist
            var appendices = getAppendiceData(dossierModel.drugProduct.appendixFourList);
            //Step 2 get a unique list of ingredients
            var ingredients = getAnimalIngredients(dossierModel.drugProduct.formulations);
            //Step 3 Compare. Determine if there are missing ingredients
            missingAppendices = getMissingAppendices(appendices, ingredients);
            //step 4 get extra appendices
            extraAppendices = findExtraApppendices(appendices);
            results.missing = missingAppendices;
            results.extra = extraAppendices;
            return results;
        };


        /**
         * Gets an empty disease disorder list with values set to No
         * @returns {*[]}
         */
        PiConverterService.prototype.getDefaultDiseaseDisorderList = function () {
            return getDefaultDiseaseDisorderList();

        };

        PiConverterService.prototype.getDefaultNervousSystem = function () {
            return _createEmptyNervousSystemModel();

        };
        PiConverterService.prototype.getDefaultImmuneSystem = function () {
            return _createEmptyImmuneSystemModel();

        };
        PiConverterService.prototype.getDefaultDigestiveSystem = function () {
            return _createEmptyDigestiveSystemModel();

        };
        PiConverterService.prototype.getDefaultMuscleSystem = function () {
            return _createEmptyMuscleSystemModel();

        };
        PiConverterService.prototype.getDefaultOtherSystem = function () {
            return _createEmptyOtherSystemModel();

        };
        PiConverterService.prototype.getDefaultReproductiveSystem = function () {
            return _createEmptyReproductiveSystemModel();

        };
        PiConverterService.prototype.getDefaultCardioSystem = function () {
            return _createEmptyCardioSystemModel();

        };
        PiConverterService.prototype.getDefaultSkinSystem = function () {
            return _createEmptySkinSystemModel();

        };

        /**
         * Gets an empty Schedule A Object
         * @returns {*}
         */
        PiConverterService.prototype.getDefaultScheduleA = function () {
            return (getDefaultSchedA());
        };

        PiConverterService.prototype.getRootTagName = function () {
            return ("DRUG_PRODUCT_ENROL");
        };

        //return the Dossier Service object
        return PiConverterService;


        //###############INTERNAL FUNCTIONS start here##################################

        /**
         * Get diseaseDisorderList from the xml fiel
         * @param info
         * @param diseaseList
         * @returns {*}
         */
        function getDiseaseDisorderList(info, diseaseListModel) {

            if (!info || !diseaseListModel) return;

            var keys = Object.keys(info);
            for (var i=0;i<keys.length;i++) {
                diseaseListModel[keys[i]] = (info[keys[i]] === 'Y');
            }

            return diseaseListModel;
        }

        /**
         * Loads all the external appendix 4 information into the internal data model
         * @param info - the 'external type' formatted json object
         * @returns {Array}
         */
        function getAppendix4IngredientList(info) {
            var list = [];
            //TODO externalize
            var getCountries = function (input) {
                var list = [];
                if (!(input instanceof Array)) {
                    input = [input];
                }
                for (var i = 0; i < input.length; i++) {

                    var obj = {
                        "id": i,
                        "country": "",
                        "display": "",
                        "unknownCountryDetails": ""
                    };
                    if (input[i].country_with_unknown.__text === UNKNOWN) {
                        obj.country = getCountryAndProvinces.getUnknownCountryRecord();
                    } else {
                        obj.country = $filter('filter')(getCountryAndProvinces.getCountries(), {id: input[i].country_with_unknown.__text})[0];
                    }
                    if (obj.country) {
                        obj.display = obj.country[$translate.proposedLanguage() || $translate.use()]
                    }
                    obj.unknownCountryDetails = input[i].unknown_country_details;
                    list.push(obj);
                }
                return list;
            };

            if (angular.isDefined(info)) {

                if (!(info instanceof Array)) {
                    info = [info];
                }
                for (var i = 0; i < info.length; i++) {
                    var ing = {};
                    ing.id = info[i].ingredient_id;
                    ing.ingredientName = info[i].ingredient_name;
                    ing.humanSourced = info[i].human_sourced === 'Y';
                    ing.animalSourced = info[i].animal_sourced === 'Y';
                    var tissues = info[i].tissues_fluids_section;
                    var srcAnimal = info[i].animal_sourced_section;

                    if (tissues) {
                        ing.tissuesFluidsOrigin = {};
                        ing.tissuesFluidsOrigin.tissuesList = _getTissuesFluidsModel(tissues);
                    }
                    if (srcAnimal) {
                        ing.sourceAnimalDetails = createEmptyAnimalSourceModel();
                        ing.sourceAnimalDetails.isCellLine = info[i].animal_sourced_section.is_cell_line;
                        ing.sourceAnimalDetails.isBiotechDerived = info[i].animal_sourced_section.is_biotech_derived;
                        ing.sourceAnimalDetails.isControlledPop = info[i].animal_sourced_section.is_controlled_pop;
                        ing.sourceAnimalDetails.isAgeKnown = info[i].animal_sourced_section.is_animal_age_known;
                        ing.sourceAnimalDetails.ageAnimals = Number(info[i].animal_sourced_section.animal_age);
                        var animalTypeList = info[i].animal_sourced_section.animal_src_record;
                        if (!(animalTypeList instanceof Array)) {
                            animalTypeList = [animalTypeList];
                        }
                        for (var srcCount = 0; srcCount < animalTypeList.length; srcCount++) { //TODO function?
                            var oneRec = animalTypeList[srcCount];
                            var animalRecord = {};
                            animalRecord.animalType = oneRec.animal_type;
                            animalRecord.animalDetail = oneRec.animal_detail;
                            ing.sourceAnimalDetails.animalSrcList.push(animalRecord);
                        }
                        ing.sourceAnimalDetails.countryList = getCountries(info[i].animal_sourced_section.country_origin_list.country_origin)
                    }

                    list.push(ing);
                }
            }
            return list;
        }

        /**
         * Returns an empty animal source internal model
         */
        function getEmptyAnimalSourceModel() {

            var emptyAnimalSource = {};
            emptyAnimalSource.animalSrcList = [];
            emptyAnimalSource.isCellLine = "";
            emptyAnimalSource.isBiotechDerived = "";
            emptyAnimalSource.isControlledPop = "";
            emptyAnimalSource.isAgeKnown = "";
            emptyAnimalSource.ageAnimals = "";
            emptyAnimalSource.countryList = [];
            return emptyAnimalSource;
        }

        function getFormulationList(list) {

            var formulationList = [];
            if (!list || list.length === 0)
                return formulationList;
            if (!(list instanceof Array)) {
                //make it an array, case there is only one
                list = [list]
            }
            angular.forEach(list, function (item) {

                //static fields
                var obj = {
                    "formulationId": item.formulation_id,
                    "formulationName": item.formulation_name
                };
                if (!item.dosage_form_group.dosage_form) {
                    obj.dosageForm = item.dosage_form_group.dosage_form;
                } else {
                    // var dosageFormObj = $filter('findListItemById')(DossierLists.getDosageFormList(), {id: DossierLists.getDosageFormPrefix() + item.dosage_form_group.dosage_form.__text});

                    var dflist = DossierLists.getDosageFormList();
                    var dfid = item.dosage_form_group.dosage_form.__text;
                    if (dfid !== 'OTHER') {
                        dfid = DossierLists.getDosageFormPrefix() + dfid;
                    }
                    var dosageFormObj = $filter('findListItemById')(dflist, {id: dfid});
                    obj.dosageForm = dosageFormObj;
                    obj.dosageFormHtml = dosageFormObj[$translate.proposedLanguage() || $translate.use()];
                }

                obj.dosageFormOther = item.dosage_form_group.dosage_form_other;
                /*if (item.nonmedicinal_ingredient) {
                    obj.nMedIngList = getNonMedIngList(item.nonmedicinal_ingredient);
                } else {
                    obj.nMedIngList = [];
                }*/
                if (item.formulation_ingredient) {
                    obj.activeIngList = getActiveIngList(item.formulation_ingredient);
                } else {
                    obj.activeIngList = [];
                }
                //container_group is static but do a check to be safe
                if (item.container_group && item.container_group.container_details) {
                    obj.containerTypes = getContainerTypeList(item.container_group.container_details);
                } else {
                    obj.containerTypes = [];
                }
                if (item.is_animal_human_material) {
                    obj.isAnimalHumanMaterial = item.is_animal_human_material;
                } else {
                    obj.isAnimalHumanMaterial = "";
                }
                if (item.is_animal_human_material === YES && item.material_ingredient) {
                    obj.animalHumanMaterials = getMaterialList(item.material_ingredient);
                } else {
                    obj.animalHumanMaterials = [];
                }
                if (item.roa_group && item.roa_group.roa_details) {
                    obj.routeAdmins = getRouteAdminList(item.roa_group.roa_details);
                } else {
                    obj.routeAdmins = [];
                }
                if (item.country_group && item.country_group.country_manufacturer) {
                    obj.countryList = getFormulationCountryList(item.country_group.country_manufacturer);

                    // var countryArray = [];
                    // if (!(item.country_group.country_manufacturer instanceof Array)) {
                    //     //make it an array, case there is only one
                    //     countryArray = [item.country_group.country_manufacturer];
                    // } else {
                    //     countryArray = item.country_group.country_manufacturer;
                    // }
                    // obj.countryList = getFormulationCountryList(countryArray);
                } else {
                    obj.countryList = [];
                }
                formulationList.push(obj);
            });

            return formulationList;

        }

        /**
         * Loads all the active ingredient records into the internal Data model
         * @param list
         * @returns {Array}
         */
        function getActiveIngList(list) {

            var resultList = [];
            if (list && !(list instanceof Array)) {
                //make it an array, case there is only one
                list = [list];
            }
            angular.forEach(list, function (item) {

                var obj = {
                    "ingRole": item.ingredient_role,
                    "ingId": item.ingredient_id,
                    "variant": item.variant_name,
                    "purpose": item.purpose,
                    "ingLabel": item.ingredient_name,
                    "autoIngred": YES,
                    "cas": item.cas_number,
                    "humanAnimalSourced": item.is_human_animal_src,
                    "standard": item.ingred_standard,
                    "strength": {operator: "",
                        data1: Number(item.strength.data1),
                        data2: Number(item.strength.data2) },
                    "units": "",
                    "unitsHtml": "",
                    "otherUnits": item.units_other,
                    "per": item.per,
                    "perPresentationValue": Number(1),
                    "perMeasureValue": null,
                    "perPresUnits": "",
                    "perPresOtherUnits": "",
                    "perMeasUnits": "",
                    "perMeasUnitsHtml": "",
                    "perMeasOtherUnits": "",
                    "calcAsBase": item.is_base_calc,
                    "isNano": item.is_nanomaterial,
                    "nanoMaterial": "",
                    "nanoMaterialOther": item.nanomaterial_details
                };

                // if (item.ingredient_role) {
                //     obj.ingRole = item.ingredient_role._id;
                // }

                if (item.strength) {
                    var opValue = item.strength.operator.__text;
                    obj.strength.operator = $filter('findListItemById')(DossierLists.getStrengthList(), {id: opValue});
                }

                if (item.units) {
                    var unitsValue = DossierLists.getUnitsPrefix() + item.units.__text; //add the prefix
                    //if other revert the value. OTHER value never has a prefix
                    if (item.units.__text === OTHER) {
                        unitsValue = item.units.__text;
                    }
                    obj.units = $filter('findListItemById')(DossierLists.getUnitsList(), {id: unitsValue});
                    obj.unitsHtml = obj.units[$translate.proposedLanguage() || $translate.use()];
                }

                if (item.per) {
                    var perId = item.per.__text;
                    obj.per = $filter('findListItemById')(DossierLists.getPerList(), {id: perId});
                }

                if (item.per.__text=== 'UP') {
                    obj.perPresentationValue = Number(item.per_value);
                    var upValue = DossierLists.getUnitsPrefix() + item.per_units.__text; //add the prefix
                    //if other revert the value. OTHER value never has a prefix
                    if (item.per_units.__text === OTHER) {
                        upValue = item.per_units.__text;
                    }
                    obj.perPresUnits = $filter('findListItemById')(DossierLists.getUnitsPresentationList(), {id: upValue});
                    obj.perPresOtherUnits = item.per_units_other_details;
                }

                if (item.per.__text === 'UM') {
                    obj.perMeasureValue = Number(item.per_value);
                    var unitsValue = DossierLists.getUnitsPrefix() + item.per_units.__text; //add the prefix
                    //if other revert the value. OTHER value never has a prefix
                    if (item.per_units.__text === OTHER) {
                        unitsValue = item.per_units.__text;
                    }
                    obj.perMeasUnits = $filter('findListItemById')(DossierLists.getUnitsMeasureList(), {id: unitsValue});
                    obj.perMeasUnitsHtml = obj.perMeasUnits == null ? "" : obj.perMeasUnits[$translate.proposedLanguage() || $translate.use()];
                    obj.perMeasOtherUnits = item.per_units_other_details;
                }

                if (item.is_nanomaterial === YES) {
                    //prefixed so need to do things differently than units
                    var nanoValue = DossierLists.getNanoPrefix() + item.nanomaterial.__text;
                    if (item.nanomaterial.__text === OTHER) {
                        nanoValue = item.nanomaterial.__text;
                    }
                    obj.nanoMaterial = $filter('findListItemById')(DossierLists.getNanoMaterials(), {id: nanoValue});
                }
                // used to identify if the ingredient is not from the type ahead lookup
                if (!obj.ingId) {
                    obj.autoIngred = NO
                } else {
                    obj.autoIngred = YES;
                }
                resultList.push(obj);

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
                    "shelfLifeUnit": item.shelf_life_unit,
                    "shelfLifeNumber": Number(item.shelf_life_number),
                    "tempMin": Number(item.temperature_min),
                    "tempMax": Number(item.temperature_max),
                    "otherShelflifeConsider": item.other_shelf_life_considerations
                };

                if (item.shelf_life_unit) {
                    var slUnitValue = item.shelf_life_unit.__text;
                    obj.shelfLifeUnit = $filter('findListItemById')(DossierLists.getShelfLifeUnitsList(), {id: slUnitValue});
                }

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
        }

        function getRouteAdminList(list) {

            if (!(list instanceof Array)) {
                //make it an array, case there is only one
                list = [list]
            }

            var resultList = [];

            var _id = 0;

            angular.forEach(list, function (item) {
                var roaValue = DossierLists.getRoaPrefix() + item.roa.__text;
                if (item.roa.__text === OTHER) {
                    roaValue = item.roa.__text;
                }
                var roaObj = $filter('findListItemById')(DossierLists.getRoa(), {id: roaValue});
                _id = _id + 1;
                var obj = {
                    "id": _id,
                    "roa": roaObj,
                    "otherRoaDetails": item.roa_other,
                    "display": roaObj[$translate.proposedLanguage() || $translate.use()]
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
                    "country": "",
                    "display": "",
                    "unknownCountryDetails": ""
                };
                if (item.__text === UNKNOWN) {
                    obj.country = getCountryAndProvinces.getUnknownCountryRecord();
                } else {
                    obj.country = $filter('filter')(getCountryAndProvinces.getCountries(), {id: item.__text})[0];
                }
                if (obj.country) {
                    obj.display = obj.country[$translate.proposedLanguage() || $translate.use()]
                }
                resultList.push(obj);
            });

            return resultList;
        }

        //TODO get rid of, Angular filter for this
        String.prototype.capitalize = function () {
            return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
            //return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
        };

        /**
         *
         * @param jsonObj the json object to convert
         * @returns {Array}
         * @private
         */
        function transformImpToFile(jsonObj) {
            var importers = [];
            if (!jsonObj) return importers;
            if (!(jsonObj instanceof Array)) {
                //make it an array, case there is only one record
                jsonObj = [jsonObj]
            }

            for (var i = 0; i < jsonObj.length; i++) {
                var record = _mapImporterRecToOutput(jsonObj[i]);
                if (jsonObj.length === 1) {
                    return (record);
                }
                importers.push(record);
            }
            return (importers);
        }

        function transformImpFromFile(jsonObj) {
            var importerRecord = [];
            if (!jsonObj) return importerRecord;
            if (!(jsonObj instanceof Array)) {
                //make it an array, case there is only one record
                jsonObj = [jsonObj];
            }
            for (var i = 0; i < jsonObj.length; i++) {
                var record = {};
                record.importerId = jsonObj[i].importer_company_id;
                record.importerName = jsonObj[i].importer_company_name;
                // record.street = jsonObj[i].street_address;
                // record.city = jsonObj[i].city;
                // // record.stateList = jsonObj[i].province_lov;
                // if (jsonObj[i].province_lov) {
                //     record.stateList = jsonObj[i].province_lov._id;
                // } else {
                //     record.stateList = "";
                // }
                // record.stateText = jsonObj[i].province_text;
                // record.country = "";
                // if (jsonObj[i].country._id) {
                //     record.country = $filter('filter')(getCountryAndProvinces.getCountries(), {id: jsonObj[i].country._id})[0];
                //     record.countryHtml = record.country[$translate.proposedLanguage() || $translate.use()];
                //     record.countryDisplay = record.country.id;
                // }
                // record.postalCode = jsonObj[i].postal_code;
                importerRecord.push(record);
            }
            return importerRecord;
        }

        function _mapImporterRecToOutput(importerObj) {
            var importerRec = {};
            var currentLang = $translate.proposedLanguage() || $translate.use();
            if (importerObj) {
                importerRec.importer_company_id = importerObj.importerId;
                importerRec.importer_company_name = importerObj.importerName;
                importerRec.street_address = importerObj.street;
                importerRec.city = importerObj.city;
                // importerRec.province_lov = importerObj.stateList;
                if (importerObj.stateList) {
                    importerRec.province_lov = {
                        _id: importerObj.stateList,
                        __text: $translate.instant(importerObj.stateList, "", '', currentLang)
                    };
                } else {
                    importerRec.province_lov = "";
                }
                importerRec.province_text = importerObj.stateText;
                // importerRec.country = "";
                importerRec.country = {
                        _label_en: 'Canada',
                        _label_fr: 'Canada',
                        _id: CANADA,
                        __text: 'Canada'
                    };
                importerRec.postal_code = importerObj.postalCode;
            }
            return (importerRec);
        }


        /**
         * Converts all the appendix 4 data to output
         * @param info
         * @returns {*}
         */
        function appendix4IngredientListToOutput(info) {
            var appendices = []; //TODO may need better error checking
            //Note order of elements must match schema for validation
            var currentLang = $translate.proposedLanguage() || $translate.use();
            if (!angular.isDefined(info)) {
                return null;
            }

            for (var i = 0; i < info.length; i++) {
                var ing = {};
                var oneRecord = {};
                ing.ingredient_id = info[i].id;
                ing.ingredient_name = info[i].ingredientName;
                ing.animal_sourced = info[i].animalSourced === true ? 'Y' : 'N';
                ing.human_sourced = info[i].humanSourced === true ? 'Y' : 'N';

                //output all the tissues and fluids
                if (info[i].tissuesFluidsOrigin) {
                    ing.tissues_fluids_section = {};

                    for (var b = 0; b < info[i].tissuesFluidsOrigin.tissuesList.length; b++) {
                        var fluidsRec = {};
                        switch (info[i].tissuesFluidsOrigin.tissuesList[b].systemType) {
                            case   DossierLists.getNervousSystemValue():
                                ing.tissues_fluids_section.nervous_system = _nervousSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;

                            case   DossierLists.getDigestiveSystemValue():
                                ing.tissues_fluids_section.digestive_system = _digestiveSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;
                            case   DossierLists.getImmuneSystemValue():
                                ing.tissues_fluids_section.immune_system = _immuneSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;
                            case   DossierLists.getSkinSystemValue():
                                ing.tissues_fluids_section.skin_system = _skinSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;

                                break;
                            case   DossierLists.getMuscleSystemValue():
                                ing.tissues_fluids_section.musculo_system = _muscleSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;
                            case   DossierLists.getOtherTissuesSystemValue():
                                ing.tissues_fluids_section.other_system = _otherSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;
                            case   DossierLists.getReproductiveSystemValue():
                                ing.tissues_fluids_section.reproductive_system = _reproductiveSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;
                            case   DossierLists.getCardioSystemValue():
                                ing.tissues_fluids_section.cardio_system = _cardioSystemToOutput(info[i].tissuesFluidsOrigin.tissuesList[b].system);
                                break;
                        }
                    }
                }

                if (info[i].sourceAnimalDetails) {
                    ing.animal_sourced_section = createEmptyAnimalSourceForOutput();
                    //get the static values
                    ing.animal_sourced_section.is_cell_line = info[i].sourceAnimalDetails.isCellLine;
                    ing.animal_sourced_section.is_biotech_derived = info[i].sourceAnimalDetails.isBiotechDerived;
                    ing.animal_sourced_section.is_controlled_pop = info[i].sourceAnimalDetails.isControlledPop;
                    ing.animal_sourced_section.is_animal_age_known = info[i].sourceAnimalDetails.isAgeKnown;
                    ing.animal_sourced_section.animal_age = info[i].sourceAnimalDetails.ageAnimals;
                    //step 2 get all the animal sourcees
                    var animalSrcObj = info[i].sourceAnimalDetails;
                    for (var srcCount = 0; srcCount < animalSrcObj.animalSrcList.length; srcCount++) {
                        var oneRec = animalSrcObj.animalSrcList[srcCount];
                        var srcRecordOut = {};
                        if (oneRec.animalType) {
                            srcRecordOut.animal_type = {
                                _id: oneRec.animalType,
                                __text: $translate.instant(oneRec.animalType, "", '', currentLang)
                            };
                        } else {
                            srcRecordOut.animal_type = "";
                        }
                        srcRecordOut.animal_detail = oneRec.animalDetail;
                        ing.animal_sourced_section.animal_src_record.push(srcRecordOut);
                    }
                    //step 3 get all the countries
                    var countries = info[i].sourceAnimalDetails.countryList;
                    for (var v = 0; v < countries.length; v++) {
                        var countryRecord = {};
                        countryRecord.country_with_unknown = {
                            _id: "",
                            _label_en: "",
                            _label_fr: "",
                            __text: ""
                        };
                        if (countries[v].country) {
                            countryRecord.country_with_unknown._id = countries[v].country.id;
                            countryRecord.country_with_unknown._label_en = countries[v].country.en;
                            countryRecord.country_with_unknown._label_fr = countries[v].country.fr;
                            countryRecord.country_with_unknown.__text = countries[v].country[currentLang];
                        }

                        countryRecord.unknown_country_details = countries[v].unknownCountryDetails;
                        ing.animal_sourced_section.country_origin_list.country_origin.push(countryRecord);
                    }
                }
                appendices.push(ing);
            }
            return appendices;
        }

        /**
         * Creates the formulation list in a format comapatible for output file
         * @param list
         * @returns {Array}
         */
        function formulationListToOutput(list) {
            var formulationList = [];
            var currentLang = $translate.proposedLanguage() || $translate.use();
            //Order is important for the XML
            angular.forEach(list, function (item) {
                var obj = {
                    "formulation_name": item.formulationName,
                    "formulation_id": item.formulationId
                };
                //dosage_form_group, static value
                obj.dosage_form_group = {};
                if (item.dosageForm) {
                    var splitArray = (item.dosageForm.id).split(DossierLists.getDosageFormPrefix()); //needed to remove the internal uniqueness
                    var newDosage = splitArray[splitArray.length - 1];
                    obj.dosage_form_group.dosage_form = {
                        _id: newDosage,
                        _label_en: item.dosageForm.en,
                        _label_fr: item.dosageForm.fr,
                        __text: item.dosageForm[currentLang]
                    };
                } else {
                    obj.dosage_form_group.dosage_form = "";
                }
                // var splitArray = (item.dosageForm).split(DossierLists.getDosageFormPrefix()); //needed to remove the internal uniqueness
                // var newDosage = splitArray[splitArray.length - 1];
                // obj.dosage_form_group.dosage_form = newDosage;
                obj.dosage_form_group.dosage_form_other = item.dosageFormOther;
                obj.roa_group = {};
                if (item.routeAdmins && item.routeAdmins.length > 0) {
                    obj.roa_group.roa_details = routeAdminToOutput(item.routeAdmins);
                }
                obj.container_group = {};
                if (item.containerTypes && item.containerTypes.length > 0) {
                    obj.container_group.container_details = containerTypeListToOutput(item.containerTypes);
                }
                obj.country_group = {};
                if (item.countryList && item.countryList.length > 0) {
                    obj.country_group.country_manufacturer = formulationCountryListToOutput(item.countryList, currentLang);
                }
                if (item.activeIngList && item.activeIngList.length > 0) {
                    obj.formulation_ingredient = activeListToOutput(item.activeIngList);
                }
                /*if (item.nMedIngList && item.nMedIngList.length > 0) {
                    obj.nonmedicinal_ingredient = nonMedIngListToOutput(item.nMedIngList);
                }*/
                if (item.isAnimalHumanMaterial) {
                    obj.is_animal_human_material = item.isAnimalHumanMaterial;
                }
                if (item.animalHumanMaterials && item.animalHumanMaterials.length > 0) {
                    obj.material_ingredient = materialListToOutput(item.animalHumanMaterials);
                }
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
            var currentLang = $translate.proposedLanguage() || $translate.use();

            angular.forEach(activeList, function (item) {
                var ibcText = $translate.instant(item.calcAsBase, "", '', currentLang);

                var obj = {
                    "ingredient_role": "",
                    "ingredient_id": item.ingId,
                    "variant_name": item.variant,
                    "purpose": item.purpose,
                    "ingredient_name": item.ingLabel,
                    "cas_number": item.cas,
                    "ingred_standard": item.standard,
                    "is_human_animal_src": item.humanAnimalSourced,
                    "strength": "",
                    "units": "",
                    "units_other": item.otherUnits,
                    "per": "",
                    "per_value": "",
                    "per_units": "",
                    "per_units_other_details": "",
                    "is_base_calc": {
                        _id: item.calcAsBase,
                        __text: ibcText
                    },
                    "is_nanomaterial": item.isNano,
                    "nanomaterial": "",
                    "nanomaterial_details": ""
                };

                if (item.ingRole) {
                    var ingr = $filter('findListItemById')(DossierLists.getIngRoleList(), {id: item.ingRole});
                    if (ingr) {
                        obj.ingredient_role = {
                            _id: ingr.id,
                            __text: ingr[currentLang]
                        };
                    }
                }

                if(item.strength) {
                    var data2Value = "";
                    if (item.strength.operator.id === 'RA') {
                        data2Value = item.strength.data2;
                    }
                    obj.strength = {
                        operator: {
                            _id: item.strength.operator.id,
                            _label_en: item.strength.operator.en,
                            _label_fr: item.strength.operator.fr,
                            __text: item.strength.operator[currentLang]
                        },
                        data1: item.strength.data1,
                        data2: data2Value
                    };
                }

                if(item.per) {
                    obj.per = {
                        _id: item.per.id,
                        _label_en: item.per.en,
                        _label_fr: item.per.fr,
                        __text: item.per[currentLang]
                    };
                }
                //item.units
                obj.units = _unitsFldToOutput(item.units, DossierLists.getUnitsPrefix(), currentLang);
                if (item.per.id === 'UP') {
                    obj.per_value = item.perPresentationValue;
                    obj.per_units = _unitsFldToOutput(item.perPresUnits, DossierLists.getUnitsPrefix(), currentLang);
                    obj.per_units_other_details = item.perPresOtherUnits;
                } else if (item.per.id === 'UM') {
                    obj.per_value = item.perMeasureValue;
                    obj.per_units = _unitsFldToOutput(item.perMeasUnits, DossierLists.getUnitsPrefix(), currentLang);
                    obj.per_units_other_details = item.perMeasOtherUnits;
                }
                if (item.isNano === YES) {
                    obj.nanomaterial = _unitsFldToOutput(item.nanoMaterial, DossierLists.getNanoPrefix(), currentLang);
                    obj.nanomaterial_details = item.nanoMaterialOther;
                }

                resultList.push(obj);
            });
            return (resultList);
        }

        /***
         * Creates the standard json object for units of measure
         * @param unitsObj
         * @param prefix
         * @returns {{_id: string, _label_en: string, _label_fr: string, __text: string}}
         * @private
         */
        function _unitsFldToOutput(unitsObj, prefix, lang) {
            var newObj = {
                "_id": "",
                "_label_en": "",
                "_label_fr": "",
                "__text": ""
            };
            if (!unitsObj || !prefix) {
                return "";
            }
            var splitArray = (unitsObj.id).split(prefix); //needed to remove the internal uniqueness
            var newUnits = splitArray[splitArray.length - 1];
            newObj._id = newUnits;
            newObj._label_en = unitsObj.en;
            newObj._label_fr = unitsObj.fr;
            newObj.__text = unitsObj[lang];
            return newObj;
        }

        /**
         * Converts container type to output json
         * @param containerList
         * @returns {Array}
         */
        function containerTypeListToOutput(containerList) {
            var resultList = [];
            var currentLang = $translate.proposedLanguage() || $translate.use();
            angular.forEach(containerList, function (item) {

                var obj = {
                    "container_type": item.containerType,
                    "package_size": item.packageSize,
                    "shelf_life_unit": "",
                    "shelf_life_number": item.shelfLifeNumber,
                    "temperature_min": item.tempMin,
                    "temperature_max": item.tempMax,
                    "other_shelf_life_considerations": item.otherShelflifeConsider
                };

                if(item.shelfLifeUnit) {
                    obj.shelf_life_unit = {
                        _id: item.shelfLifeUnit.id,
                        _label_en: item.shelfLifeUnit.en,
                        _label_fr: item.shelfLifeUnit.fr,
                        __text: item.shelfLifeUnit[currentLang]
                    };
                }

                resultList.push(obj);
            });
            return resultList;
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
        }

        /**
         * converts route of admin to output json format
         * @param list
         * @returns {Array}
         */
        function routeAdminToOutput(list) {
            var resultList = [];
            var currentLang = $translate.proposedLanguage() || $translate.use();
            angular.forEach(list, function (item) {
                //check to see if this is an object. If not it was empty
                if (angular.isObject(item.roa)) {
                    var splitArray = (item.roa.id).split(DossierLists.getRoaPrefix()); //needed to remove the internal uniqueness
                    var newRoa = splitArray[splitArray.length - 1];
                    //roa is a field with 2 attributes
                    var obj = {
                        "roa": {
                            _id: newRoa,
                            _label_en: item.roa.en,
                            _label_fr: item.roa.fr,
                            __text: item.roa[currentLang]
                        },
                        "roa_other": item.otherRoaDetails
                    };
                    resultList.push(obj);
                }
            });
            return resultList
        }

        /**
         * Country of origin list to output
         * @param list
         * @returns {Array}
         */
        function formulationCountryListToOutput(list, lang) {

            var resultList = [];
            angular.forEach(list, function (item) {
                var country = {
                    _id: item.country.id,
                    _label_en: item.country.en,
                    _label_fr: item.country.fr,
                    __text: item.country[lang]
                };
                resultList.push(country);
            });
            return resultList;
        }

       /* function repContactToOutput(contactList) {
            var resultList = [];
            angular.forEach(contactList, function (item) {
                var obj = {};
                obj.amend_record = item.amend ? 'Y' : 'N';
                obj.rep_contact_role = item.repRole;
                obj.rep_contact_details = {};
                obj.rep_contact_details.salutation = item.salutation;
                obj.rep_contact_details.given_name = item.givenName;
                obj.rep_contact_details.initials = item.initials;
                obj.rep_contact_details.surname = item.surname;
                obj.rep_contact_details.job_title = item.title;
                obj.rep_contact_details.language_correspondance = item.language;
                obj.rep_contact_details.phone_num = item.phone;
                obj.rep_contact_details.phone_ext = item.phoneExt;
                obj.rep_contact_details.fax_num = item.fax;
                obj.rep_contact_details.email = item.email;
                resultList.push(obj);
            });
            return resultList;
        }*/

        /***
         * Converts the therapeutic classification to output format
         * @param jsonObj
         * @returns {Array}
         */
      /*  function therapeuticClassToOutput(jsonObj) {

            var resultList = [];
            for (var i = 0; i < jsonObj.length; i++) {

                if (angular.isString(jsonObj[i].name)&&jsonObj[i].name.length>0) {
                    resultList.push(jsonObj[i].name);
                }
            }
            return (resultList);
        }*/

        function scheduleAToOutput(jsonObj) {
            var result = createEmptyScheduleAForOutput();
            var disorderList = jsonObj.diseaseDisorderList;
            var keys = Object.keys(result);
            for (var i=0;i<keys.length;i++) {
                result[keys[i]] = (disorderList[keys[i]] === true ? 'Y' : 'N');
            }
            //set these values after the keys for loop as will get defaulted to N
            result.din_number = jsonObj.drugIdNumber;
            result.sched_a_claims_ind_details = jsonObj.scheduleAClaimsIndDetails;
            return (result);
        }

        /**
         * Creates the empty output data structure for schedule A
         * @returns json Object
         */
        function createEmptyScheduleAForOutput() {
            var result = {};
            //enforcing order for output
            result.din_number = "";
            result.acute_alcohol = noValue;
            result.acute_anxiety = noValue;
            result.acute_infectious = noValue;
            result.acute_inflammatory = noValue;
            result.acute_psychotic = noValue;
            result.addiction = noValue;
            result.ateriosclerosis = noValue;
            result.appendicitis = noValue;
            result.asthma = noValue;
            result.cancer = noValue;
            result.congest_heart_fail = noValue;
            result.convulsions = noValue;
            result.dementia = noValue;
            result.depression = noValue;
            result.diabetes = noValue;
            result.gangrene = noValue;
            result.glaucoma = noValue;
            result.haematologic_bleeding = noValue;
            result.hepatitis = noValue;
            result.hypertension = noValue;
            result.nausea_pregnancy = noValue;
            result.obesity = noValue;
            result.rheumatic_fever = noValue;
            result.septicemia = noValue;
            result.sex_transmit_disease = noValue;
            result.strangulated_hernia = noValue;
            result.thrombotic_embolic_disorder = noValue;
            result.thyroid_disease = noValue;
            result.ulcer_gastro = noValue;
            result.sched_a_claims_ind_details = "";
            return (result);
        }

        /**
         * Make list of json objects for appendix data
         * @param appendices
         * @returns {{}}
         */
        function getAppendiceData(appendices) {
            var result = {};
            if (!appendices) return result;

            for (var i = 0; i < appendices.length; i++) {
                var appendix = appendices[i];
                // var rec = {};
                result[appendix.ingredientName] = (i + 1);
                //result.push(rec);
            }
            return result;
        }

        function getAnimalIngredients(formulations) {
            var yesValue = 'Y';
            var allAnimalSourcedNames = [];
            var uniqueList = {};
            for (var i = 0; i < formulations.length; i++) {
                //Step 1 get active ingredients
                var oneFormulation = formulations[i];
                if (oneFormulation.activeIngList) {
                    for (var j = 0; j < (oneFormulation.activeIngList.length); j++) {
                        var oneActive = oneFormulation.activeIngList[j];
                        if (oneActive && oneActive.humanAnimalSourced === yesValue) {
                            allAnimalSourcedNames.push(oneActive.ingLabel);
                        }
                    }
                }
                //step 2 get nmi flagged
                if (oneFormulation.nMedIngList) {
                    for (var j = 0; j < (oneFormulation.nMedIngList.length); j++) {
                        var oneActive = oneFormulation.nMedIngList[j];
                        if (oneActive.humanAnimalSourced === yesValue) {
                            allAnimalSourcedNames.push(oneActive.ingName);
                        }
                    }
                }
                //step 3  all materials
                if (oneFormulation.animalHumanMaterials) {
                    for (var j = 0; j < (oneFormulation.animalHumanMaterials.length); j++) {
                        var oneActive = oneFormulation.animalHumanMaterials[j];
                        allAnimalSourcedNames.push(oneActive.ingredientName);
                    }
                }
            }
            uniqueList = getUniqueList(allAnimalSourcedNames);
            return (uniqueList);
        }

        /**
         * Create a list of missing appendices
         * @param appendiceList
         * @param ingredientJsonList
         */
        function getMissingAppendices(appendiceList, ingredientJsonList) {
            var missingList = [];
            for (var i = 0; i < ingredientJsonList.length; i++) {
                if (!appendiceList.hasOwnProperty(ingredientJsonList[i])) {
                    missingList.push(ingredientJsonList[i]);
                } else {
                    //make zero if found. any that are not zero are appendices without ingredients
                    appendiceList[ingredientJsonList[i]] = 0;
                }
            }
            return missingList;
        }


        function findExtraApppendices(appendixJson) {
            var extraList = [];
            var keys = Object.keys(appendixJson);
            for (var i = 0; i < keys.length; i++) {
                var val = appendixJson[keys[i]];
                if (val > 0) {
                    extraList.push(keys[i]);
                }
            }

            return extraList;
        }

        function getUniqueList(arr) {
            var u = {}, a = [];
            for (var i = 0, l = arr.length; i < l; ++i) {
                if (!u.hasOwnProperty(arr[i])) {
                    a.push(arr[i]);
                    u[arr[i]] = 1;
                }
            }
            return a;
        }

        function getDefaultSchedA() {

            var schedA = {};
            schedA.drugIdNumber = "";
            schedA.scheduleAClaimsIndDetails = "";
            schedA.diseaseDisorderList = getDefaultDiseaseDisorderList();
            return schedA;
        }

        /**
         * Gets an empty disease disorder list with values set to No
         * @returns {*[]}
         */
        function getDefaultDiseaseDisorderList() {
            var noModelValue = false;
            return (

            {
                "acute_alcohol": false,
                "acute_anxiety": false,
                "acute_infectious": false,
                "acute_inflammatory": false,
                "acute_psychotic": false,
                "addiction": false,
                "ateriosclerosis": false,
                "appendicitis": false,
                "asthma": false,
                "cancer": false,
                "congest_heart_fail": false,
                "convulsions": false,
                "dementia": false,
                "depression": false,
                "diabetes": false,
                "gangrene": false,
                "glaucoma": false,
                "haematologic_bleeding": false,
                "hepatitis": false,
                "hypertension": false,
                "nausea_pregnancy": false,
                "obesity": false,
                "rheumatic_fever": false,
                "septicemia": false,
                "sex_transmit_disease": false,
                "strangulated_hernia": false,
                "thrombotic_embolic_disorder": false,
                "thyroid_disease": false,
                "ulcer_gastro": false
            }
            );
        }

        /**
         * Creates an animal sourced emptt json record for file write
         * @returns {{}}
         */
        function createEmptyAnimalSourceForOutput() {
            var record = {};
            record.animal_src_record = [];
            record.is_controlled_pop = "";
            record.is_biotech_derived = "";
            record.is_cell_line = "";
            record.is_animal_age_known = "";
            record.animal_age = "";
            record.country_origin_list = {};
            record.country_origin_list.country_origin = [];
            return record;
        }

        function createEmptyAnimalSourceModel() {
            var record = {};
            record.animalSrcList = [];
            record.isCellLine = "";
            record.isBiotechDerived = "";
            record.isControlledPop = "";
            record.isAgeKnown = "";
            record.ageAnimals = "";
            record.countryList = [];
            return record;
        }

        function _createEmptyNervousSystemModel() {
            var record = {};
            record.brain = false;
            record.brainStem = false;
            record.cerebellum = false;
            record.ceroFluid = false;
            record.dorsalRoot = false;
            record.duraMater = false;
            record.hypothalamus = false;
            record.retina = false;
            record.spinalCord = false;
            record.trigeminal = false;
            record.otherNervous = false;
            record.otherDetails = "";
            return record;
        }

        /**
         * Creates an internal model for Tissues and Fluids:Digestive System
         * @returns {{}}
         * @private
         */
        function _createEmptyDigestiveSystemModel() {
            var record = {};
            record.appendix = false;
            record.bile = false;
            record.distalIleum = false;
            record.largeIntestine = false;
            record.salivaSalivary = false;
            record.smallIntestine = false;
            record.stomach = false;
            record.otherDigestive = false;
            record.otherDetails = "";
            return record;
        }

        function _createEmptyImmuneSystemModel() {
            var record = {};
            record.lymphNodes = false;
            record.spleen = false;
            record.thymus = false;
            record.tonsils = false;
            record.otherImmune = false;
            record.otherDetails = "";

            return record;
        }

        function _createEmptyMuscleSystemModel() {
            var record = {};
            record.abdomen = false;
            record.skull = false;
            record.bones = false;
            record.collagen = false;
            record.tendonsLigaments = false;
            record.vertebralColumn = false;
            record.muscle = false;
            record.otherMuscle = false;
            record.otherDetails = "";
            return record;
        }

        function _createEmptyReproductiveSystemModel() {
            var record = {};
            record.milkProducts = false;
            record.kidney = false;
            record.colostrum = false;
            record.mammaryGlands = false;
            record.ovaries = false;
            record.placenta = false;
            record.placentalFluid = false;
            record.semen = false;
            record.testes = false;
            record.urine = false;
            record.otherReproductive = false;
            record.otherDetails = "";

            return record;
        }

        function _createEmptySkinSystemModel() {
            var record = {};
            record.adrenalGland = false;
            record.hairHoovesFeathers = false;
            record.liver = false;
            record.pancreas = false;
            record.pituitary = false;
            record.skinHides = false;
            record.thyroidParathyroid = false;
            record.otherSkin = false;
            record.otherDetails = "";
            return record;
        }

        function _createEmptyOtherSystemModel() {
            var record = {};
            record.adipose = false;
            record.ascites = false;
            record.antlerVelvet = false;
            record.serum = false;
            record.wholeBlood = false;
            record.plasma = false;
            record.embryonicTissue = false;
            record.fetalTissue = false;
            record.boneMarrow = false;
            record.eyesCornea = false;
            record.gallBladder = false;
            record.otherFluids = false;
            record.otherDetails = "";
            return record;
        }

        function _createEmptyCardioSystemModel() {
            var record = {};
            record.heartPericardium = false;
            record.lung = false;
            record.nasalFluid = false;
            record.trachea = false;
            record.otherCardio = false;
            record.otherDetails = "";
            return record;
        }

        function _createEmptyNervousSystemforOutput() {
            var record = {};
            record.brain = noValue;
            record.brain_stem = noValue;
            record.cerebellum = noValue;
            record.cerebrospinal_fluid = noValue;
            record.dorsal_root_ganglia = noValue;
            record.dura_mater = noValue;
            record.hypothalamus = noValue;
            record.retina_optic = noValue;
            record.spinal_cord = noValue;
            record.trigerminal_ganglia = noValue;
            record.other_nervous = noValue;
            record.other_nervous_details = "";
            return record;
        }

        function _createEmptyDigestiveSystemforOutput() {
            var record = {};
            record.appendix = noValue;
            record.bile = noValue;
            record.distal_ileum = noValue;
            record.large_intestine = noValue;
            record.saliva_salivary = noValue;
            record.small_intestine = noValue;
            record.stomach = noValue;
            record.other_digestive = noValue;
            record.other_digestive_details = "";
            return record;
        }

        function _createEmptyMuscleSystemforOutput() {
            var record = {};
            record.abdomen = noValue;
            record.skull = noValue;
            record.bones = noValue;
            record.collagen = noValue;
            record.tendons_ligaments = noValue;
            record.vertebral_column = noValue;
            record.muscle = noValue;
            record.other_musculo_skeletal = noValue;
            record.other_musculo_skeletal_details = "";
            return record;
        }

        function _createEmptyReproductiveSystemforOutput() {
            var record = {};
            record.milk_products = noValue;
            record.kidney = noValue;
            record.colostrum = noValue;
            record.mammary_glands = noValue;
            record.ovaries = noValue;
            record.placenta = noValue;
            record.placental_fluid = noValue;
            record.semen = noValue;
            record.testes = noValue;
            record.urine = noValue;
            record.other_reproductive = noValue;
            record.other_reproductive_details = "";
            return record;
        }

        function _createEmptyCardioSystemforOutput() {
            var record = {};
            record.heart_pericardium = noValue;
            record.lung = noValue;
            record.nasal_fluid = noValue;
            record.trachea = noValue;
            record.other_cardio_respiratory = noValue;
            record.other_cardio_respiratory_details = "";
            return record;
        }

        function _createEmptyImmuneSystemforOutput() {
            var record = {};
            record.lymph_nodes = noValue;
            record.spleen = noValue;
            record.thymus = noValue;
            record.tonsils = noValue;
            record.other_immune = noValue;
            record.other_immune_details = "";
            return record;
        }

        function _createEmptySkinSystemforOutput() {
            var record = {};
            record.adrenal_gland = noValue;
            record.hair_hooves_feathers = noValue;
            record.liver = noValue;
            record.pancreas = noValue;
            record.pituitary = noValue;
            record.skin_hides = noValue;
            record.thyroid_parathyroid = noValue;
            record.other_skin_glandular = noValue;
            record.other_skin_glandular_details = "";
            return record;
        }

        /* function _createEmptyMuscleSystemforOutput() {
         var record = {};

         record.abdomen = noValue;
         record.skull = noValue;
         record.bones = noValue;
         record.collagen = noValue;
         record.tendons_ligaments = noValue;
         record.vertebral_column = noValue;
         record.other_musculo_skeletal = noValue;
         record.other_musculo_skeletal_details = "";
         return record;
         }*/

        function _createEmptyOtherSystemforOutput() {
            var record = {};
            record.adipose = noValue;
            record.ascites = noValue;
            record.antler_velvet = noValue;
            record.serum = noValue;
            record.whole_blood = noValue;
            record.plasma = noValue;
            record.embryonic_tissue = noValue;
            record.fetal_tissue = noValue;
            record.bone_marrow = noValue;
            record.eyes_cornea = noValue;
            record.gall_bladder = noValue;
            record.other_fluids_tissues = noValue;
            record.other_fluids_tissues_details = "";
            return record;
        }

        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Nervous System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _nervousSystemToOutput(jsonObj) {

            var record = _createEmptyNervousSystemforOutput();
            record.brain = jsonObj.brain === true ? yesValue : noValue;
            record.brain_stem = jsonObj.brainStem === true ? yesValue : noValue;
            record.cerebellum = jsonObj.cerebellum === true ? yesValue : noValue;
            record.cerebrospinal_fluid = jsonObj.ceroFluid === true ? yesValue : noValue;
            record.dorsal_root_ganglia = jsonObj.dorsalRoot === true ? yesValue : noValue;
            record.dura_mater = jsonObj.duraMater === true ? yesValue : noValue;
            record.hypothalamus = jsonObj.hypothalamus === true ? yesValue : noValue;
            record.retina_optic = jsonObj.retina === true ? yesValue : noValue;
            record.spinal_cord = jsonObj.spinalCord === true ? yesValue : noValue;
            record.trigerminal_ganglia = jsonObj.trigeminal === true ? yesValue : noValue;
            record.other_nervous = jsonObj.otherNervous === true ? yesValue : noValue;
            record.other_nervous_details = jsonObj.otherDetails;
            return record;
        }


        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Digestive System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _digestiveSystemToOutput(jsonObj) {
            var record = _createEmptyDigestiveSystemforOutput();
            record.appendix = jsonObj.appendix === true ? yesValue : noValue;
            record.bile = jsonObj.bile === true ? yesValue : noValue;
            record.distal_ileum = jsonObj.distalIleum === true ? yesValue : noValue;
            record.large_intestine = jsonObj.largeIntestine === true ? yesValue : noValue;
            record.saliva_salivary = jsonObj.salivaSalivary === true ? yesValue : noValue;
            record.small_intestine = jsonObj.smallIntestine === true ? yesValue : noValue;
            record.stomach = jsonObj.stomach === true ? yesValue : noValue;
            record.other_digestive = jsonObj.otherDigestive === true ? yesValue : noValue;
            record.other_digestive_details = jsonObj.otherDetails;
            return record;
        }

        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Muscle System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _muscleSystemToOutput(jsonObj) {
            var record = _createEmptyMuscleSystemforOutput();
            record.abdomen = jsonObj.abdomen === true ? yesValue : noValue;
            record.skull = jsonObj.skull === true ? yesValue : noValue;
            record.bones = jsonObj.bones === true ? yesValue : noValue;
            record.collagen = jsonObj.collagen === true ? yesValue : noValue;
            record.tendons_ligaments = jsonObj.tendonsLigaments === true ? yesValue : noValue;
            record.vertebral_column = jsonObj.vertebralColumn === true ? yesValue : noValue;
            record.muscle = jsonObj.muscle === true ? yesValue : noValue;
            record.other_musculo_skeletal = jsonObj.otherMuscle === true ? yesValue : noValue;
            record.other_musculo_skeletal_details = jsonObj.otherDetails;
            return record;

        }

        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Muscle System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _reproductiveSystemToOutput(jsonObj) {
            var record = _createEmptyReproductiveSystemforOutput();
            record.milk_products = jsonObj.milkProducts === true ? yesValue : noValue;
            record.kidney = jsonObj.kidney === true ? yesValue : noValue;
            record.colostrum = jsonObj.colostrum === true ? yesValue : noValue;
            record.mammary_glands = jsonObj.mammaryGlands === true ? yesValue : noValue;
            record.ovaries = jsonObj.ovaries === true ? yesValue : noValue;
            record.placenta = jsonObj.placenta === true ? yesValue : noValue;
            record.placental_fluid = jsonObj.placentalFluid === true ? yesValue : noValue;
            record.semen = jsonObj.semen === true ? yesValue : noValue;
            record.testes = jsonObj.testes === true ? yesValue : noValue;
            record.urine = jsonObj.urine === true ? yesValue : noValue;
            record.other_reproductive = jsonObj.otherReproductive === true ? yesValue : noValue;
            record.other_reproductive_details = jsonObj.otherDetails;
            return record;

        }


        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Cardio System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _cardioSystemToOutput(jsonObj) {
            var record = _createEmptyCardioSystemforOutput();
            record.heart_pericardium = jsonObj.heartPericardium === true ? yesValue : noValue;
            record.lung = jsonObj.lung === true ? yesValue : noValue;
            record.nasal_fluid = jsonObj.nasalFluid === true ? yesValue : noValue;
            record.trachea = jsonObj.trachea === true ? yesValue : noValue;
            record.other_cardio_respiratory = jsonObj.otherCardio === true ? yesValue : noValue;
            record.other_cardio_respiratory_details = jsonObj.otherDetails;
            return record;
        }

        /**
         * Maps the internal data model to the output model For Tissues and Fluids:immune System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _immuneSystemToOutput(jsonObj) {
            var record = _createEmptyImmuneSystemforOutput();
            record.lymph_nodes = jsonObj.lymphNodes === true ? yesValue : noValue;
            record.spleen = jsonObj.spleen === true ? yesValue : noValue;
            record.thymus = jsonObj.thymus === true ? yesValue : noValue;
            record.tonsils = jsonObj.tonsils === true ? yesValue : noValue;
            record.other_immune = jsonObj.otherImmune === true ? yesValue : noValue;
            record.other_immune_details = jsonObj.otherDetails;
            return record;
        }

        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Other System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _otherSystemToOutput(jsonObj) {
            var record = _createEmptyOtherSystemforOutput();
            record.adipose = jsonObj.adipose === true ? yesValue : noValue;
            record.ascites = jsonObj.ascites === true ? yesValue : noValue;
            record.antler_velvet = jsonObj.antlerVelvet === true ? yesValue : noValue;
            record.serum = jsonObj.serum === true ? yesValue : noValue;
            record.whole_blood = jsonObj.wholeBlood === true ? yesValue : noValue;
            record.plasma = jsonObj.plasma === true ? yesValue : noValue;
            record.embryonic_tissue = jsonObj.embryonicTissue === true ? yesValue : noValue;
            record.fetal_tissue = jsonObj.fetalTissue === true ? yesValue : noValue;
            record.bone_marrow = jsonObj.boneMarrow === true ? yesValue : noValue;
            record.eyes_cornea = jsonObj.eyesCornea === true ? yesValue : noValue;
            record.gall_bladder = jsonObj.gallBladder === true ? yesValue : noValue;
            record.other_fluids_tissues = jsonObj.otherFluids === true ? yesValue : noValue;
            record.other_fluids_tissues_details = jsonObj.otherDetails;
            return record;
        }

        /**
         * Maps the internal data model to the output model For Tissues and Fluids:Skin and Glandular System
         * @param jsonObj
         * @returns {*}
         * @private
         */
        function _skinSystemToOutput(jsonObj) {
            var record = _createEmptySkinSystemforOutput();
            record.adrenal_gland = jsonObj.adrenalGland === true ? yesValue : noValue;
            record.hair_hooves_feathers = jsonObj.hairHoovesFeathers === true ? yesValue : noValue;
            record.liver = jsonObj.liver === true ? yesValue : noValue;
            record.pancreas = jsonObj.pancreas === true ? yesValue : noValue;
            record.pituitary = jsonObj.pituitary === true ? yesValue : noValue;
            record.skin_hides = jsonObj.skinHides === true ? yesValue : noValue;
            record.thyroid_parathyroid = jsonObj.thyroidParathyroid === true ? yesValue : noValue;
            record.other_skin_glandular = jsonObj.otherSkin === true ? yesValue : noValue;
            record.other_skin_glandular_details = jsonObj.otherDetails;
            return record;
        }

        function _createEmptyTissuesSystemRecord() {

            return ({"id": "", "systemType": "", detailsConcat: "", system: {}, otherDetails: ""});
        }

        /**
         * Creates the internal model for the Dossier tissues and fluids
         * @param json
         * @private
         */
        function _getTissuesFluidsModel(json) {
            //var item = _createEmptyTissuesSystemRecord();
            var result = [];
            var index = 1;
            if (angular.isUndefined(json)) return result;
            //done alpha
            if (json.cardio_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getCardioSystemValue();
                record.system = _getCardioModel(json.cardio_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }
            if (json.digestive_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getDigestiveSystemValue();
                record.system = _getDigestiveModel(json.digestive_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }
            if (json.immune_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getImmuneSystemValue();
                record.system = _getImmuneModel(json.immune_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }

            if (json.musculo_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getMuscleSystemValue();
                record.system = _getMuscleSystemModel(json.musculo_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }
            if (json.nervous_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getNervousSystemValue();
                record.system = _getNervousModel(json.nervous_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }
            if (json.other_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getOtherTissuesSystemValue();
                record.system = _getOtherSystemModel(json.other_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);

            }
            if (json.reproductive_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getReproductiveSystemValue();
                record.system = _getReproductiveModel(json.reproductive_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }
            if (json.skin_system) {
                var record = _createEmptyTissuesSystemRecord();
                record.id = index;
                index++;
                record.systemType = DossierLists.getSkinSystemValue();
                record.system = _getSkinModel(json.skin_system);
                record.otherDetails = record.system.otherDetails;
                record.detailsConcat = _getConcatTissues(record.system);
                result.push(record);
            }
            return result;
        }

        function _getCardioModel(json) {
            var model = _createEmptyCardioSystemModel();
            model.heartPericardium = json.heart_pericardium === yesValue;
            model.lung = json.lung === yesValue;
            model.nasalFluid = json.nasal_fluid === yesValue;
            model.trachea = json.trachea === yesValue;
            model.otherCardio = json.other_cardio_respiratory === yesValue;
            model.otherDetails = json.other_cardio_respiratory_details;
            return model;
        }

        function _getNervousModel(json) {
            var model = _createEmptyNervousSystemModel();
            model.brain = json.brain === yesValue;
            model.brainStem = json.brain_stem === yesValue;
            model.cerebellum = json.cerebellum === yesValue;
            model.ceroFluid = json.cerebrospinal_fluid === yesValue;
            model.dorsalRoot = json.dorsal_root_ganglia === yesValue;
            model.duraMater = json.dura_mater === yesValue;
            model.hypothalamus = json.hypothalamus === yesValue;
            model.retina = json.retina_optic === yesValue;
            model.spinalCord = json.spinal_cord === yesValue;
            model.trigeminal = json.trigerminal_ganglia === yesValue;
            model.otherNervous = json.other_nervous === yesValue;
            model.otherDetails = json.other_nervous_details;
            return model;
        }

        function _getReproductiveModel(json) {
            var model = _createEmptyReproductiveSystemModel();
            model.milkProducts = json.milk_products === yesValue;
            model.kidney = json.kidney === yesValue;
            model.colostrum = json.colostrum === yesValue;
            model.mammaryGlands = json.mammary_glands === yesValue;
            model.ovaries = json.ovaries === yesValue;
            model.placenta = json.placenta === yesValue;
            model.placentalFluid = json.placental_fluid === yesValue;
            model.semen = json.semen === yesValue;
            model.testes = json.testes === yesValue;
            model.urine = json.urine === yesValue;
            model.otherReproductive = json.other_reproductive === yesValue;
            model.otherDetails = json.other_reproductive_details;
            return model;
        }

        function _getSkinModel(json) {
            var model = _createEmptySkinSystemModel();
            model.adrenalGland = json.adrenal_gland === yesValue;
            model.hairHoovesFeathers = json.hair_hooves_feathers === yesValue;
            model.liver = json.liver === yesValue;
            model.pancreas = json.pancreas === yesValue;
            model.pituitary = json.pituitary === yesValue;
            model.skinHides = json.skin_hides === yesValue;
            model.thyroidParathyroid = json.thyroid_parathyroid === yesValue;
            model.otherSkin = json.other_skin_glandular === yesValue;
            model.otherDetails = json.other_skin_glandular_details;
            return model;
        }


        function _getImmuneModel(json) {
            var model = _createEmptyImmuneSystemModel();
            model.lymphNodes = json.lymph_nodes === yesValue;
            model.spleen = json.spleen === yesValue;
            model.thymus = json.thymus === yesValue;
            model.tonsils = json.tonsils === yesValue;
            model.otherImmune = json.other_immune === yesValue;
            model.otherDetails = json.other_immune_details;
            return model;
        }

        function _getDigestiveModel(json) {
            var model = _createEmptyDigestiveSystemModel();
            model.appendix = json.appendix === yesValue;
            model.bile = json.bile === yesValue;
            model.distalIleum = json.distal_ileum === yesValue;
            model.largeIntestine = json.large_intestine === yesValue;
            model.salivaSalivary = json.saliva_salivary === yesValue;
            model.smallIntestine = json.small_intestine === yesValue;
            model.stomach = json.stomach === yesValue;
            model.otherDigestive = json.other_digestive === yesValue;
            model.otherDetails = json.other_digestive_details;
            return model;
        }

        function _getOtherSystemModel(json) {
            var model = _createEmptyOtherSystemModel();
            model.adipose = json.adipose === yesValue;
            model.ascites = json.ascites === yesValue;
            model.antlerVelvet = json.antler_velvet === yesValue;
            model.serum = json.serum === yesValue;
            model.wholeBlood = json.whole_blood === yesValue;
            model.plasma = json.plasma === yesValue;
            model.embryonicTissue = json.embryonic_tissue === yesValue;
            model.fetalTissue = json.fetal_tissue === yesValue;
            model.boneMarrow = json.bone_marrow === yesValue;
            model.eyesCornea = json.eyes_cornea === yesValue;
            model.gallBladder = json.gall_bladder === yesValue;
            model.otherFluids = json.other_fluids_tissues === yesValue;
            model.otherDetails = json.other_fluids_tissues_details;
            return model;
        }

        function _getMuscleSystemModel(json) {
            var model = _createEmptyMuscleSystemModel();
            model.abdomen = json.abdomen === yesValue;
            model.skull = json.skull === yesValue;
            model.bones = json.bones === yesValue;
            model.collagen = json.collagen === yesValue;
            model.tendonsLigaments = json.tendons_ligaments === yesValue;
            model.vertebralColumn = json.vertebral_column === yesValue;
            model.muscle = json.muscle === yesValue;
            model.otherMuscle = json.other_musculo_skeletal === yesValue;
            model.otherDetails = json.other_musculo_skeletal_details;
            return model;
        }


        function _getConcatTissues(json) {
            var labelLookup = DossierLists.getTissuesFluidsLabels();
            var result = "";
            var markupBreak = "<br>";
            if (angular.isUndefined(json)) return result;
            var keys = Object.keys(json);
            for (var i = 0; i < keys.length; i++) {
                var val = json[keys[i]];
                if (val) {
                    var alias = labelLookup[keys[i]];
                    if (alias) { //this will filter out the other
                        var currentLang = $translate.proposedLanguage() || $translate.use();
                        var translateText = $translate.instant(alias, "", '', currentLang);
                        result = result + translateText + markupBreak;
                    }
                }
            }
            if (keys.length > 0) {
                result = result.substring(0, (result.length - markupBreak.length))
            }
            return result;
        }

    }
})
();
