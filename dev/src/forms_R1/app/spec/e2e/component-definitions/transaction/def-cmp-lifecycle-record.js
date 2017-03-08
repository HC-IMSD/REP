/**
 * Created by dkilty on 3/7/2017.
 */


var UiUtil = require('../../util/util-ui.js');


var LifecycleRecord = function () {


    var uiUtil = new UiUtil();
    var _addLifecycleButton_idString="addTransactionRec";
    var _saveLifecycleButton_nameString="saveContact";

    var _dateFiled_modelString="lifecycleCtrl.lifecycleModel.dateFiled";
    var _controlNumber_modelString="lifecycleCtrl.lifecycleModel.controlNumber";
    var _activityType_modelString="lifecycleCtrl.lifecycleModel.activityType";
    var _descriptionValue_modelString="lifecycleCtrl.lifecycleModel.descriptionValue";
    var _startDateValue_modelString="lifecycleCtrl.lifecycleModel.startDate";
    var _endDateValue_modelString="lifecycleCtrl.lifecycleModel.endDate";
    var _yearValue_modelString="lifecycleCtrl.lifecycleModel.year";
    var _detailsValue_modelString="lifecycleCtrl.lifecycleModel.details";
    var _sequenceValue_modelString=" lifecycleCtrl.lifecycleModel.sequenceVersion";
    var _lifecycleListTag="cmp-lifecycle-list";

    /**
     *
     * @constructor
     */
    this.LifecycleReocrd = function () {

    };



    this.addTransactionRecord = function (parent) {
        if(parent) {
            parent.element(by.id(_addLifecycleButton_idString)).click();
        }else{
            element(by.id(_addLifecycleButton_idString)).click();
        }
    };

    this.saveTransactionRecord = function (parent) {
            parent.element(by.name(_saveLifecycleButton_nameString)).click();

    };



    this.setDateFiledValue = function (parent, value) {
        parent.element(by.model(_dateFiled_modelString)).sendKeys(value);

    };
    this.getDateFiledValue = function (parent) {
        return parent.element(by.model(_dateFiled_modelString)).getAttribute('value');

    };


    this.setControlNumberValue = function (parent, value) {
        parent.element(by.model(_controlNumber_modelString)).sendKeys(value);

    };
    this.getControlNumberValue = function (parent) {
        return parent.element(by.model(_controlNumber_modelString)).getAttribute('value');

    };

    this.setActivityTypeSelectValue = function (parent, value) {
        browser.selectOption(by.model(_activityType_modelString),value,parent)

    };


    this.getActivityTypeSelectValue = function (parent) {
        return parent.element(by.model(_activityType_modelString)).getAttribute('value');

    };


    this.setDescriptionSelectValue = function (parent, value) {
        browser.selectOption(by.model(_descriptionValue_modelString),value,parent)

    };
    this.getDescriptionSelectValue = function (parent) {
        return parent.element(by.model(_descriptionValue_modelString)).getAttribute('value');

    };

    this.setStartDateValue = function (parent, value) {
        parent.element(by.model(_startDateValue_modelString)).sendKeys(value);

    };
    this.getStartDateValue = function (parent) {
        return parent.element(by.model(_startDateValue_modelString)).getAttribute('value');

    };


    this.setEndDateValue = function (parent, value) {
        parent.element(by.model(_endDateValue_modelString)).sendKeys(value);

    };
    this.getEndtDateValue = function (parent) {
        return parent.element(by.model(_endDateValue_modelString)).getAttribute('value');

    };

    this.setYearValue = function (parent, value) {
        parent.element(by.model(_yearValue_modelString)).sendKeys(value);

    };
    this.getYearValue = function (parent) {
        return parent.element(by.model(_yearValue_modelString)).getAttribute('value');

    };


    this.setDetailsValue = function (parent, value) {
        parent.element(by.model(_detailsValue_modelString)).sendKeys(value);

    };
    this.getDetailsValue = function (parent) {
        return parent.element(by.model(_detailsValue_modelString)).getAttribute('value');

    };

    this.setSequenceValue = function (parent, value) {
        parent.element(by.model(_sequenceValue_modelString)).sendKeys(value);

    };
    this.getSequenceValue = function (parent) {
        return parent.element(by.model(_sequenceValue_modelString)).getAttribute('value');

    };


    /**
     * This will get the committed records
     * @param parent
     */
    this.getRows = function (parent) {
        var expandingTable= uiUtil.getExpandingTable(_lifecycleListTag,parent);
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



};

module.exports = LifecycleRecord;