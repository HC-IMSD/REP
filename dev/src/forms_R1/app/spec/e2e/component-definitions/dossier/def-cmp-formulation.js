/**
 * Created by dkilty on 17/02/2017.
 */

//var UiUtil = require("../util/util-ui.js");


var Formulations = function () {

    var UiUtil = require("../../util/util-ui.js");
    var uiUtil = new UiUtil();
    var expandingTable = uiUtil.getExpandingTable("cmp-formulations");
    var addFormulationButton = element(by.id("addFormulation"));
    var formulationNameByModel = By.model("formulRecCtrl.frmModel.formulationName");
    var dosageFormModelString="formulRecCtrl.frmModel.dosageForm";
   // var _unitsModelString="$ctrl.productModel.units";
    // _unitsUiSelect=element(by.model(_unitsModelString));

    //browser.selectOption(by.model(_activityLeadModel), value);

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
    }
    this.setDosageFormSelect=function(recordRow,value){

        var parent=this.getRecord(recordRow);
        browser.selectOption(by.model(dosageFormModelString), value,parent);
    }
    this.addFormulationRecord=function(){
        addFormulationButton.click();
    }

};

module.exports = Formulations;