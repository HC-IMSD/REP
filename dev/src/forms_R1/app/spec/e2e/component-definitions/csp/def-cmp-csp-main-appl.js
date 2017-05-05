/**
 * Created by dkilty on 27/04/2017.
 */

var CspMainAppl = function () {

    var _controlNum_modelString="cspMainApplCtrl.model.controlNumber";
    var _drugUse_modelString="cspMainApplCtrl.model.drugUse";
    var _timeApplication_modelString="cspMainApplCtrl.model.timeApplication";
    var _applicantStatement_modelString="cspMainApplCtrl.model.applicantStatement";
    var _medIngredient_modelString="cspMainApplCtrl.model.medicinalIngredient";
    /**
     *
     * @constructor
     */
    this.CspMainAppl = function () {

    };

    this.setControlNumValue = function (parent, value) {
        parent.element(by.model(_controlNum_modelString)).sendKeys(value);
    };

    this.getControlNumValue = function (parent) {
        return parent.element(by.model(_controlNum_modelString)).getAttribute('value');
    };

    this.setDrugUseValue = function (parent, value) {
        //browser.selectHtmlDropList(parent,_drugUse_modelString,value);
       browser.selectOption(by.model(_drugUse_modelString), value,parent);
    };

    this.getDrugUseValue = function (parent) {
        return parent.element(by.model(_drugUse_modelString)).getAttribute('value');
    };

    this.setTimeApplicationValue = function (parent, value) {
       // browser.selectOption(by.model(_timeApplication_modelString), value,parent);
        parent.element(by.model(_timeApplication_modelString)).sendKeys(value);
    };

    this.setTimeApplicationAsGrant=function(parent){

        parent.element(by.id("within120")).sendKeys(protractor.Key.SPACE);
    };
    this.setTimeApplicationAsNOC = function (parent) {
        parent.element(by.css("input[id^=time120_]")).sendKeys(protractor.Key.SPACE);
    };

    this.setApplicationStatementValue = function (parent, value) {
        parent.element(by.model(_applicantStatement_modelString)).sendKeys(value);
    };

    this.setStatementAsApplicantAsOwner = function (parent, value) {

        parent.element(by.css("input[id^=applicantApply_]")).sendKeys(protractor.Key.SPACE);

    };
    this.setStatementAsApplicantAsOwnerConsent = function (parent, value) {
        parent.element(by.id("applicant-consent")).sendKeys(protractor.Key.SPACE);

    };

    //Question 7
    this.getStatementsAsToApplicantValue = function (parent) {

        return (parent.element(by.css('input[ng-model="cspMainApplCtrl.model.applicantStatement"]:checked')));
    };

    this.getApplicationStatementValue = function (parent) {
       /*
            element.all(by.model('cspMainApplCtrl.model.timeApplication')).each(function (element, index) {
                console.log("gettimg one");

                element.getAttribute('checked').then(function (text) {
                    console.log("This is the checked value")
                    console.log(index, text);
                    indexChecked = index;
                });
                element.getAttribute('value').then(function (text) {
                    console.log(index, text);
                    if (index === indexChecked) {
                        value = text
                        console.log("This is what the value is" + value);
                        return value;
                    }
                });
            });*/
        return (parent.element(by.css('input[ng-model="cspMainApplCtrl.model.timeApplication"]:checked')));
    };
    this.setMedIngredientValue=function(parent,value){
        parent.element(by.model(_medIngredient_modelString)).sendKeys(value);

    };
    this.getMedIngredientValue=function(parent){
       return  parent.element(by.model(_medIngredient_modelString)).getAttribute('value');

    }


};

module.exports = CspMainAppl;