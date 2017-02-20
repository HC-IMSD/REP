/**
 * Created by dkilty on 17/02/2017.
 */

//var UiUtil = require("../util/util-ui.js");


var Formulations = function () {

    var UiUtil = require("../../util/util-ui.js");
    var uiUtil = new UiUtil();
    var expandingTable = uiUtil.getExpandingTable("cmp-formulations");
    var addFormulationButton = element(by.id("addFormulation"));
    var formulationNameModelString = "formulRecCtrl.frmModel.formulationName";
    var dosageFormModelString="formulRecCtrl.frmModel.dosageForm";


    this.getRows = function () {
        return uiUtil.getExpandingTableRows(expandingTable);
    };
    this.clickRow = function (index) {
        uiUtil.clickRow(this.getRows(), index);
    };
    this.getRecordVisibility = function (index) {
        return uiUtil.getRecordVisibility(this.getRows(), index);
    };
    this.getNumberRecords = function () {
        return (uiUtil.getNumberRows(this.getRows()) / 2)
    };
    this.getRecord=function(recordRow){
        return this.getRows().get(recordRow*2+1);
    };
    this.addFormulationRecord=function(){
        addFormulationButton.click();
    };

    this.setDosageFormSelect=function(parent,value){
        browser.selectOption(by.model(dosageFormModelString), value,parent);
    };

    this.setFormulationName=function(parent,value){
        parent.element(by.model(formulationNameModelString)).sendKeys(value);
    };



};

module.exports = Formulations;