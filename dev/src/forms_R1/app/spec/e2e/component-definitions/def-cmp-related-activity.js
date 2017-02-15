/**
 * Created by dkilty on 13/02/2017.
 */


var RelatedActivity=function(){

    var UiUtil = require('../util/util-ui.js');

    var uiUtil=new UiUtil();

    var _addRefProductButton=element(By.id("addRefProduct"));
    var _brandNameText=element(by.model("$ctrl.productModel.brandName"));
    var _activeNameModel="$ctrl.productModel.ingLabel";

    var _strengthNumber=element(by.model("$ctrl.productModel.strengths"));
    var _unitsModelString="$ctrl.productModel.units";
    var _unitsUiSelect=element(by.model(_unitsModelString));
    var _perText=element(by.model("$ctrl.productModel.per"));
    var _dosageFormModelString="$ctrl.productModel.dosageForm";
    var _dosageFormUiSelect=element(by.model(_dosageFormModelString));
    var _companyNameText=element(by.model("$ctrl.productModel.companyName"));

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
    this.setStrengthValue=function(value){
        _strengthNumber.sendKeys(value);

    };
    this.setUnitsTextValue=function(value) {
        browser.pickUISelectOption(_unitsModelString, value);
    };

    this.setPerValue=function(value){
        _perText.sendKeys(value);
    };
    this.setDosageFormTextValue=function(value) {
        browser.pickUISelectOption(_dosageFormModelString, value);
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

};

module.exports = RelatedActivity;
