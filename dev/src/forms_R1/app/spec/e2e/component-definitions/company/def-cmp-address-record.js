/**
 * Created by dkilty on 03/03/2017.
 */

var UiUtil = require('../../util/util-ui.js');
var AddressDetails = require('../common/def-cmp-address-details');

var AddressRecord = function () {

    var companyName_modelString = 'addressRec.addressModel.companyName';

    var addressListTag = "cmp-company-address-list";
    //var addressRecTag="cmp-address-record";
    ///var newRecTag="new-record"; TODO: will be needed when this record is refactored
    var addAddressButtonName = "addAddressBtn";
    var saveAddressButtonName = "saveAddress";

    var addressDetails = new AddressDetails();
    var uiUtil = new UiUtil();


    this.AddressRecord=function(){


    };

    this.addAddressRecord = function (parent) {
        if (parent) {
            parent.element(by.name(addAddressButtonName)).click();
        } else {
            element(by.name(addAddressButtonName)).click();
        }
    };


    //record information
    this.getRows = function (parent) {
        var expandingTable = uiUtil.getExpandingTable(addressListTag, parent);
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

    this.setCompanyNameValue = function (parent, value) {
        parent.element(by.model(companyName_modelString)).sendKeys(value);
    };

    this.getCompanyNameValue = function (parent) {
        return parent.element(by.model(companyName_modelString)).getAttribute('value');
    };

    this.setStreetValue = function (parent, value) {
        addressDetails.setStreetValue(parent, value);
    };
    this.getStreetValue = function (parent) {
        return addressDetails.getStreetValue(parent);
    };

    this.setStateTextValue = function (parent, value) {
        addressDetails.setStateTextValue(parent, value);
    };
    this.getStateTextValue = function (parent) {
        return addressDetails.getStateTextValue(parent);
    };

    this.setPostalCodeTextValue = function (parent, value) {
        addressDetails.setPostalCodeTextValue(parent, value);
    };
    this.getPostalCodeTextValue = function (parent) {
        return addressDetails.getPostalCodeTextValue(parent);
    };


    this.setCountryListValue = function (parent, value) {
        addressDetails.setCountryListValue(parent, value);
    };

    this.getCountryListValue = function (parent) {
        return addressDetails.getCountryListValue(parent);
    };


    this.setStateListValue = function (parent, value) {
        addressDetails.setStateListValue(parent, value);
    };

    this.getStateListValue = function (parent) {
        return addressDetails.getStateListValue(parent);
    };

    this.saveAddressRecord = function (parent) {
        if (parent) {
            parent.element(by.name(saveAddressButtonName)).click();
        } else {
            element(by.name(saveAddressButtonName)).click();
        }
    };


};

module.exports = AddressRecord;