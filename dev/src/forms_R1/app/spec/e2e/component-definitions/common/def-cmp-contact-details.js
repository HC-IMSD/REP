/**
 * Created by dkilty on 02/03/2017.
 */


var ContactDetails = function () {

    var _salutationModelString = "contCtrl.contactModel.salutation";
    var _firstNameModelString = "contCtrl.contactModel.givenName";
    var _intitialsModelString = "contCtrl.contactModel.initials";
    var _lastNameModelString = "contCtrl.contactModel.surname";
    var _languageModelString = "contCtrl.contactModel.language";
    var _jobTitleModelString = "contCtrl.contactModel.title";
    var _faxModelString = "contCtrl.contactModel.fax";
    var _phoneModelString = "contCtrl.contactModel.phone";
    var _phoneExtModelString = "contCtrl.contactModel.phoneExt";
    var _emailModelString = "contCtrl.contactModel.email";


    this.setSalutationValue = function (parent, value) {

        parent.element(by.model(_salutationModelString)).sendKeys(value);
    };
    this.setSalutationByText = function (parent, value) {
        browser.selectOption(by.model(_salutationModelString), value, parent);
    };

    this.getSalutationValue = function (parent) {
       // var temp=  parent.element(by.model(_salutationModelString))
       // var result=temp.getAttribute('value');
        return (parent.element(by.model(_salutationModelString))).getAttribute('value');
    };
    /*  this.getSalutationCtrl = function () {
     return (_salutationSelect);
     };*/
    this.setFirstNameValue = function (parent, value) {
        parent.element(by.model(_firstNameModelString)).sendKeys(value);
    };
    this.setLastNameValue = function (parent, value) {
        parent.element(by.model(_lastNameModelString)).sendKeys(value);
    };
    this.setInitialsValue = function (parent, value) {
        parent.element(by.model(_intitialsModelString)).sendKeys(value);
    };
    this.setLanguageValue = function (parent, value) {
        parent.element(by.model(_languageModelString)).sendKeys(value);
    };
    this.setLanguageValueLetter = function (value) {
        browser.selectOption(by.model(_languageModelString), value, parent);
    };
    this.setJobTitleValue = function (parent, value) {
        parent.element(by.model(_jobTitleModelString)).sendKeys(value);
    };
    this.setFaxValue = function (parent, value) {
        parent.element(by.model(_faxModelString)).sendKeys(value);
    };
    this.setPhoneValue = function (parent, value) {
        parent.element(by.model(_phoneModelString)).sendKeys(value);
    };
    this.setPhoneExtValue = function (parent, value) {
        parent.element(by.model(_phoneExtModelString)).sendKeys(value);
    };
    this.setEmailValue = function (parent, value) {

        parent.element(by.model(_emailModelString)).sendKeys(value);
    };

    this.getFirstNameValue = function (parent) {
        return parent.element(by.model(_firstNameModelString)).getAttribute('value');
    };
    this.getLastNameValue = function (parent) {
        return parent.element(by.model(_lastNameModelString)).getAttribute('value');
    };

    this.getInitialsValue = function (parent) {
        return parent.element(by.model(_intitialsModelString)).getAttribute('value');
    };
    this.getLanguageValue = function (parent) {
        return parent.element(by.model(_languageModelString)).getAttribute('value');
    };

    this.getJobTitleValue = function (parent) {
        return parent.element(by.model(_jobTitleModelString)).getAttribute('value');
    };
    this.getFaxValue = function (parent) {
        return parent.element(by.model(_faxModelString)).getAttribute('value');
    };
    this.getPhoneValue = function (parent) {
        return parent.element(by.model(_phoneModelString)).getAttribute('value');

    };
    this.getPhoneExtValue = function (parent) {
        return parent.element(by.model(_phoneExtModelString)).getAttribute('value');
    };
    this.getEmailValue = function (parent) {
        return parent.element(by.model(_emailModelString)).getAttribute('value');
    };



};
module.exports = ContactDetails;


