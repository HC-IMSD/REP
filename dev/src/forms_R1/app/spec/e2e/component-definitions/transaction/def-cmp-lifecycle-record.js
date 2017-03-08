/**
 * Created by dkilty on 3/7/2017.
 */


var UiUtil = require('../../util/util-ui.js');


var LifecycleRecord = function () {


    var uiUtil = new UiUtil();
    var _companyId_modelString = "transInfoCtrl.transactionModel.ectd.companyId";
    var _addLifecycleButton_idString="addTransactionRec";
    var _dateFiled_modelString="lifecycleCtrl.lifecycleModel.dateFiled";

    /*

     lifecycleCtrl.lifecycleModel.controlNumber
     lifecycleCtrl.lifecycleModel.activityType
     cription_{{$id}}" name="seqDescription"
     lifecycleCtrl.lifecycleModel.descriptionValue
     lifecycleCtrl.lifecycleModel.startDate
     lifecycleCtrl.lifecycleModel.endDate
     lifecycleCtrl.lifecycleModel.year
     lifecycleCtrl.lifecycleModel.details
     lifecycleCtrl.lifecycleModel.sequenceVersion
     */

    /**
     *
     * @constructor
     */
    this.LifecycleReocrd = function () {

    };




    this.setCompanyNameValue = function (parent, value) {
        parent.element(by.model(_companyName_modelString)).sendKeys(value);

    };
    this.getCompanyNameValue = function (parent) {
        return parent.element(by.model(_companyName_modelString)).getAttribute('value');

    };



    /**
     * This will get the committed records
     * @param parent
     */
    this.getRows = function (parent) {
        var expandingTable= uiUtil.getExpandingTable(medIngredListTag,parent);
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

    /*
     gets the new record that is outside the expanding table
     */
    this.getNewRecord=function(parent){

        return parent.element(by.name(newRecTag)).element(by.tagName(medIngredTag));
    };

};

module.exports = LifecycleRecord;