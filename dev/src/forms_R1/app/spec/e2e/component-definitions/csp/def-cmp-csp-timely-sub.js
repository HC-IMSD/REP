/**
 * Created by dkilty on 27/04/2017.
 */

var UiUtil = require('../../util/util-ui.js');
var CspTimelySub = function () {

    var _subStatement_modelString="timelySubCtrl.model.submissionStatement";
    var _approvalDate_modelString="timelySubCtrl.model.approvalDate";
    var _country_modelString="timelySubCtrl.model.country";
    var _otherCountry_modelString="timelySubCtrl.model.otherCountry";
    var uiUtil=new UiUtil();
    /**
     *
     * @constructor
     */
    this.CspTimelySub = function () {

    };



    this.setTimelyNoApplication=function(parent){
        parent.element(by.css("input[id^=statements_timely_]")).sendKeys(protractor.Key.SPACE);
    };
    this.setTimelyApplicationMade=function(parent){
        parent.element(by.css("input[id=market-approval]")).sendKeys(protractor.Key.SPACE);
    };


    this.getSubStatementValue = function (parent) {

        return (parent.element(by.css('input[ng-model="timelySubCtrl.model.submissionStatement"]:checked')).getAttribute("value"));
    };


    this.setCountryValue = function (parent, value) {
        //browser.selectOption(by.model(_country_modelString), value,parent);
        var selectList=parent.element(by.model(_country_modelString));
        browser.UISelectSearch(selectList,value);

    };

    this.getCountryValue = function (parent) {
        //return parent.element(by.model(_country_modelString)).getAttribute('value');
        return parent.element(by.model(_country_modelString)).all(by.css('.select2-chosen')).last().getText();
    };

    this.setApprovalDateValue = function (parent, year,month,day) {
     /*   if(browser.browserName==="chrome"){
            //TODO hack, is there a better way?
            value="00"+value;
        }
        parent.element(by.model(_approvalDate_modelString)).sendKeys(value);*/
        uiUtil.setDate( parent.element(by.model(_approvalDate_modelString)),year,month,day);
    };

    this.getApprovalDateValue = function (parent) {
        return parent.element(by.model(_approvalDate_modelString)).getAttribute('value');
    };



};

module.exports = CspTimelySub;