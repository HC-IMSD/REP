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

        parent.element(by.id("within120")).click();
    };
    this.getTimeApplicationValue = function (parent) {
      /*  return (parent.all(by.model(_timeApplication_modelString)).element(by.css("input[type='radio']:checked")).getAttribute('value');*/
     //   return parent.element(by.model(_timeApplication_modelString)).getAttribute('value');
    };

    this.setApplicationStatementValue = function (parent, value) {
        parent.element(by.model(_applicantStatement_modelString)).sendKeys(value);
    };

    this.getApplicationStatementValue = function (parent) {
       // var radio = $("input[type='radio']:checked")
        return parent.element(by.css("[ng-model=cspMainApplCtrl.model.timeApplication]:checked")).getAttribute('value')

    };
    this.setMedIngredientValue=function(parent,value){
        parent.element(by.model(_medIngredient_modelString)).sendKeys(value);

    };
    this.getMedIngredientValue=function(parent){
       return  parent.element(by.model(_medIngredient_modelString)).getAttribute('value');

    }


};

module.exports = CspMainAppl;