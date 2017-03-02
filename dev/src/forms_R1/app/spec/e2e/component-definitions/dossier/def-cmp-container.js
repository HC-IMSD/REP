/**
 * Created by dkilty on 27/02/2017.
 */




var UiUtil = require('../../util/util-ui.js');

var ContainerType = function () {
    var uiUtil = new UiUtil();
    var containerListTag = "cmp-container-type-list";
    var containerTag = "cmp-container-type-record";
    var newRecTag = "new-container-record";
    var addContainerButtonName = "addContainerButton";

    //record string models
    var _containerTypeModelString = "ctrCtrl.ctModel.containerType";
    var _packageSizeModelString = "ctrCtrl.ctModel.packageSize";
    var _shelfLifeYearsModelString = "ctrCtrl.ctModel.shelfLifeYears";
    var _shelfLifeMonthsModelString = "ctrCtrl.ctModel.shelfLifeMonths";
    var _tempMinModelString = "ctrCtrl.ctModel.tempMin";
    var _tempMaxModelString = "ctrCtrl.ctModel.tempMax";

    var _saveRecordButtonString = "saveContainer";
    var _deleteRecordButtonNameString = "deleteContainer";
    var _discardRecordButtonString = "discardContainer";


    this.addContainerType = function (parent) {
        parent.element(by.name(addContainerButtonName)).sendKeys(protractor.Key.ENTER);
    };


    /**
     * This will get the committed records
     * @param parent
     */
    this.getRows = function (parent) {
        var expandingTable = uiUtil.getExpandingTable(containerListTag, parent);
        return uiUtil.getExpandingTableRows(expandingTable);
    };

    this.clickRow = function (parent, index) {
        uiUtil.clickRow(this.getRows(parent), index);
    };

    this.isRecordVisible = function (parent, recordIndex) {
        return uiUtil.getRecordVisibility(this.getRows(parent), recordIndex);
    };

    this.getRecordVisibility = function (parent, index) {
        return uiUtil.getRecordVisibility(this.getRows(parent), index);
    };
    this.getNumberRecords = function (parent) {
        return (uiUtil.getNumberRows(this.getRows(parent)) / 2)
    };
    this.getRecord = function (parent, recordRow) {
        return this.getRows(parent).get(recordRow * 2 + 1);
    };

    /*
     gets the new record that is outside the expanding table
     */
    this.getNewRecord = function (parent) {

        return parent.element(by.name(newRecTag)).element(by.tagName(containerTag));
    };

    this.setContainerTypeValue = function (record, value) {
        record.element(by.model(_containerTypeModelString)).sendKeys(value);
    };
    this.setPackageTypeValue = function (record, value) {
        record.element(by.model(_packageSizeModelString)).sendKeys(value);
    };

    this.setShelfLifeYearValue = function (record, value) {
        record.element(by.model(_shelfLifeYearsModelString)).sendKeys(value);
    };

    this.setShelfLifeMonthValue = function (record, value) {
        record.element(by.model(_shelfLifeMonthsModelString)).sendKeys(value);
    };
    this.setTempMinValue = function (record, value) {
        record.element(by.model(_tempMinModelString)).sendKeys(value);
    };
    this.setTempMaxValue = function (record, value) {
        record.element(by.model(_tempMaxModelString)).sendKeys(value);
    };

    //======== getters

    /**
     * Gets the container type value
     * @param record -parent record instance
     * @returns {string} field value
     */
    this.getContainerTypeValue = function (record) {
        return record.element(by.model(_containerTypeModelString)).getAttribute('value');
    };
    /**
     * Gete the package type text value
     * @param record - parent record instance
     * @returns {string} field text value
     */
    this.getPackageTypeValue = function (record) {
       return record.element(by.model(_packageSizeModelString)).getAttribute('value');
    };

    /**
     * Gest the self life year value
     * @param record -parent record instance
     * @returns {string} -should be a integer value
     */
    this.getShelfLifeYearValue = function (record) {
        return record.element(by.model(_shelfLifeYearsModelString)).getAttribute('value');
    };
    /**
     * Gets the shelf life months value
     * @param record - parent record instance
     * @returns {string} should be an integer value
     */
    this.getShelfLifeMonthValue = function (record) {
       return record.element(by.model(_shelfLifeMonthsModelString)).getAttribute('value');
    };

    /**
     * Get the lower range temperature value
     * @param record -parent record instance
     * @returns {string} should be an integer
     */
    this.getTempMinValue = function (record) {
        return record.element(by.model(_tempMinModelString)).getAttribute('value');
    };
    /**
     *Gets the temperature Maximum value
     * @param record
     * @returns {string}
     */
    this.getTempMaxValue = function (record) {
        return record.element(by.model(_tempMaxModelString)).getAttribute('value');
    };

    /**
     * Saves the container type record
     * @param record -the parent record. Control search starts at this origin
     */
    this.saveContainerTypeRecord = function (record) {
        record.element(by.name(_saveRecordButtonString)).sendKeys(protractor.Key.ENTER);
    };

    /**
     * Deletes the container record
     * @param record
     */
    this.saveContainerTypeRecord = function (record) {
        record.element(by.name(_deleteRecordButtonNameString)).sendKeys(protractor.Key.ENTER);
    };

    /**
     * Discards  the container record -only applicable to a new record
     * @param record
     */
    this.saveContainerTypeRecord = function (record) {
        record.element(by.name(_discardRecordButtonString)).sendKeys(protractor.Key.ENTER);
    };


};

module.exports = ContainerType;


