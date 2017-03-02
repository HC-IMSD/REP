/**
 * Created by dkilty on 28/02/2017.
 */


//addTissuesRec


var UiUtil = require('../../util/util-ui.js');

var TissuesFluids = function () {
    var uiUtil = new UiUtil();
    var addTissuesButtonNameString = "addTissuesRec";
    var deleteTissuesButtonNameString = "";
    var tissuesListTag = "cmp-tissues-fluids-list";

    this.systemTypes = {
        IMMUNE: 10,
        SKIN: 20,
        REPRODUCTIVE: 30,
        OTHER: 40,
        CARDIO: 50,
        DIGESTIVE: 60,
        NERVOUS: 70,
        MUSCULO: 80
    };

    this.tissueTypes = {
        LYMPH_NODES: 10,
        SPLEEN: 20,
        THYMUS: 30,
        TONSILS: 40,
        OTHER_DETAILS: 50,
        HEART: 60,
        LUNG: 70,
        NASAL_FLUID: 80,
        TRACHEA: 90,
        OTHER_CARDIO: 100,
        APPENDIX: 110,
        BILE: 120,
        DISTAL_ILEUM: 130,
        LARGE_INTESTINE: 140,
        SALIVARY: 150,
        SMALL_INTESTINE: 160,
        STOMACH: 170,
        OTHER_DIGESTIVE: 180,
        ABDOMEN: 190,
        SKULL: 200,
        BONES: 210,
        COLLAGEN: 220,
        TENDONS_LIGAMENTS: 230,
        VERTEBRAL_COLUMN: 240,
        MUSCLE: 250,
        OTHER_MUSCLE: 260,
        BRAIN: 270,
        BRAIN_STEM: 280,
        CEREBELLUM: 290,
        CERO_FLUID: 300,
        DORSAL_ROOT: 310,
        DURA_MATER: 320,
        HYPOTHALMUS: 330,
        RETINAL: 340,
        SPINAL_CORD: 350,
        TRIGEMINAL: 360,
        OTHER_NERVOUS: 370,
        ADIPOSE: 380,
        ASCITES: 390,
        ANTLER_VELVET: 400,
        SERUM: 410,
        WHOLE_BLOOD: 420,
        PLASMA: 430,
        EMBRYONIC_TISSUE: 440,
        FETAL_TISSUE: 450,
        BONE_MARROW: 460,
        EYES_CORNEA: 470,
        GALL_BLADDER: 480,
        OTHER_FLUIDS: 490,
        MILK_PRODUCTS: 500,
        KIDNEY: 510,
        COLOSTRUM: 520,
        MAMMARY_GLANDS: 530,
        OVARIES: 540,
        PLACENTA: 543,
        PLACENTAL_FLUID: 547,
        SEMEN: 550,
        TESTES: 560,
        URINE: 570,
        OTHER_REPROD: 580,
        ADRENAL_GLAND: 590,
        HAIR_HOOVES: 600,
        LIVER: 610,
        PANCREAS: 620,
        PITUITARY: 630,
        SKIN_HIDES: 640,
        THYROID: 650,
        OTHER_SKIN: 660

    };


    //model tags

    var _systemModelString = "tissuesSrcCtrl.model.systemType";

    //immuneModel Tage
    var _immune_lymphNodes_modelString = "sysCtrl.model.lymphNodes";
    var _immune_spleen_modelString = "sysCtrl.model.spleen";
    var _immune_thymus_modelString = "sysCtrl.model.thymus";
    var _immune_tonsils_modelString = "sysCtrl.model.tonsils";
    var _immune_otherImmune_modelString = "sysCtrl.model.otherImmune";
    var _cardio_heart_modelString = "sysCtrl.model.heartPericardium";
    var _cardio_lung_modelString = "sysCtrl.model.lung";
    var _cardio_nasalFluid_modelString = "sysCtrl.model.nasalFluid";
    var _cardio_trachea_modelString = "sysCtrl.model.trachea";
    var _cardio_otherCardio_modelString = "sysCtrl.model.otherCardio";

    var _digestive_appendix_modelString = "sysCtrl.model.appendix";
    var _digestive_bile_modelString = "sysCtrl.model.bile";
    var _digestive_distalIleum_modelString = "sysCtrl.model.distalIleum";
    var _digestive_largeIntestine_modelString = "sysCtrl.model.largeIntestine";
    var _digestive_salivaSalivary_modelString = "sysCtrl.model.salivaSalivary";
    var _digestive_smallIntestine_modelString = "sysCtrl.model.smallIntestine";
    var _digestive_stomach_modelString = "sysCtrl.model.stomach";
    var _digestive_otherDigestive_modelString = "sysCtrl.model.otherDigestive";

    var _muscle_abdomen_modelString = "sysCtrl.model.abdomen";
    var _muscle_skull_modelString = "sysCtrl.model.skull";
    var _muscle_bones_modelString = "sysCtrl.model.bones";
    var _muscle_collagen_modelString = "sysCtrl.model.collagen";
    var _muscle_tendonsLigaments_modelString = "sysCtrl.model.tendonsLigaments";
    var _muscle_vertebralColumn_modelString = "sysCtrl.model.vertebralColumn";
    var _muscle_muscle_modelString = "sysCtrl.model.muscle";
    var _muscle_otherMuscle_modelString = "sysCtrl.model.otherMuscle";

    var _nervous_brain_modelString = "sysCtrl.model.brain";
    var _nervous_brainStem_modelString = "sysCtrl.model.brainStem";
    var _nervous_cerebellum_modelString = "sysCtrl.model.cerebellum";
    var _nervous_ceroFluid_modelString = "sysCtrl.model.ceroFluid";
    var _nervous_dorsalRoot_modelString = "sysCtrl.model.dorsalRoot";
    var _nervous_duraMater_modelString = "sysCtrl.model.duraMater";
    var _nervous_hypothalamus_modelString = "sysCtrl.model.hypothalamus";
    var _nervous_retina_modelString = "sysCtrl.model.retina";
    var _nervous_spinalCord_modelString = "sysCtrl.model.spinalCord";
    var _nervous_trigeminal_modelString = "sysCtrl.model.trigeminal";
    var _nervous_otherNervous_modelString = "sysCtrl.model.otherNervous";

    var _other_adipose_modelString = "sysCtrl.model.adipose";
    var _other_ascites_modelString = "sysCtrl.model.ascites";
    var _other_antlerVelvet_modelString = "sysCtrl.model.antlerVelvet";
    var _other_serum_modelString = "sysCtrl.model.serum";
    var _other_wholeBlood_modelString = "sysCtrl.model.wholeBlood";
    var _other_plasma_modelString = "sysCtrl.model.plasma";
    var _other_embryonicTissue_modelString = "sysCtrl.model.embryonicTissue";
    var _other_fetalTissue_modelString = "sysCtrl.model.fetalTissue";
    var _other_boneMarrow_modelString = "sysCtrl.model.boneMarrow";
    var _other_eyesCornea_modelString = "sysCtrl.model.eyesCornea";
    var _other_gallBladder_modelString = "sysCtrl.model.gallBladder";
    var _other_otherFluids_modelString = "sysCtrl.model.otherFluids";

    var _reprod_milkProducts_modelString = "sysCtrl.model.milkProducts";
    var _reprod_kidney_modelString = "sysCtrl.model.kidney";
    var _reprod_colostrum_modelString = "sysCtrl.model.colostrum";
    var _reprod_mammaryGlands_modelString = "sysCtrl.model.mammaryGlands";
    var _reprod_ovaries_modelString = "sysCtrl.model.ovaries";
    var _reprod_placenta_modelString = "sysCtrl.model.placenta";
    var _reprod_placentalFluid_modelString = "sysCtrl.model.placentalFluid";
    var _reprod_semen_modelString = "sysCtrl.model.semen";
    var _reprod_testes_modelString = "sysCtrl.model.testes";
    var _reprod_urine_modelString = "sysCtrl.model.urine";
    var _reprod_otherReproductive_modelString = "sysCtrl.model.otherReproductive";

    var _skin_adrenalGland_modelString = "sysCtrl.model.adrenalGland";
    var _skin_hairHoovesFeathers_modelString = "sysCtrl.model.hairHoovesFeathers";
    var _skin_liver_modelString = "sysCtrl.model.liver";
    var _skin_pancreas_modelString = "sysCtrl.model.pancreas";
    var _skin_pituitary_modelString = "sysCtrl.model.pituitary";
    var _skin_skinHides_modelString = "sysCtrl.model.skinHides";
    var _skin_thyroidParathyroid_modelString = "sysCtrl.model.thyroidParathyroid";
    var _skin_otherSkin_modelString = "sysCtrl.model.otherSkin";


    var _other_details_modelString = "sysCtrl.model.otherDetails"; //this works for all other details text boxes


    this.addTissuesFluids = function (parent) {
        parent.element(by.name(addTissuesButtonNameString)).sendKeys(protractor.Key.ENTER);
    };

    this.setSystemSelectValue = function (parent, value, lang) {
        var sysString = this._getSystemString(value, lang);
        browser.selectOption(By.model(_systemModelString), sysString, parent);
    };

    this.setSystemDetails = function (parent, controlId) {
        //  tissueTypes
        this.getSystemDetailsControl(parent, controlId).click();
    };


    /**
     * Returns the display string for the system select box
     * @param value
     * @param lang
     * @returns {string}
     * @private
     */
    this._getSystemString = function (value, lang) {
        var textVal = "";
        switch (value) {

            case this.systemTypes.IMMUNE:
                if (lang === 'fr') {
                    textVal = 'Immune'
                } else {
                    textVal = 'Immune';
                }
                break;

            case this.systemTypes.CARDIO:
                if (lang === 'fr') {
                    textVal = "Cardio-Respiratory";
                } else {
                    textVal = "Cardio-Respiratory";
                }

                break;

            case this.systemTypes.DIGESTIVE:
                if (lang === 'fr') {
                    textVal = 'Digestive';
                } else {
                    textVal = 'Digestive';
                }
                break;

            case this.systemTypes.NERVOUS:
                if (lang === 'fr') {
                    textVal = 'Nervous System';
                } else {
                    textVal = 'Nervous System';
                }
                break;


            case this.systemTypes.OTHER:
                if (lang === 'fr') {
                    textVal = 'Other Tissues or Fluids';
                } else {
                    textVal = 'Other Tissues or Fluids';
                }
                break;


            case this.systemTypes.MUSCULO:
                if (lang === 'fr') {
                    textVal = 'Musculo-Skeletal';
                } else {
                    textVal = 'Musculo-Skeletal';
                }
                break;

            case this.systemTypes.REPRODUCTIVE:
                if (lang === 'fr') {
                    textVal='Reproductive';
                }else{
                    textVal='Reproductive';
                }
                break;


            case this.systemTypes.SKIN:
                if (lang === 'fr') {
                    textVal='Skin and Glandular';
                }else{
                    textVal='Skin and Glandular';
                }
                break;
        }
        return textVal;
    };

    this.getSystemDetailsControl = function (parent, type) {

        var modelString = null;
        switch (type) {
            //immune system
            case this.tissueTypes.LYMPH_NODES:
                modelString = _immune_lymphNodes_modelString;
                break;

            case this.tissueTypes.SPLEEN:
                modelString = _immune_spleen_modelString;
                break;
            case this.tissueTypes.THYMUS:
                modelString = _immune_thymus_modelString;
                break;
            case this.tissueTypes.TONSILS:
                modelString = _immune_tonsils_modelString;
                break;
            case this.tissueTypes.OTHER_DETAILS:
                modelString = _immune_otherImmune_modelString;
                break;
            //immune system end
            //cardio system start
            case this.tissueTypes.HEART:
                modelString = _cardio_heart_modelString;
                break;

            case this.tissueTypes.LUNG:
                modelString = _cardio_lung_modelString;
                break;

            case this.tissueTypes.NASAL_FLUID:
                modelString = _cardio_nasalFluid_modelString;
                break;

            case this.tissueTypes.TRACHEA:
                modelString = _cardio_trachea_modelString;
                break;

            case this.tissueTypes.OTHER_CARDIO:
                modelString = _cardio_otherCardio_modelString;
                break;
            //digestive start

            case this.tissueTypes.APPENDIX:
                modelString = _digestive_appendix_modelString;
                break;

            case this.tissueTypes.BILE:
                modelString = _digestive_bile_modelString;
                break;
            case this.tissueTypes.DISTAL_ILEUM:
                modelString = _digestive_distalIleum_modelString;
                break;

            case this.tissueTypes.LARGE_INTESTINE:
                modelString = _digestive_largeIntestine_modelString;
                break;

            case this.tissueTypes.SALIVARY:
                modelString = _digestive_salivaSalivary_modelString;
                break;

            case this.tissueTypes.SMALL_INTESTINE:
                modelString = _digestive_smallIntestine_modelString;
                break;

            case this.tissueTypes.STOMACH:
                modelString = _digestive_stomach_modelString;
                break;

            case this.tissueTypes.OTHER_DIGESTIVE:
                modelString = _digestive_otherDigestive_modelString;
                break;

            //muscle start

            case this.tissueTypes.ABDOMEN:
                modelString = _muscle_abdomen_modelString;
                break;

            case this.tissueTypes.SKULL:
                modelString = _muscle_abdomen_modelString;
                break;
            case this.tissueTypes.BONES:
                modelString = _muscle_bones_modelString;
                break;
            case this.tissueTypes.COLLAGEN:
                modelString = _muscle_collagen_modelString;
                break;
            case this.tissueTypes.TENDONS_LIGAMENTS:
                modelString = _muscle_tendonsLigaments_modelString;
                break;

            case this.tissueTypes.VERTEBRAL_COLUMN:
                modelString = _muscle_vertebralColumn_modelString;
                break;
            case this.tissueTypes.MUSCLE:
                modelString = _muscle_muscle_modelString;
                break;

            case this.tissueTypes.OTHER_MUSCLE:
                modelString = _muscle_otherMuscle_modelString;
                break;

            case this.tissueTypes.BRAIN:
                modelString = _nervous_brain_modelString;
                break;

            case this.tissueTypes.BRAIN_STEM:
                modelString = _nervous_brainStem_modelString;
                break;

            case this.tissueTypes.CEREBELLUM:
                modelString = _nervous_cerebellum_modelString;
                break;
            case this.tissueTypes.CERO_FLUID:
                modelString = _nervous_ceroFluid_modelString;
                break;

            case this.tissueTypes.DORSAL_ROOT:
                modelString = _nervous_dorsalRoot_modelString;
                break;
            case this.tissueTypes.DURA_MATER:
                modelString = _nervous_duraMater_modelString;
                break;

            case this.tissueTypes.HYPOTHALMUS:
                modelString = _nervous_hypothalamus_modelString;
                break;

            case this.tissueTypes.RETINAL:
                modelString = _nervous_retina_modelString;
                break;

            case this.tissueTypes.SPINAL_CORD:
                modelString = _nervous_spinalCord_modelString;
                break;
            case this.tissueTypes.TRIGEMINAL:
                modelString = _nervous_trigeminal_modelString;
                break;
            case this.tissueTypes.OTHER_NERVOUS:
                modelString = _nervous_otherNervous_modelString;
                break;

            //other tissues
            case this.tissueTypes.ADIPOSE:
                modelString = _other_adipose_modelString;
                break;
            case this.tissueTypes.ASCITES:
                modelString = _other_ascites_modelString;
                break;

            case this.tissueTypes.ANTLER_VELVET:
                modelString = _other_antlerVelvet_modelString;
                break;
            case this.tissueTypes.SERUM:
                modelString = _other_serum_modelString;
                break;

            case this.tissueTypes.WHOLE_BLOOD:
                modelString = _other_wholeBlood_modelString;
                break;
            case this.tissueTypes.PLASMA:
                modelString = _other_plasma_modelString;
                break;
            case this.tissueTypes.EMBRYONIC_TISSUE:
                modelString = _other_embryonicTissue_modelString;
                break;
            case this.tissueTypes.FETAL_TISSUE:
                modelString = _other_fetalTissue_modelString;
                break;

            case this.tissueTypes.BONE_MARROW:
                modelString = _other_boneMarrow_modelString;
                break;

            case this.tissueTypes.EYES_CORNEA:
                modelString = _other_eyesCornea_modelString;
                break;

            case this.tissueTypes.GALL_BLADDER:
                modelString = _other_gallBladder_modelString;
                break;

            case this.tissueTypes.OTHER_FLUIDS:
                modelString = _other_otherFluids_modelString;
                break;

            case this.tissueTypes.MILK_PRODUCTS:
                modelString = _reprod_milkProducts_modelString;
                break;

            case this.tissueTypes.KIDNEY:
                modelString = _reprod_kidney_modelString;
                break;

            case this.tissueTypes.COLOSTRUM:
                modelString = _reprod_colostrum_modelString;
                break;

            case this.tissueTypes.COLOSTRUM:
                modelString = _reprod_mammaryGlands_modelString;
                break;

            case this.tissueTypes.MAMMARY_GLANDS:
                modelString = _reprod_mammaryGlands_modelString;
                break;

            case this.tissueTypes.OVARIES:
                modelString = _reprod_ovaries_modelString;
                break;

            case this.tissueTypes.PLACENTA:
                modelString = _reprod_placenta_modelString;
                break;

            case this.tissueTypes.PLACENTAL_FLUID:
                modelString = _reprod_placentalFluid_modelString;
                break;

            case this.tissueTypes.SEMEN:
                modelString = _reprod_semen_modelString;
                break;

            case this.tissueTypes.TESTES:
                modelString = _reprod_testes_modelString;
                break;

            case this.tissueTypes.URINE:
                modelString = _reprod_urine_modelString;
                break;

            case this.tissueTypes.OTHER_REPROD:
                modelString = _reprod_otherReproductive_modelString;
                break;

            //skin start
            case this.tissueTypes.ADRENAL_GLAND:
                modelString = _skin_adrenalGland_modelString;
                break;

            case this.tissueTypes.HAIR_HOOVES:
                modelString = _skin_hairHoovesFeathers_modelString;
                break;

            case this.tissueTypes.LIVER:
                modelString = _skin_liver_modelString;
                break;

            case this.tissueTypes.PANCREAS:
                modelString = _skin_pancreas_modelString;
                break;
            case this.tissueTypes.PITUITARY:
                modelString = _skin_pituitary_modelString;
                break;

            case this.tissueTypes.SKIN_HIDES:
                modelString = _skin_skinHides_modelString;
                break;

            case this.tissueTypes.THYROID:
                modelString = _skin_thyroidParathyroid_modelString;
                break;

            case this.tissueTypes.OTHER_SKIN:
                modelString = _skin_otherSkin_modelString;
                break;
        }
        return parent.element(by.model(modelString));
    };

    this.setOtherDetailsValue = function (parent, value) {
        parent.element(by.model(_other_details_modelString)).sendKeys(value);

    };

    /**
     * This will get the committed records
     * @param parent
     */
    this.getRows = function (parent) {
        var expandingTable = uiUtil.getExpandingTable(tissuesListTag, parent);
        return uiUtil.getExpandingTableRows(expandingTable);
    };

    this.clickRow = function (parent, index) {
        uiUtil.clickRow(this.getRows(parent), index);
    };

    this.isRecordVisible = function (parent, recordIndex) {
        return uiUtil.getRecordVisibility(this.getRows(parent), recordIndex);
    };

    this.getRecordVisibility = function (parent, index) {
        return uiUtil.getRecordVisibility(this.getRows(parent), index);
    };
    this.getNumberRecords = function (parent) {
        return (uiUtil.getNumberRows(this.getRows(parent)) / 2)
    };
    this.getRecord = function (parent, recordRow) {
        return this.getRows(parent).get(recordRow * 2 + 1);
    };

};

module.exports = TissuesFluids;


