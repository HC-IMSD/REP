/**
 * Created by dkilty on 03/03/2017.
 */

var UiUtil = require('../../util/util-ui.js');
var AddressDetails = require('../common/def-cmp-address-details');
var AddressRoles = require('../common/def-cmp-company-roles');

var AddressRecord = function () {

    var companyName_modelString = 'addressRec.addressModel.companyName';

    var addressListTag = "cmp-company-address-list";
    //var addressRecTag="cmp-address-record";
    ///var newRecTag="new-record"; TODO: will be needed when this record is refactored
    var saveAddressButtonName = "saveAddress";

    //importer records section
    var importerProductsTag="cmp=importer-products";
    var dossierIdRecordTag="cmp-dossier-id-details";
    var addDossierIdButtonName="addDossierId";
    var deleteDossierIdButtonName="dossierIdDelete";
    var productsImporter_modelString="impProdCtrl.model.selectedProducts";


    var addressDetails = new AddressDetails();
    var uiUtil = new UiUtil();
    var addressRoles=new AddressRoles();

    this.AddressRecord = function () {


    };

    this.addAddressRecord = function (parent) {
        if (parent) {
            parent.element(by.xpath("//button[@ng-click='addressListCtrl.addAddress()']")).click();
        } else {
            element(by.xpath("//button[@ng-click='addressListCtrl.addAddress()']")).click();
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


    this.setCityValue = function (parent, value) {
        addressDetails.setCityTextValue(parent, value);
    };

    this.getCityValue = function (parent) {
        return addressDetails.getCityTextValue(parent);
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
    this.setImporterRole=function(parent){

        addressRoles.setImporterValue(parent);
    };
    this.getImporterRole=function(parent){

        return addressRoles.getImporterValue(parent);
    };

    this.setProductsImporterListValue = function (parent, value) {
        parent.element(by.model(productsImporter_modelString)).sendKeys(value);
    };

    this.getProductsImporterListValue = function (parent) {
        return  parent.element(by.model(productsImporter_modelString)).getAttribute('value');
    };


    this.saveAddressRecord = function (parent) {
        if (parent) {
            parent.element(by.name(saveAddressButtonName)).click();
        } else {


            element(by.name(saveAddressButtonName)).click();
        }
    };


    this.getDossierIdRecords=function(parent){

        return parent.all(by.tagName(dossierIdRecordTag));

    };
    this.getDossierIdRecord=function(parent,index){

        return  this.getDossierIdRecords(parent).get(index);
    };
    this.deleteDossierIdRecord=function(parent,index){

        this.getDossierIdRecords(parent).get(index).element(by.tagName(deleteDossierIdButtonName)).click();
    };
    this.addDossierIdRecord=function(parent){
        parent.element(by.name(addDossierIdButtonName)).click();
    };
    this.setDossierId=function(parent,index,value){

        this.getDossierIdRecord(parent,index).element(by.model("dosIdCtrl.record.dossierId")).sendKeys(value);
    }



};module.exports = AddressRecord;