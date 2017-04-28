/**
 * Created by dkilty on 3/5/2017.
 */


/**
 * Created by dkilty on 03/03/2017.
 */

var UiUtil = require('../../util/util-ui.js');
var ContactDetails = require('../common/def-cmp-contact-details');
var AddressRoles = require('../common/def-cmp-company-roles');

var ContactRecord = function () {

    var companyName_modelString = 'addressRec.addressModel.companyName';

    var contactListTag = "cmp-company-contact-list";
    //var addressRecTag="cmp-address-record";
    ///var newRecTag="new-record"; TODO: will be needed when this record is refactored
    var addContactButtonName = "addContact";
    var saveContactButtonName = "saveContact";
    var deleteContactButtonName="deleteContact";
    var discardContactButtonName="discardContact";


    var contactDetails = new ContactDetails();
    var uiUtil = new UiUtil();
    var addressRoles=new AddressRoles();
    var contactDetails=new ContactDetails();
    this.ContactRecord = function () {

    };

    this.addContactRecord = function (parent) {
        if (parent) {
            parent.element(by.name(addContactButtonName)).click();
        } else {
            element(by.name(addContactButtonName)).click();
        }
    };


    //record information
    this.getRows = function (parent) {
        var expandingTable = uiUtil.getExpandingTable(contactListTag, parent);
        return uiUtil.getExpandingTableRows(expandingTable);
    };

    this.clickRow = function (parent, index) {
        uiUtil.clickRow(this.getRows(parent), index);
    };

    this.isRecordVisible = function (parent, recordIndex) {
        return uiUtil.getRecordVisibility(this.getRows(parent), recordIndex);
    };


    this.getRecordVisibility = function (parent, index) {
        return uiUtil.getRecordVisibility(this.getRows(parent), index);
    };
    this.getNumberRecords = function (parent) {
        return (uiUtil.getNumberRows(this.getRows(parent)) / 2)
    };
    this.getRecord = function (parent, recordRow) {
        return this.getRows(parent).get(recordRow * 2 + 1);
    };

    //details information

    this.setSalutation = function (parent, value) {
        contactDetails.setSalutationValue(parent,value)
    };

    this.getSalutation = function (parent) {
        contactDetails.getSalutationValue(parent);
    };

    this.setFirstName = function (parent, value) {
        contactDetails.setFirstNameValue(parent,value)
    };
    this.getFirstName = function (parent) {
        contactDetails.getFirstNameValue(parent);
    };
    this.setLastName = function (parent, value) {
        contactDetails.setLastNameValue(parent,value)
    };
    this.getLastName = function (parent) {
        contactDetails.getLastNameValue(parent)
    };
    this.setInitials = function (parent, value) {
        contactDetails.setInitialsValue(parent,value)
    };
    this.getInitials = function (parent) {
        contactDetails.getInitialsValue(parent)
    };
    this.setJobTitle = function (parent, value) {
        contactDetails.setJobTitleValue(parent,value)
    };
    this.getJobTitle = function (parent) {
        contactDetails.getJobTitleValue(parent)
    };
    this.setPhone = function (parent, value) {
        contactDetails.setPhoneValue(parent,value)
    };
    this.getPhone = function (parent) {
        contactDetails.getPhoneValue(parent)
    };
    this.setPhoneExt = function (parent, value) {
        contactDetails.setPhoneExtValue(parent,value)
    };
    this.getPhoneExt = function (parent) {
        contactDetails.getPhoneExtValue(parent)
    };
    this.setFax = function (parent, value) {
        contactDetails.setFaxValue(parent,value)
    };
    this.getFax = function (parent) {
        contactDetails.getFaxValue(parent)
    };
    this.setEmail = function (parent, value) {
        contactDetails.setEmailValue(parent,value)
    };
    this.getEmail = function (parent) {
        contactDetails.getEmailValue(parent)
    };
    this.setLanguage = function (parent, value) {
        contactDetails.setLanguageValue(parent,value)
    };
    this.getLanguage = function (parent) {
        contactDetails.setLanguageValue(parent);
    };


    this.setManufacturerRole=function(parent){

        addressRoles.setManufacturererValue(parent);
    };
    this.getManufacturerRole=function(parent){

        return addressRoles.getManufacturererValue(parent);
    };


    this.setBillingRole=function(parent){

        addressRoles.setBillingValue(parent);
    };
    this.getBillingRole=function(parent){

        return addressRoles.getBillingValue(parent);
    };

    this.setMailingRole=function(parent){

        addressRoles.setMailingValue(parent);
    };
    this.getMailingRole=function(parent){

        return addressRoles.getMailingValue(parent);
    };

    this.saveContactRecord = function (parent) {
        if (parent) {
            parent.element(by.name(saveContactButtonName)).click();
        } else {


            element(by.name(saveContactButtonName)).click();
        }
    };

};

module.exports = ContactRecord;

