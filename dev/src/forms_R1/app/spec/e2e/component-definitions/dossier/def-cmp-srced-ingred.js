/**
 * Created by dkilty on 28/02/2017.
 */


var UiUtil = require('../../util/util-ui.js');

var SrcIngedient = function () {
    var uiUtil = new UiUtil();
    var addIngredientButtonNameString = "addSrcIngred";
    var appendix4ListTag="cmp-appendix-four";

    //model tags
    var ingredientNameModelString="ap4RecCtrl.model.ingredientName";
    var humanChkModelString="ap4RecCtrl.model.humanSourced";
    var animalChkModelString="ap4RecCtrl.model.animalSourced";

    this.addSrcIngred = function() {
        element(by.name(addIngredientButtonNameString)).sendKeys(protractor.Key.ENTER);
    };

    this.setHumanCheckValue=function(parent){
        parent.element(by.model(humanChkModelString)).click();
    };

    this.setAnimalCheckValue=function(parent){
        parent.element(by.model(animalChkModelString)).click();
    };

    this.getHumanCheckValue=function(parent){
       return parent.element(by.model(humanChkModelString)).getAttribute('value');
    };

    this.getAnimalCheckValue=function(parent){
        return parent.element(by.model(animalChkModelString)).getAttribute('value');
    };




    /**
     * This will get the committed records
     * @param parent
     */
    this.getRows = function (parent) {
        var expandingTable = uiUtil.getExpandingTable(appendix4ListTag, parent);
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

};

module.exports = SrcIngedient;

