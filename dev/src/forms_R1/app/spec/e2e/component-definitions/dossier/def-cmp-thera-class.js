/**
 * Created by dkilty on 16/02/2017.
 */
//=================== Therapeutic Classification component definitions





var TheraClass=function() {
    var UiUtil = require("../../util/util-ui.js");
    var uiUtil=new UiUtil();
    var  expandingTable=uiUtil.getExpandingTable("cmp-thera-list");
    var _addTheraClassButton = element(By.id("addTheraClass"));
    var _deleteTheraClassId = (By.id("deleteThera"));
    var  _theraTextByModel=(By.model("theraRecCtrl.record.name"));


    this.getRecord=function(recordRow){
        return this.getRows().get(recordRow*2+1);
    };

    this.addTherapeuticClassification = function () {
        _addTheraClassButton.sendKeys(protractor.Key.ENTER);
    };

    this.deleteTherapeuticClassification = function () {
        _deleteTheraClassButton.sendKeys(protractor.Key.ENTER);
    };
    this.setTheraTextValue=function(value, row){
        var row=this.getRecord(row);
          var field= row.element(_theraTextByModel);
        field.sendKeys(value);
    };
    this.getTheraTextValue=function(row){
        var row=this.getRecord(row);
        var field=row.element(_theraTextByModel)
        return field.getAttribute('value');
    };

    this.getRows=function(){
        return  uiUtil.getExpandingTableRows(expandingTable);
    };
    this.clickRow=function(index){
        uiUtil.clickRow(this.getRows(),index);
    };
    this.getRecordVisibility=function(index){
        return uiUtil.getRecordVisibility(this.getRows(),index);
    };
    this.getNumberRecords=function(){
        return (this.getRows().count())/2;
    };

};

module.exports = TheraClass;
