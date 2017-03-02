/**
 * Created by dkilty on 01/03/2017.
 */

//required components
var UiUtil = require('../../util/util-ui.js');

/**
 * Animal sourced object definition
 * @constructor
 */
var AnimalSrced = function () {
    var uiUtil = new UiUtil();
    var animalSrcListTag = "cmp-animal-sourced-list";
    var addAnimalSrcButtonName = "addAnimalSrc";

    //record string models

    var _deleteRecordButtonNameString = "deleteAnimalSrc";
    var _animalTypeModelString="animalSrcCtrl.model.animalType";
    var _animalDescriptionModelString="animalSrcCtrl.model.animalDetail";
    var _ageAnimalsModelString="animalSectCtrl.model.ageAnimals";
    var _isControlledPopModelString="animalSectCtrl.model.isControlledPop";
    var _isCellLineModelString="animalSectCtrl.model.isCellLine";
    var _isBiotechDerivedModelString="animalSectCtrl.model.isBiotechDerived";



    this.addAnimalSrcRecord = function (parent) {
        parent.element(by.name(addAnimalSrcButtonName)).sendKeys(protractor.Key.ENTER);
    };

    /**
     * This will get the committed records
     * @param parent
     */
    this.getRows = function (parent) {

        var expandingTable = uiUtil.getExpandingTable(animalSrcListTag, parent);
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


    this.setAnimalTypeListValue = function (record, value) {
        // var record=this.getRecord(parent,row);
       // var selectList = record.element(by.model(_animalTypeModelString));
       // browser.UISelectSearch(selectList, value);

        browser.selectOption(By.model(_animalTypeModelString),value,record);

    };
    this.setAnimalDescriptionValue = function (record, value) {
        // var record=this.getRecord(parent,row);
        record.element(by.model(_animalDescriptionModelString)).sendKeys(value);
    };

    this.setIsControlledPopulation=function(record, value){
        browser.selectOption(By.model( _isControlledPopModelString),value,record);
    };

    this.setIsCellLine=function(record, value){
        browser.selectOption(By.model( _isCellLineModelString),value,record);
    };

    this.setIsBiotechDerived=function(record, value){
        browser.selectOption(By.model(_isBiotechDerivedModelString),value,record);
    };
    this.setAgeAnimals=function(record, value){
        record.element(by.model(_ageAnimalsModelString)).sendKeys(value);
    };





    this.deleteAnimalSrcRecord = function (record) {
        record.element(by.name(_deleteRecordButtonNameString)).sendKeys(protractor.Key.ENTER);
    };

};

module.exports = AnimalSrced;
