/**
 * Created by dkilty on 20/02/2017.
 */
var UiUtil = require('../../util/util-ui.js');
var _ = require('lodash/core');

var MedIngredient=function(){
    var uiUtil = new UiUtil();
    var medIngredListTag="cmp-active-ing-list";
    var medIngredTag="cmp-active-ing-record";
    var newRecTag="new-record";
    var addAIButtonName="addAI";

    //record string models
    var _ingedNameModelString="ingRecCtrl.ingModel.ingLabel";
    var _casModelString="ingRecCtrl.ingModel.cas";
    var _standardModelString="ingRecCtrl.ingModel.standard";
    var _strengthModelString="ingRecCtrl.ingModel.strength";
    var _unitsModelString="ingRecCtrl.ingModel.units";
    var _unitsOtherModelString="ingRecCtrl.ingModel.otherUnits";
    var _perModelString="ingRecCtrl.ingModel.per";
    var _nanoModelString="ingRecCtrl.ingModel.nanoMaterial";
    var _nanoOtherModelString="ingRecCtrl.ingModel.nanoMaterialOther";
    var _baseModelString="ingRecCtrl.ingModel.calcAsBase";
    var _animalSrcModelString="ingRecCtrl.ingModel.humanAnimalSourced";
    var _saveRecordButtonString="saveMI";
    var _discardRecordButtonString="discardMI";

    this.addMedIngredent = function (parent) {
        //_addRepContactButton.sendKeys(protractor.Key.ENTER);
       // parentElement.element(selector);
        parent.element(by.name(addAIButtonName)).sendKeys(protractor.Key.ENTER);
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

    this.setActiveNameLookup= function (record,value,selectionValue) {
        var control=record.element(By.model(_ingedNameModelString));
        browser.selectTypeAheadPopupValue(_ingedNameModelString,value,selectionValue,control);
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
        // parent.element(by.name(dosageFormModelString)).then(function (selectList) {
        browser.UISelectSearch(selectList,value);
       // var control=record.element(By.model(_unitsModelString));
       // browser.getUISelectOption( value,control);
    };
    this.setUnitsOtherTextValue=function(record,value) {
        record.element(By.model(_unitsOtherModelString)).sendKeys(value);
    };


    this.setNanoTextValue=function(record,value) {
       // var control=record.element(By.model(_unitsModelString));

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


    this.getActiveNameLookup= function () {
        var _element=element.all(by.model(_ingedNameModelString)).last();
        return _element.getAttribute('value');
    };

    this.getCasValue=function(){
       return element(by.model(_casModelString)).getAttribute('value');
    };
    this.getStandardValue=function(){
       return element(by.model(_standardModelString)).getAttribute('value');
    };

    this.getStrengthValue=function(){
        return element(by.model(_strengthModelString)).getAttribute('value');
    };
    this.getUnitsTextValue=function() {
        return element(by.model(_unitsModelString))
            .element(by.css('span.ng-binding.ng-scope')).getText();
    };

    this.getUnitsTextValue=function() {
        return _.trim(element(by.model(_unitsModelString))
            .element(by.css('span.ng-binding.ng-scope')).getAttribute('innerText'));
        //Todo: to trim inner text
    };
    this.getUnitsOtherTextValue=function() {
        return element(By.model(_unitsOtherModelString)).getAttribute('value');
    };

    this.getNanoTextValue=function() {
        return element(By.model(_nanoModelString)).getAttribute('value');
    };

    this.getNanoOtherTextValue=function() {
       return element(By.model(_nanoOtherModelString)).getAttribute('value');
    };

    this.getPerTextValue=function() {
        return element(By.model(_perModelString)).getAttribute('value');
    };

    this.getBaseTextValue=function() {
        // var control=record.element(By.model(_unitsModelString));
        return element(By.model(_baseModelString)).getAttribute('value');
    };

    this.getAnimalSrcTextValue=function() {
        return element(By.model(_animalSrcModelString)).getAttribute('value');
    };



    this.saveMedicinalIngredient=function(record){
        record.element(By.name(_saveRecordButtonString)).sendKeys(protractor.Key.ENTER);
    };


};

module.exports = MedIngredient;