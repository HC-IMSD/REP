/**
 * Created by dkilty on 13/02/2017.
 */


var ReferenceProduct=function(){

    var UiUtil = require('../../util/util-ui.js');

    var uiUtil=new UiUtil();
    var refProductListTag="cmp-ref-product-list";
    var newRecTag="new-cdnRef-record";
    var rootRefCmpName="refProductRoot";
    var _addRefProductButton=element(By.id("addRefProduct"));

    var _saveRefProductButtonIdString="saveRef";

    var _brandNameModelString="$ctrl.productModel.brandName";
    var _activeNameModel="$ctrl.productModel.ingLabel";
    var _perModelString="$ctrl.productModel.per";
    var _strengthModelString="$ctrl.productModel.strengths";
    var _unitsModelString="$ctrl.productModel.units";
    var _dosageFormModelString="$ctrl.productModel.dosageForm";

    var _companyNameModelString="$ctrl.productModel.companyName";


    this.addReferenceProduct=function(){
        _addRefProductButton.sendKeys(protractor.Key.ENTER);
    };

    this.saveReferenceProduct=function(record){
        record.element(By.id(_saveRefProductButtonIdString)).sendKeys(protractor.Key.ENTER);
    };

    /**
     * Sets the active name by typing some text, then selecting from the lookup
     * @param value
     * @param selectionValue
     */
    this.setActiveNameLookup= function (record,value,selectionValue) {

        var control=record.all(By.model(_activeNameModel)).last();

        browser.selectTypeAheadPopupValue(_activeNameModel,value,selectionValue,control);
    };
    this.setActiveNameText= function (record,value) {
       record.all(By.model(_activeNameModel)).last().sendKeys(value);
    };


    this.setBrandNameValue=function(parent,value){
        parent.element(by.model(_brandNameModelString)).sendKeys(value);

    };
    this.setStrengthValue=function(parent,value){
        parent.element(by.model(_strengthModelString)).sendKeys(value);

    };
    this.setUnitsTextValue=function(parent, value) {
        var selectList=parent.element(by.model(_unitsModelString));
        // parent.element(by.name(dosageFormModelString)).then(function (selectList) {
        browser.UISelectSearch(selectList,value);
    };

    this.setPerValue=function(parent,value){
        parent.element(by.model(_perModelString)).sendKeys(value);
    };
    this.setDosageFormTextValue=function(parent,value) {

        var selectList=parent.element(by.model(_dosageFormModelString));
        // parent.element(by.name(dosageFormModelString)).then(function (selectList) {
        browser.UISelectSearch(selectList,value);

       // browser.getUISelectOption(By.model(_dosageFormModelString), value);
    };

    this.setCompanyNameValue=function(parent,value){
        parent.element(by.model(_companyNameModelString)).sendKeys(value);

    };

    //======================== Getters

    this.getRootRefProduct=function(){

      return (element(by.name(rootRefCmpName)));
    };

    this.getActiveNameLookup= function (parent) {
        var _element=parent.all(by.model(modelString)).last(); //temporary till a better fix
        return _element.getAttribute('value');
    };
    this.getBrandNameValue=function(parent){
        return parent.get(by.model(_brandNameModelString)).getAttribute('value');
    };
    this.getStrengthValue=function(){
        return parent.get(by.model(_strengthModelString)).getAttribute('value');
    };

    this.getUnitsTextValue=function(parent) {
        return parent.get(by.model(_unitsModelString)).getAttribute('value');
    };


    this.getPerValue=function(parent){
        return parent.get(by.model(_perModelString)).getAttribute('value');
    };
    this.getDosageFormTextValue=function(parent) {
        return parent.get(by.model(_dosageFormModelString)).getAttribute('value');
    };

    this.getCompanyNameValue=function(parent){
        return parent.get(by.model(_dosageFormModelString)).getAttribute('value');
    };


    /**
     * This will get the committed records
     * @param parent
     */
    this.getRows = function (parent) {
        var expandingTable= uiUtil.getExpandingTable(refProductListTag,parent);
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

        return parent.element(by.name(newRecTag));
    };

};

module.exports = ReferenceProduct;
