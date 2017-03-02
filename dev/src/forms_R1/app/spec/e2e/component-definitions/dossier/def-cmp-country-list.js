/**
 * Created by dkilty on 28/02/2017.
 */

var UiUtil = require('../../util/util-ui.js');

var CountryRecord=function(){
    var uiUtil = new UiUtil();
    var countryListTag="cmp-country-list";
    //var countryTag="cmp-country-record";

    var addCountryButtonName="addCountry";

    //record string models
    var _countryTypeModelString="countryRecCtrl.model.country";


    var _deleteRecordButtonNameString="deleteCountry";



    this.addCountryRecord = function (parent) {
        parent.element(by.name(addCountryButtonName)).sendKeys(protractor.Key.ENTER);
    };


    /**
     * This will get the committed records
     * @param parent
     */
    this.getRows = function (parent) {

        var expandingTable= uiUtil.getExpandingTable(countryListTag,parent);
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


    this.setCountryListValue=function(parent,row,value){
        var record=this.getRecord(parent,row);
        var selectList=record.element(by.model(_countryTypeModelString));
        browser.UISelectSearch(selectList,value);
    };

    this.getCountryListValue=function(parent,row,value){
        var record=this.getRecord(parent,row);
       return record.element(by.model(_countryTypeModelString)).getAttribute('value');
    };



    this.deleteCountryTypeRecord=function(parent,row,value){
        var record=this.getRecord(parent,row);
        record.element(by.name(_deleteRecordButtonNameString)).sendKeys(protractor.Key.ENTER);
    };

};

module.exports = CountryRecord;
