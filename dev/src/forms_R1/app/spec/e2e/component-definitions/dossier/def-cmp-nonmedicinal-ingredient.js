/**
 * Created by dkilty on 2/26/2017.
 */

var UiUtil = require('../../util/util-ui.js');

var NonMedIngredient=function(){
    var uiUtil = new UiUtil();
    var medIngredListTag="cmp-non-med-ing-list";
    var medIngredTag="cmp-non-med-ing-record";
    var newRecTag="new-nmi-record";
    var addNMIButtonName="addNMI";

    //record string models
    var _variantModelString="nIngRecCtrl.ingModel.varId";
    var _ingedNameModelString="nIngRecCtrl.ingModel.ingName";
    var _casModelString="nIngRecCtrl.ingModel.cas";
    var _standardModelString="nIngRecCtrl.ingModel.standard";
    var _strengthModelString="nIngRecCtrl.ingModel.strength";
    var _unitsModelString="nIngRecCtrl.ingModel.units";
    var _unitsOtherModelString="nIngRecCtrl.ingModel.otherUnits";
    var _perModelString="nIngRecCtrl.ingModel.per";
    var _nanoModelString="nIngRecCtrl.ingModel.nanoMaterial";
    var _nanoOtherModelString="nIngRecCtrl.ingModel.nanoMaterialOther";
    var _baseModelString="nIngRecCtrl.ingModel.calcAsBase";
    var _animalSrcModelString="nIngRecCtrl.ingModel.humanAnimalSourced";
    var _saveRecordButtonString="saveNMI";
    var _deleteRecordButtonNameString="deleteNMI";
    var _copyRecordButtonNameString="copyNMI";
    var _discardRecordButtonString="discardNMI";

    this.addnonMedIngredent = function (parent) {

        parent.element(by.name(addNMIButtonName)).sendKeys(protractor.Key.ENTER);
    };

    /**
     * This will get the committed records
     * @param parent
     */
    this.getRows = function (parent) {
        var expandingTable= uiUtil.getExpandingTable(medIngredListTag,parent);
        return uiUtil.getExpandingTableRows(expandingTable);
    };

    this.clickRow = function (parent,index) {
        uiUtil.clickRow(this.getRows(parent), index);
    };

    this.isRecordVisible=function(parent,recordIndex){
        return uiUtil.getRecordVisibility(this.getRows(parent), recordIndex);
    };


    this.getRecordVisibility = function (parent,index) {
        return uiUtil.getRecordVisibility(this.getRows(parent), index);
    };
    this.getNumberRecords = function (parent) {
        return (uiUtil.getNumberRows(this.getRows(parent)) / 2)
    };
    this.getRecord = function (parent,recordRow) {
        return this.getRows(parent).get(recordRow * 2 + 1);
    };

    /*
     gets the new record that is outside the expanding table
     */
    this.getNewRecord=function(parent){

        return parent.element(by.name(newRecTag)).element(by.tagName(medIngredTag));
    };

   this.setIngredientNameValue=function(record,value){
       record.element(by.model(_ingedNameModelString)).sendKeys(value);
   };
    this.setCasValue=function(record,value){
        record.element(by.model(_casModelString)).sendKeys(value);
    };
    this.setStandardValue=function(record,value){
        record.element(by.model(_standardModelString)).sendKeys(value);
    };

    this.setStrengthValue=function(record,value){
        record.element(by.model(_strengthModelString)).sendKeys(value);
    };
    this.setUnitsTextValue=function(record,value) {
        var selectList=record.element(by.model(_unitsModelString));
        browser.UISelectSearch(selectList,value);
    };
    this.setUnitsOtherTextValue=function(record,value) {
        record.element(By.model(_unitsOtherModelString)).sendKeys(value);
    };

    this.setNanoTextValue=function(record,value) {
        browser.selectOption(By.model(_nanoModelString),value,record);
    };

    this.setNanoOtherTextValue=function(record,value) {
        record.element(By.model(_nanoOtherModelString)).sendKeys(value);
    };

    this.setPerTextValue=function(record,value) {
        record.element(By.model(_perModelString)).sendKeys(value);
    };

    this.setBaseTextValue=function(record,value) {
        // var control=record.element(By.model(_unitsModelString));
        browser.selectOption(By.model(_baseModelString),value,record);
    };

    this.setAnimalSrcTextValue=function(record,value) {
        // var control=record.element(By.model(_unitsModelString));
        browser.selectOption(By.model(_animalSrcModelString),value,record);
    };

    //getters


    this.getIngredientNameValue=function(record){
       return record.element(by.model(_ingedNameModelString)).getAttribute('value');
    };
    this.getCasValue=function(record){
       return record.element(by.model(_casModelString)).getAttribute('value');
    };
    this.getStandardValue=function(record){
        return record.element(by.model(_standardModelString)).getAttribute('value');
    };

    this.getStrengthValue=function(record){
        return record.element(by.model(_strengthModelString)).getAttribute('value');
    };
    this.getUnitsTextValue=function(record) {
        return record.element(by.model(_unitsModelString)).getAttribute('value');
    };
    this.getUnitsOtherTextValue=function(record) {
        return record.element(By.model(_unitsOtherModelString)).getAttribute('value');
    };

    this.getNanoTextValue=function(record) {
        return record.element(By.model(_nanoModelString)).getAttribute('value');
    };

    this.getNanoOtherTextValue=function(record) {
        return record.element(By.model(_nanoOtherModelString)).getAttribute('value');
    };

    this.getPerTextValue=function(record) {
        return record.element(By.model(_perModelString)).getAttribute('value');
    };

    this.getBaseTextValue=function(record) {
        return record.element(By.model(_baseModelString)).getAttribute('value');
    };

    this.getAnimalSrcTextValue=function(record) {
        // var control=record.element(By.model(_unitsModelString));
        return record.element(By.model(_animalSrcModelString)).getAttribute('value');
    };

    ///end getters


    this.saveNonMedicinalIngredient=function(record){
        record.element(by.name(_saveRecordButtonString)).sendKeys(protractor.Key.ENTER);
    };


};

module.exports = NonMedIngredient;