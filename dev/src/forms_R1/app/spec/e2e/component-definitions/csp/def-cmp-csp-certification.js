/**
 * Created by dkilty on 27/04/2017.
 */

var CspCertification = function () {

    var _givenName_modelString="cspCertCtrl.model.givenName";
    var _initials_modelString="cspCertCtrl.model.initials";
    var _surname_modelString="cspCertCtrl.model.surname";
    var _title_modelString="cspCertCtrl.model.title";
    var _dateSigned_modelString=" cspCertCtrl.model.dateSigned";

    /**
     *
     * @constructor
     */
    this.CspCertification = function () {

    };

    this.setDateSignedValue = function (parent, value) {
        parent.element(by.model(_dateSigned_modelString)).sendKeys(value);
    };

    this.getDateSignedValue = function (parent) {
        return parent.element(by.model(_dateSigned_modelString)).getAttribute('value');
    };

    this.setInitialsValue = function (parent, value) {
        parent.element(by.model(_initials_modelString)).sendKeys(value);
    };
    this.getInitialsValue = function (parent) {
        return parent.element(by.model(_initials_modelString)).getAttribute('value');
    };

    this.setSurnameValue = function (parent, value) {
        parent.element(by.model(_surname_modelString)).sendKeys(value);
    };

    this.getSurnameValue = function (parent) {
        return parent.element(by.model(_surname_modelString)).getAttribute('value');
    };

    this.setGivenNameValue = function (parent, value) {
        parent.element(by.model(_givenName_modelString)).sendKeys(value);
    };

    this.getGivenNameValue = function (parent) {
        return parent.element(by.model(_givenName_modelString)).getAttribute('value');
    };

    this.setTitleValue = function (parent, value) {
        parent.element(by.model(_title_modelString)).sendKeys(value);
    };

    this.getTitleValue = function (parent) {
        return parent.element(by.model(_title_modelString)).getAttribute('value');
    };

};

module.exports = CspCertification;