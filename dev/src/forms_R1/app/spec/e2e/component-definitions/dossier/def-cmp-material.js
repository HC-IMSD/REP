/**
 * Created by dkilty on 27/02/2017.
 */

var UiUtil = require('../../util/util-ui.js');

var MaterialIngredient=function(){
    var uiUtil = new UiUtil();
    var materialListTag="cmp-material-med-ing-list";
    var materialTag="cmp-material-ing-record";
    var newRecTag="new-material-record";
    var addMaterialButtonName="addMaterialButton";

    //record string models
    var _ingedNameModelString="mirCtrl.mirModel.ingredientName";
    var _casModelString="mirCtrl.mirModel.cas";
    var _standardModelString="mirCtrl.mirModel.ingredientStandard";
    var _presentFinalModelString="mirCtrl.mirModel.inFinalContainer";

    var _saveRecordButtonString="saveMaterial";
    var _deleteRecordButtonNameString="deleteMaterial";
    var _discardRecordButtonString="discardMaterial";

    this.addMaterialIngredient = function (parent) {
        parent.element(by.name(addMaterialButtonName)).sendKeys(protractor.Key.ENTER);
    };



    /**
     * This will get the committed records
     * @param parent
     */
    this.getRows = function (parent) {
        var expandingTable= uiUtil.getExpandingTable(materialListTag,parent);
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

        return parent.element(by.name(newRecTag)).element(by.tagName(materialTag));
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

    this.setPresentInFinalTextValue=function(record,value) {
        browser.selectOption(By.model(_presentFinalModelString),value,record);
    };

    //getters

    this.getIngredientNameValue=function(record){
        record.element(by.model(_ingedNameModelString)).getAttribute('value');
    };
    this.getCasValue=function(record){
        record.element(by.model(_casModelString)).getAttribute('value');
    };
    this.getStandardValue=function(record){
        record.element(by.model(_standardModelString)).getAttribute('value');
    };

    this.getPresentInFinalTextValue=function(record) {
        record.element(by.model(_presentFinalModelString)).getAttribute('value');
    };

    this.saveMaterialIngredient=function(record){
        record.element(by.name(_saveRecordButtonString)).sendKeys(protractor.Key.ENTER);
    };


};

module.exports = MaterialIngredient;

