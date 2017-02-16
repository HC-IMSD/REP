/**
 * Created by dkilty on 13/02/2017.
 */


var UiUtil = function () {

    this.init=function(){
        //browswer is  a global
        browser.selectOption = this.selectOption.bind(browser);
        browser.getUISelectOption=this.pickUISelectOption.bind(browser);
        browser.getUISelectModelValue=this.getUISelectModelValue.bind(browser);
    }



    this.selectDropdownbyNum = function (element, optionNum) {
        if (optionNum) {
            var options = element.findElements(by.tagName('option'))
                .then(function (options) {
                    options[optionNum].click();
                });
        }
    };

    /**
     * Used for selecting a value from a HTML5 droplist control
     * @param selector
     * @param item
     */
    this.selectOption=function(selector, item) {
        var selectList, desiredOption;

        selectList = this.findElement(selector);
        selectList.click();
        selectList.findElements(protractor.By.tagName('option'))
            .then(function findMatchingOption(options) {
                options.some(function (option) {
                    option.getText().then(function doesOptionMatch(text) {
                        if (item === text) {
                            desiredOption = option;
                            return true;
                        }
                    });
                });
            })
            .then(function clickOption() {
                if (desiredOption) {
                    desiredOption.click();
                }
            });
    }


    //pick a text option for the UI select box, not using search
    this.pickUISelectOption=function(selector, item) {
        var selectList, desiredOption;

        selectList = this.findElement(selector);
        selectList.click();

        selectList.findElements(protractor.By.xpath('//li/div/span')) //needs review better way?
            .then(function findMatchingOption(options) {
                options.some(function (option) {
                    option.getText().then(function doesOptionMatch(text) {
                        if (item === text) {
                            desiredOption = option;
                            return true;
                        }
                    });
                });
            })
            .then(function clickOption() {
                if (desiredOption) {
                    desiredOption.click();
                }
            });
    }


    this.getUISelectModelValue=function(modelElement, modelString){
        var deferred= protractor.promise.defer();
        modelElement.evaluate(modelString).then(function (modelVal) {
            var  value="";
            if(modelVal){
                value=modelVal.id; //assumes id and object
            }
            return   deferred.fulfill(value);
        });
        return deferred.promise;
    };

    /**
     * Looks for the typeahead element and selects a value in the popup list
     * @param modelString
     * @param typeVal
     * @param lookupVal
     */
    this.selectTypeAheadPopupValue=function(modelString,typeVal,lookupVal){
        var _element=element.all(by.model(modelString)).last(); //temporary till a better fix
        _element.sendKeys(typeVal);
        var _popup=element(by.css(".custom-popup-wrapper"));
        _popup.element(by.css('a[title="'+lookupVal+'"]')).click();
    }

    this.getExpandingTable=function(tagName){

        var component = element(by.tagName(tagName));
         var table=component.element(by.tagName('cmp-expanding-table'));
         return table; //promises needed?
    }
  /*  this.getExpandingTableRows=function(tagName){
        var expandTable=this.getExpandingTable(tagName);
        var rows=null;
        if(expandTable.isPresent()){
            rows=expandTable.all(By.repeater('record in expandTblCtrl.listItems'));
        }
        return rows;
    }*/
    this.getExpandingTableRows=function(expandTable){
        return expandTable.all(By.repeater('record in expandTblCtrl.listItems'));
    }

    /**
     * Zero based index to click on a row to expand or hide it
     * @param tableRows
     * @param rowIndex
     * @returns {tableRow} returns clicked table row if it is found
     */
    this.clickRow=function(tableRows,rowIndex){

        //every second row is the details row, so need to click the visible row.
        if(rowIndex<tableRows.count()/2) {
            var clickIndex=0;
            if(rowIndex>0){
                clickIndex=rowIndex*2;
            }
            tableRows.get(clickIndex).click();
            return  tableRows[clickIndex];
        }
        return null;
    };
    this.getRecordVisibility=function(tableRows,recordIndex){

        var rowIndex=recordIndex*2 +1;
        (tableRows.get(rowIndex)).isDisplayed().then(function (isVisible) {
           return isVisible;
        });
    }

};


//make available externally
module.exports = UiUtil;