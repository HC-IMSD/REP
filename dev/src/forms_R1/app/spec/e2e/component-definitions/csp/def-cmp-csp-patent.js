/**
 * Created by dkilty on 27/04/2017.
 */

var UiUtil = require('../../util/util-ui.js');
var CspPatent = function () {

    var _patentNum_modelString="cspPatentCtrl.model.patentNumber";
    var _filingDate_modelString="cspPatentCtrl.model.filingDate";
    var _grantedDate_modelString="cspPatentCtrl.model.grantedDate";
    var _expiryDate_modelString="cspPatentCtrl.model.expiryDate";
    var uiUtil = new UiUtil();


    /**
     *
     * @constructor
     */
    this.CspPatent = function () {

    };

    this.setPatentNumValue = function (parent, value) {
        parent.element(by.model(_patentNum_modelString)).sendKeys(value);
    };

    this.getPatentNumValue = function (parent) {
        return parent.element(by.model(_patentNum_modelString)).getAttribute('value');
    };

    this.setFilingDateValue = function (parent,year,month,day) {
      /*  if(browser.browserName==="chrome"){
            //TODO hack, doesn't seem to be a way around this?
            value= "00"+value;
        }
        parent.element(by.model(_filingDate_modelString)).sendKeys(value);*/

        uiUtil.setDate( parent.element(by.model(_filingDate_modelString)),year,month,day);
    };

    this.getFilingDateValue = function (parent) {
        return parent.element(by.model(_filingDate_modelString)).getAttribute('value');
    };

    this.setGrantDateValue = function (parent, year,month,day) {
        /*if(browser.browserName==="chrome"){
            //TODO hack, doesn't seem to be a way around this?
            value= "00"+value;
        }
        parent.element(by.model(_grantedDate_modelString)).sendKeys(value);*/
        uiUtil.setDate(parent.element(by.model(_grantedDate_modelString)),year,month,day);
    };

    this.getGrantDateValue = function (parent) {
        return parent.element(by.model(_grantedDate_modelString)).getAttribute('value');
    };
    this.setExpiryDateValue = function (parent,year,month,day) {
     /*   if(browser.browserName==="chrome"){
            //TODO hack, doesn't seem to be a way around this?
            value= "00"+value;
        }
        parent.element(by.model(_expiryDate_modelString)).sendKeys(value);*/

        uiUtil.setDate(parent.element(by.model(_expiryDate_modelString)),year,month,day);
    };

    this.getExpiryDateValue = function (parent) {
        return parent.element(by.model(_expiryDate_modelString)).getAttribute('value');
    };

};

module.exports = CspPatent;