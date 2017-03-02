/**
 * Created by dkilty on 28/02/2017.
 */



var UiUtil = require('../../util/util-ui.js');

var ROARecord=function(){
    var uiUtil = new UiUtil();
    var roaListTag="cmp-roa-list";
    var addROAButtonName="addRoaRec";

    //record string models
    var _roaTypeModelString="roaRecCtrl.model.roa";
    var _deleteRecordButtonNameString="roaDelete";


    this.addROARecord = function (parent) {
        parent.element(by.name(addROAButtonName)).sendKeys(protractor.Key.ENTER);
    };


    /**
     * This will get the committed records
     * @param parent
     */
    this.getRows = function (parent) {

        var expandingTable= uiUtil.getExpandingTable(roaListTag,parent);
        return uiUtil.getExpandingTableRows(expandingTable);
    };

    this.clickRow = function (parent,index) {
        uiUtil.clickRow(this.getRows(parent), index);
    };

    this.isRecordVisible=function(parent,recordIndex){
        return uiUtil.getRecordVisibility(this.getRows(parent), recordIndex);
    };

    this.getRecordVisibility = function (parent,index) {
        return uiUtil.getRecordVisibility(this.getRows(parent), index);
    };
    this.getNumberRecords = function (parent) {
        return (uiUtil.getNumberRows(this.getRows(parent)) / 2)
    };
    this.getRecord = function (parent,recordRow) {
        return this.getRows(parent).get(recordRow * 2 + 1);
    };


    this.setRoaListValue=function(parent,row,value){
        var record=this.getRecord(parent,row);
        var selectList=record.element(by.model(_roaTypeModelString));
        browser.UISelectSearch(selectList,value);
    };

    this.getRoaListValue=function(parent,row){
        var record=this.getRecord(parent,row);
        return record.element(by.model(_roaTypeModelString)).getAttribute('value');
    };


    this.deleteROATypeRecord=function(record){
        record.element(by.name(_deleteRecordButtonNameString)).sendKeys(protractor.Key.ENTER);
    };

};

module.exports = ROARecord;
