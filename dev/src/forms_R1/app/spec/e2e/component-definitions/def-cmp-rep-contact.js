//TODO update how to retreive values
var UiUtil = require('../util/util-ui.js');
var ContactDetails=require('./common/def-cmp-contact-details');

var RepContact = function () {

    uiUtil = new UiUtil();
    var expandingTable = uiUtil.getExpandingTable("cmp-rep-contact-list");
    var _addRepContactButton = element(by.buttonText("Add REP Contact"));
    var _saveRepContactButton = element(by.buttonText("Save Contact"));
    var contactDetails=new ContactDetails();
   /* var _salutationModelString = "contCtrl.contactModel.salutation";
    //var _amendChk=element(by.model("contactRec.contactModel.amend"));
    var _firstNameModelString = "contCtrl.contactModel.givenName";
    var _intitialsModelString = "contCtrl.contactModel.initials";
    var _lastNameModelString = "contCtrl.contactModel.surname";
    var _languageModelString = "contCtrl.contactModel.language";
    //var _languageS=element(by.model("contCtrl.contactModel.language"));
    var _jobTitleModelString = "contCtrl.contactModel.title";
    var _faxModelString = "contCtrl.contactModel.fax";
    var _phoneModelString = "contCtrl.contactModel.phone";
    var _phoneExtModelString = "contCtrl.contactModel.phoneExt";
    var _emailModelString = "contCtrl.contactModel.email";*/

    /**
     * Rep contact contructor. Binds the required functions for this object
     * @constructor
     */
    this.RepContact = function () {
        // browser.selectOption=uiUtil.selectOption.bind(browser);

    }

    this.addRepContact = function () {
        _addRepContactButton.sendKeys(protractor.Key.ENTER);
    };
    this.saveRepContact = function () {
        _saveRepContactButton.sendKeys(protractor.Key.ENTER);
    };

    this.setSalutationValue = function (parent, value) {
        contactDetails.setSalutationValue(parent,value);
    };
    this.setSalutationByText = function (parent, value) {

        contactDetails.setSalutationByText(parent,value);
    };

    this.getSalutationValue = function (parent) {
        return  contactDetails.getSalutationValue(parent);
    };
    /*  this.getSalutationCtrl = function () {
     return (_salutationSelect);
     };*/
    this.setFirstNameValue = function (parent, value) {
        contactDetails.setFirstNameValue(parent,value);
    };
    this.setLastNameValue = function (parent, value) {
        contactDetails.setLastNameValue(parent,value);
    };
    this.setInitialsValue = function (parent, value) {
        contactDetails.setInitialsValue(parent,value);
    };
    this.setLanguageValue = function (parent, value) {
        contactDetails.setLanguageValue(parent,value);
    };
    this.setLanguageValueLetter = function (value) {
        contactDetails.setLanguageValueLetter(value);
    };
    this.setJobTitleValue = function (parent, value) {
        contactDetails.setJobTitleValue(parent,value);
    };
    this.setFaxValue = function (parent, value) {
        contactDetails.setFaxValue(parent,value);
    };
    this.setPhoneValue = function (parent, value) {
        contactDetails.setPhoneValue(parent,value);
    };
    this.setPhoneExtValue = function (parent, value) {
        contactDetails.setPhoneExtValue(parent,value);
    };
    this.setEmailValue = function (parent, value) {

        contactDetails.setEmailValue(parent,value);
    };


    this.getFirstNameValue = function (parent) {
        return contactDetails.getFirstNameValue(parent);
    };
    this.getLastNameValue = function (parent) {
       return contactDetails.getLastNameValue(parent);
    };

    this.getInitialsValue = function (parent) {
        return  contactDetails.getInitialsValue(parent);
    };
    this.getLanguageValue = function (parent) {
        return  contactDetails.getLanguageValue(parent);
    };

    this.getJobTitleValue = function (parent) {
        return  contactDetails.getJobTitleValue(parent);
    };
    this.getFaxValue = function (parent) {
        return  contactDetails.getFaxValue(parent);
    };
    this.getPhoneValue = function (parent) {
        return  contactDetails.getPhoneValue(parent);

    };
    this.getPhoneExtValue = function (parent) {
        return  contactDetails.getPhoneExtValue(parent);
    };
    this.getEmailValue = function (parent) {
        return  contactDetails.getEmailValue(parent);
    };

    this.getRows = function () {
        return uiUtil.getExpandingTableRows(expandingTable);
    };
    this.clickRow = function (index) {
        uiUtil.clickRow(this.getRows(), index);
    };
    this.isRecordVisible=function(recordIndex){
        return uiUtil.getRecordVisibility(this.getRows(), recordIndex);
    };


    this.getRecordVisibility = function (index) {
        return uiUtil.getRecordVisibility(this.getRows(), index);
    };
    this.getNumberRecords = function () {
        return (uiUtil.getNumberRows(this.getRows()) / 2)
    };
    this.getRecord = function (recordRow) {
        return this.getRows().get(recordRow * 2 + 1);
    };

};
module.exports = RepContact;


