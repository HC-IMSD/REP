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


    this.tissueTypes = {
        LYMPH_NODES: 10,
        SPLEEN: 20,
        THYMUS: 30,
        TONSILS: 40,
        OTHER_DETAILS: 50,
        HEART:60,
        LUNG:70,
        NASAL_FLUID:80,

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


    var _other_details_modelString = "sysCtrl.model.otherDetails"; //this works for all other detaisls


    this.addTissuesFluids = function (parent) {
        parent.element(by.name(addTissuesButtonNameString)).sendKeys(protractor.Key.ENTER);
    };

    this.setSystemSelectValue = function (parent, value) {
        browser.selectOption(By.model(_systemModelString), value, parent);
    };

    this.setSystemDetails = function (parent, controlId) {
        //  tissueTypes
        this.getSystemDetailsControl(parent, controlId).click();
    };

    this.getSystemDetailsControl = function (parent, type) {

        var modelString = null;
        switch (type) {
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
                modelString =_immune_otherImmune_modelString;
                break;
        }
        return parent.element(by.model(modelString));
    };

    this.setOtherDetailsValue=function(parent,value){
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


