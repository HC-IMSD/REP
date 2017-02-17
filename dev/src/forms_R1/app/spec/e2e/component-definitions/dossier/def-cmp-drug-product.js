/**
 * Created by dkilty on 17/02/2017.
 */

//var UiUtil = require("../util/util-ui.js");


var DrugProduct=function(){

    //define field elements
    var use_humanChk=element(by.id("chk-human-0"));
    var use_radiopharmaChk=element(by.id("chk-radio-pharmaceutical-1"));
    var use_vetChk=element(by.id("chk-veterinary-2"));
    var use_disinfectantChk=element(by.id("chk-disinfectant-3"));
    var is_sched_aChk=element(by.model("dos.dossierModel.drugProduct.isScheduleA"));
    //schedA stuff
    var schedA_dinNumber=element(by.model("$ctrl.scheduleAModel.drugIdNumber"));
    var schedA_acuteAlcoholChk=element(by.id("chk-acute-alcohol-0"));
    var schedA_acuteAnxietyChk=element(by.id("chk-acute-anxiety-1"));
    var schedA_acuteInfectChk=element(by.id("chk-acute-infectious-2"));
    var schedA_acuteInflammChk=element(by.id("chk-acute-inflammatory-3"));
    var schedA_acutePsychoticChk=element(by.id("chk-acute-psychotic-4"));
    var schedA_addictionChk=element(by.id("chk-addiction-5"));
    var schedA_ateriosclerosisChk=element(by.id("chk-ateriosclerosis-6"));
    var schedA_appendicitisChk=element(by.id("chk-appendicitis-7"));
    var schedA_asthmaChk=element(by.id("chk-asthma-8"));
    var schedA_cancerChk=element(by.id("chk-cancer-9"));
    var schedA_congestHeartFailChk=element(by.id("chk-congest-heart-fail-10"));
    var schedA_convulsionsChk=element(by.id("chk-convulsions-11"));
    var schedA_dementiaChk=element(by.id("chk-dementia-12"));
    var schedA_depressionChk=element(by.id("chk-depression-13"));
    var schedA_diabetesChk=element(by.id("chk-diabetes-14"));
    var schedA_gangreneChk=element(by.id("chk-gangrene-15"));
    var schedA_glaucomaChk=element(by.id("chk-glaucoma-16"));
    var schedA_haemaBleedChk=element(by.id("chk-haematologic-bleeding-17"));
    var schedA_hepatitisChk=element(by.id("chk-hepatitis-18"));
    var schedA_hypertensionChk=element(by.id("chk-hypertension-19"));
    var schedA_nauseaPregnancyChk=element(by.id("chk-nausea-pregnancy-20"));
    var schedA_obesityChk=element(by.id("chk-obesity-21"));
    var schedA_rheumaticFeverChk=element(by.id("chk-rheumatic-fever-22"));
    var schedA_septicemiaChk=element(by.id("chk-septicemia-23"));
    var schedA_sexTransmitChk=element(by.id("chk-sex-transmit-disease-24"));
    var schedA_strangulatedHerniaChk=element(by.id("chk-strangulated-hernia-25"));
    var schedA_thromboticEmobolicChk=element(by.id("chk-thrombotic-embolic-disorder-26"));
    var schedA_thyroidChk=element(by.id("chk-thyroid-disease-27"));
    var schedA_ulcerChk=element(by.id("chk-ulcer-gastro-28"));
    var schedA_claimsText= element(by.model("$ctrl.scheduleAModel.scheduleAClaimsIndDetails"));
};

module.exports = DrugProduct;
