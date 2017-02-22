/**
 * Created by dkilty on 13/02/2017.
 */


var ReferenceProduct=function(){

    var UiUtil = require('../../util/util-ui.js');

    var uiUtil=new UiUtil();

    var  expandingTable=uiUtil.getExpandingTable("cmp-thera-list");
    var _addRefProductButton=element(By.id("addRefProduct"));

    var _saveRefProductButtonIdString="saveRef";
    var _saveRefProductButton=element(By.id(_saveRefProductButtonIdString));

    var _brandNameText=element(by.model("$ctrl.productModel.brandName"));
    var _activeNameModel="$ctrl.productModel.ingLabel";

    var _strengthModelString="$ctrl.productModel.strengths";
    var _strengthNumber=element(by.model("$ctrl.productModel.strengths"));
    var _unitsModelString="$ctrl.productModel.units";
    var _unitsUiSelect=element(by.model(_unitsModelString));
    var _perText=element(by.model("$ctrl.productModel.per"));
    var _dosageFormModelString="$ctrl.productModel.dosageForm";
    var _dosageFormUiSelect=element(by.model(_dosageFormModelString));
    var _companyNameText=element(by.model("$ctrl.productModel.companyName"));


    this.addReferenceProduct=function(){
        _addRefProductButton.sendKeys(protractor.Key.ENTER);
    };

    this.saveReferenceProduct=function(){
        _saveRefProductButton.sendKeys(protractor.Key.ENTER);
    };

    /**
     * Sets the active name by typing some text, then selecting from the lookup
     * @param value
     * @param selectionValue
     */
    this.setActiveNameLookup= function (value,selectionValue) {
        browser.selectTypeAheadPopupValue(_activeNameModel,value,selectionValue)

    };
    this.setBrandNameValue=function(value){
        _brandNameText.sendKeys(value);

    };
    this.setStrengthValue=function(parent,value){
        parent.element(by.model(_strengthModelString)).sendKeys(value);

    };
    this.setUnitsTextValue=function(parent, value) {
        browser.getUISelectOption(By.model(_unitsModelString), value);
    };

    this.setPerValue=function(parent,value){
        _perText.sendKeys(value);
    };
    this.setDosageFormTextValue=function(parent,value) {
        browser.getUISelectOption(By.model(_dosageFormModelString), value);
    };

    this.setCompanyNameValue=function(parent,value){
        _companyNameText.sendKeys(value);

    };

    //======================== Getters

    this.getActiveNameLookup= function () {
        var _element=element.all(by.model(modelString)).last(); //temporary till a better fix
        return _element.getAttribute('value');
    };
    this.getBrandNameValue=function(){
        return _brandNameText.getAttribute('value');
    };
    this.getStrengthValue=function(){
        return _strengthNumber.getAttribute('value');
    };

    this.getUnitsTextValue=function(value) {
        return browser.getUISelectModelValue(_unitsUiSelect, _unitsModelString);
    };


    this.getPerValue=function(){
        return _perText.getAttribute('value');
    };
    this.getDosageFormTextValue=function(value) {
        return browser.getUISelectModelValue(_dosageFormUiSelect, _dosageFormModelString);
    };

    this.getCompanyNameValue=function(){
        return _companyNameText.getAttribute('value');
    };

    this.getRows=function(){
       return  uiUtil.getExpandingTableRows(expandingTable);
    };
    this.clickRow=function(index){
        uiUtil.clickRow(this.getRows(),index);
    };
    this.isRecordVisible=function(index){
        return uiUtil.getRecordVisibility(this.getRows(),index);
    };

};

module.exports = ReferenceProduct;
