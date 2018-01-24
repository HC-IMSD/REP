/**
 * Created by dkilty on 9/18/2016.
 */
/**
 * Created by dkilty on 6/4/2016.
 */


(function () {
    'use strict';

    angular
        .module('dossierDataLists', []);

})();

/**
 * getCountryAndProvinces services
 * Returns Canada or US condes, canada provinces, us states
 */
(function () {
    'use strict';

    angular
        .module('dossierDataLists')
        .factory('DossierLists', getService);

    /* @ngInject */
    function getService() {
        var OTHER = "OTHER";
        var YES = 'Y';
        var vm = this;
        vm.roaList = [];
        vm.nanoList = [];
        vm.dosageFormList = [];
        vm.activeList = [];
        vm.unitsList = [];
        //TODO create getters/setters? safer as is
        var service = {
            setActiveList: _setActiveArray,
            getActiveList: _getActiveArray,
            createRoaList: _createRoaArray,
            createUnitsList: _createUnitsArray,
            createNanomaterialList: _createNanoArray,
            createDosageFormList: _createDosageFormArray,
            getDosageFormList: getDosageFormsArray,
            getDrugUseList:_getDrugUseArray,
            getScheduleList:_getScheduleArray,
            getPerList:_getPerArray,
            getStrengthList:_getStrengthArray,
            getUnitsList:_getUnitsArray,
            getDosageOther: getDoseOtherValue,
            getNanoMaterials: getNanoMaterialArray,
            getRoa: getRoaArray,
            getOtherValue: getOtherValue, //TODO make a constant instead
            getUnknownValue: getUnknownValue, //TODO make a constant instead
            getYesNoList: yesNoArray,
            getYesNoUnknownList: yesNoUnknownArray,
            getAnimalSources: animalSourcesArray,
            getTissuesSystem: tissuesSystemArray,
            getNervousSystem: nervousSystemArray,
            getDigestiveSystem: digestiveSystemArray,
            getImmuneSystem: immuneSystemArray,
            getSkinSystem: skinSystemArray,
            getReprodSystem: reprodSystemArray,
            getOtherSystem: otherSystemArray,
            getMuscleSystem: muscleSystemArray,
            getCardioSystem: cardioSystemArray,
            getDigestiveSystemValue: _getDigestiveSystemValue,
            getNervousSystemValue: _getNervousSystemValue,
            getReproductiveSystemValue: _getReproductiveSystemValue,
            getCardioSystemValue: _getCardioSystemValue,
            getImmuneSystemValue: _getImmuneSystemValue,
            getSkinSystemValue: _getSkinSystemValue,
            getMuscleSystemValue: _getMuscleSystemValue,
            getOtherTissuesSystemValue: _getOtherTissuesSystemValue,
            getYesValue: getYesValue,
            getTissuesFluidsLabels: _getTissuesFluidsLabels,
            getRoaPrefix: _getRoaListPrefix,
            getDosageFormPrefix: _getDosagePrefix,
            getUnitsPrefix: _getUnitsPrefix,
            getNanoPrefix: _getNanoPrefix

        };
        return service;

        function _setActiveArray(data) {
            vm.activeList = data;
        }

        function _getActiveArray() {
            return (vm.activeList);

        }

        ////////////////
        function getDoseOtherValue() {
            return OTHER;
        }

        function getYesValue() {
            return YES;
        }

        function getUnknownValue() {
            return "UNLKNOWN";
        }

        function getOtherValue() {
            return getDoseOtherValue();
        }

        function _createNanoArray(translateJson) {

            vm.nanoList = translateJson
        }

        function _createDosageFormArray(translateJson) {
            vm.dosageFormList = (translateJson);
        }

        function _createRoaArray(translateJson) {
            vm.roaList = (translateJson);


        }

        function _createUnitsArray(translateJson) {
            vm.unitsList = (translateJson);

        }
        function _getUnitsArray() {
           return vm.unitsList;
        }


        function _getRoaListPrefix() {
            return "ROA_";
        }

        function _getDosagePrefix() {
            return "DOSFORM_";
        }
        function _getUnitsPrefix() {
            return "UNITS_";
        }
        function _getNanoPrefix(){
            return "NANOMAT_"
        }

        function _getDrugUseArray(){

            return(
                [
                    {"id":"HUMAN","en":"Human","fr":"fr_Human"},
                    {"id":"RADIO","en":"Radiopharmaceutical","fr":"fr_Radiopharmaceutical"},
                    {"id":"DISINFECT","en":"Disinfectant","fr":"fr_Disinfectant"},
                    {"id":"VET","en":"Veterinary","fr":"fr_Veterinary"}

                ]
            )
        }

        function _getScheduleArray(){

            return(
                [
                    {"id":"A","en":"Acute Alcholisum","fr":"fr_Acute Alcholisum"},
                    {"id":"B","en":"Acute anxiety state","fr":"fr_Acute anxiety state"},
                    {"id":"C","en":"Acute infectious respiratory syndromes","fr":"fr_Acute infectious respiratory syndromes"},
                    {"id":"D","en":"Acute inflammatory and debilitating arthiritis","fr":"fr_Acute inflammatory and debilitating arthiritis"},
                    {"id":"E","en":"Acute psychotic conditions","fr":"fr_Acute psychotic conditions"},
                    {"id":"F","en":"Addiction (except nicotine addiction)","fr":"fr_Addiction (except nicotine addiction)"},
                    {"id":"G","en":"Ateriosclerosis","fr":"fr_Ateriosclerosis"},
                    {"id":"H","en":"Appendicitis","fr":"fr_Appendicitis"},
                    {"id":"I","en":"Asthma","fr":"fr_Asthma"},
                    {"id":"J","en":"Cancer","fr":"fr_Cancer"},
                    {"id":"K","en":"Congestive heart failure","fr":"fr_Congestive heart failure"},
                    {"id":"L","en":"Convulsions","fr":"fr_Convulsions"},
                    {"id":"M","en":"Dementia","fr":"fr_Dementia"},
                    {"id":"N","en":"Depresssion","fr":"fr_Depresssion"},
                    {"id":"O","en":"Diabetes","fr":"fr_Diabetes"},
                    {"id":"P","en":"Gangrene","fr":"fr_Gangrene"},
                    {"id":"Q","en":"Glaucoma","fr":"fr_Glaucoma"},
                    {"id":"R","en":"Haematologic bleeding disorders","fr":"fr_Haematologic bleeding disorders"},
                    {"id":"S","en":"Hepatitis","fr":"fr_Hepatitis"},
                    {"id":"T","en":"Hypertension","fr":"fr_Hypertension"},
                    {"id":"U","en":"Nausea and vomiting of pregnancy","fr":"fr_Nausea and vomiting of pregnancy"},
                    {"id":"V","en":"Obesity","fr":"fr_Obesity"},
                    {"id":"W","en":"Rheumatic fever","fr":"fr_Rheumatic fever"},
                    {"id":"X","en":"Septicemia","fr":"fr_Septicemia"},
                    {"id":"Y","en":"Sexually transmitted disease","fr":"fr_Sexually transmitted disease"},
                    {"id":"Z","en":"Strangulated hernia","fr":"fr_Strangulated hernia"},
                    {"id":"AA","en":"Thrombotic and Embolic Disorder","fr":"fr_Thrombotic and Embolic Disorder"},
                    {"id":"BB","en":"Thyroid disease","fr":"fr_Thyroid disease"},
                    {"id":"CC","en":"Ulcer of gastro-intestinal tract","fr":"fr_Ulcer of gastro-intestinal tract"}

                ]
            )
        }

        function _getPerArray(){

            return(
                [
                    {"id":"UP","en":"Unit of Presentation","fr":"fr_Unit of Presentation"},
                    {"id":"UM","en":"Unit of Measure","fr":"fr_Unit of Measure"}

                ]
            )
        }

        function _getStrengthArray(){

            return(
                [
                    {"id":"EQ","en":"Equals","fr":"fr_Equals"},
                    {"id":"NGT","en":"Not greater than","fr":"fr_Not_greater_than"},
                    {"id":"NLT","en":"Not less than","fr":"fr_Not_less_than"},
                    {"id":"RA","en":"Range","fr":"fr_Range"}

                ]
            )
        }

        /**
         * gets the keys for a list If there is a prefix,add it
         * @param translateJson
         * @param prefix
         * @returns {Array}
         * @private
         */
        function _getKeys(translateJson, prefix) {
            var result = [];
            if (!prefix) {
                prefix = "";
            }
            var keys = Object.keys(translateJson);
            for (var i = 0; i < keys.length; i++) {
                var appended = prefix + keys[i];
                result.push(appended)
            }
            return result;
        }

        function getDosageFormsArray() {
            return vm.dosageFormList;
        }

        function getNanoMaterialArray() {
            return (vm.nanoList);
        }

        function getRoaArray() {
            return (vm.roaList);
        }

        function yesNoArray() {

            return ([
                "Y",
                "N"
            ]);
        }

        function yesNoUnknownArray() {

            return ([
                "Y",
                "N",
                "UNKNOWN"
            ]);
        }

        function animalSourcesArray() {

            return ([
                "NONHUMANPRIMATE_TYPE",
                "AQUATIC_TYPE",
                "AVIAN_TYPE",
                "BOVINE_TYPE",
                "CANINE_TYPE",
                "CAPRINE_TYPE",
                "CERVIDAE_TYPE",
                "EQUINE_TYPE",
                "FELINE_TYPE",
                "OVINE_TYPE",
                "PORCINE_TYPE",
                "RODENT_TYPE",
                "OTHERANIMAL_TYPE"
            ]);
        }

        /**
         * Tisssues and fluids system types
         * @returns {string[]}
         */
        function tissuesSystemArray() {

            return ([
                _getDigestiveSystemValue(),
                _getNervousSystemValue(),
                _getReproductiveSystemValue(),
                _getCardioSystemValue(),
                _getImmuneSystemValue(),
                _getSkinSystemValue(),
                _getMuscleSystemValue(),
                _getOtherTissuesSystemValue()
            ]);
        }

        function _getDigestiveSystemValue() {

            return "DIGESTIVE_SYSTEM"
        }

        function _getNervousSystemValue() {

            return "NERVOUS_SYSTEM"
        }

        function _getReproductiveSystemValue() {

            return "REPRODUCT_SYSTEM"
        }

        function _getCardioSystemValue() {

            return "CARDIO_SYSTEM"
        }

        function _getImmuneSystemValue() {

            return "IMMUNE_SYSTEM"
        }

        function _getSkinSystemValue() {

            return "SKINGLAND_SYSTEM"
        }

        function _getMuscleSystemValue() {

            return "MUSCULO_SYSTEM"
        }

        function _getOtherTissuesSystemValue() {

            return "OTHERTISSUE_SYSTEM"
        }


        /**
         * Nervous system Tissues or fluids LOV
         * @returns {*[]}
         */
        function nervousSystemArray() {

            return ([
                "BRAIN",
                "BRAINSTEM",
                "CEREBELLUM",
                "CEROFLUID",
                "DORSALROOT",
                "DURAMATER",
                "HYPOTHALAMUS",
                "RETINA",
                "SPINALCORD",
                "TRIGEMINAL",
                "NERVOUS_OTHER"
            ]);
        }

        /**
         * Digestive system Tissues or fluids LOV
         * @returns {*[]}
         */
        function digestiveSystemArray() {

            return ([
                "APPENDIX",
                "BILE",
                "DISTALILEUM",
                "LARGEINTEST",
                "SALIVA",
                "SMALLINTESTINE",
                "STOMACH",
                "DIGESTIVE_OTHER"
            ]);
        }

        /**
         * Reproductive system Tissues or fluids LOV
         * @returns {*[]}
         */
        function reprodSystemArray() {

            return ([
                "MILK",
                "KIDNEY",
                "COLOSTRUM",
                "MAMMARY",
                "OVARIES",
                "PLACENTA",
                "PLACENTAFLUID",
                "SEMEN",
                "TESTES",
                "URINE",
                "REPROD_OTHER"
            ]);
        }

        /**
         * Cardio system Tissues or fluids LOV
         * @returns {*[]}
         */
        function cardioSystemArray() {
            return ([
                "HEART",
                "LUNG",
                "NASALFLUID",
                "TRACHEA",
                "PLACENTALFLUID",
                "CARDIO_OTHER"
            ]);
        }

        /**
         * Immune system Tissues or fluids LOV
         * @returns {*[]}
         */
        function immuneSystemArray() {
            return ([
                "LYMPH",
                "SPLEEN",
                "THYMUS",
                "TONSILS",
                "IMMUNE_OTHER"
            ]);
        }

        /**
         * Skin system Tissues or fluids LOV
         * @returns {*[]}
         */
        function skinSystemArray() {
            return ([
                "ADRENAL",
                "HAIR",
                "LIVER",
                "PANCREAS",
                "PITUARYGLAND",
                "SKINHIDES",
                "THYROID",
                "SKIN_OTHER"
            ]);
        }

        /**
         * Muscle system Tissues or fluids LOV
         * @returns {*[]}
         */
        function muscleSystemArray() {
            return ([
                "ABDOMEN",
                "SKULL",
                "BONES",
                "COLLAGEN",
                "TENDONS",
                "VERTEBRALCOLUMN",
                "MUSCLE_OTHER"
            ]);
        }

        /**
         * Other system Tissues or fluids LOV
         * @returns {*[]}
         */
        function otherSystemArray() {
            return ([
                "ADIPOSE",
                "ASCITES",
                "ANTLERV",
                "SERUM",
                "WHOLEBLOOD",
                "PLASMA",
                "EMBRYONICTISS",
                "FETALTISS",
                "BONEMARROW",
                "EYESCORNEA",
                "GALL",
                "FLUIDS_OTHER"
            ]);
        }

        function _getTissuesFluidsLabels() {
            return ({
                brain: "BRAIN",
                brainStem: "BRAINSTEM",
                cerebellum: "CEREBELLUM",
                ceroFluid: "CEROFLUID",
                dorsalRoot: "DORSALROOT",
                duraMater: "DURAMATER",
                hypothalmus: "HYPOTHALAMUS",
                retina: "RETINA",
                spinalCord: "SPINALCORD",
                trigeminal: "TRIGEMINAL",
                appendix: "APPENDIX",
                bile: "BILE",
                distalIleum: "DISTALILEUM",
                largeIntestine: "LARGEINTEST",
                salivaSalivary: "SALIVA",
                smallIntestine: "SMALLINTESTINE",
                stomach: "STOMACH",
                milkProducts: "MILK",
                kidney: "KIDNEY",
                colostrum: "COLOSTRUM",
                mammaryGlands: "MAMMARY",
                ovaries: "OVARIES",
                placenta: "PLACENTA",
                placentalFluid: "PLACENTAFLUID",
                semen: "SEMEN",
                testes: "TESTES",
                urine: "URINE",
                heartPericardium: "HEART",
                lung: "LUNG",
                nasalFluid: "NASALFLUID",
                trachea: "TRACHEA",
                lymphNodes: "LYMPH",
                spleen: "SPLEEN",
                thymus: "THYMUS",
                tonsils: "TONSILS",
                adrenalGland: "ADRENAL",
                hairHoovesFeathers: "HAIR",
                liver: "LIVER",
                pancreas: "PANCREAS",
                pituitary: "PITUARYGLAND",
                skinHides: "SKINHIDES",
                thyroidParathyroid: "THYROID",
                abdomen: "ABDOMEN",
                skull: "SKULL",
                bones: "BONES",
                collagen: "COLLAGEN",
                tendonsLigaments: "TENDONS",
                vertebralColumn: "VERTEBRALCOLUMN",
                muscle: "MUSCLE",
                adipose: "ADIPOSE",
                ascites: "ASCITES",
                antlerVelvet: "ANTLERV",
                serum: "SERUM",
                wholeBlood: "WHOLEBLOOD",
                plasma: "PLASMA",
                embryonicTissue: "EMBRYONICTISS",
                fetalTissue: "FETALTISS",
                boneMarrow: "BONEMARROW",
                eyesCornea: "EYESCORNEA",
                gallBladder: "GALL"
            });
        }


    }


})();
