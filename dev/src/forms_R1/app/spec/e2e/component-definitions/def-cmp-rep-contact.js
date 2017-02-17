


//TODO update how to retreive values
var RepContact = function () {
    var UiUtil = require('../util/util-ui.js');
    uiUtil = new UiUtil();
    var expandingTable = uiUtil.getExpandingTable("cmp-rep-contact-list");
    var _addRepContactButton = element(by.buttonText("Add REP Contact"));
    var _saveRepContactButton = element(by.buttonText("Save Contact"));
    var _salutationModelString="contCtrl.contactModel.salutation";
    //var _amendChk=element(by.model("contactRec.contactModel.amend"));
    var _firstNameModelString="contCtrl.contactModel.givenName";
    var _intitialsModelString="contCtrl.contactModel.initials";
    var _lastNameModelString="contCtrl.contactModel.surname";
    var _languageModelString="contCtrl.contactModel.language";
    //var _languageS=element(by.model("contCtrl.contactModel.language"));
    var _jobTitleModelString="contCtrl.contactModel.title";
    var _faxModelString="contCtrl.contactModel.fax";
    var _phoneModelString="contCtrl.contactModel.phone";
    var _phoneExtModelString="contCtrl.contactModel.phoneExt";
    var _emailModelString="contCtrl.contactModel.email";

    /**
     * Rep contact contructor. Binds the required functions for this object
     * @constructor
     */
    this.RepContact=function(){
       // browser.selectOption=uiUtil.selectOption.bind(browser);
    }

    this.addRepContact = function () {
        _addRepContactButton.sendKeys(protractor.Key.ENTER);
    };
    this.saveRepContact = function () {
        _saveRepContactButton.sendKeys(protractor.Key.ENTER);
    };

    this.setSalutationValue = function (recordRow,value) {

        var parent=this.getRecord(recordRow);
        parent.element(by.model(_salutationModelString)).sendKeys(value);
    };
    this.setSalutationByText = function (recordRow,value) {
        var parent=this.getRecord(recordRow);
        browser.selectOption(by.model(_salutationModelString), value,parent);
    };

    this.getSalutationValue = function () {
        return _salutationSelect.getAttribute('value');
    };
    this.getSalutationCtrl = function () {
        return (_salutationSelect);
    };
    this.setFirstNameValue = function (recordRow,value) {
        var parent=this.getRecord(recordRow);
       // browser.selectOption(by.model(_salutationModel), value,parent);
        parent.element(by.model(_firstNameTextModelString)).sendKeys(value);
    };
    this.setLastNameValue = function (value) {
        _lastNameText.sendKeys(value);
    };
    this.setInitialsValue = function (value) {
        _intitialsText.sendKeys(value);
    };
    this.setLanguageValue = function (value) {
        browser.selectOption(by.model(_languageModel), value);
    };
    this.setLanguageValueLetter = function (value) {
        _languageSelect.sendKeys(value);
    };
    this.setJobTitleValue = function (value) {
        _jobTitleText.sendKeys(value);
    };
    this.setFaxValue = function (value) {
        _faxText.sendKeys(value);
    };
    this.setPhoneValue = function (value) {
        _phoneText.sendKeys(value);
    };
    this.setPhoneExtValue = function (value) {
        _phoneExtText.sendKeys(value);
    };
    this.setEmailValue = function (value) {
        _emailText.sendKeys(value);
    };


    this.getFirstNameValue = function () {
        return  _firstNameText.getAttribute('value');
    };
    this.getLastNameValue = function () {
        return  _lastNameText.getAttribute('value');
    };

    this.getInitialsValue = function () {
        return  _intitialsText.getAttribute('value');

    };
    this.getLanguageValue = function () {
        return _languageSelect.getAttribute('value');
    };

    this.getJobTitleValue = function () {
        return _jobTitleText.getAttribute('value');
    };
    this.getFaxValue = function () {
        return _faxText.getAttribute('value');
    };
    this.getPhoneValue = function () {
        return _phoneText.getAttribute('value');
    };
    this.getPhoneExtValue = function () {
        return _phoneExtText.getAttribute('value');
    };
    this.getEmailValue = function () {
        _emailText.getAttribute('value');
    };

    this.getRows = function () {
        return uiUtil.getExpandingTableRows(expandingTable);
    };
    this.clickRow = function (index) {
        uiUtil.clickRow(this.getRows(), index);
    };
    this.getRecordVisibility = function (index) {
        return uiUtil.getRecordVisibility(this.getRows(), index);
    };
    this.getNumberRecords = function () {
        return (uiUtil.getNumberRows(this.getRows()) / 2)
    };
    this.getRecord=function(recordRow){
        return this.getRows().get(recordRow*2+1);
    }
   /* this.setDosageFormSelect=function(recordRow,value){

        var parent=this.getRecord(recordRow);
        browser.selectOption(by.model(dosageFormModelString), value,parent);
    }*/

};
module.exports = RepContact;


