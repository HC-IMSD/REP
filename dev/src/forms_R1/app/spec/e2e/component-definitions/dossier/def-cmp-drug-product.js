/**
 * Created by dkilty on 17/02/2017.
 */

var UiUtil = require("../util/util-ui.js");


var DrugProduct = function () {


    var uiUtil = new UiUtil();
    //define field elements
    var use_humanChk = element(by.id("chk-human-0"));
    var use_radiopharmaChk = element(by.id("chk-radio-pharmaceutical-1"));
    var use_vetChk = element(by.id("chk-veterinary-2"));
    var use_disinfectantChk = element(by.id("chk-disinfectant-3"));

    var is_sched_aChk = element(by.model("dos.dossierModel.drugProduct.isScheduleA"));
    //schedA stuff
    var schedA_dinNumber = element(by.model("$ctrl.scheduleAModel.drugIdNumber"));
    var schedA_acuteAlcoholChk = element(by.id("chk-acute-alcohol-0"));
    var schedA_acuteAnxietyChk = element(by.id("chk-acute-anxiety-1"));
    var schedA_acuteInfectChk = element(by.id("chk-acute-infectious-2"));
    var schedA_acuteInflammChk = element(by.id("chk-acute-inflammatory-3"));
    var schedA_acutePsychoticChk = element(by.id("chk-acute-psychotic-4"));
    var schedA_addictionChk = element(by.id("chk-addiction-5"));
    var schedA_ateriosclerosisChk = element(by.id("chk-ateriosclerosis-6"));
    var schedA_appendicitisChk = element(by.id("chk-appendicitis-7"));
    var schedA_asthmaChk = element(by.id("chk-asthma-8"));
    var schedA_cancerChk = element(by.id("chk-cancer-9"));
    var schedA_congestHeartFailChk = element(by.id("chk-congest-heart-fail-10"));
    var schedA_convulsionsChk = element(by.id("chk-convulsions-11"));
    var schedA_dementiaChk = element(by.id("chk-dementia-12"));
    var schedA_depressionChk = element(by.id("chk-depression-13"));
    var schedA_diabetesChk = element(by.id("chk-diabetes-14"));
    var schedA_gangreneChk = element(by.id("chk-gangrene-15"));
    var schedA_glaucomaChk = element(by.id("chk-glaucoma-16"));
    var schedA_haemaBleedChk = element(by.id("chk-haematologic-bleeding-17"));
    var schedA_hepatitisChk = element(by.id("chk-hepatitis-18"));
    var schedA_hypertensionChk = element(by.id("chk-hypertension-19"));
    var schedA_nauseaPregnancyChk = element(by.id("chk-nausea-pregnancy-20"));
    var schedA_obesityChk = element(by.id("chk-obesity-21"));
    var schedA_rheumaticFeverChk = element(by.id("chk-rheumatic-fever-22"));
    var schedA_septicemiaChk = element(by.id("chk-septicemia-23"));
    var schedA_sexTransmitChk = element(by.id("chk-sex-transmit-disease-24"));
    var schedA_strangulatedHerniaChk = element(by.id("chk-strangulated-hernia-25"));
    var schedA_thromboticEmobolicChk = element(by.id("chk-thrombotic-embolic-disorder-26"));
    var schedA_thyroidChk = element(by.id("chk-thyroid-disease-27"));
    var schedA_ulcerChk = element(by.id("chk-ulcer-gastro-28"));
    var schedA_claimsText = element(by.model("$ctrl.scheduleAModel.scheduleAClaimsIndDetails"));

    this.schedATypes = {
        ACUTE_ALCOHOL: 10,
        ACUTE_ANXIETY: 20,
        ACUTE_INFECT: 30,
        ACUTE_INFLAMM: 40,
        ACUTE_PSYCHOTIC: 50,
        ADDICTION: 60,
        ARTERIOSCLEROSIS: 70,
        APPENDICITIS: 80,
        ASTHMA: 90,
        CANCER: 100,
        CONGESTIVE_HEART_FAIL: 110,
        CONVULSIONS: 120,
        DEMENTIA: 130,
        DEPRESSION: 140,
        DIABETES: 150,
        GANGRENE: 160,
        GLAUCOMA: 170,
        HAEMA_BLEED: 180,
        HEPATITIS: 190,
        HYPERTENSION: 200,
        NAUSEA_PREG: 210,
        OBESITY: 220,
        RHEUMATIC_FEVER: 230,
        SEPTICMEMIA: 240,
        SEX_TRANSMIT: 250,
        STRANGULATE_HERNIA: 260,
        THROMBOTIC_EMBOLIC: 270,
        THYROID: 280,
        ULCER: 190
    };


    this.setHumanUse = function () {
        use_humanChk.click()
    };
    this.getHumanUse = function () {
        use_humanChk.getAttribute('value');
    };

    this.setRadioUse = function () {
        use_radiopharmaChk.click()
    };
    this.getRadioUse = function () {
        use_radiopharmaChk.getAttribute('value');
    };

    this.setVetUse = function () {
        use_vetChk.click()
    };
    this.getVetUse = function () {
        use_vetChk.getAttribute('value');
    };

    this.setDisinfectantUse = function () {
        use_disinfectantChk.click()
    };
    this.getDisinfectantUse = function () {
        use_disinfectantChk.getAttribute('value');
    };

    this.setDIN = function (value) {
        schedA_dinNumber.sendKeys(value);
    };
    this.getDisinfectantUse = function () {
        schedA_dinNumber.getAttribute('value');
    };

    this.setSchedA_acuteAlcohol = function () {
        schedA_acuteAlcoholChk.click()
    };
    this.getSchedA_acuteAlcohol = function () {
        schedA_acuteAlcoholChk.getAttribute('value');
    };

    this.setSchedA_acuteAnxiety = function () {
        schedA_acuteAnxietyChk.click()
    };
    this.getSchedA_acuteAnxiety = function () {
        schedA_acuteAnxietyChk.getAttribute('value');
    };

    this._getSchedAControl = function (type) {
        var control = null;
        switch (type) {
            case this.schedATypes.ACUTE_ALCOHOL:
                control = schedA_acuteAlcoholChk;
                break;
            case this.schedATypes.ACUTE_ANXIETY:
                control = schedA_acuteAnxietyChk;
                break;
            case this.schedATypes.ACUTE_INFECT:
                control = schedA_acuteInfectChk;
                break;
            case this.schedATypes.ACUTE_INFLAMM:
                control = schedA_acuteInflammChk;
                break;
            case this.schedATypes.ACUTE_PSYCHOTIC:
                control = schedA_acutePsychoticChk;
                break;
            case this.schedATypes.ADDICTION:
                control = schedA_addictionChk;
                break;

            case this.schedATypes.ARTERIOSCLEROSIS:
                control = schedA_ateriosclerosisChk;
                break;

            case this.schedATypes.APPENDICITIS:
                control = schedA_appendicitisChk;
                break;
            case this.schedATypes.ASTHMA:
                control = schedA_asthmaChk;
                break;
            case this.schedATypes.CANCER:
                control = schedA_cancerChk;
                break;
            case this.schedATypes.CONGESTIVE_HEART_FAIL:
                control = schedA_congestHeartFailChk;
                break;
            case this.schedATypes.CONVULSIONS:
                control = schedA_convulsionsChk;
                break;
            case this.schedATypes.DEMENTIA:
                control = schedA_dementiaChk;
                break;
            case this.schedATypes.DEPRESSION:
                control = schedA_depressionChk;
                break;
            case this.schedATypes.DIABETES:
                control = schedA_diabetesChk;
                break;
            case this.schedATypes.GANGRENE:
                control = schedA_gangreneChk;
                break;
            case this.schedATypes.GLAUCOMA:
                control = schedA_glaucomaChk;
                break;
            case this.schedATypes.HAEMA_BLEED:
                control = schedA_haemaBleedChk;
                break;
            case this.schedATypes.HEPATITIS:
                control = schedA_hepatitisChk;
                break;
            case this.schedATypes.HYPERTENSION:
                control = schedA_hypertensionChk;
                break;
            case this.schedATypes.NAUSEA_PREG:
                control = schedA_nauseaPregnancyChk;
                break;

            case this.schedATypes.OBESITY:
                control = schedA_obesityChk;
                break;
            case this.schedATypes.RHEUMATIC_FEVER:
                control = schedA_rheumaticFeverChk;
                break;
            case this.schedATypes.SEPTICMEMIA:
                control = schedA_septicemiaChk;
                break;
            case this.schedATypes.SEX_TRANSMIT:
                control = schedA_sexTransmitChk;
                break;
            case this.schedATypes.STRANGULATE_HERNIA:
                control = schedA_strangulatedHerniaChk;
                break;

            case this.schedATypes.THROMBOTIC_EMBOLIC:
                control = schedA_thromboticEmobolicChk;
                break;

            case this.schedATypes.THYROID:
                control = schedA_thyroidChk;
                break;
            case this.schedATypes.ULCER:
                control = schedA_ulcerChk;
                break;
        }
        return control;
    };
    this.toggleSchedAValue = function (type) {
        this._getSchedAControl(type).click();
    };
    this.getSchedAValue = function (type) {
        return this._getSchedAControl(type).getAttribute('value');
    };

    this.setClaimsText = function (value) {
        schedA_claimsText.sendKeys(value);
    };
    this.getClaimsText = function (value) {
        return schedA_claimsText.getAttribute('value');
    };

};

module.exports = DrugProduct;
