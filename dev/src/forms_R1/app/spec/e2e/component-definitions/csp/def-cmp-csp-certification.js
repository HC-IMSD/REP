/**
 * Created by dkilty on 27/04/2017.
 */
var UiUtil = require('../../util/util-ui.js');
var CspCertification = function () {
    var uiUtil = new UiUtil();
    var _givenName_modelString="cspCertCtrl.model.givenName";
    var _initials_modelString="cspCertCtrl.model.initials";
    var _surname_modelString="cspCertCtrl.model.surname";
    var _title_modelString="cspCertCtrl.model.title";
    var _dateSigned_modelString="cspCertCtrl.model.dateSigned";

    /**
     *
     * @constructor
     */
    this.CspCertification = function () {

    };

    this.setDateSignedIndValue = function (parent, year,month,day) {
        parent.element(by.model(_dateSigned_modelString)).sendKeys(year+"-"+month+"-"+day);
        /*uiUtil.getLocaleDateString(year,month,day).then(function (value) {
            console.log("The date being injected is "+value);

        });*/
    };
    this.setDateSignedValue = function (parent, value) {
        parent.element(by.model(_dateSigned_modelString)).sendKeys(value);

    };


    this.getDateSignedValue = function (parent) {
        return parent.element(by.model(_dateSigned_modelString)).getAttribute('value');
    };
    this.getDateSignedText = function (parent) {
        (parent.element(by.model(_dateSigned_modelString))).getText().then(function (value) {
            //ar dateValue = new Date(value);
            console.log(value);
        });
    }

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