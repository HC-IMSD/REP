/**
 * Created by dkilty on 03/03/2017.
 */


var CompanyRoles = function () {

    var manufact_modelString="ar.roleModel.manufacturer";
    var billing_modelString="ar.roleModel.billing";
    var repPrimary_modelString="ar.roleModel.repPrimary";
    var repSecondary_modelString="ar.roleModel.repSecondary";
    var mailing_modelString="ar.roleModel.mailing";
    var importer_modelString="ar.roleModel.importer";



    /**
     * Rep contact contructor. Binds the required functions for this object
     * @constructor
     */
    this.CompanyRoles = function () {
        // browser.selectOption=uiUtil.selectOption.bind(browser);

    };

    this.setManufacturererValue = function (parent) {
        parent.element(by.model(manufact_modelString)).click();
    };
    this.getManufacturererValue = function (parent) {
        return parent.element(by.model(manufact_modelString)).getAttribute('value');
    };
    this.setBillingValue = function (parent) {
        parent.element(by.model(billing_modelString)).click();
    };
    this.getBillingValue = function (parent) {
        return parent.element(by.model(billing_modelString)).getAttribute('value');
    };
    this.setRepPrimaryValue = function (parent) {
        parent.element(by.model(repPrimary_modelString)).click();
    };
    this.getRepPrimaryValue = function (parent) {
        return parent.element(by.model(repPrimary_modelString)).getAttribute('value');
    };
    this.setRepSecondaryValue = function (parent) {
        parent.element(by.model(repSecondary_modelString)).click();
    };
    this.getRepSecondaryValue = function (parent) {
        return parent.element(by.model(repSecondary_modelString)).getAttribute('value');
    };
    this.setMailingValue = function (parent) {
        parent.element(by.model(mailing_modelString)).click();
    };
    this.getMailingValue = function (parent) {
        return parent.element(by.model(mailing_modelString)).getAttribute('value');
    };

    this.setImporterValue = function (parent) {
        parent.element(by.model(importer_modelString)).click();
    };
    this.getImporterValue = function (parent) {
        return parent.element(by.model(importer_modelString)).getAttribute('value');
    };


};
module.exports = CompanyRoles;


