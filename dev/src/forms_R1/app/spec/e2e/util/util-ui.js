/**
 * Created by dkilty on 13/02/2017.
 */


var UiUtil = function () {

    this.init = function () {
        //browswer is  a global
        browser.selectOption = this.selectOption.bind(browser);
        browser.getUISelectOption = this.pickUISelectOption.bind(browser);
        browser.getUISelectModelValue = this.getUISelectModelValue.bind(browser);
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
    this.selectOption = function (selector, item, parentElement) {
        var selectList, desiredOption;
        //TODO refactor? or make parent mandatory?
        if (parentElement) {
            selectList = parentElement.element(selector);
            selectList.click();
            selectList.all(protractor.By.tagName('option'))
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

        } else {
            selectList = this.findElement(selector);
            selectList.click();
            selectList.findElement(protractor.By.tagName('option'))
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

    };


    // Deprecrated Doesn't and pick a text option for the UI select box, not using search
    this.pickUISelectOption = function (item, selectList) {
        var desiredOption;
        console.log("FFFFFFFF");
        console.log(selectList);
        selectList.click();
        selectList.element.all(protractor.By.xpath('//li/div/span')) //needs review better way?
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
    };


    this.getUISelectModelValue = function (modelElement, modelString) {
        var deferred = protractor.promise.defer();
        modelElement.evaluate(modelString).then(function (modelVal) {
            var value = "";
            if (modelVal) {
                value = modelVal.id; //assumes id and object
            }
            return deferred.fulfill(value);
        });
        return deferred.promise;
    };

    /**
     * Looks for the typeahead element and selects a value in the popup list
     * @param modelString
     * @param typeVal
     * @param lookupVal
     */
    this.selectTypeAheadPopupValue = function (modelString, typeVal, lookupVal, control) {
        var _element = "";
        if (control) {
            _element = control;
        } else {
            _element = element.all(by.model(modelString)).last(); //temporary till a better fix
        }
        _element.sendKeys(typeVal);
        var _popup = element(by.css(".custom-popup-wrapper"));
        _popup.element(by.css('a[title="' + lookupVal + '"]')).click();
    }

    this.getExpandingTable = function (tagName, parent) {

        var component = "";

        if (parent) {
            component = parent.element(by.tagName(tagName));

        } else {
            component = element(by.tagName(tagName));
        }

        var table = component.element(by.tagName('cmp-expanding-table'));
        return table; //promises needed?
    };


    this.getExpandingTableRows = function (expandTable) {
        return expandTable.all(By.repeater('record in expandTblCtrl.listItems'));
    };

    /**
     * Zero based index to click on a row to expand or hide it
     * @param tableRows
     * @param rowIndex
     * @returns {tableRow} returns clicked table row if it is found
     */
    this.clickRow = function (tableRows, rowIndex) {
        var deferred = protractor.promise.defer();
        //every second row is the details row, so need to click the visible row.
        tableRows.get((rowIndex * 2)).click().then(function (value) {
            return deferred.fulfill(true);
        });
        return deferred.promise;
    };
    this.getRecordVisibility = function (tableRows, recordIndex) {
        var deferred = protractor.promise.defer();
        var rowIndex = recordIndex * 2 + 1;
        (tableRows.get(rowIndex)).isDisplayed().then(function (isVisible) {
            //return isVisible;
            return deferred.fulfill(isVisible);
        });
        return deferred.promise;
    };

    this.getNumberRows = function (tableRows) {
        var deferred = protractor.promise.defer();
        //every second row is the details row, so need to click the visible row.
        tableRows.count().then(function (value) {
            return deferred.fulfill(value);
        });
        return deferred.promise;
    };


    this.UISelectSearch = function (selectList, val) {
        var _searchInput = selectList.element(by.css('.ui-select-search'));
       // var choices = selectList.all(by.css('.ui-select-choices .ui-select-choices-row-inner'));
        selectList.click();
        _searchInput.clear();
        _searchInput.sendKeys(val);
       return _searchInput.sendKeys(protractor.Key.ENTER);
    };



};


//make available externally
module.exports = UiUtil;